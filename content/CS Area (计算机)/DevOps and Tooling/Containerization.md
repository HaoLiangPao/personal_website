---
title: Containerization
tags:
  - CS
  - DevOps
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Containerization 将应用及其运行时依赖打包成可重复部署的镜像，并通过隔离的容器进程运行。

容器解决的是打包和运行环境一致性；容器编排解决的是多个容器工作负载的部署、调度、扩缩容和恢复。

## Tools and Platforms

- [[Docker]]：构建和运行容器镜像。
- [[Podman]]：无守护进程的容器工具。
- [[Kubernetes]]：管理容器化工作负载的平台。
- [[Amazon ECS]]：AWS 容器编排服务。
- [[Amazon EKS]]：AWS 托管 Kubernetes。

## Connections

### Compared in
- [[AWS Compute Options]]

### Deployment
- [[Canary Deployment]]
- [[Rolling Deployment]]
- [[Blue-Green Deployment]]
