---
title: Microsoft Graph
tags:
  - CS
  - Security
  - Microsoft
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Microsoft Graph 是访问 Microsoft 365 和 Microsoft Entra directory 数据的 API。与本知识图谱最相关的用途是查询 user、group 和 direct/transitive membership。

## Role in Group Authorization

API 通常先验证面向自身的 [[Access Token]]。当 [[Group Claims]] 出现 overage，或业务需要更实时/完整的 membership 时，受信 backend 可以用单独、具有相应 Graph permission 的 token 查询 Microsoft Graph。

## What It Is Not

- 它不是 [[Microsoft Entra ID]] 的 token issuer。
- 它不是通用 JWT validation service。
- 面向 Microsoft Graph 的 token 不能当成自定义 API 的 token，因为 `aud` 不同。

## Gotchas

- Graph permissions 可能非常敏感，应遵循 least privilege。
- 不应由不受信 frontend 直接决定要查询哪个用户的 membership。
- Directory read 与 API authorization 是两步；查询到 membership 后仍需应用 policy。

## Connections

- [[Microsoft Entra Group]]
- [[Group Claims]]
- [[Token Validation]]

