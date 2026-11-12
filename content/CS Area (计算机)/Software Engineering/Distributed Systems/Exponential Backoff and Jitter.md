---
title: Exponential Backoff and Jitter
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Exponential Backoff 让连续重试之间的等待时间逐步增加；Jitter 在等待时间中加入随机扰动，避免大量客户端同时重试。

示意：

```text
1s → 2s → 4s → 8s
```

实际实现通常还需要最大等待时间、最大尝试次数和随机化策略。

## Why Jitter Matters

如果大量 Worker 在相同时间失败并按完全相同的间隔重试，它们会同时再次冲击下游，形成 Thundering Herd。随机扰动可以把请求分散到不同时间。

## Gotchas

- Backoff 不能代替限流和容量管理。
- 长时间重试会增加用户可见延迟，必须有总时间预算。
- 对非幂等操作重试可能产生重复副作用。

## Connections

### Technique for
- [[Retry]]

### Protected by
- [[Idempotency]]

### Related mechanisms
- [[Circuit Breaker]]
- [[Dead Letter Queue]]

## Sources

- [AWS SDK retry behavior](https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html)

