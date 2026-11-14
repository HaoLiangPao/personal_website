---
title: Microsoft Entra ID
aliases:
  - Azure Active Directory
  - Azure AD
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

Microsoft Entra ID（原 Azure Active Directory / Azure AD）是 Microsoft 的 cloud identity and access platform。它管理 users、applications、service principals、groups、authentication policies，并通过 Microsoft identity platform 提供 OAuth 2.0/OIDC endpoints 和 tokens。

## Role in an API Flow

1. 注册 [[OAuth Client]] 与目标 API。
2. 定义 redirect URI、scope、[[App Roles]] 和 token claims。
3. 用户完成登录与 consent/policy 检查。
4. Entra 向 client 签发面向目标 API 的 [[Access Token]]。
5. Gateway/backend 使用 Entra metadata/JWKS 完成 [[Token Validation]]。

## Directory Authorization

- [[Microsoft Entra Group]] 保存 membership。
- [[Group Claims]] 可把 group object IDs 放入 token。
- [[App Roles]] 提供更应用化的权限语义。
- [[Microsoft Graph]] 可查询目录与 group membership。

## Relationship with iSAM

Entra 与 [[IBM Security Verify Access]] 既可能是替代 issuer，也可能通过 federation 形成 upstream/downstream。必须检查最终 token issuer 与 trust configuration，不能从“使用 AD Group”推断。

