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

## Key Terms

| 中文 | English | 含义 |
| --- | --- | --- |
| 恢复点目标 | RPO（Recovery Point Objective） | 故障时最大可接受的数据损失范围 |
| 最后可恢复点 | Last Recovery Point | 故障前最近一个能恢复的数据时间点 |
| 数据损失窗口 | Data Loss Window | 最后可恢复点到故障发生之间的时间 |
| 复制延迟 | Replication Lag | 异步复制中副本落后主副本的时间 |

## RPO on a Timeline

```mermaid
flowchart LR
    A["10:05 最近可恢复点"] -->|"数据损失窗口 5 分钟（RPO 衡量这一段）"| B["10:10 故障发生"]
```

## Example

系统在 10:10 故障，最近可恢复点是 10:05，则实际数据恢复点距离故障 5 分钟。如果目标 RPO 是 10 分钟，这次恢复满足目标。

RPO=0 是非常严格的目标。异步复制存在 replication lag，不能仅凭“部署了第二个区域”就声称零数据丢失。即使是 multi-site active/active，数据损坏仍可能需要依赖备份来恢复，这时恢复点通常也不为零。

## RPO vs RTO

- RPO 关心“丢多少数据”，决定备份频率和复制方式。
- [[Recovery Time Objective|RTO]] 关心“停多久”，决定备用环境和切换方式。
- 二者都由业务定义，再用 [[Disaster Recovery|DR 策略]] 满足。

## Connections

### Part of
- [[Disaster Recovery]]

### Paired with
- [[Recovery Time Objective]]

### Related
- [[Durability]]
- [[Reconciliation]]

## Sources

- [AWS Well-Architected — Define recovery objectives](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_objective_defined_recovery.html)
- [AWS — Disaster recovery options in the cloud](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
