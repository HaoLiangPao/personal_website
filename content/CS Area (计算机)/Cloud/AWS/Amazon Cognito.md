---
title: Amazon Cognito
tags:
  - CS
  - AWS
  - Security
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Amazon Cognito 为应用提供 customer/application identity 能力。它有两个容易混淆的组件。

| Component | Role |
| --- | --- |
| User Pool | User directory、OAuth 2.0/OIDC、sign-up/sign-in、tokens、federation |
| Identity Pool | 把可信身份交换成临时 AWS credentials |

## In an Enterprise Flow

Cognito User Pool 可以直接管理用户，也可以 federate 到 enterprise IdP，例如 [[Microsoft Entra ID]] 或其他 SAML/OIDC provider，再签发 Cognito tokens 给应用。

如果企业已批准 iSAM/Entra 作为 issuer，且 [[AWS API Gateway]] 能直接信任相关 token，则不一定需要再引入 Cognito。部署在 AWS 本身并不构成采用 Cognito 的理由。

## Gotchas

- User Pool token 与 Identity Pool AWS credentials 是不同东西。
- 增加 federation/broker 会增加 issuer、claim mapping、logout 和 troubleshooting 复杂度。
- 引入 Cognito 前应明确它解决的是 user directory、federation、token normalization，还是 AWS credential vending。

## Connections

- [[Identity Provider]]
- [[OAuth 2.0]]
- [[AWS API Gateway]]
- [[AWS IAM]]

