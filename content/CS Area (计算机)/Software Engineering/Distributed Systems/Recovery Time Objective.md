---
title: Recovery Time Objective
aliases:
  - RTO
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Recovery Time Objective（RTO）是服务中断到恢复之间可接受的最大时间。

RTO 是目标，不是历史平均值，也不是系统自动提供的保证。越短的 RTO 通常需要更成熟的备用环境、自动故障检测、流量切换和恢复演练。

## Example

若 RTO 为 30 分钟，灾难发生后服务应在最多 30 分钟内恢复到业务认可的状态。恢复基础设施但数据仍不可用，不代表已经满足 RTO。

## Connections

### Part of
- [[Disaster Recovery]]

### Paired with
- [[Recovery Point Objective]]

### Related
- [[High Availability]]

