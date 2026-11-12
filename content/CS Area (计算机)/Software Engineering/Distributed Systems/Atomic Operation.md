---
title: Atomic Operation
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

Atomic Operation 对外表现为不可再分割的单个操作：它要么成功产生完整效果，要么不产生部分效果。

## Conditional Update

避免超额预留的关键不是先读取余额再更新，而是把条件和修改交给数据库作为同一个操作：

```sql
UPDATE accounts
SET available_cash = available_cash - 800,
    reserved_cash = reserved_cash + 800
WHERE account_id = 123
  AND available_cash >= 800;
```

通过 affected rows 判断预留是否成功。并发问题没有消失，而是由数据库的锁、MVCC 或冲突检测机制安全协调。

## Boundaries

- 单行原子操作不自动保护多行约束。
- 单个 DynamoDB Item 的条件更新不等于跨多个 Item 的事务。
- Atomicity 不等于 Isolation，也不等于 Serializability。
- 外部交易已经执行后，数据库事务无法把外部事实回滚。

## Connections

### Coordinated by
- [[Concurrency Control]]
- [[Transaction Isolation]]

### Used to enforce
- [[Data Invariant]]
- [[Idempotency]]

### Implementations
- [[Amazon DynamoDB]]
- [[Database]]

