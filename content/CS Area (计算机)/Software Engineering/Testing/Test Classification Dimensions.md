---
title: Test Classification Dimensions
tags:
  - CS
  - Testing
type: concept
source: work
Status: growing
draft: true
---

## Definition

Test Classification Dimensions 指用多个彼此独立的维度描述一项测试，而不是把所有测试名称放进同一个互斥分类。最实用的三个维度是 **test scope、validation objective 和 execution tool**。

## Three Dimensions

| Dimension | 回答的问题 | Examples |
| --- | --- | --- |
| Test scope | 执行时跨过多少组件和边界？ | [[Unit Test]]、[[Integration Test]]、[[Contract Test]]、[[End-to-End Test]] |
| Validation objective | 这次运行想发现哪种退化或风险？ | correctness、regression、performance、security、reliability |
| Execution tool | 用什么运行、记录或分析？ | pytest、browser runner、load generator、LangSmith |

这三个维度可以自由组合。例如：

> “pytest 执行的 graph-level regression test，并把 trace 和评分记录到 LangSmith。”

这里 pytest 是 runner，regression 是目标，graph-level 是范围，LangSmith 是实验与 trace 平台。

## Why This Matters

如果把工具误当成测试层级，就容易产生虚假的二选一：

- “这是 pytest test，还是 LangSmith test？”
- “这是 E2E，还是 regression？”
- “这是 unit test，还是 benchmark？”

这些问题往往可以同时成立。真正需要避免的是：两个测试通过同一个入口读取同一个输出、执行同一个判断，却只因为工具不同而维护两份实现。

## A Precise Naming Pattern

讨论测试时，可以使用：

`[scope] + [objective] + [target] + [environment]`

例如：

- component-level correctness test for the reranker in CI
- API-level compatibility test against staging
- system-level latency benchmark under controlled load
- browser E2E regression test for the critical checkout path

这种描述比“我们有一个自动化测试”更能说明覆盖范围和缺口。

## Gotchas

- 文件名包含 `unit` 不代表它真的隔离、快速或确定。
- 调用真实 LLM、database 或 network 的单节点测试，通常已经是 component/integration test。
- 在 production-like environment 执行，不会自动让一项测试成为 E2E；仍要看它经过的实际边界。
- Regression 不是独立层级；任何稳定测试都可以进入 regression suite。

## Connections

### Organizes
- [[Test Pyramid]]
- [[Risk-Based Test Design]]

### Uses
- [[Test Oracle]]

