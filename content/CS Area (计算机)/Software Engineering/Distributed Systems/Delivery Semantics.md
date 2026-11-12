---
title: Delivery Semantics
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Delivery Semantics 描述消息或请求在失败和重试条件下可能被传递多少次。

| 模型 | 可能丢失 | 可能重复 | 典型要求 |
| --- | --- | --- | --- |
| At-most-once | 是 | 否 | 不重试或先确认后处理 |
| At-least-once | 尽量避免 | 是 | 消费者必须幂等 |
| Exactly-once effect | 业务效果不重复 | 传递仍可能重复 | 应用层幂等、唯一约束和事务 |

“Exactly-once delivery”通常不能只靠消息中间件端到端实现。Worker 可能在更新数据库后、确认消息前崩溃，消息因此再次出现。

## Connections

### Implemented with
- [[Idempotency]]
- [[Atomic Operation]]
- [[Transaction Isolation]]

### Failure handling
- [[Retry]]
- [[Dead Letter Queue]]

### Implementations
- [[Amazon SQS]]
- [[Reliable Asynchronous Processing]]

