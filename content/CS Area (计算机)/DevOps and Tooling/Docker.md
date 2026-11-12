---
title: Docker
tags:
  - CS
  - DevOps
type: concept
source: reading
Status: growing
draft: true
---

## Definition

Docker 提供构建、分发和运行容器镜像的工具与运行时。

## Docker Compose

Docker Compose 用声明式文件在单个环境中定义多个相互依赖的容器服务，适合本地开发和规模较小的单主机场景。

同一个 Compose network 中的服务通常可以使用 service name 进行 DNS 解析，例如 reverse proxy 通过 `app:8000` 访问应用容器。

Compose 负责启动和连接容器，但不自动提供跨节点调度、复杂故障恢复或多主机平台治理。

## Connections

### Broader concept
- [[Containerization]]

### Orchestration alternatives
- [[Amazon ECS]]
- [[Kubernetes]]

### Deployment
- [[Rolling Deployment]]
- [[Blue-Green Deployment]]
