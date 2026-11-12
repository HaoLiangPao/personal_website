---
title: Graceful Degradation
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Graceful Degradation 表示部分功能或依赖故障时，系统仍提供安全、明确且能力受限的服务，而不是让所有功能一起失败。

## Examples

- 推荐服务不可用时，核心账户功能继续运行。
- 历史报表不可用时，不影响订单处理。
- 通知暂时失败时，交易事实仍被可靠记录并稍后重试。
- 风险检查不可用时，不绕过检查；根据业务规则拒绝或接受为 Pending。

## Design Questions

- 哪些能力是核心路径，哪些可以降级？
- 降级结果是否会误导用户？
- 恢复后如何补偿、重放或 [[Reconciliation|对账]]？
- 降级状态如何通过 [[Observability]] 被发现？

## Connections

### Supports
- [[High Availability]]
- [[Reliability]]

### Mechanisms
- [[Circuit Breaker]]
- [[Reliable Asynchronous Processing]]

