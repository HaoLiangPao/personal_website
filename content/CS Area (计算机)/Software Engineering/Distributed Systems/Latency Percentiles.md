---
title: Latency Percentiles
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Latency Percentile 表示在给定样本集合和时间窗口内，一定比例的请求延迟不高于某个值。

- P50：约 50% 请求在该延迟以内，是中位数体验。
- P95：约 95% 请求在该延迟以内。
- P99：约 99% 请求在该延迟以内。

例如 P99=2 秒表示在相应统计窗口和计算方法下，大约 99% 的请求延迟不超过 2 秒。

## Why Not Only Average

少量非常慢的请求可能只轻微影响平均值，却会显著影响真实用户和依赖多个后端的页面。高百分位能帮助发现 [[Tail Latency|尾部延迟]]。

## Gotchas

- 必须注明统计窗口、请求范围和区域。
- 监控系统可能使用直方图 bucket 和插值估算百分位。
- 样本太少时 P99 可能只代表一个请求，统计意义有限。
- 不能对已经聚合的百分位再次做简单平均来得到全局百分位。

## Connections

### Signal in
- [[Observability]]

### Measures
- [[Tail Latency]]

## Sources

- [Google SRE — Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)

