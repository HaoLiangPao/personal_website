---
title: Consistency
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Consistency 描述多个读取者、写入者或服务在什么条件下能观察到彼此的更新。它不是一个单一开关；不同一致性模型提供不同保证。

## Common Models

- **Strong consistency**：读取遵守系统声明的最新写入可见性保证。
- **Eventual consistency**：如果没有新的更新并且系统能够正常通信，副本最终会收敛。
- **Read-your-writes**：客户端能够看到自己已经成功完成的写入。

业务应先定义 [[Data Invariant|数据不变量]]，再选择一致性模型。例如资金预留不能基于过期购买力，而非关键报表通常可以接受有界延迟。

## Gotchas

- “最终一致”不代表没有期限地不一致；需要定义延迟目标和恢复机制。
- 强一致不等于整个系统必须同步执行。
- 用户界面中的状态应区分 Pending、Confirmed 和 Failed，避免把暂时状态展示为最终事实。

## Connections

### Theory
- [[CAP Theorem]]
- [[Transaction Isolation]]

### Enforced by
- [[Atomic Operation]]
- [[Concurrency Control]]
- [[Idempotency]]

### Case studies
- [[Order Processing Consistency Case Study]]
- [[Reconciliation]]

