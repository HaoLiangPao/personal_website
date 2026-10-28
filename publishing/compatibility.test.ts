import test from "node:test"
import assert from "node:assert/strict"
import { StrictDrafts } from "./compatibility"
import type { BuildCtx } from "../quartz/util/ctx"
import type { ProcessedContent } from "../quartz/plugins/vfile"

test("the actual v5 filter requires explicit boolean false", () => {
  const filter = StrictDrafts()
  const ctx = {} as BuildCtx
  for (const draft of [undefined, null, true, "true", "false", 0]) {
    const content = [
      { type: "root", children: [] },
      { data: { frontmatter: { draft } } },
    ] as unknown as ProcessedContent
    assert.equal(filter.shouldPublish(ctx, content), false)
  }
  const published = [
    { type: "root", children: [] },
    { data: { frontmatter: { draft: false } } },
  ] as unknown as ProcessedContent
  assert.equal(filter.shouldPublish(ctx, published), true)
})
