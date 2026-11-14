---
title: Authentication
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

Authentication（身份认证）回答：**当前 principal 是谁，以及系统为什么信任这个身份？** Principal 可以是 user、service、device 或 workload。

## Examples

- 员工通过 SSO + MFA 登录。
- Service 使用 certificate、client credential 或 signed request 表明身份。
- API 验证 access token 的 signature、issuer、audience 和 expiry。

## Authentication vs Authorization

通过 authentication 只说明身份可信，不说明该身份能够调用所有 API。之后仍需 [[Authorization]] 判断 action、resource 和 context。

## Connections

- Login protocol: [[OpenID Connect]]
- Identity source: [[Identity Provider]]
- API evidence: [[Access Token]] and [[Token Validation]]

