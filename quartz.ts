import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { StandaloneHtmlLinks } from "./publishing/standalone-html"
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
