---
title: Recovery Point Objective
aliases:
  - RPO
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Recovery Point Objective（RPO）是故障发生时，从最后可恢复数据点计算的最大可接受数据损失范围，通常用时间表达。

## Example

系统在 10:10 故障，最近可恢复点是 10:05，则实际数据恢复点距离故障 5 分钟。如果目标 RPO 是 10 分钟，这次恢复满足目标。

RPO=0 是非常严格的目标。异步复制存在 replication lag，不能仅凭“部署了第二个区域”就声称零数据丢失。

## Connections

### Part of
- [[Disaster Recovery]]

### Paired with
- [[Recovery Time Objective]]

### Related
- [[Durability]]
- [[Reconciliation]]

