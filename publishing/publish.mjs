import fs from "node:fs"
import path from "node:path"
import os from "node:os"
import crypto from "node:crypto"
import { createRequire } from "node:module"
import { fileURLToPath, pathToFileURL } from "node:url"
import { parseArgs } from "node:util"
import { spawnSync } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const hash = (value) => crypto.createHash("sha256").update(value).digest("hex")
const within = (parent, child) => child === parent || child.startsWith(parent + path.sep)
const fail = (message) => { throw new Error(message) }

export function slug(file) {
  return file.replace(/\.[^.\/]+$/, "").split("/").map((part) => part
    .replace(/\s/g, "-").replace(/&/g, "-and-").replace(/%/g, "-percent")
    .replace(/\?/g, "").replace(/#/g, "")).join("/").replace(/(^|\/)_index$/, "$1index")
}

export function tree(directory, { includeHidden = false } = {}) {
  const files = new Map()
  function walk(folder, relative = "") {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const rel = relative ? relative + "/" + entry.name : entry.name
      if (!includeHidden && entry.name.startsWith(".")) continue
      const full = path.join(folder, entry.name)
      if (entry.isSymbolicLink()) fail(`不接受符号链接：${rel}`)
      if (entry.isDirectory()) walk(full, rel)
      else if (entry.isFile()) files.set(rel, { hash: hash(fs.readFileSync(full)), full })
    }
  }
  walk(directory)
  return files
}

export function fingerprints(files) {
  return Object.fromEntries([...files].map(([name, file]) => [name, file.hash]).sort(([a], [b]) => a.localeCompare(b)))
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

function safeRelative(name) {
  if (typeof name !== "string" || !name || name.includes("\\") || name.includes("\0") ||
      path.posix.isAbsolute(name) || name.split("/").some((p) => !p || p.startsWith("."))) {
    fail(`资源清单路径无效：${JSON.stringify(name)}`)
  }
  return name
}

export function scan(source, policy, matter) {
  if (policy.version !== 1 || !Array.isArray(policy.assets) || !Array.isArray(policy.html_pages) || !Array.isArray(policy.ignored_files)) {
    fail("资源清单格式无效，需要 version=1、assets、html_pages、ignored_files")
  }
  const assets = new Set(), ignored = new Set(), html = new Map(), registered = new Set()
  function register(name) {
    safeRelative(name)
    if (registered.has(name)) fail(`资源清单有重复路径：${name}`)
    registered.add(name)
  }
  for (const name of policy.assets) {
    register(name)
    if (!/\.(png|jpe?g|gif|webp|svg|pdf|mp[34]|wav|ogg|webm)$/i.test(name)) fail(`普通资源类型不允许：${name}；HTML 必须单独登记`)
    assets.add(name)
  }
  for (const item of policy.html_pages) {
    register(item.path)
    if (!item.path.endsWith(".html") || typeof item.publish !== "boolean") fail("HTML 条目必须包含 .html 路径和布尔 publish")
    html.set(item.path, item.publish)
  }
  for (const name of policy.ignored_files) {
    register(name)
    if (/\.(md|html?)$/i.test(name)) fail(`文章和 HTML 不能放入 ignored_files：${name}`)
    ignored.add(name)
  }
  const all = tree(source), files = new Map(), articles = [], routes = new Map()
  function route(name) {
    const output = slug(name) + (name.endsWith(".md") || name.endsWith(".html") ? ".html" : path.extname(name))
    if (routes.has(output.toLowerCase())) fail(`网址冲突：${name} / ${routes.get(output.toLowerCase())}`)
    routes.set(output.toLowerCase(), name)
  }
  for (const [name, file] of all) {
    if (name.endsWith(".md")) {
      const { data } = matter(fs.readFileSync(file.full, "utf8"))
      if (typeof data.draft !== "boolean") fail(`发布开关必须明确为布尔 draft: true/false：${name}`)
      if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string" || !tag.trim()))) {
        fail(`tags 必须是非空字符串组成的列表：${name}`)
      }
      route(name)
      articles.push({ path: name, slug: slug(name), title: data.title || path.basename(name, ".md"), draft: data.draft })
      files.set(name, file)
    } else if (assets.has(name)) {
      route(name); files.set(name, file)
    } else if (html.has(name)) {
      if (html.get(name)) { route(name); files.set(name, file) }
    } else if (!ignored.has(name)) {
      fail(`未登记的文件不会自动发布：${name}；请先审核 publishing/assets.json`)
    }
  }
  for (const name of [...assets, ...[...html].filter(([, publish]) => publish).map(([name]) => name)]) {
    if (!all.has(name)) fail(`清单中登记的可发布文件不存在：${name}`)
  }
  if (!articles.some((a) => a.path === "index.md" && a.draft === false)) fail("首页 index.md 必须存在并设置 draft: false")
  return { all, files, articles, assets: [...assets], html: [...html].filter(([, publish]) => publish).map(([name]) => name), hiddenHtml: [...html].filter(([, publish]) => !publish).map(([name]) => name), ignored: [...ignored] }
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 })
  if (result.error || result.status !== 0) fail(`${path.basename(command)} 执行失败：${result.error?.message || result.stderr?.trim() || result.stdout?.trim()}`)
  return result.stdout.trim()
}

