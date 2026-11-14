---
title: OAuth 2.0
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

OAuth 2.0 是授权框架，让 [[OAuth Client]] 在得到授权后使用 [[Access Token]] 访问 Resource Server。OAuth 本身主要解决 delegated API access，而不是定义用户登录身份。

## Roles

- Resource Owner：能够授予访问权的一方。
- Client：请求 access token 的应用。
- Authorization Server：认证相关主体并签发 token。
- Resource Server：接收 token 并保护 API。

## Browser Applications

Browser SPA 通常使用 Authorization Code + PKCE，并且不能安全保存 client secret。BFF 则可以在 server side 保存机密信息并为 browser 管理 session。

## Gotchas

- Access token 不保证一定是 [[JSON Web Token]]。
- Token 必须面向目标 API 的 audience；Microsoft Graph token 不能直接用来调用自定义 API。
- OAuth 不要求业务 API 使用所谓 dynamic URL。
- 登录身份语义由 [[OpenID Connect]] 补充。

## Connections

- [[OAuth Client]]
- [[Access Token]]
- [[Token Validation]]

