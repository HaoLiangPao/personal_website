---
title: Scalability
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Scalability 描述系统在负载增长时，通过增加资源、改变架构或改善效率继续满足性能目标的能力。

## Dimensions

- **Vertical scaling**：提升单个节点资源。
- **Horizontal scaling**：增加服务实例或 Worker。
- **Elasticity**：按负载动态增减资源。
- **Backpressure**：当消费者达到容量时，控制生产速率或缓冲请求。

## Gotchas

- Highly scalable 不等于必须使用 [[Kubernetes]]。
- API 扩容不代表数据库、外部 API 和热点分区也能承受相同增长。
- 无限增加 Worker 可能把瓶颈转移到下游。
- 吞吐量很高的系统仍可能存在单点故障，因此 Scalability 不等于 [[High Availability]]。

## Connections

### Compared in
- [[AWS Compute Options]]

### Measured through
- [[Observability]]
- [[Latency Percentiles]]

### Related pattern
- [[Message Queue]]

