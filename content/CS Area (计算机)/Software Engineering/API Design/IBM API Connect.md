---
title: IBM API Connect
aliases:
  - APIC
tags:
  - CS
  - API
  - IBM
type: concept
source: work
Status: growing
draft: false
---

## Definition

IBM API Connect（APIC）是 API Management 平台，可用于设计、发布、保护、治理、分析和转发 API。它包含 gateway 能力，因此与 [[AWS API Gateway]] 同时出现并不矛盾。

## Possible Role in a Chain

```text
OAuth Client → Enterprise API Connect/Gateway → AWS API Gateway → Lambda
```

APIC 可能执行 consumer application registration、API key/plan、OAuth policy、scope 检查、rate limiting、audit 和 backend forwarding。具体职责取决于部署配置，而不是产品名称本身。

## OAuth Relationship

APIC 支持使用原生或第三方 OAuth provider。它可以保护 API，但不应在没有配置证据时直接假定 token 一定由 APIC 签发。

## Questions to Verify

- APIC 是 token issuer、validator，还是只做 routing？
- 它信任的 `issuer`、`audience` 和 scopes 是什么？
- 它是否把原始 token/claims 传给下游？
- AWS gateway 是否再次验证同一个 token？

## Connections

- Broader concept: [[API Management]]
- Contract: [[OpenAPI Specification]]
- Identity: [[IBM Security Verify Access]] and [[Microsoft Entra ID]]

## Sources

- [IBM API Connect OAuth provider overview](https://www.ibm.com/docs/en/api-connect/10.0.8?topic=security-oauth-provider-overview)

