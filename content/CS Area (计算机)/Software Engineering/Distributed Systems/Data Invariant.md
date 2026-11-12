---
title: Data Invariant
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Data Invariant（数据不变量）是在所有合法系统状态中都必须成立的业务规则。

示例：

- 可用购买力不能因并发预留而小于允许下限。
- 同一个 execution ID 不能让持仓重复增加。
- 已取消订单不能重新进入已提交状态，除非业务状态机明确允许。

## Why It Matters

技术选型应从不变量开始，而不是先选择数据库、队列或 Kubernetes。系统可以暂时延迟展示，但不能破坏核心资金和订单规则。

## Enforcement

- 单行或单 Item 条件：[[Atomic Operation]]
- 并发修改：[[Concurrency Control]]、[[Optimistic Locking]]
- 跨记录更新：[[Transaction Isolation]]
- 重试和重复消息：[[Idempotency]]
- 跨服务最终校验：[[Reconciliation]]

## Connections

### Related concepts
- [[Consistency]]
- [[Reliability]]

### Case study
- [[Order Processing Consistency Case Study]]

