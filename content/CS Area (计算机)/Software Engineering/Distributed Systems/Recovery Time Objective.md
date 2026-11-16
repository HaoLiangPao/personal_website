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

## Key Terms

| 中文 | English | 含义 |
| --- | --- | --- |
| 恢复时间目标 | RTO（Recovery Time Objective） | 服务中断到恢复之间可接受的最长时间 |
| 故障切换 | Failover | 切换到备用环境 |
| 备用环境 | Standby Environment | 为恢复准备的另一套环境 |
| 恢复演练 | Recovery Drill | 定期演练恢复流程以验证目标 |

## RTO on a Timeline

```mermaid
flowchart LR
    A["故障发生"] -->|"服务中断时间（RTO 衡量这一段）"| B["服务恢复到业务认可的状态"]
```

## Example

若 RTO 为 30 分钟，灾难发生后服务应在最多 30 分钟内恢复到业务认可的状态。恢复基础设施但数据仍不可用，不代表已经满足 RTO。

## RTO and DR Strategy

RTO 决定可以选用哪种 [[Disaster Recovery|DR 策略]]：backup and restore 的 RTO 较高，pilot light 和 warm standby 逐步缩短，multi-site active/active 可以把恢复时间降到接近零，但成本和复杂度也最高。

## Connections

### Part of
- [[Disaster Recovery]]

### Paired with
- [[Recovery Point Objective]]

### Related
- [[High Availability]]

## Sources

- [AWS Well-Architected — Define recovery objectives](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_objective_defined_recovery.html)
- [AWS — Disaster recovery options in the cloud](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
