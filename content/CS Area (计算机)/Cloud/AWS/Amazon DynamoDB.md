---
title: Amazon DynamoDB
tags:
  - CS
  - AWS
  - Database
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Amazon DynamoDB 是 AWS 托管的分布式 NoSQL 数据库，使用 partition key 和可选 sort key 组织 Item，并提供条件写入和事务能力。

## Conditional Write

单个 Item 的 `UpdateItem` 可以同时检查条件并执行修改：

```python
table.update_item(
    Key={"accountId": "123"},
    UpdateExpression="SET availableCash = availableCash - :amount",
    ConditionExpression="availableCash >= :amount",
    ExpressionAttributeValues={":amount": 800},
)
```

条件判断和更新由 DynamoDB 作为一个原子操作协调，因此适合实现单 Item 上的 [[Data Invariant|不变量]]。

## Transactions

`TransactWriteItems` 可以把最多 100 个跨表或同表动作组成 all-or-nothing 事务，但动作必须在同一个 AWS account 和 Region 中。

事务本身仍需考虑冲突、超时和 [[Idempotency|幂等重试]]。

## Streams

DynamoDB Streams 可以把 Item 变化交给下游消费者。事务修改产生的 stream records 可能在不同时间出现，并与其他事务记录交错；消费者不能假设整个事务在 Stream 中原子或全局有序可见。

## Scaling Risks

- Partition key 设计不均可能形成 Hot Partition。
- 增加 Worker 并发可能导致 throttling。
- 全局表和跨区域写入需要单独分析冲突、一致性和 [[Recovery Point Objective|RPO]]。

## Connections

### Correctness
- [[Atomic Operation]]
- [[Concurrency Control]]
- [[Transaction Isolation]]

### Patterns
- [[Transactional Outbox]]
- [[Reliable Asynchronous Processing]]

### Case study
- [[Order Processing Consistency Case Study]]

## Sources

- [DynamoDB read and write operations](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/read-write-operations.html)
- [DynamoDB transactions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html)

