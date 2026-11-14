---
title: API Routing
tags:
  - CS
  - API
type: concept
source: reading
Status: growing
draft: false
---

## Definition

API routing 根据 host、HTTP method、path、headers 或其他明确规则，把 request 送往对应 backend integration。

## Routing Layers

| Layer | 适合的职责 |
| --- | --- |
| Enterprise API management | API product、consumer plan、policy、跨平台转发 |
| API gateway | method/path matching、authorizer、integration selection |
| Application router | 业务级 dispatch、feature flag、租户内部选择 |
| Business service | 业务规则，而不是通用入口治理 |

## Design Principle

优先让能够理解稳定 API contract 的最前层完成粗粒度 routing；业务服务只保留必须依赖业务数据的选择。把所有项目流量先送到一个业务 Lambda 再转发，会把 routing、业务逻辑和权限边界耦合在一起。

## Gotchas

- Gateway routing 不会自动完成 resource-level [[Authorization]]。
- 改成不同 path 后，仍需检查 integration 是否真的指向不同 backend。
- 不能因为 gateway 返回 `200` 就认为 downstream 行为正确。

## Connections

- [[API Gateway]]
- [[IBM API Connect]]
- [[AWS API Gateway]]
- [[Gateway-First Multi-Project Routing Case Study]]

