---
title: Retry
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Retry 用于重新执行可能因暂时故障而失败的操作。

## Classify the Failure First

| 失败类型 | 示例 | 处理方向 |
| --- | --- | --- |
| Transient | 网络超时、临时 503 | 有上限重试 |
| Rate limiting | 429 | 尊重 Retry-After 并限速 |
| Permanent | 无效参数、非法状态转换 | 不盲目重试 |
| Ambiguous outcome | 请求可能成功但响应丢失 | 依赖幂等键和结果查询 |

## Rules

- 设置最大次数或总时间预算。
- 使用 [[Exponential Backoff and Jitter]]。
- 只在安全操作或具备 [[Idempotency|幂等性]] 时重试。
- 避免多个调用层同时独立重试，造成重试放大。
- 持续失败时进入明确的隔离和人工处理流程，而不是无限循环。

## Connections

### Safety
- [[Idempotency]]
- [[Delivery Semantics]]

### Failure isolation
- [[Dead Letter Queue]]
- [[Circuit Breaker]]

