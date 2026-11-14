---
title: OpenAPI Specification
aliases:
  - Swagger API Definition
  - OpenAPI Description
tags:
  - CS
  - API
type: concept
source: reading
Status: growing
draft: false
---

## Definition

OpenAPI Specification（OAS）是与编程语言无关的 HTTP API 描述标准。它让人和工具在不阅读实现代码的情况下理解 endpoint、request、response 和 security contract。

过去常说的 “Swagger API definition” 通常指 Swagger 2.0 或今天的 OpenAPI document。**OpenAPI 是 specification；[[Swagger]] 是围绕它的一组工具与历史名称。**

## What It Describes

```yaml
openapi: 3.1.0
servers:
  - url: https://api.example.com/v1
paths:
  /projects/{projectId}/prompts:
    post:
      security:
        - oauth: [prompt.write]
      responses:
        "200":
          description: Answer returned
components:
  securitySchemes:
    oauth:
      type: oauth2
```

- `servers`: base URL。
- `paths` + method: [[API Endpoint]] operation。
- `parameters`、`requestBody`、`responses`: contract。
- `components.schemas`: reusable data model。
- `securitySchemes` 与 `security`: 所需安全机制和 scope。

## What It Does Not Do

OpenAPI document 只描述安全要求；真正的 token 签发、[[Token Validation]] 和 [[Authorization]] 必须由 gateway、authorizer 或 backend 执行。

## Connections

- Designed through [[Endpoint Design]]
- Tooling: [[Swagger]]
- Published or enforced by [[IBM API Connect]] and [[AWS API Gateway]]

## Sources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)

