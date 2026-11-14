---
title: App Roles
aliases:
  - Application Roles
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

App Roles 是在 Microsoft Entra application registration 中定义的应用专属角色。被分配角色的 user、group 或 application 可以在 token 的 `roles` claim 中获得相应值。

## Why Use Them

| Raw directory groups | App roles |
| --- | --- |
| 属于 tenant 目录结构 | 属于 application contract |
| Token 常携带 group object ID | Token 携带业务角色值 |
| 跨 tenant ID 不稳定 | Role definition 随 app registration |
| 容易暴露过多组织结构 | 只暴露应用需要的权限语义 |

常见模式是把 [[Microsoft Entra Group]] 分配给 App Role，然后 API 检查 `roles` claim。

## Gotchas

- Role 仍需在 backend 映射到具体 action/resource。
- Delegated `scp` 与 application/user `roles` 的语义不同。
- Group-to-role assignment 是否包含 nested membership，应按 tenant 配置和产品行为确认。

## Connections

- [[Role-Based Access Control]]
- [[Authorization]]
- [[Group Claims]]

## Sources

- [Microsoft Entra app roles](https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps)

