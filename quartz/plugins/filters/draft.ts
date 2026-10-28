import { QuartzFilterPlugin } from "../types"

// Publication requires an explicit Boolean false. Invalid/missing flags stay hidden.
export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    return vfile.data?.frontmatter?.draft === false
  },
})
