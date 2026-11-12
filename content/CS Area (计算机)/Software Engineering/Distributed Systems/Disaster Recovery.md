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

## Objectives First

架构设计前应先由业务定义：

- [[Recovery Time Objective]]：最多允许多长时间恢复服务。
- [[Recovery Point Objective]]：最多允许损失多少时间范围的数据。

这些目标决定备份频率、复制方式、备用环境、故障切换自动化和成本。

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

- [AWS Well-Architected — Recovery objectives](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_objective_defined_recovery.html)

