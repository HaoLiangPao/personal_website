---
title: Amazon ECS
tags:
  - CS
  - AWS
  - Container
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Amazon Elastic Container Service（ECS）是 AWS 的容器编排服务。它使用 Task Definition 描述容器，用 Service 维护期望数量并与负载均衡和 Auto Scaling 集成。

## Good Fit

- 长时间运行的 API、Worker 和后台服务。
- 需要容器运行时，但不需要 Kubernetes API 的团队。
- 希望在 AWS 上降低控制面和集群运维复杂度。
- 使用 Fargate 运行不想直接管理节点的容器任务。

## Trade-offs

- 比 [[AWS Lambda]] 更适合长期运行和自定义容器进程，但需要管理 Task、Service、网络和扩缩容策略。
- 相比 [[Amazon EKS]]，平台抽象更 AWS-specific，但运维面通常更小。
- 增加 ECS Task 数量之前仍需检查数据库和外部依赖容量。

## Deployment

ECS 支持 [[Rolling Deployment|滚动部署]]以及 [[Blue-Green Deployment|blue/green 流量切换]]；配合 CodeDeploy 可以使用预定义的 Canary 或 Linear 配置。

## Connections

### Compared in
- [[AWS Compute Options]]

### Related concepts
- [[Containerization]]
- [[Canary Deployment]]
- [[Scalability]]

## Sources

- [Amazon ECS blue/green deployments](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html)
