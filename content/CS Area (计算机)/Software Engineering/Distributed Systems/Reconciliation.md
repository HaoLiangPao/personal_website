---
title: Reconciliation
tags:
  - CS
  - Distributed-Systems
  - Finance
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Reconciliation（对账）将系统当前状态与权威事实来源比较，发现遗漏、重复和不一致，并按明确流程修复。

## Why It Is Needed

重试、幂等和事务可以显著降低错误，但跨服务、跨系统和外部执行仍可能留下异常。金融系统尤其需要独立的对账作为最后一道正确性保障。

## Workflow

1. 选择权威来源，例如成交记录或资金账本。
2. 比较派生状态，例如当前持仓或报表。
3. 分类差异：延迟、重复、缺失、乱序或数据错误。
4. 安全重放或执行补偿操作。
5. 保存审计记录并验证结果。

## Connections

### Protects
- [[Consistency]]
- [[Reliability]]
- [[Durability]]

### Used after
- [[Dead Letter Queue]]
- [[Disaster Recovery]]

### Case study
- [[Order Processing Consistency Case Study]]

