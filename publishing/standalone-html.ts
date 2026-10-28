import { visit } from "unist-util-visit"
import type { QuartzTransformerPlugin } from "../quartz/plugins/types"

// Opt-in HTML links keep their extension and bypass Markdown popovers/graph edges.
// This runs after CrawlLinks, which otherwise strips .html from local links.
export const StandaloneHtmlLinks: QuartzTransformerPlugin = () => ({
  name: "StandaloneHtmlLinks",
  htmlPlugins() {
    return [
      () => (tree, file) => {
        const standalone = new Set<string>()
        visit(tree, "element", (node) => {
          const props = node.properties
          if (
            node.tagName !== "a" ||
            !props ||
            !(Object.hasOwn(props, "dataStandalone") || Object.hasOwn(props, "data-standalone")) ||
            typeof props.href !== "string"
          )
            return
          const href = props.href
          const url = new URL(href, "https://quartz.local/" + file.data.slug)
          standalone.add(decodeURIComponent(url.pathname.replace(/^\//, "")))
          const suffixAt = href.search(/[?#]/)
          const pathname = suffixAt < 0 ? href : href.slice(0, suffixAt)
          const suffix = suffixAt < 0 ? "" : href.slice(suffixAt)
          props.href = pathname.endsWith(".html") ? href : pathname + ".html" + suffix
          const classes: Array<string | number> = Array.isArray(props.className)
            ? props.className
            : []
          props.className = [...classes.filter((name) => name !== "internal"), "standalone-html"]
          delete props["data-slug"]
          delete props.dataSlug
        })
        file.data.links = (file.data.links ?? []).filter((link) => !standalone.has(link))
      },
    ]
  },
})
