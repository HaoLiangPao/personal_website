---
title: Observability
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Observability（可观测性）是根据系统输出理解其内部状态和故障原因的能力。

## Signals

- **Metrics**：聚合的数值和分布，例如错误率、队列积压和延迟。
- **Logs**：带时间、上下文和 request ID 的离散事件。
- **Traces**：展示请求跨服务传播和每个阶段耗时。

仅拥有日志不等于具备完整的 Distributed Tracing。跨服务追踪需要传播 Trace Context，并在采集和查询系统中关联。

## Useful Measurements

- Error Rate
- Throughput
- [[Latency Percentiles]]
- Queue backlog 与 oldest message age
- Throttling、dependency failures 和 DLQ messages
- 业务成功率，而不只是 CPU 和 Memory

## Connections

### Measures
- [[Tail Latency]]
- [[Scalability]]
- [[Reliability]]

### Used by
- [[High Availability]]
- [[Reliable Asynchronous Processing]]

### Implementations
- [[Amazon SQS]]
- [[AWS Lambda]]

