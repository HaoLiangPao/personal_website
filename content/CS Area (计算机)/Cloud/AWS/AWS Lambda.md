---
title: AWS Lambda
tags:
  - CS
  - AWS
  - Serverless
type: concept
source: reading
Status: growing
draft: false
---

## Definition

AWS Lambda 是事件驱动的托管计算服务。应用提供函数代码或容器镜像，AWS 管理执行环境和按事件扩缩容。

## Good Fit

- 短时、可重试的事件处理。
- 突发或不稳定流量。
- API、文件处理和队列消费者。
- 不依赖单个执行环境本地状态的任务。

## Limits and Trade-offs

- 普通 Lambda function 的配置 timeout 最长为 900 秒（15 分钟）。当前部分 Lambda Managed Instances 的异步和 event source mapping 场景支持更长上限，因此“所有 Lambda 都最多 15 分钟”并不准确。
- 需要管理并发配额、冷启动、下游容量和持续高负载成本。
- 长连接、超长任务或持续运行 Worker 可能更适合 [[Amazon ECS]]。
- 扩容函数并不会自动扩容数据库和外部 API。

## Messaging

Lambda 可以由 [[Amazon SQS]] event source mapping 触发。该集成至少处理一次，因此函数需要 [[Idempotency|幂等]]，并正确配置 visibility timeout、batch response 和并发。

## Deployment

Lambda Alias 可以在两个已发布版本之间分配权重，用于 [[Canary Deployment]]。

## Connections

### Compared in
- [[AWS Compute Options]]

### Patterns
- [[Reliable Asynchronous Processing]]
- [[Observability]]

## Sources

- [AWS Lambda timeout](https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html)
- [Lambda with Amazon SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)

