---
title: Reliability
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Reliability 表示系统在规定时间和条件下持续正确完成预期功能的能力。

一个服务可能一直返回 HTTP 200，因此看起来可用，但如果重复扣款、丢失订单或返回错误结果，它并不可靠。

## Dimensions

- 正确性：是否维护 [[Data Invariant|业务不变量]]。
- 故障恢复：暂时失败后是否能恢复。
- 重复安全：重试是否造成额外副作用。
- 可检测性：错误是否能被 [[Observability|观测]]。
- 可验证性：是否通过测试和 [[Reconciliation|对账]]确认结果。

## Connections

### Distinguished from
- [[High Availability]]
- [[Scalability]]
- [[Durability]]

### Supported by
- [[Idempotency]]
- [[Consistency]]
- [[Retry]]

