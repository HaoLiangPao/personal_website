---
title: Idempotency
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Idempotency（幂等性）表示同一个业务操作重复执行时，不会重复产生业务副作用。

## API Example

客户端为创建订单请求提供唯一 Idempotency Key。服务端需要原子地建立 Key、请求参数与业务结果的关联：

- 第一次请求创建订单并保存结果。
- 相同 Key、相同参数的重试返回原结果。
- 相同 Key、不同参数应拒绝或明确报告冲突。

只做“先查询 Key 是否存在，再写入”仍可能被两个并发请求同时穿透，应使用唯一约束、条件写入或事务。

## Consumer Example

消息消费者可以使用唯一 event ID 或 execution ID 记录已处理事件。Worker 在更新业务状态时，需要让“记录已处理”和“产生业务效果”保持原子一致。

## Connections

### Required by
- [[Delivery Semantics]]
- [[Retry]]
- [[Reliable Asynchronous Processing]]

### Enforced with
- [[Atomic Operation]]
- [[Transactional Outbox]]

### Case study
- [[Order Processing Consistency Case Study]]

