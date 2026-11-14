---
title: Static and Parameterized API Paths
tags:
  - CS
  - API
type: concept
source: work
Status: growing
draft: false
---

## Definition

“Static URL”和“dynamic URL”不是足够精确的 API 架构术语。讨论前应指出变化的是 host、path parameter、query、request body，还是后端 integration。

## Patterns

| Pattern | Example | 变化位置 |
| --- | --- | --- |
| Fixed path | `/project-a/prompts` | 不变 |
| Parameterized path | `/projects/{projectId}/prompts` | path parameter |
| Query parameter | `/prompts?projectId=project-a` | query string |
| Body dispatch | `POST /prompts` + `projectId` | request body |
| Dynamic integration | 同一路径按配置选择 backend | gateway/backend |

固定 domain 可以同时承载多个固定或参数化 path。[[OAuth 2.0]] 也不要求业务 API URL 动态变化；redirect URI 通常反而需要预先注册并严格匹配。

## Gotchas

- 把项目名放在 body 里并非错误，但会让 gateway 难以只靠 method/path 完成 routing、authorization 和 metrics 分组。
- `{projectId}` 是参数化 path，不表示每次临时创建一个 endpoint。

## Connections

- [[API Endpoint]]
- [[API Routing]]
- [[Endpoint Design]]
