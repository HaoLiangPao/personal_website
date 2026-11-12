import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import crypto from "node:crypto"
import assert from "node:assert/strict"
import matter from "gray-matter"
import { scan, slug, v4Slug, verifyBuild } from "./publish.mjs"

const site = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const base = process.env.PREVIEW_BASE || "http://127.0.0.1:8885/personal_website/"
if (new URL(base).hostname !== "127.0.0.1") throw new Error("Preview verification is local only")
const policy = JSON.parse(fs.readFileSync(path.join(site, "publishing/assets.json"), "utf8"))
const plan = scan(path.join(site, "content"), policy, matter)
const moved = JSON.parse(
  fs.readFileSync(path.join(site, "publishing/moved-articles.json"), "utf8"),
).articles
plan.moved = moved
const validation = verifyBuild(plan, path.join(site, "public"))
const hash = (x) => crypto.createHash("sha256").update(x).digest("hex")
async function get(name) {
  const response = await fetch(new URL(encodeURI(name), base))
  return { status: response.status, bytes: Buffer.from(await response.arrayBuffer()) }
}
const articles = [],
  navigationCollisions = []
for (const article of plan.articles) {
  const old = await get(article.legacySlug + ".html")
  const current = await get(article.slug + ".html")
  const navigationOnly =
    article.draft &&
    current.status === 200 &&
    /<body[^>]*data-publication-kind="navigation"/.test(current.bytes.toString())
  const oldNavigation = navigationOnly && article.path.endsWith("/index.md")
  assert.equal(old.status, article.draft && !oldNavigation ? 404 : 200, article.path + " old URL")
  if (article.draft && current.status === 200) {
    assert.match(
      current.bytes.toString(),
      /<body[^>]*data-publication-kind="navigation"/,
      article.path,
    )
    navigationCollisions.push({ path: article.path, navigationUrl: article.slug })
  } else assert.equal(current.status, article.draft ? 404 : 200, article.path + " new URL")
  if (oldNavigation && article.legacySlug !== article.slug) {
    const href = old.bytes.toString().match(/http-equiv="refresh" content="0; url=([^"\n]+)"/)?.[1]
    assert(href && old.bytes.toString().includes('name="robots" content="noindex"'))
    assert.equal(
      new URL(href, new URL(encodeURI(article.legacySlug) + ".html", base)).pathname,
      new URL(encodeURI(article.slug) + ".html", base).pathname,
    )
  }
  if (!article.draft)
    assert.equal((await get(article.slug)).status, 200, article.path + " clean URL")
  articles.push({ ...article, oldStatus: old.status, newStatus: current.status })
}
for (const move of moved) {
  for (const oldSlug of new Set([slug(move.from), v4Slug(move.from)])) {
    const old = await get(oldSlug + ".html")
    assert.equal(old.status, 200, move.from + " moved URL")
    const href = old.bytes.toString().match(/http-equiv="refresh" content="0; url=([^"\n]+)"/)?.[1]
    assert(href && old.bytes.toString().includes('name="robots" content="noindex"'))
    assert.equal(
      new URL(href, new URL(encodeURI(oldSlug) + ".html", base)).pathname,
      new URL(encodeURI(slug(move.to)) + ".html", base).pathname,
    )
  }
}
const resources = []
for (const name of [...plan.assets, ...plan.html]) {
  const expected = fs.readFileSync(path.join(site, "content", name))
  const current = await get(slug(name) + path.extname(name))
  assert.equal(current.status, 200, name)
  assert.equal(hash(current.bytes), hash(expected), name)
  if (plan.assets.includes(name)) {
    const old = await get(v4Slug(name) + path.extname(name))
    assert.equal(old.status, 200, name + " old asset URL")
    assert.equal(hash(old.bytes), hash(expected), name + " old asset bytes")
  }
  resources.push({ path: name, status: current.status, sha256: hash(expected) })
}
const navigation = new Set()
for (const article of plan.articles.filter((a) => !a.draft)) {
  const dir = path.dirname(article.path).split("/")
  for (let i = 1; i <= dir.length && dir[0] !== "."; i++)
    navigation.add(v4Slug(dir.slice(0, i).join("/") + "/index.md"))
  const raw = matter(fs.readFileSync(path.join(site, "content", article.path), "utf8"))
  for (const tag of raw.data.tags ?? []) {
    const parts = tag.split("/")
    for (let i = 1; i <= parts.length; i++)
      navigation.add(v4Slug("tags/" + parts.slice(0, i).join("/") + ".md"))
  }
}
for (const name of navigation)
  assert.equal((await get(name + ".html")).status, 200, name + " old navigation URL")
const report = {
  checkedAt: new Date().toISOString(),
  base,
  validation,
  legacyArticlesVerified: articles.length,
  movedArticlesVerified: moved.length,
  legacyNavigationVerified: navigation.size,
  assetsAndHtmlVerified: resources.length,
  articles,
  resources,
  navigationCollisions,
  deployed: false,
}
const reportArg = process.argv[2]
if (reportArg) fs.writeFileSync(reportArg, JSON.stringify(report, null, 2) + "\n")
console.log(
  JSON.stringify({
    validation,
    oldArticleRoutes: articles.length,
    oldNavigationRoutes: navigation.size,
    resources: resources.length,
    navigationCollisions: navigationCollisions.length,
  }),
)
