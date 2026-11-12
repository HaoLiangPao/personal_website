---
title: Kubernetes
aliases:
  - K8s
tags:
  - CS
  - DevOps
  - Kubernetes
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Kubernetes 是用于管理容器化工作负载和服务的可移植、可扩展开源平台，提供声明式配置和自动化控制循环。

## Core Responsibilities

- 调度 Pod 到 Node。
- 通过 Deployment 等控制器维持期望状态。
- Service discovery 和 load balancing。
- Rollout、rollback 和自愈。
- 资源约束、自动扩缩容和配置管理。

## When to Consider It

是否使用 Kubernetes 没有固定用户数、QPS 或微服务数量门槛。更重要的问题是：

- 是否需要统一的容器平台和 Kubernetes API？
- 多团队是否需要共同的部署、策略和权限模型？
- 是否有复杂调度、流量控制或扩展需求？
- 团队是否能承担集群、Add-on、升级和故障处理复杂度？

如果 [[AWS Lambda]] 或 [[Amazon ECS]] 已满足可靠性、成本和开发效率，不需要仅因为流量增长就迁移 Kubernetes。

## What It Does Not Provide Automatically

- 应用级 [[Consistency]] 和 [[Idempotency]]。
- 数据库高可用与备份。
- 完整的 logging、tracing 和 alerting 方案。
- 正确的容量模型和下游保护。

## Connections

### AWS implementation
- [[Amazon EKS]]

### Broader concept
- [[Containerization]]

### Deployment
- [[Canary Deployment]]
- [[Rolling Deployment]]
- [[Blue-Green Deployment]]

### Compared in
- [[AWS Compute Options]]

## Sources

- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/index.html)
- [Kubernetes Overview](https://kubernetes.io/docs/concepts/overview/)
