import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import crypto from "node:crypto"
import assert from "node:assert/strict"
import matter from "gray-matter"
import { scan, slug, v4Slug } from "./publish.mjs"

const site = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const base = "https://haoliangpao.github.io/personal_website/"
const commit = process.env.EXPECTED_COMMIT
assert.match(commit ?? "", /^[0-9a-f]{40}$/, "Set EXPECTED_COMMIT to the deployed commit")
const policy = JSON.parse(fs.readFileSync(path.join(site, "publishing/assets.json"), "utf8"))
const plan = scan(path.join(site, "content"), policy, matter)
const published = plan.articles.filter((a) => !a.draft)
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex")
const retries = []

async function get(name) {
  const url = new URL(encodeURI(name), base)
  url.searchParams.set("release", commit.slice(0, 12))
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(25000),
      })
      const bytes = Buffer.from(await response.arrayBuffer())
      if (![429, 500, 502, 503, 504].includes(response.status)) {
        if (attempt) retries.push({ path: name, attempts: attempt + 1, status: response.status })
        return { status: response.status, bytes }
      }
      if (attempt === 4) throw new Error(`${name}: HTTP ${response.status}`)
    } catch (error) {
      if (attempt === 4) throw error
    }
    await new Promise((resolve) => setTimeout(resolve, Math.min(1000 * 2 ** attempt, 4000)))
  }
}
async function parallel(items, fn) {
  let cursor = 0
  const results = new Array(items.length)
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (cursor < items.length) {
        const i = cursor++
        results[i] = await fn(items[i])
      }
    }),
  )
  return results
}
const text = (response) => response.bytes.toString("utf8")
const decodeXml = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"')
const normalizeUrl = (value) => {
  const url = new URL(decodeXml(value), base)
  assert.equal(url.origin, new URL(base).origin, "Unexpected origin")
  const pathname = decodeURIComponent(url.pathname),
    prefix = new URL(base).pathname
  assert(pathname.startsWith(prefix), "Missing site prefix: " + value)
  const relative = pathname
    .slice(prefix.length)
    .replace(/\.html$/, "")
    .replace(/\/$/, "")
  return relative.replace(/\/index$/, "") || "index"
}
const canonical = (name) => name.replace(/\/index$/, "") || "index"

const releaseResponse = await get("static/release.json")
assert.equal(releaseResponse.status, 200)
const release = JSON.parse(text(releaseResponse))
assert.equal(release.commit, commit)
assert.equal(release.quartz, "5.0.0")
assert.equal(release.branch, "codex/quartz5")
const indexResponse = await get("static/contentIndex.json")
assert.equal(indexResponse.status, 200)
const index = JSON.parse(text(indexResponse))
assert.deepEqual(
  Object.keys(index).sort(),
  published.map((a) => a.slug).sort(),
  "Published article inventory mismatch",
)
const sitemapResponse = await get("sitemap.xml")
assert.equal(sitemapResponse.status, 200)
const sitemap = [...text(sitemapResponse).matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((m) => normalizeUrl(m[1]))
  .sort()
assert.deepEqual(sitemap, published.map((a) => canonical(a.slug)).sort(), "Sitemap mismatch")
const rssResponse = await get("index.xml")
assert.equal(rssResponse.status, 200)
const rssItems = [...text(rssResponse).matchAll(/<item>([\s\S]*?)<\/item>/g)]
const allowedRss = new Set(published.map((a) => canonical(a.slug)))
for (const [, item] of rssItems) {
  const link = item.match(/<link>(.*?)<\/link>/)?.[1]
  assert(link && allowedRss.has(normalizeUrl(link)), "RSS contains an unapproved article")
}

const articles = await parallel(plan.articles, async (article) => {
  const oldHtml = await get(article.legacySlug + ".html")
  const oldClean = await get(article.legacySlug === "index" ? "" : article.legacySlug)
  const expected = article.draft ? 404 : 200
  assert.equal(oldHtml.status, expected, article.path + " old HTML")
  assert.equal(oldClean.status, expected, article.path + " old clean URL")
  const current = await get(article.slug + ".html")
  let navigationOnly = false
  if (article.draft && current.status === 200) {
    assert.match(text(current), /<body[^>]*data-publication-kind="navigation"/, article.path)
    navigationOnly = true
  } else assert.equal(current.status, expected, article.path + " current URL")
  if (!article.draft) {
    const clean = await get(article.slug === "index" ? "" : article.slug)
    assert.equal(clean.status, 200, article.path + " current clean URL")
    assert(text(current).includes(`data-slug="${article.slug}"`), article.path + " wrong page")
    if (article.legacySlug !== article.slug) {
      for (const response of [oldHtml, oldClean]) {
        const href = text(response).match(/http-equiv="refresh" content="0; url=([^"\n]+)"/)?.[1]
        assert(href, article.path + " missing legacy redirect")
        const target = new URL(
          decodeXml(href),
          new URL(encodeURI(article.legacySlug) + ".html", base),
        ).href
        assert.equal(
          normalizeUrl(target),
          canonical(article.slug),
          article.path + " wrong redirect",
        )
        assert(text(response).includes('name="robots" content="noindex"'))
      }
    }
  }
  return {
    ...article,
    oldHtml: oldHtml.status,
    oldClean: oldClean.status,
    current: current.status,
    navigationOnly,
  }
})

