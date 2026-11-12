---
title: Distributed Systems
tags:
  - CS
  - Distributed-Systems
draft: false
---

分布式系统由多个通过网络协作的计算节点共同完成业务功能。知识重点不是“用了多少个服务”，而是如何处理网络、并发、重复、部分失败和数据一致性。

## Correctness

- [[Consistency]]
- [[CAP Theorem]]
- [[Data Invariant]]
- [[Concurrency Control]]
- [[Atomic Operation]]
- [[Optimistic Locking]]
- [[Transaction Isolation]]
- [[Idempotency]]

## Messaging and Failure Handling

- [[Message Queue]]
- [[Delivery Semantics]]
- [[Retry]]
- [[Exponential Backoff and Jitter]]
- [[Dead Letter Queue]]
- [[Transactional Outbox]]
- [[Reliable Asynchronous Processing]]
- [[Circuit Breaker]]

## Resilience

- [[High Availability]]
- [[Reliability]]
- [[Scalability]]
- [[Durability]]
- [[Graceful Degradation]]
- [[Disaster Recovery]]
- [[Recovery Time Objective]]
- [[Recovery Point Objective]]

## Performance and Operations

- [[Observability]]
- [[Latency Percentiles]]
- [[Tail Latency]]
- [[Caching]]
- [[Cache Invalidation]]

## Case Studies

- [[Order Processing Consistency Case Study]]
- [[Reconciliation]]

