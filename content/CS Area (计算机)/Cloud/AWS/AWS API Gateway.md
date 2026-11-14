---
title: AWS API Gateway
aliases:
  - Amazon API Gateway
tags:
  - CS
  - AWS
  - API
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Amazon API Gateway 是 AWS 的 managed API gateway service，可创建 REST、HTTP 和 WebSocket APIs，并把 route/method integration 到 Lambda、HTTP backend 或其他 AWS 服务。

## Identity Options

- AWS IAM authorization：适合使用 AWS credentials/SigV4 的 caller。
- Cognito user pool authorizer：验证 [[Amazon Cognito]] tokens。
- JWT authorizer：HTTP API 可验证 standards-based OAuth 2.0/OIDC JWT。
- Lambda authorizer：执行 custom token/request-based logic。

API Gateway 通常验证 token，但不是必然的 [[Identity Provider]]，也不会自动替业务服务完成所有 resource-level [[Authorization]]。

## Routing

Route 通常由 HTTP method + path 选择 integration。固定 domain 可以有 `/projects/a/prompts`、`/projects/b/prompts` 或 `/projects/{projectId}/prompts` 等多个 route。

## Gotchas

- REST API 与 HTTP API 支持的 authorizer 和功能不同。
- 修改 route/authorizer 后需要部署到正确 stage 才能生效。
- API key 用于 usage plan/consumer tracking 时，不应替代 user authentication。

## Connections

- Broader concept: [[API Gateway]]
- Enterprise layer: [[IBM API Connect]]
- Backend: [[AWS Lambda]]
- Service permissions: [[AWS IAM]]

## Sources

- [API Gateway with Cognito user pools](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html)

