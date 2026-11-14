---
title: OAuth Client
aliases:
  - OAuth 2.0 Client
tags:
  - CS
  - Security
  - OAuth
type: concept
source: work
Status: growing
draft: false
---

## Definition

OAuth Client 是代表用户或自身向 Authorization Server 请求 token、再访问 Resource Server 的应用。它可以是 frontend SPA、mobile app、server-side web app、BFF 或 machine-to-machine service。

## Client Types

| Type | Secret handling | Typical flow |
| --- | --- | --- |
| Public client | 无法可靠保管 secret | Authorization Code + PKCE |
| Confidential client | 可在受控 server 保管 secret/key | Authorization Code、Client Credentials |

## Registration Inputs

- `client_id`
- redirect URI
- allowed grant/response types
- allowed scopes and target audience
- logout/callback settings
- confidential client 才可能使用 secret 或 certificate

## Gotchas

- Client 不应自己伪造 JWT。
- Frontend 不应内置 client secret。
- “OAuth CLI”如果不是 command-line tool，通常实际指 OAuth Client。

## Connections

- Protocol: [[OAuth 2.0]]
- Receives: [[Access Token]]
- Registered with: [[Microsoft Entra ID]], [[IBM Security Verify Access]], or [[Amazon Cognito]]

