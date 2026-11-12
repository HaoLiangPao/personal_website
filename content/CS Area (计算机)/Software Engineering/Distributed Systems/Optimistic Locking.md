---
title: Optimistic Locking
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

Optimistic Locking 假设冲突相对少见，不预先长期持有锁，而是在提交时检查读取后的数据是否被其他操作修改。

## Version Check

```sql
UPDATE orders
SET status = 'CANCELED', version = 6
WHERE order_id = 'ORD-1001'
  AND version = 5;
```

如果另一个 Worker 已把 version 从 5 更新为 6，本次操作会更新 0 行。调用者需要重新读取状态，再决定重试、拒绝或执行其他业务动作。

## Gotchas

- 它可以防止 Lost Update，但不自动保护跨多行不变量。
- 冲突频繁时，反复重试可能降低性能。
- 重试前必须重新验证业务条件，不能只机械重放旧写入。

## Connections

### Technique for
- [[Concurrency Control]]

### Related concepts
- [[Atomic Operation]]
- [[Transaction Isolation]]
- [[Retry]]

