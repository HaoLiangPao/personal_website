---
title: Access Token
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

Access token 是 [[OAuth Client]] 提交给 Resource Server 的访问凭据。它表示某个 issuer 对特定 audience、scope 和有效期授予的访问权。

## Typical Claims for a JWT Access Token

| Claim | Meaning |
| --- | --- |
| `iss` | 谁签发 token |
| `aud` | token 给哪个 API 使用 |
| `exp` / `nbf` | 有效时间范围 |
| `sub` / `oid` | subject identity |
| `scp` | delegated scopes |
| `roles` | application permissions/roles |
| `groups` | directory group object IDs |

## Gotchas

- Access token 可能是 opaque token，不一定是 [[JSON Web Token]]。
- Client 只应把 token 发给其 audience 对应的 API。
- API 必须执行 [[Token Validation]]，不能只 base64 decode payload。
- Token 的 group/role 信息仍需映射成 [[Authorization]] policy。

## Connections

- Issued through [[OAuth 2.0]]
- Used by [[API Gateway]] and backend APIs

