---
title: Order Processing Consistency Case Study
tags:
  - CS
  - Distributed-Systems
  - Finance
type: concept
source: reading
Status: growing
draft: false
---

## Scope

这是一个简化的证券订单案例，用于连接并发、一致性、事件处理和恢复概念，不代表任何公司的真实内部架构。

## Prevent Overspending

如果两个订单分别读取同一笔可用资金后再写回，可能同时通过检查。正确方向是使用 [[Atomic Operation|原子条件预留]]，让数据库在同一操作中判断余额并移动 available/reserved 金额。

当订单记录和资金预留跨多条记录时，还需要 [[Transaction Isolation|事务]]、唯一业务 ID 和 [[Idempotency|幂等性]]。

## Execution Succeeded but Position Update Failed

成交一旦被外部执行，就不能因为持仓服务失败而假设成交可以撤销：

```mermaid
flowchart LR
    A[Execution confirmed] --> B[(Durable execution fact)]
    B --> C[Message Queue]
    C --> D[Positions projection]
    D --> E[User-visible position]
```

- 成交记录是权威事实。
- 持仓是从成交事实生成的派生视图。
- 重复 execution ID 只能更新一次持仓。
- 服务恢复后处理积压，并通过 [[Reconciliation|对账]]发现遗漏或重复。

## Connections

### Correctness
- [[Data Invariant]]
- [[Consistency]]
- [[Concurrency Control]]

### Event processing
- [[Reliable Asynchronous Processing]]
- [[Delivery Semantics]]
- [[Transactional Outbox]]

### Implementations
- [[Amazon DynamoDB]]
- [[Amazon SQS]]

