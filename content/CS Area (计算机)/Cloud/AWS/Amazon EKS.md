---
title: Amazon EKS
tags:
  - CS
  - AWS
  - Kubernetes
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Amazon Elastic Kubernetes Service（EKS）是 AWS 托管的 [[Kubernetes]] 服务。AWS 管理托管控制面的可用性和生命周期，团队仍需设计工作负载、节点或 Fargate、网络、权限、升级和平台运维。

## When It Is a Fit

- 团队明确需要 Kubernetes API、生态或组织级开发平台。
- 多团队需要统一的部署、策略、服务发现和资源治理。
- 工作负载需要 Kubernetes 的调度和扩展模型。
- 团队已经具备足够的平台运维能力。

## What It Does Not Mean

- 使用 EKS 不会自动让应用高可用或可扩展。
- 没有固定用户数、QPS 或微服务数量门槛。
- 托管控制面不等于所有数据面、Add-on 和应用升级都由 AWS 负责。

## Connections

### Implements
- [[Kubernetes]]

### Compared in
- [[AWS Compute Options]]

### Related deployment
- [[Canary Deployment]]

