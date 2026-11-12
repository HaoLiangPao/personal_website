---
title: Best AI Practice
tags:
  - LLM
  - Agent
draft: true
---

和 AI 团队一起做产品的方法，从实际项目中总结。先读 [[合作方式经验]]。

## Agents

放进 `.claude/agents/`（全局或项目级）即可使用。`title` 和 `draft` 是网站字段，可以删掉。

| 角色 | 文件 | 模型 | 什么时候用 | 实战情况 |
| ---- | ---- | ---- | ---------- | -------- |
| 主驾驶 / 创始人 | [[founder\|founder]] | 最强可用 | 放进 CLAUDE.md，不作为子代理 | 规则来自实战，本文件是提炼版 |
| CTO | [[cto\|cto]] | Opus | 架构、选型、数据模型 | 角色用过，本文件是提炼版 |
| 工程师 | [[engineer\|engineer]] | Sonnet | 按 spec 实现 | 角色用过，本文件是提炼版 |
| QA | [[qa\|qa]] | Sonnet | 独立验证，Go/No-Go | 角色用过，本文件是提炼版 |
| 实习生 | [[intern\|intern]] | Haiku | 机械转换 | 角色用过，本文件是提炼版 |
| 代码审核 | [[code-guardian\|code-guardian]] | 继承 | 提交前审核 | 现有文件原样复制，实测一次 |

## Skills

放进 `.claude/skills/<name>/SKILL.md`。

| 类别 | Skill | 用途 | 来源 |
| ---- | ----- | ---- | ---- |
| 规划与决策 | `design-doc` | 写设计文档、ADR、报告 | 现有 skill 去项目化 |
| 规划与决策 | `decision-ledger` | 唯一台账、批量裁决 | 从做法新提炼 |
| 派活与验收 | `subagent-spec` | 写任务书 | 从做法新提炼 |
| 派活与验收 | `ship-check` | 验收和上线关卡 | 现有 skill 去项目化 |
| 测试与观测 | `synthetic-pilot` | persona 代理试用 | 从做法新提炼 |
| 交接与收尾 | `round-closeout` | 收尾、交接、汇报 | 从做法新提炼 |
| 理解代码 | `understand` | 为陌生代码库生成文档 | 现有 skill 原样复制 |

「新提炼」的 skill 和所有角色文件还没有以这种形式实际运行过，第一次用时要留意。
