---
title: OpenID Connect
aliases:
  - OIDC
tags:
  - CS
  - Security
  - OAuth
type: concept
source: reading
Status: growing
draft: false
---

## Definition

OpenID Connect（OIDC）是在 [[OAuth 2.0]] 之上增加身份认证语义的协议。它让 client 通过 OpenID Provider 返回的 ID token 确认登录用户身份。

## Important Artifacts

- ID token：给 client 的登录身份 assertion。
- Access token：给 API/Resource Server 的调用凭据。
- Discovery document：发布 issuer、authorization endpoint、token endpoint、JWKS URI 等 metadata。
- UserInfo endpoint：在授权条件满足时返回用户 claims。

## Gotchas

- ID token 的 audience 是 client；不要把它当成任意 API 的通用 access token。
- OIDC federation 可以让一个身份平台成为另一个平台的 upstream IdP。
- 实际信任边界由 issuer 和签名验证确定，而不是由登录页面 logo 确定。

## Connections

- [[Identity Provider]]
- [[Access Token]]
- [[Token Validation]]

