import fs from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import type {
  QuartzEmitterPlugin,
  QuartzFilterPlugin,
  QuartzEmitterPluginInstance,
} from "../quartz/plugins/types"
import type { FilePath } from "../quartz/util/path"
import { slugifyFilePath } from "../quartz/util/path"

const policyPath = path.resolve("publishing/assets.json")

export function v4Slug(file: string): string {
  return file
    .replace(/\.[^./]+$/, "")
    .split("/")
    .map((part) =>
      part
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/\?/g, "")
        .replace(/#/g, ""),
    )
    .join("/")
    .replace(/(^|\/)_index$/, "$1index")
}

export const StrictDrafts: QuartzFilterPlugin = () => ({
  name: "StrictDrafts",
  shouldPublish(_ctx, [_tree, file]) {
    return file.data.frontmatter?.draft === false
  },
})

const attr = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;")

// Built-in asset handling strips .html in v5. Copy only explicitly approved
// standalone pages, and keep exact v4 URLs for articles and attachments.
export const PublicationCompatibility: QuartzEmitterPlugin = () => ({
  name: "PublicationCompatibility",
  async *emit(ctx, content) {
    const policy = JSON.parse(await fs.readFile(policyPath, "utf8")) as {
      assets: string[]
      html_pages: Array<{ path: string; publish: boolean }>
    }
    for (const item of policy.html_pages.filter((item) => item.publish === true)) {
      const target = slugifyFilePath(item.path as FilePath, true) + ".html"
      const dest = path.join(ctx.argv.output, target)
      await fs.mkdir(path.dirname(dest), { recursive: true })
      await fs.copyFile(path.join(ctx.argv.directory, item.path), dest)
      yield dest as FilePath
    }
    for (const name of policy.assets) {
      const oldName = v4Slug(name) + path.extname(name)
      const newName = slugifyFilePath(name as FilePath)
      if (oldName === newName) continue
      const dest = path.join(ctx.argv.output, oldName)
      await fs.mkdir(path.dirname(dest), { recursive: true })
      await fs.copyFile(path.join(ctx.argv.directory, name), dest)
      yield dest as FilePath
    }
    // A draft named like its folder can normalize to that folder's index in
    // v5. Mark generated navigation so verification distinguishes it from an
    // article; the original v4 draft URL must still be absent.
    for (const [_tree, file] of ctx.virtualPages) {
      if (!file.data.slug || file.data.frontmatter?.draft !== undefined) continue
      const dest = path.join(ctx.argv.output, file.data.slug + ".html")
      try {
        const html = await fs.readFile(dest, "utf8")
        await fs.writeFile(
          dest,
          html.replace(/<body(?=[ >])/, '<body data-publication-kind="navigation"'),
        )
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
      }
    }
    const extraRedirects = new Map<string, string>()
    for (const [_tree, file] of content) {
      if (!file.data.relativePath || file.data.frontmatter?.draft !== false) continue
      const parts = path.posix.dirname(file.data.relativePath).split("/")
      for (let i = 1; i <= parts.length; i++) {
        if (parts[0] === ".") break
        const folder = parts.slice(0, i).join("/") + "/index.md"
        extraRedirects.set(v4Slug(folder), slugifyFilePath(folder as FilePath, true))
      }
      const raw = matter(
        await fs.readFile(path.join(ctx.argv.directory, file.data.relativePath), "utf8"),
      )
      for (const tag of (raw.data.tags ?? []) as string[]) {
        const segments = tag.split("/")
        for (let i = 1; i <= segments.length; i++) {
          const tagPath = "tags/" + segments.slice(0, i).join("/") + ".md"
          extraRedirects.set(v4Slug(tagPath), slugifyFilePath(tagPath as FilePath, true))
        }
      }
    }
    for (const [oldSlug, newSlug] of extraRedirects) {
      if (oldSlug === newSlug || !existsSync(path.join(ctx.argv.output, newSlug + ".html")))
        continue
      const relative = encodeURI(
        path.posix.relative(path.posix.dirname(oldSlug), newSlug) + ".html",
      )
      const canonical = new URL(
        encodeURI(newSlug + ".html"),
        "https://" + ctx.cfg.configuration.baseUrl,
      ).href
      const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="${attr(canonical)}"><meta http-equiv="refresh" content="0; url=${attr(relative)}"><title>Page moved</title></head><body><a href="${attr(relative)}">Continue to this page</a></body></html>`
      const dest = path.join(ctx.argv.output, oldSlug + ".html")
      await fs.mkdir(path.dirname(dest), { recursive: true })
      await fs.writeFile(dest, html)
      yield dest as FilePath
    }
    for (const [_tree, file] of content) {
      if (!file.data.relativePath || !file.data.slug || file.data.frontmatter?.draft !== false)
        continue
      const oldSlug = v4Slug(file.data.relativePath)
      const newSlug = file.data.slug
      if (oldSlug === newSlug) continue
      const relative = encodeURI(
        path.posix.relative(path.posix.dirname(oldSlug), newSlug) + ".html",
      )
      const canonical = new URL(
        encodeURI(newSlug + ".html"),
        "https://" + ctx.cfg.configuration.baseUrl,
      ).href
      const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="${attr(canonical)}"><meta http-equiv="refresh" content="0; url=${attr(relative)}"><title>Page moved</title></head><body><a href="${attr(relative)}">Continue to this page</a></body></html>`
      const dest = path.join(ctx.argv.output, oldSlug + ".html")
      await fs.mkdir(path.dirname(dest), { recursive: true })
      await fs.writeFile(dest, html)
      yield dest as FilePath
    }
  },
})

// v5 adds virtual folder/tag pages to the shared content array. Keep the article
// search index, sitemap and RSS aligned with the reviewed Markdown inventory.
export function articleIndexOnly(
  emitter: QuartzEmitterPluginInstance,
): QuartzEmitterPluginInstance {
  return {
    ...emitter,
    partialEmit: undefined,
    emit(ctx, content, resources) {
      const articles = content.filter(
        ([_tree, file]) =>
          file.data.frontmatter?.draft === false &&
          file.data.relativePath &&
          existsSync(path.join(ctx.argv.directory, file.data.relativePath)),
      )
      return emitter.emit(ctx, articles, resources)
    },
  }
}
