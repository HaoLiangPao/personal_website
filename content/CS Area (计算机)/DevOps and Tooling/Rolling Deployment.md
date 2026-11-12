---
title: Rolling Deployment
tags:
  - CS
  - DevOps
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Rolling Deployment 分批启动新版本实例，并在新实例通过 readiness 检查后逐步停止旧版本实例。

## Requirements

- 足够的额外容量运行新旧实例。
- 正确的 readiness、liveness 和 startup checks。
- 应用与数据库变更保持向前、向后兼容。
- 连接 draining 和合理的 shutdown grace period。
- 发布期间监控错误率、[[Latency Percentiles|延迟百分位]]和业务指标。

## Gotchas

- Rolling Deployment 不自动等于 zero downtime。
- Load balancer 或 Nginx 仍然在线，不代表后端一定能成功处理请求。
- 新旧版本会短暂并存，协议和数据格式必须兼容。
- 回滚应用代码可能无法回滚已经执行的数据库迁移。

## Connections

### Compared with
- [[Canary Deployment]]
- [[Blue-Green Deployment]]

### Platforms
- [[Kubernetes]]
- [[Amazon ECS]]

### Supports
- [[High Availability]]

