---
title: Role-Based Access Control
aliases:
  - RBAC
tags:
  - CS
  - Security
  - IAM
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Role-Based Access Control（RBAC）把 permission 分配给 role，再把 user、group 或 service 分配到 role，避免为每个 principal 单独维护权限。

```text
Principal → Role → Permission → Resource/Action
```

## Directory Groups vs Application Roles

Directory group 描述组织成员关系；application role 描述应用语义，例如 `Prompt.Reader` 或 `Prompt.Admin`。可以把 [[Microsoft Entra Group]] 分配给 [[App Roles]]，让 token 暴露稳定的 `roles` claim，而不是让应用直接硬编码大量 group IDs。

## Gotchas

- RBAC 不天然处理 resource ownership、时间、风险等上下文；这些可能需要额外 policy。
- Role 名称相同不代表不同系统中的权限语义相同。
- Gateway-level role 检查不能替代 backend 的 object-level authorization。

## Connections

- [[Authorization]]
- [[Group Claims]]
- [[App Roles]]

