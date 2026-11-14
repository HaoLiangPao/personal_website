---
title: API Management
tags:
  - CS
  - API
type: concept
source: reading
Status: growing
draft: false
---

## Definition

API Management 是管理 API 完整生命周期的能力集合：design、publish、secure、onboard consumers、rate limit、observe、version 和 retire。

## Control Plane and Data Plane

| Plane | 典型职责 |
| --- | --- |
| Control plane | API catalog、product/plan、consumer app registration、policy configuration |
| Data plane | 接收 request、执行 policy、验证 credential、限流、转发 |

[[API Gateway]] 往往是 data plane 的核心，但 API Management 的范围更广。

## Enterprise Use

企业可能在 AWS 前放一层统一 API Management，以获得跨平台的 consumer identity、审计、quota 和 governance；AWS 内部再由 [[AWS API Gateway]] 对接 Lambda 或其他服务。

## Connections

- Implemented by [[IBM API Connect]]
- Described with [[OpenAPI Specification]]
- Enforces policies related to [[Authentication]] and [[Authorization]]

