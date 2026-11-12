---
title: Tail Latency
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Tail Latency 指延迟分布尾部少量、但显著慢于典型请求的情况。

## Why It Matters

- 在高请求量下，1% 仍可能代表大量用户。
- 一个前端请求若依赖多个后端，遇到至少一个慢调用的概率会增加。
- 排队、热点、重试和下游抖动会在高负载下放大尾延迟。

## Investigation

- 使用 [[Latency Percentiles]] 而不是只看平均值。
- 用 traces 找到耗时阶段。
- 将延迟与队列深度、GC、数据库连接、throttling 和下游错误关联。
- 确认统计窗口内是否有足够样本。

## Connections

### Measured by
- [[Latency Percentiles]]

### Diagnosed through
- [[Observability]]

### Related properties
- [[Scalability]]
- [[Reliability]]

