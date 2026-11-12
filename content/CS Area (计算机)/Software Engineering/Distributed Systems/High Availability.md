---
title: High Availability
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

High Availability（HA）表示系统在已定义的组件故障和运行条件下，仍能满足可用性目标。它不是“永不失败”，而是通过冗余、故障隔离和恢复把停机控制在预算内。

## Availability Budget

按 365 天计算的理论年度停机预算：

| Availability | Approximate downtime |
| --- | --- |
| 99% | 3 天 15 小时 36 分钟 |
| 99.9% | 8 小时 45 分钟 36 秒 |
| 99.95% | 4 小时 22 分钟 48 秒 |
| 99.99% | 52 分钟 34 秒 |
| 99.999% | 5 分钟 15 秒 |

这些只是数学预算，不代表任何云服务的 SLA。

## Design Checklist

- 明确服务边界、SLO、延迟和一致性需求。
- 消除关键单点故障。
- 在适当边界使用无状态服务和水平扩展。
- 为数据库设计复制、故障切换、备份和恢复验证。
- 对下游调用设置 timeout、有限 [[Retry|重试]] 和 [[Circuit Breaker]]。
- 使用 [[Graceful Degradation]] 隔离非关键功能。
- 通过负载测试和故障演练验证，而不是只依赖架构图。

## Connections

### Distinguished from
- [[Reliability]]
- [[Scalability]]
- [[Durability]]

### Recovery
- [[Disaster Recovery]]

### Operations
- [[Observability]]

