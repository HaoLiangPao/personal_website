---
title: JSON Web Token
aliases:
  - JWT
tags:
  - CS
  - Security
type: concept
source: reading
Status: growing
draft: false
---

## Definition

JSON Web Token（JWT）是一种紧凑的 claims 表达格式，常见结构是 `header.payload.signature`。JWT 可以承载 access token、ID token 或其他 assertion，但 **JWT 不等于 OAuth**。

## Structure

- Header：algorithm、key ID (`kid`) 等。
- Payload：`iss`、`aud`、`exp`、`sub`、scope、role、group 等 claims。
- Signature：让接收方验证内容由可信 issuer 签名且未被篡改。

## Gotchas

- Base64URL decode 不是验证。
- 必须限制允许的 algorithm，并从可信 metadata/JWKS 获取 key。
- Signature valid 仍不代表 audience、expiry 或权限正确。
- 不应把 secret、敏感个人信息或完整目录信息随意塞入 token。

## Connections

- [[Access Token]]
- [[Token Validation]]
- [[Group Claims]]

