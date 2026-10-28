import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { StandaloneHtmlLinks } from "./publishing/standalone-html"
import { supportFooterLinks } from "./publishing/support-footer"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes/dispatcher"
import {
  StrictDrafts,
  PublicationCompatibility,
  articleIndexOnly,
} from "./publishing/compatibility"

const config = await loadQuartzConfig()
config.plugins.filters = [StrictDrafts()]
config.plugins.transformers.push(StandaloneHtmlLinks())
config.plugins.emitters = config.plugins.emitters.map((emitter) =>
  emitter.name === "ContentIndex" ? articleIndexOnly(emitter) : emitter,
)
config.plugins.emitters.push(PublicationCompatibility())
// Preview visits must not affect the production analytics property.
if (process.env.QUARTZ_LOCAL_PREVIEW === "1") config.configuration.analytics = null

export default config
export const layout = await loadQuartzLayout()
for (const pageLayout of [layout.defaults, ...Object.values(layout.byPageType)]) {
  if (pageLayout.footer) pageLayout.footer = pageLayout.footer.map(supportFooterLinks)
}
// The config loader captures its own layout before this export is evaluated.
// Recreate only that dispatcher so the rendered footer uses the local link attributes.
config.plugins.emitters = config.plugins.emitters.map((emitter) =>
  emitter.name === "PageTypeDispatcher" ? PageTypeDispatcher(layout) : emitter,
)
