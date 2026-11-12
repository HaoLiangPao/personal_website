---
title: Blue-Green Deployment
tags:
  - CS
  - DevOps
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Blue-Green Deployment 同时维护当前生产环境和完整的新版本环境，在新环境验证完成后切换生产流量。

## Strengths

- 流量切换和应用回滚相对直接。
- 可以在切换前对新环境运行验证。
- 新旧应用环境彼此隔离。

## Trade-offs

- 需要同时维护两套容量。
- 数据库和外部副作用通常由两套环境共享，不能只靠切回流量完成回滚。
- 长连接、后台任务和缓存需要明确切换策略。

## Connections

### Compared with
- [[Canary Deployment]]
- [[Rolling Deployment]]

### Platforms
- [[Amazon ECS]]
- [[AWS Lambda]]

### Supports
- [[Reliability]]

