---
title: API Endpoint
tags:
  - CS
  - API
type: concept
source: reading
Status: growing
draft: false
---

## Definition

API endpoint 是客户端能够调用的 API 操作入口。严格讨论时，应同时说明 HTTP method 与 path，例如 `POST /projects/{projectId}/prompts`；只有 URL 往往不足以唯一描述操作。

## Composition

```text
https://api.example.com/v1/projects/123/prompts
└ scheme └── host ──┘└base┘└── resource path ──┘
```

- `method`: `GET`、`POST`、`PUT`、`PATCH`、`DELETE`。
- `path`: 资源位置，可以包含 path parameter。
- `request`: headers、query、path parameters 和 body。
- `response`: status code、headers 和 body。
- `security`: 调用需要的 token、scope 或 role。

## Gotchas

- `GET` 表示读取，不表示“服务器返回”；每个 HTTP request 都有 response。
- 同一 path 的 `GET` 与 `POST` 是两个不同 operation。
- endpoint 名字不能代替 request/response contract。

## Connections

- Designed in [[Endpoint Design]]
- Described by [[OpenAPI Specification]]
- Routed by [[API Gateway]]