export function checkOverwrite(site, current) {
  const dirty = run("git", ["status", "--porcelain", "--untracked-files=all", "--", "content"], site)
  if (!dirty) return
  const statePath = path.join(site, ".quartz-cache/publish-sync-state.json")
  if (fs.existsSync(statePath)) {
    const previous = JSON.parse(fs.readFileSync(statePath, "utf8"))
    if (same(previous.files, fingerprints(current))) return
  }
  fail("目标 content 有未登记的本地改动；请先审阅，不能直接覆盖。不会自动 stash、reset 或提交。")
}

export function checkPolicyOverwrite(site, nextHash) {
  const filename = path.join(site, "publishing/assets.json")
  if (!fs.existsSync(filename)) fail("网站仓库缺少 publishing/assets.json，请先安装发布检查器")
  const previousHash = hash(fs.readFileSync(filename))
  if (previousHash === nextHash) return
  const dirty = run("git", ["status", "--porcelain", "--untracked-files=all", "--", "publishing/assets.json"], site)
  if (!dirty) return
  const record = path.join(site, ".quartz-cache/publish-sync-state.json")
  if (fs.existsSync(record) && JSON.parse(fs.readFileSync(record, "utf8")).policyHash === previousHash) return
  fail("网站资源清单有独立的本地改动，停止覆盖；请先审阅 publishing/assets.json")
}

function copyFiles(files, destination) {
  fs.mkdirSync(destination, { recursive: true })
  for (const [name, file] of files) {
    const dest = path.join(destination, name)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(file.full, dest)
  }
}

export function verifyBuild(plan, output) {
  const index = JSON.parse(fs.readFileSync(path.join(output, "static/contentIndex.json"), "utf8"))
  const expected = plan.articles.filter((a) => !a.draft).map((a) => a.slug).sort()
  if (!same(Object.keys(index).sort(), expected)) fail("构建收录与发布清单不一致；不会同步或导出")
  const sitemap = fs.readFileSync(path.join(output, "sitemap.xml"), "utf8")
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeURIComponent(match[1].replaceAll("&amp;", "&")))
  for (const article of plan.articles) {
    const generated = fs.existsSync(path.join(output, article.slug + ".html"))
    if (generated !== !article.draft) fail(`草稿或页面输出不符合设置：${article.path}`)
    const inSitemap = urls.some((url) => url.replace(/\/$/, "").endsWith("/" + article.slug) || (article.slug === "index" && new URL(url).pathname.endsWith("/")))
    if (inSitemap !== !article.draft) fail(`站点地图与发布设置不一致：${article.path}`)
  }
  for (const name of [...plan.assets, ...plan.html]) {
    const generated = path.join(output, slug(name) + path.extname(name))
    if (!fs.existsSync(generated)) fail(`资源未生成：${name}`)
  }
  for (const name of plan.hiddenHtml) {
    if (fs.existsSync(path.join(output, slug(name) + ".html"))) fail(`未获准发布的 HTML 出现在构建中：${name}`)
  }
  for (const [name] of tree(output, { includeHidden: true })) {
    if (/\.(base|md)$/i.test(name) || name.split("/").some((part) => part.startsWith("."))) fail(`不应出现在网站输出的文件：${name}`)
  }
  return { articles: expected.length, excludedDrafts: plan.articles.length - expected.length, assets: plan.assets.length, htmlPages: plan.html.length }
}

function replaceDirectory(from, destination, site, { preserveHidden = false } = {}) {
  const cache = path.join(site, ".quartz-cache")
  fs.mkdirSync(cache, { recursive: true })
  const replacement = fs.mkdtempSync(path.join(site, ".publish-replacement-"))
  const backup = path.join(cache, "publish-backups", new Date().toISOString().replaceAll(":", "-") + "-" + crypto.randomUUID(), path.basename(destination))
  fs.cpSync(from, replacement, { recursive: true })
  if (preserveHidden && fs.existsSync(destination)) {
    for (const name of fs.readdirSync(destination).filter((name) => name.startsWith("."))) {
      fs.cpSync(path.join(destination, name), path.join(replacement, name), { recursive: true, dereference: false })
    }
  }
  fs.mkdirSync(path.dirname(backup), { recursive: true })
  let moved = false
  try {
    if (fs.existsSync(destination)) { fs.renameSync(destination, backup); moved = true }
    fs.renameSync(replacement, destination)
  } catch (error) {
    if (moved && !fs.existsSync(destination)) fs.renameSync(backup, destination)
    fs.rmSync(replacement, { recursive: true, force: true })
    throw error
  }
  return moved ? backup : null
}

