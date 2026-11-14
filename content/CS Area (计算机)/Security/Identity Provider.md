---
title: Identity Provider
aliases:
  - IdP
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

Identity Provider（IdP）验证用户身份，并向依赖方提供可信 identity assertion。OIDC 中称为 OpenID Provider；SAML 中通常称 IdP。

## Related but Different Role

OAuth Authorization Server 向 client 签发 access token。一个产品可以同时充当 IdP 和 Authorization Server，但两个角色概念上不同：前者服务登录身份，后者服务 API delegated access。

## Federation

一个 IdP 可以信任另一个 upstream IdP：上游完成员工登录，下游 broker 做 attribute mapping、session 或重新签发 token。此时必须用 token 的 `iss` 和 trust configuration 判断 app 最终信任谁。

## Implementations

- [[Microsoft Entra ID]]
- [[IBM Security Verify Access]]
- [[Amazon Cognito]] User Pool

