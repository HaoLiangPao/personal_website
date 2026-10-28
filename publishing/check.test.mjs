import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import { spawnSync } from "node:child_process"
import crypto from "node:crypto"
import { scan, verifyBuild, tree, fingerprints, checkOverwrite, checkPolicyOverwrite, main } from "./publish.mjs"

const parent = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const site = fs.existsSync(path.join(parent, "node_modules/gray-matter")) ? parent : process.env.QUARTZ_SITE_DIR || "/home/hao/Desktop/personal_website"
const matter = createRequire(path.join(site, "package.json"))("gray-matter")
const emptyPolicy = () => ({ version: 1, assets: [], html_pages: [], ignored_files: [] })
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "publish-test-"))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const content = path.join(root, "content"); fs.mkdirSync(content)
  const put = (name, value) => { const dest = path.join(content, name); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, value) }
  put("index.md", "---\ndraft: false\n---\nHome\n")
  return { root, content, put }
}

test("new notes with missing/string draft stop the complete check", (t) => {
  const f = fixture(t)
  for (const value of ["# New note", '---\ndraft: "false"\n---\nText']) {
    f.put("new.md", value)
    assert.throws(() => scan(f.content, emptyPolicy(), matter), /布尔 draft/)
  }
})

test("hidden vault/plugin files are never staged, draft sources are retained", (t) => {
  const f = fixture(t)
  f.put("draft.md", "---\ndraft: true\n---\nDraft\n")
  f.put(".obsidian/settings.json", "private"); f.put(".claudian/settings.json", "private")
  const p = scan(f.content, emptyPolicy(), matter)
  assert.equal(p.articles.length, 2); assert(p.files.has("draft.md"))
  assert(![...p.files.keys()].some((name) => name.startsWith(".")))
})

test("HTML must be registered and publish=false excludes it", (t) => {
  const f = fixture(t); f.put("demo.html", "<!doctype html><title>Demo</title>")
  assert.throws(() => scan(f.content, emptyPolicy(), matter), /未登记/)
  const policy = emptyPolicy(); policy.html_pages.push({ path: "demo.html", publish: false })
  assert(!scan(f.content, policy, matter).files.has("demo.html"))
  policy.html_pages[0].publish = true
  assert(scan(f.content, policy, matter).files.has("demo.html"))
})

test("unpublished HTML may be absent in CI; missing published assets still fail", (t) => {
  const f = fixture(t), policy = emptyPolicy()
  policy.html_pages.push({ path: "pending.html", publish: false })
  policy.ignored_files.push("Untitled.base")
  assert.doesNotThrow(() => scan(f.content, policy, matter))
  policy.assets.push("missing.png")
  assert.throws(() => scan(f.content, policy, matter), /文件不存在/)
})

test("unknown files, escaping paths, symlinks, and route collisions stop checks", (t) => {
  const f = fixture(t); f.put("notes.txt", "unregistered")
  assert.throws(() => scan(f.content, emptyPolicy(), matter), /未登记/)
  fs.unlinkSync(path.join(f.content, "notes.txt"))
  const policy = emptyPolicy(); policy.assets.push("../secret.png")
  assert.throws(() => scan(f.content, policy, matter), /路径无效/)
  fs.symlinkSync("index.md", path.join(f.content, "linked.md"))
  assert.throws(() => scan(f.content, emptyPolicy(), matter), /符号链接/)
  fs.unlinkSync(path.join(f.content, "linked.md"))
  f.put("a b.md", "---\ndraft: false\n---\nA"); f.put("a-b.md", "---\ndraft: false\n---\nB")
  assert.throws(() => scan(f.content, emptyPolicy(), matter), /网址冲突/)
})

