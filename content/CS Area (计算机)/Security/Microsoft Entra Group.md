---
title: Microsoft Entra Group
aliases:
  - Azure AD Group
  - AD Group
  - Entra Group
tags:
  - CS
  - Security
  - Microsoft
type: concept
source: work
Status: growing
draft: false
---

## Definition

Microsoft Entra Group 是 Entra directory 中的 group object，用于组织 users、devices 或 service principals，并可参与 application assignment 与授权。

## Not a Validation Service

Group 本身不会签发或验证 token。典型链路是：

```text
Entra directory membership
  → groups claim or app-role assignment
  → access token
  → API token validation
  → authorization decision
```

## On-Prem AD vs Entra Group

On-premises Active Directory Security Group 与 Entra Group 是不同目录中的对象。它们可能通过同步或 hybrid identity 相关联，但不能默认 object ID、nested membership 和更新时效完全相同。

## Authorization Options

- API 直接检查 [[Group Claims]] 中的 group object ID。
- 把 group 分配给 [[App Roles]]，API 检查 `roles` claim。
- 需要完整或实时 membership 时查询 [[Microsoft Graph]]。

## Gotchas

- Group membership 不等于任意 endpoint permission，仍需明确 mapping。
- 大量 group membership 会产生 group overage。
- Token 中的 membership 是签发时快照，不是实时目录查询。

