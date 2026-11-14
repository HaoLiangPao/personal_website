---
title: Group Claims
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

Group claims 是 token 中表达 subject 目录组成员关系的 claims。在 Microsoft Entra token 中，`groups` 通常包含 [[Microsoft Entra Group]] 的 object IDs，而不是稳定的业务权限名称。

## Authorization Flow

```text
groups: [group-object-id]
  → validate token
  → map group ID to application permission
  → authorize endpoint/resource
```

## Group Overage

Microsoft Entra 对 token 可包含的 groups 数量有限制。JWT 超过 200 个 group 时，通常不会返回完整 `groups` claim，而是返回 overage indicator；应用必须识别该情况并按批准方式查询 [[Microsoft Graph]]。

## Gotchas

- 不能把 `groups` claim 缺失直接解释为“用户没有 group”。
- API 应比较 immutable object ID，而不是可重命名的 display name。
- Token 只反映签发时 membership；高风险操作可能需要更实时的检查。
- 若应用权限语义稳定，优先考虑把 groups 映射到 [[App Roles]]。

## Sources

- [Microsoft access-token claims reference](https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference)
- [Configure group claims and app roles](https://learn.microsoft.com/security/zero-trust/develop/configure-tokens-group-claims-app-roles)

