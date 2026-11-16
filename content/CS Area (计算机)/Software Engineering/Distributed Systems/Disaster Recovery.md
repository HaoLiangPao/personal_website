---
title: Disaster Recovery
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Disaster Recovery（DR）是工作负载在严重基础设施、区域或数据故障后恢复服务和数据的计划与能力。

## Key Terms

| 中文 | English | 含义 |
| --- | --- | --- |
| 灾难恢复 | Disaster Recovery（DR） | 严重故障后恢复服务和数据的计划与能力 |
| 恢复时间目标 | RTO（Recovery Time Objective） | 最多允许多长时间恢复服务 |
| 恢复点目标 | RPO（Recovery Point Objective） | 最多允许损失多长时间范围的数据 |
| 备份与恢复 | Backup and Restore | 定期备份，灾难后重建 |
| 引导灯 | Pilot Light | 核心基础设施预先备好，应用服务器关闭 |
| 暖备 | Warm Standby | 缩小规模但功能完整、始终运行的副本 |
| 多站点双活 | Multi-Site Active/Active | 多个区域同时接收流量 |
| 故障切换 | Failover | 切换到备用环境 |
| 数据面 / 控制面 | Data Plane / Control Plane | 提供实时服务的部分 / 用于配置环境的部分 |

## Strategy Spectrum

```mermaid
flowchart LR
    A["Backup and restore<br/>成本低，RTO/RPO 高"] --> B[Pilot light] --> C[Warm standby] --> D["Multi-site active/active<br/>成本高，恢复时间接近零"]
```

## Objectives First

架构设计前应先由业务定义：

- [[Recovery Time Objective]]：最多允许多长时间恢复服务。
- [[Recovery Point Objective]]：最多允许损失多少时间范围的数据。

这些目标决定备份频率、复制方式、备用环境、故障切换自动化和成本。

## Four DR Strategies

AWS 把 DR 策略放在一条从“低成本、恢复慢”到“高成本、恢复快”的谱系上：

| 策略 | 做法 | 恢复特点 |
| --- | --- | --- |
| Backup and restore | 定期备份数据，灾难后在恢复区域重建环境并恢复数据 | 适合缓解数据丢失或损坏；RTO 和 RPO 较高 |
| Pilot light | 把数据复制到另一个区域，并预先配置核心基础设施；应用服务器已加载代码但处于“关闭”状态，故障切换时再开启 | 核心设施始终可用，能快速开出完整规模的生产环境；但没有额外操作前不能处理请求 |
| Warm standby | 在另一个区域保持一份缩小规模但功能完整、始终运行的生产环境副本 | 比 pilot light 恢复更快，可以立即以较低容量处理流量，也更容易持续测试 |
| Multi-site active/active | 工作负载同时在多个区域运行并接收流量 | 最复杂、最昂贵，恢复时间可降到接近零；但数据损坏仍需依赖备份，因此恢复点通常不为零 |

选择时，AWS 提示：只是丢失或中断一个数据中心，对设计良好的高可用工作负载来说可能只需 backup and restore；灾难范围扩大到整个区域，或受监管要求，才需要考虑后三种。故障切换时应尽量只用 data plane 操作，因为 data plane 的可用性设计目标通常高于 control plane。

## Multi-Region Trade-offs

Multi-region 不是默认答案。它会引入：

- 跨区域复制延迟。
- 冲突写入和脑裂风险。
- 重复处理与故障切换协调。
- 更高运行成本和演练复杂度。

异步复制通常不能自然保证 RPO=0。任何 DR 方案都需要定期演练和恢复后验证。

## Connections

### Objectives
- [[Recovery Time Objective]]
- [[Recovery Point Objective]]

### Related properties
- [[High Availability]]
- [[Durability]]
- [[Reconciliation]]

## Sources

- [AWS Well-Architected — Recovery objectives](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_objective_defined_recovery.html)
- [AWS — Disaster recovery options in the cloud](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
