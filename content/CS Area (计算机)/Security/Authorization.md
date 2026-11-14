---
title: Authorization
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

Authorization（权限判断）回答：**某个 principal 是否可以对某个 resource 执行某个 action？**

```text
allow = policy(principal, action, resource, context)
```

## Inputs

- Principal identity and tenant。
- OAuth `scope`、application `roles` 或 directory `groups`。
- Resource ownership、classification、environment。
- Context，例如 device posture、network 或 transaction risk。

## Layers

Gateway 可以做 endpoint-level scope 检查；backend 仍需做 resource-level authorization。例如 token 允许 `responses.read`，不表示用户能读取任何人的 `requestId`。

## Gotchas

- `projectId` 是 routing input，不是授权证明。
- UI 隐藏按钮不等于 server-side authorization。
- JWT 验证成功不等于 claims 满足业务 policy。

## Connections

- [[Authentication]]
- [[Role-Based Access Control]]
- [[Group Claims]]
- [[App Roles]]