export function main(argv = process.argv.slice(2)) {
  const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: {
    source: { type: "string" }, site: { type: "string" }, policy: { type: "string" },
    apply: { type: "boolean", default: false }, report: { type: "string" },
    output: { type: "string" }, help: { type: "boolean", default: false },
  } })
  const command = positionals[0] || "check"
  if (values.help) { console.log("用法：pw_deploy.sh [plan|check|sync --apply] [--site 路径] [--report 文件]\n默认 check 只检查和临时构建。sync --apply 仅同步本地 content。没有提交、推送、升级或部署功能。"); return }
  if (positionals.length > 1 || !["plan", "check", "sync"].includes(command)) fail("仅支持 plan、check、sync；没有 deploy 命令")
  if (command === "sync" && !values.apply) fail("本地同步需要显式 sync --apply；可先运行 check")
  if (command !== "sync" && values.apply) fail("--apply 只能用于 sync")
  if (values.output && command !== "check") fail("--output 只能用于 check")
  const source = fs.realpathSync(path.resolve(values.source || path.join(here, "../content")))
  const site = fs.realpathSync(path.resolve(values.site || process.env.QUARTZ_SITE_DIR || "/home/hao/Desktop/personal_website"))
  const target = path.join(site, "content")
  if (values.output && path.resolve(site, values.output) !== path.join(site, "public")) fail("--output 只允许网站根目录的 public")
  if (values.report && (within(source, path.resolve(values.report)) || within(target, path.resolve(values.report)))) fail("检查报告必须保存在文章 content 目录之外")
  if (within(source, site) && site !== path.dirname(source)) fail("网站目录不能位于内容源目录之内")
  if (command === "sync" && (within(source, target) || within(target, source))) fail("同步的源与目标内容目录不能重叠")
  for (const name of ["content", "public", ".quartz-cache"]) {
    const dest = path.join(site, name)
    if (fs.existsSync(dest) && fs.lstatSync(dest).isSymbolicLink()) fail(`目标不能为符号链接：${name}`)
  }
  if (!fs.existsSync(path.join(site, "quartz/bootstrap-cli.mjs"))) fail("指定目录不是 Quartz 网站根目录")
  if (run("git", ["rev-parse", "--show-toplevel"], site) !== site) fail("--site 必须是网站 Git 仓库根目录")
  if (run("git", ["ls-files", "-u"], site)) fail("网站仓库有未解决的 Git 冲突")
  const require = createRequire(path.join(site, "package.json"))
  const matter = require("gray-matter")
  const policyPath = path.resolve(values.policy || path.join(here, "assets.json"))
  const policyText = fs.readFileSync(policyPath, "utf8")
  const policy = JSON.parse(policyText)
  const targetPolicy = path.join(site, "publishing/assets.json")
  const targetPolicyBefore = fs.existsSync(targetPolicy) ? fs.readFileSync(targetPolicy, "utf8") : null
  const plan = scan(source, policy, matter)
  const current = tree(target)
  const fullTarget = fingerprints(tree(target, { includeHidden: true }))
  if (command === "sync") { checkOverwrite(site, current); checkPolicyOverwrite(site, hash(policyText)) }
  const differences = {
    added: [...plan.files.keys()].filter((name) => !current.has(name)),
    changed: [...plan.files].filter(([name, file]) => current.has(name) && current.get(name).hash !== file.hash).map(([name]) => name),
    removed: [...current.keys()].filter((name) => !plan.files.has(name)),
    webpagesHidden: [], webpagesAdded: [], policyChanged: targetPolicyBefore !== policyText,
  }
  for (const article of plan.articles) {
    const previous = current.has(article.path) ? matter(fs.readFileSync(current.get(article.path).full, "utf8")).data : null
    const previouslyVisible = previous && previous.draft !== true && previous.draft !== "true"
    if (previouslyVisible && article.draft) differences.webpagesHidden.push(article.path)
    if (!previouslyVisible && !article.draft) differences.webpagesAdded.push(article.path)
  }
  const report = { checkedAt: new Date().toISOString(), command, source, site, target,
    policy: "只隐藏草稿网页，允许草稿源码公开", total: plan.articles.length,
    publish: plan.articles.filter((a) => !a.draft).length, drafts: plan.articles.filter((a) => a.draft).length,
    assetCount: plan.assets.length, htmlPages: plan.html.length, ignored: plan.ignored, differences,
    preservedHiddenFiles: Object.keys(fullTarget).filter((name) => name.split("/").some((part) => part.startsWith("."))).length,
    gitNetworkOperations: false, gitMutations: false, deployed: false, validation: null, backup: null }
  console.log(`文章 ${report.total}：可发布 ${report.publish}，草稿 ${report.drafts}；资源 ${report.assetCount}，独立 HTML ${report.htmlPages}`)
  console.log(`目标：${target}\n文件差异：新增 ${differences.added.length}，修改 ${differences.changed.length}，移除 ${differences.removed.length}`)
  if (differences.policyChanged) console.log("资源清单也需要同步到网站仓库")
  for (const [label, names] of [["相对目标内容转为草稿", differences.webpagesHidden], ["相对目标内容转为可发布", differences.webpagesAdded]]) {
    console.log(`${label} ${names.length} 篇`); for (const name of names) console.log(`  ${name}`)
  }
  let temporary
  try {
    if (command !== "plan") {
      temporary = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-publish-check-"))
      const staged = path.join(temporary, "content"), output = path.join(temporary, "public")
      copyFiles(plan.files, staged)
      if (!same(fingerprints(tree(staged)), fingerprints(plan.files))) fail("构建输入复制不完整")
      const result = spawnSync(process.execPath, [path.join(site, "quartz/bootstrap-cli.mjs"), "build", "-d", staged, "-o", output], {
        cwd: site, encoding: "utf8", maxBuffer: 16 * 1024 * 1024,
      })
      fs.writeFileSync(path.join(temporary, "build.log"), (result.stdout || "") + (result.stderr || ""))
      if (result.error || result.status !== 0) fail(`构建失败，记录保留于 ${temporary}/build.log`)
      report.validation = verifyBuild(plan, output)
      if (!same(fingerprints(plan.all), fingerprints(tree(source))) || fs.readFileSync(policyPath, "utf8") !== policyText) fail("检查期间源内容或发布策略变化，请重新检查")
      console.log(`构建验证通过：收录 ${report.validation.articles} 篇，排除 ${report.validation.excludedDrafts} 篇草稿`)
      if (command === "sync") {
        if (!same(fullTarget, fingerprints(tree(target, { includeHidden: true })))) fail("检查期间目标 content 发生变化，停止覆盖")
        if (fs.readFileSync(targetPolicy, "utf8") !== targetPolicyBefore) fail("检查期间目标资源清单发生变化，停止覆盖")
        checkOverwrite(site, current); checkPolicyOverwrite(site, hash(policyText))
        if (differences.added.length || differences.changed.length || differences.removed.length) report.backup = replaceDirectory(staged, target, site, { preserveHidden: true })
        try {
          const actual = fingerprints(tree(target))
          if (!same(actual, fingerprints(plan.files))) fail("同步后文件校验失败")
          if (differences.policyChanged) {
            const replacementPolicy = targetPolicy + "." + crypto.randomUUID() + ".tmp"
            fs.writeFileSync(replacementPolicy, policyText)
            fs.renameSync(replacementPolicy, targetPolicy)
          }
          fs.mkdirSync(path.join(site, ".quartz-cache"), { recursive: true })
          fs.writeFileSync(path.join(site, ".quartz-cache/publish-sync-state.json"), JSON.stringify({ source, files: actual, policyHash: hash(policyText), checkedAt: report.checkedAt }, null, 2) + "\n")
        } catch (error) {
          if (report.backup) {
            fs.renameSync(target, report.backup + "-failed-new")
            fs.renameSync(report.backup, target)
          }
          fs.writeFileSync(targetPolicy, targetPolicyBefore)
          throw error
        }
        console.log("本地 content 同步完成；没有提交、推送或部署")
      }
      if (values.output) {
        const dest = path.resolve(site, values.output)
        if (dest !== path.join(site, "public")) fail("--output 只允许网站根目录的 public")
        replaceDirectory(output, dest, site)
        console.log("已导出通过验证的本地 public 构建产物")
      }
      fs.rmSync(temporary, { recursive: true, force: true }); temporary = null
    }
    if (values.report) {
      const dest = path.resolve(values.report)
      if (within(source, dest) || within(target, dest)) fail("检查报告必须保存在文章 content 目录之外")
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.writeFileSync(dest, JSON.stringify(report, null, 2) + "\n")
    }
    return report
  } catch (error) {
    if (temporary) console.error(`检查材料保留于：${temporary}`)
    throw error
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { main() } catch (error) { console.error(`检查停止：${error.message}`); process.exitCode = 1 }
}
