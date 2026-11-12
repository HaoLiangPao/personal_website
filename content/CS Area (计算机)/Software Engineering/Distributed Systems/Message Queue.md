---
title: Message Queue
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Message Queue 在生产者和消费者之间持久或暂时保存消息，让请求接收与实际处理解耦。

## What It Provides

- 吸收短时间流量峰值。
- 让生产者不必等待后台任务完成。
- 隔离消费者的暂时故障。
- 独立控制生产与消费速率。

## What It Does Not Guarantee Automatically

- 业务效果只发生一次。
- 所有消息严格有序。
- 消费者永远不会收到重复消息。
- 下游系统不会被过高的 Worker 并发压垮。

队列积压是一种 Backpressure 信号。扩容消费者之前，应确认数据库和外部 API 的容量。

## Connections

### Reliability mechanisms
- [[Delivery Semantics]]
- [[Idempotency]]
- [[Retry]]
- [[Dead Letter Queue]]

### Implementation
- [[Amazon SQS]]

### Pattern
- [[Reliable Asynchronous Processing]]

