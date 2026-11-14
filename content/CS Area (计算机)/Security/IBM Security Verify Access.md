---
title: IBM Security Verify Access
aliases:
  - iSAM
  - ISAM
  - IBM Security Access Manager
  - IBM Verify Identity Access
tags:
  - CS
  - Security
  - IBM
type: concept
source: work
Status: growing
draft: false
---

## Definition

IBM Security Access Manager（iSAM/ISAM）是旧称；相关产品后续使用 IBM Security Verify Access、IBM Verify Identity Access 等名称。它可以提供 web access management、SSO、MFA、reverse proxy、federation、OAuth 2.0/OIDC provider 或 token validation 能力。

## Possible Roles

- 作为 [[Identity Provider]] / OIDC Provider。
- 作为 OAuth Authorization Server 签发 [[Access Token]]。
- 作为 relying party，信任 upstream IdP，例如 [[Microsoft Entra ID]]。
- 验证 bearer token、建立 session 或把 identity attributes 传给 downstream。

这些角色可以组合，但必须从实际 configuration 判断。

## Relationship with Microsoft Entra ID

两者在 IdP、federation 和 token service 上有功能重叠，因此可能是替代方案；也可以通过 OIDC/SAML federation 形成 upstream/downstream。[[Microsoft Entra Group]] 只是目录授权数据，不会与 iSAM 产品本身“冲突”。

## How to Verify the Actual Role

- Client 的 authority/issuer URL 指向谁？
- Token `iss` 是 Entra 还是 iSAM？
- iSAM 是否重新签发 token 或只验证 upstream token？
- Groups/roles 是否由 iSAM 做 attribute mapping？

## Sources

- [IBM Verify Identity Access](https://docs.verify.ibm.com/gateway/docs/verify-access)