const resources = await parallel([...plan.assets, ...plan.html], async (name) => {
  const expected = fs.readFileSync(path.join(site, "content", name))
  const current = await get(slug(name) + path.extname(name))
  assert.equal(current.status, 200, name)
  assert.equal(hash(current.bytes), hash(expected), name + " content mismatch")
  if (plan.assets.includes(name)) {
    const old = await get(v4Slug(name) + path.extname(name))
    assert.equal(old.status, 200, name + " legacy asset")
    assert.equal(hash(old.bytes), hash(expected), name + " legacy content mismatch")
  }
  return { path: name, status: current.status, sha256: hash(expected) }
})
const navigation = new Set()
for (const article of published) {
  const parts = path.dirname(article.path).split("/")
  for (let i = 1; i <= parts.length && parts[0] !== "."; i++)
    navigation.add(v4Slug(parts.slice(0, i).join("/") + "/index.md"))
  const raw = matter(fs.readFileSync(path.join(site, "content", article.path), "utf8"))
  for (const tag of raw.data.tags ?? []) {
    const segments = tag.split("/")
    for (let i = 1; i <= segments.length; i++)
      navigation.add(v4Slug("tags/" + segments.slice(0, i).join("/") + ".md"))
  }
}
await parallel([...navigation], async (name) => {
  for (const route of [name + ".html", name.endsWith("/index") ? name.slice(0, -5) : name])
    assert.equal((await get(route)).status, 200, name + " legacy navigation")
})
const course = published.find((a) => a.path.endsWith("CS6515 Graduate Algorithms.md"))
const coursePage = await get(course.slug + ".html")
const cards = [...text(coursePage).matchAll(/<a\b[^>]*data-standalone[^>]*>/g)]
assert.equal(cards.length, 6, "Bilingual card count")
for (const [tag] of cards) {
  const href = tag.match(/href="([^"]+)"/)?.[1]
  assert(href)
  assert(
    new URL(href, new URL(encodeURI(course.slug) + ".html", base)).href.startsWith(
      base + "interactive/cs6515/",
    ),
    "Card prefix",
  )
}
const result = {
  checkedAt: new Date().toISOString(),
  base,
  release,
  counts: {
    articles: plan.articles.length,
    published: published.length,
    drafts: plan.articles.length - published.length,
    html: plan.html.length,
    assets: plan.assets.length,
    oldNavigation: navigation.size,
    rssItems: rssItems.length,
  },
  indexAndSitemapMatch: true,
  rssApprovedOnly: true,
  cardPrefixCorrect: true,
  articles,
  resources,
  transientRetries: retries,
}
if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(result, null, 2) + "\n")
console.log(
  JSON.stringify({
    release,
    counts: result.counts,
    indexAndSitemapMatch: true,
    rssApprovedOnly: true,
    cardPrefixCorrect: true,
    retries: retries.length,
  }),
)
