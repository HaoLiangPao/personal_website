---
title: Concurrency Control
tags:
  - CS
  - Distributed-Systems
  - Database
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Concurrency Control 负责协调同时发生的操作，使最终结果仍满足 [[Data Invariant|业务不变量]]。

## Common Problems

- **Lost update**：后提交的写入覆盖了先前结果。
- **TOCTOU**：检查条件和实际使用之间，状态已经改变。
- **Write skew**：两个事务分别看到合法状态，组合结果却破坏跨记录约束。
- **Duplicate effects**：同一业务操作因重试被执行多次。

## Common Techniques

- [[Atomic Operation|原子条件更新]]
- [[Optimistic Locking|版本号和条件写入]]
- 行锁或显式悲观锁
- 唯一约束
- 数据库事务与合适的 [[Transaction Isolation|隔离级别]]
- [[Idempotency|幂等处理]]

## Gotchas

请求在网络上同时到达并不是问题本身；问题是系统是否允许它们基于互相过期的状态同时提交。

## Connections

### Broader concepts
- [[Consistency]]
- [[Data Invariant]]

### Implementations
- [[Amazon DynamoDB]]
- [[Database]]

### Case study
- [[Order Processing Consistency Case Study]]

