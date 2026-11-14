---
title: Swagger
tags:
  - CS
  - API
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Swagger 现在主要指一套围绕 [[OpenAPI Specification]] 的工具生态，例如 Swagger Editor、Swagger UI 和 Swagger Codegen。历史上的 Swagger Specification 2.0 被捐赠后成为 OpenAPI Specification 2.0。

## Tools

| Tool | Role |
| --- | --- |
| Swagger Editor | 编写与校验 OpenAPI document |
| Swagger UI | 把 contract 渲染成交互式 API 文档 |
| Swagger Codegen | 根据 contract 生成 client/server scaffold |

## Gotchas

- “有 Swagger page”不证明 production API 的实现完全符合 contract。
- Swagger UI 能发送 request，不代表它负责 OAuth token 的最终验证。
- API design 应以 versioned OpenAPI document 为 source of truth，而不是只依赖截图或 UI。

## Connections

- Specification: [[OpenAPI Specification]]
- Contract subject: [[API Endpoint]]
- Runtime enforcement: [[API Gateway]]

