---
title: Durability
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Durability 描述已经被系统确认持久化的数据，在进程、节点或基础设施故障后仍能保留的能力。

## Replication Is Not Backup

- Replication 可以提高可用性并降低单节点丢失风险。
- 错误删除、逻辑损坏和恶意操作也可能被复制。
- Backup 和 Point-in-Time Recovery 用于恢复历史状态。

因此，复制、备份、恢复演练和恢复后正确性验证解决的是不同问题。

## Connections

### Distinguished from
- [[High Availability]]
- [[Reliability]]

### Recovery
- [[Disaster Recovery]]
- [[Recovery Point Objective]]

### Data correctness
- [[Reconciliation]]