test("stale draft pages and hidden output cannot pass despite a clean search index", (t) => {
  const f = fixture(t); f.put("draft.md", "---\ndraft: true\n---\nDraft")
  const policy = emptyPolicy(); policy.html_pages.push({ path: "hidden.html", publish: false })
  const p = scan(f.content, policy, matter), out = path.join(f.root, "public")
  fs.mkdirSync(path.join(out, "static"), { recursive: true })
  fs.writeFileSync(path.join(out, "static/contentIndex.json"), JSON.stringify({ index: { title: "Home" } }))
  fs.writeFileSync(path.join(out, "index.html"), "Home")
  fs.writeFileSync(path.join(out, "sitemap.xml"), "<urlset><url><loc>https://example.com/</loc></url></urlset>")
  assert.equal(verifyBuild(p, out).articles, 1)
  fs.writeFileSync(path.join(out, "draft.html"), "Draft leak")
  assert.throws(() => verifyBuild(p, out), /页面输出/)
  fs.unlinkSync(path.join(out, "draft.html"))
  fs.writeFileSync(path.join(out, "hidden.html"), "Unapproved HTML")
  assert.throws(() => verifyBuild(p, out), /未获准发布的 HTML/)
  fs.unlinkSync(path.join(out, "hidden.html")); fs.mkdirSync(path.join(out, ".claudian"))
  fs.writeFileSync(path.join(out, ".claudian/settings.json"), "private")
  assert.throws(() => verifyBuild(p, out), /不应出现在网站输出/)
})

test("independent target edits are refused; the previous sync is repeatable", (t) => {
  const f = fixture(t)
  const git = (...args) => { const r = spawnSync("git", args, { cwd: f.root, encoding: "utf8" }); assert.equal(r.status, 0, r.stderr) }
  git("init", "-q"); git("add", "content")
  git("-c", "user.name=Test", "-c", "user.email=test@localhost", "-c", "commit.gpgsign=false", "commit", "-qm", "fixture")
  f.put("index.md", "---\ndraft: false\n---\nSynced content")
  assert.throws(() => checkOverwrite(f.root, tree(f.content)), /本地改动/)
  fs.mkdirSync(path.join(f.root, ".quartz-cache"))
  fs.writeFileSync(path.join(f.root, ".quartz-cache/publish-sync-state.json"), JSON.stringify({ files: fingerprints(tree(f.content)) }))
  assert.doesNotThrow(() => checkOverwrite(f.root, tree(f.content)))
  f.put("index.md", "---\ndraft: false\n---\nAnother local edit")
  assert.throws(() => checkOverwrite(f.root, tree(f.content)), /本地改动/)
})

test("default CLI has no deploy/upgrade command or implicit sync", () => {
  assert.throws(() => main(["deploy"]), /没有 deploy/)
  assert.throws(() => main(["upgrade"]), /仅支持/)
  assert.throws(() => main(["sync"]), /显式 sync --apply/)
})

test("policy changes follow the source but never overwrite an independent website edit", (t) => {
  const f = fixture(t)
  const result = spawnSync("git", ["init", "-q"], { cwd: f.root }); assert.equal(result.status, 0)
  const policyDir = path.join(f.root, "publishing"); fs.mkdirSync(policyDir)
  const filename = path.join(policyDir, "assets.json"); fs.writeFileSync(filename, "old policy")
  const sha = (s) => crypto.createHash("sha256").update(s).digest("hex")
  assert.doesNotThrow(() => checkPolicyOverwrite(f.root, sha("old policy")))
  assert.throws(() => checkPolicyOverwrite(f.root, sha("approved new policy")), /独立的本地改动/)
  fs.mkdirSync(path.join(f.root, ".quartz-cache"))
  fs.writeFileSync(path.join(f.root, ".quartz-cache/publish-sync-state.json"), JSON.stringify({ policyHash: sha("old policy") }))
  assert.doesNotThrow(() => checkPolicyOverwrite(f.root, sha("approved new policy")))
  fs.writeFileSync(filename, "independent edit")
  assert.throws(() => checkPolicyOverwrite(f.root, sha("approved new policy")), /独立的本地改动/)
})
