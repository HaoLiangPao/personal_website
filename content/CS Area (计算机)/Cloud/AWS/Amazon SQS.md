---
title: Amazon SQS
tags:
  - CS
  - AWS
  - Messaging
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Amazon Simple Queue Service（SQS）是 AWS 托管的消息队列服务，用于解耦生产者和消费者、缓冲突发负载并隔离消费者暂时故障。

## Standard and FIFO

- Standard Queue 提供 at-least-once delivery，消息可能重复和乱序。
- FIFO Queue 提供 message group 内顺序和去重能力，但不能替代端到端 [[Idempotency|业务幂等]]。

## Visibility Timeout

消费者收到消息后，消息仍在队列中，但在 visibility timeout 内对其他消费者暂时不可见：

- 成功处理后删除消息。
- Worker 崩溃或未删除时，timeout 后消息重新可见。
- 因为 at-least-once 语义，不能假设 timeout 内绝对不会重复投递。

## Lambda Integration

[[AWS Lambda]] 使用 event source mapping 轮询 SQS，并以批次同步调用函数：

- 成功批次由 Lambda 删除消息。
- 默认情况下批次失败会让整个批次在 timeout 后重新可见。
- Partial batch response 可以只重试失败消息。
- 消费者必须能安全处理重复消息。

## DLQ

[[Dead Letter Queue]] 的转移由 redrive policy 和 `maxReceiveCount` 控制。它统计 receive count，而不是简单等价于“业务代码失败次数”。AWS 对 Lambda + SQS 建议 `maxReceiveCount` 至少为 5。

## Backpressure and Observability

重点监控：

- ApproximateNumberOfMessagesVisible
- ApproximateAgeOfOldestMessage
- Worker errors、throttles 和并发
- DLQ message count
- 下游数据库与 API 容量

盲目增加 Worker 并发可能把下游压垮。

## Connections

### Implements
- [[Message Queue]]
- [[Delivery Semantics]]
- [[Reliable Asynchronous Processing]]

### Failure handling
- [[Retry]]
- [[Dead Letter Queue]]

### Operations
- [[Observability]]

## Sources

- [Using Lambda with Amazon SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)
- [Handling errors for an SQS event source](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html)
- [SQS visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)

