---
name: design-doc
description: 新建或更新设计文档、ADR、研究报告：选目录、取编号、填 frontmatter、重建索引、跑检查。要写 design doc、记录架构决策、写轮次报告或修改文档状态时使用。
draft: true
---

# 写一篇项目文档

本 skill 只管机械步骤，内容判断归主驾驶。

## 选目录

| 要写的东西 | 目录 | 起始 status |
| ---------- | ---- | ----------- |
| 我们要做什么：问题、方案、取舍 | `docs/design/` | `draft` |
| 我们为什么这么选：决策及代价 | `docs/decisions/` | `proposed` |
| 我们查到了什么：评审、模拟、轮次报告 | `docs/research/` | `review` |

## 编号和文件名
每个目录内各自递增，四位，不跨目录复用：`NNNN-kebab-case-slug.md`。

## frontmatter

```yaml
---
id: 0007
title: 一句话说清这篇在讲什么
status: proposed
author: 实际执笔的模型或人
created: YYYY-MM-DD
updated: YYYY-MM-DD
superseded_by:
related: [design/0003, ADR-0005]
tags: [infra]
---
```

合法 status：`draft` `proposed` `review` `accepted` `implemented` `superseded` `deprecated` `rejected`。

- 改动既有文档时同时更新 `updated`，并在文末 Changelog 加一行。
- AI 不得自行把决策转成 `accepted`，那是人类的裁决权。

## 内容要求
- design doc：**非目标**和**备选方案表**最值钱。
- ADR：必须写**付出的代价**和**什么情况下该重新考虑**。
- research：先结论后证据。跟进项进台账，报告只链接。

## 收尾
运行项目的索引生成和 frontmatter 校验脚本，都通过后再 commit。索引是生成物，不要手改。

## 作废文档
不删除，不改写历史。改成 `status: superseded`，填 `superseded_by`，在新文档回链，并在旧文 Changelog 写明原因。
