---
title: Dead Letter Queue
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Dead Letter Queue（DLQ）用于隔离经过规定处理尝试后仍无法成功消费的消息。

DLQ 不是 Worker 失败后的固定“下一站”，也不代表问题已经解决。消息何时进入 DLQ 取决于具体队列的 redrive、receive count、visibility timeout 和消费者行为。

## Operational Workflow

1. 对 DLQ 消息数量和增长速率告警。
2. 区分暂时故障、代码缺陷和永久性坏数据。
3. 修复根因。
4. 在满足 [[Idempotency|幂等性]] 的前提下安全重放。
5. 通过 [[Reconciliation|对账]] 确认没有遗漏或重复效果。

## Gotchas

- 不应把 DLQ 当作长期存储。
- 无限制重放会重新制造故障。
- 批处理消费者需要避免一个 poison message 让已成功消息反复处理。

## Connections

### Failure handling
- [[Retry]]
- [[Delivery Semantics]]

### Implementations
- [[Amazon SQS]]
- [[Reliable Asynchronous Processing]]

