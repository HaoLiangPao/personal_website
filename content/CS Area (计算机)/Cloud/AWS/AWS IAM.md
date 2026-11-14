---
title: AWS IAM
aliases:
  - AWS Identity and Access Management
tags:
  - CS
  - AWS
  - Security
type: concept
source: work
Status: growing
draft: false
---

## Definition

AWS Identity and Access Management（IAM）控制 AWS principals 对 AWS resources 执行 actions 的权限。Principals 包括 IAM users、roles、federated sessions 和 AWS services。

## In an API Architecture

- API Gateway execution role 是否能调用某个 backend。
- Lambda execution role 是否能读写 DynamoDB、SQS 或 Secrets Manager。
- Lambda A 是否具有调用 Lambda B 的 permission。
- 使用 SigV4 的 caller 是否能够调用受 IAM 保护的 API Gateway route。

## What It Does Not Replace

“Lambda A 有权调用 Lambda B”不等于“当前员工有权访问 Project B”。前者是 service/resource permission；后者是 end-user [[Authorization]]，通常依赖 [[Access Token]] claims 和业务 policy。

## Connections

- [[AWS API Gateway]]
- [[AWS Lambda]]
- [[Authentication]]
- [[Authorization]]

