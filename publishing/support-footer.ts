import { cloneElement, isValidElement, toChildArray } from "preact"
import type { ComponentChild, VNode } from "preact"
import type { QuartzComponent } from "../quartz/components/types"

// Keep the configured footer and its resources; only the support link opens a new tab.
function supportLinksInNewTab(child: ComponentChild): ComponentChild {
  if (!isValidElement(child)) return child
  const element = child as VNode<Record<string, unknown>>
  const href = element.props.href
  const support =
    element.type === "a" &&
    typeof href === "string" &&
    href.startsWith("https://buymeacoffee.com/chinahao?")
  return cloneElement(element, {
    ...(support
      ? { target: "_blank", rel: "noopener", id: "support-footer", "data-router-ignore": true }
      : {}),
    children: toChildArray(element.props.children as ComponentChild[]).map(supportLinksInNewTab),
  })
}

export function supportFooterLinks(Footer: QuartzComponent): QuartzComponent {
  const SupportFooter: QuartzComponent = (props) => supportLinksInNewTab(Footer(props))
  return Object.assign(SupportFooter, Footer)
}
