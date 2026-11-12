---
title: AWS Compute Options
tags:
  - CS
  - AWS
type: concept
source: reading
Status: growing
draft: false
---

## Purpose

AWS Compute Options 是一张工作负载选型地图。用户数、QPS 或服务数量都不是选择 Kubernetes 的固定门槛；应根据执行模型、运行时间、流量形态、隔离、可移植性、团队能力和成本选择。

| Dimension | [[AWS Lambda]] | [[Amazon ECS]] | [[Amazon EKS]] |
| --- | --- | --- | --- |
| Unit | Function invocation | Container task/service | Kubernetes workload |
| Best fit | 事件驱动、短时和突发任务 | 长时间运行的容器服务与 Worker | 需要 Kubernetes API 和平台生态的多工作负载环境 |
| Scaling | 按调用并发扩展 | Service Auto Scaling | HPA、KEDA 等 |
| Operations | 较低 | 低至中 | 中至高 |
| Portability | AWS 绑定较强 | 容器可移植，控制面 AWS 化 | Kubernetes API 相对可移植，但云集成仍有差异 |

## Decision Questions

- 工作是请求驱动、事件驱动还是长期运行？
- 是否可能超过单次执行时间限制或需要长连接？
- 是否已有成熟的 [[Kubernetes]] 平台能力？
- 需要怎样的部署、流量切换和资源调度？
- 持续高负载下，按调用还是长期容器更经济？
- 下游容量是否支持计算层扩容？

## Connections

### Options
- [[AWS Lambda]]
- [[Amazon ECS]]
- [[Amazon EKS]]

### Architecture qualities
- [[Scalability]]
- [[High Availability]]
- [[Reliability]]

### Workload pattern
- [[Reliable Asynchronous Processing]]

