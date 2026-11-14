---
title: Token Validation
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

Token validation 是 Resource Server、gateway 或 authorizer 在信任 token 前完成的密码学与语义检查。

## Minimum Checks for JWT

1. 从配置的 OIDC discovery/JWKS 获取可信 signing keys。
2. 根据 `kid` 选择 key 并验证 signature 与允许的 algorithm。
3. 验证 `iss` 与配置的 issuer 完全匹配。
4. 验证 `aud` 是当前 API。
5. 验证 `exp`、`nbf`，必要时验证 tenant/client/token type。
6. 最后检查 `scp`、`roles`、`groups` 等 [[Authorization]] 条件。

## Where It Can Run

- [[IBM API Connect]] policy。
- [[AWS API Gateway]] JWT/Cognito/Lambda authorizer。
- Backend framework middleware。
- 对 opaque token 使用 issuer 的 introspection endpoint。

## Gotchas

- 不要接受为另一个 API 签发的 token，否则可能形成 confused deputy。
- Signing keys 会 rollover，应通过 metadata/JWKS 更新，而不是硬编码单一 key。
- 验证 token 与查询 [[Microsoft Graph]] 是不同工作。

## Sources

- [Microsoft identity platform access-token validation](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)

