---
title: Endpoint Design
tags:
  - CS
  - API
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Endpoint design 是把业务能力映射成稳定、可理解、可授权的 [[API Endpoint]]。设计不只是取 URL 名字，还包括资源边界、HTTP method、状态码、幂等性、错误模型和权限要求。

## Design Checklist

| 维度 | 问题 |
| --- | --- |
| Resource | 客户端操作的是 prompt、conversation 还是 job？ |
| Method | 是创建、读取、替换、部分更新还是删除？ |
| Contract | request/response schema 是否明确？ |
| Identity | 谁在调用？token 面向哪个 API？ |
| Authorization | 需要什么 scope、role 或资源归属？ |
| Lifecycle | 是同步响应还是 `202 Accepted` 后轮询？ |
| Operations | 如何限流、审计、追踪与版本化？ |

## Example

同步模式：

```text
POST /projects/{projectId}/prompts
→ 200 OK + answer
```

异步模式：

```text
POST /projects/{projectId}/prompts
→ 202 Accepted + requestId

GET /projects/{projectId}/responses/{requestId}
→ processing | completed | failed
```

## Connections

- Paths: [[Static and Parameterized API Paths]]
- Contract: [[OpenAPI Specification]]
- Traffic: [[API Routing]]
- Security: [[Authentication]] and [[Authorization]]

