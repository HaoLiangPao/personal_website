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

## Key Terms

| 中文 | English | 含义 |
| --- | --- | --- |
| 基于角色的访问控制 | RBAC（Role-Based Access Control） | 按角色而不是按个人分配权限 |
| 角色 | Role | 一组权限的命名集合 |
| 权限 | Permission | 对某类资源执行某类操作的许可 |
| 角色层次 | Role Hierarchy | 角色之间的继承关系 |
| 互斥角色 | Mutually Exclusive Roles | 不能同时授予同一个主体的角色（职责分离） |
| 基于属性的访问控制 | ABAC（Attribute-Based Access Control） | 用属性和规则判断访问 |

## Why It Exists

NIST 的说明：在没有 RBAC 时，管理员往往要为每个用户单独写访问控制列表，成本高且容易出错。RBAC 让权限管理贴近组织结构：每个用户被分配一个或多个角色，每个角色被分配若干权限，管理员只需确定某类岗位需要执行的操作，再把员工分配到合适的角色。RBAC 由 Ferraiolo 和 Kuhn 在 1992 年形式化，NIST 模型在 2004 年被采纳为美国国家标准 ANSI/INCITS 359，并在 2012 年修订。

```mermaid
flowchart LR
    U1[用户 / 组 / 服务] --> R[Role]
    R --> P[Permission]
    P --> X["Resource + Action"]
```

## Directory Groups vs Application Roles

Directory group 描述组织成员关系；application role 描述应用语义，例如 `Prompt.Reader` 或 `Prompt.Admin`。可以把 [[Microsoft Entra Group]] 分配给 [[App Roles]]，让 token 暴露稳定的 `roles` claim，而不是让应用直接硬编码大量 group IDs。

## Gotchas

- RBAC 不天然处理 resource ownership、时间、风险等上下文；这些可能需要额外 policy，或者使用 ABAC。
- Role 名称相同不代表不同系统中的权限语义相同。
- Gateway-level role 检查不能替代 backend 的 object-level authorization。

## Connections

- [[Authorization]]
- [[Group Claims]]
- [[App Roles]]

## Sources

- [NIST — Role Based Access Control](https://csrc.nist.gov/projects/role-based-access-control)
- [Microsoft Entra app roles](https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps)
