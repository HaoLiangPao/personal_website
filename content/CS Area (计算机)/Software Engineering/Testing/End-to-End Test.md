---
title: End-to-End Test
tags:
  - CS
  - Testing
type: concept
source: work
Status: growing
draft: true
---

## Definition

End-to-End Test（E2E Test）从真实入口驱动一条完整业务或用户链路，并验证最终可观察结果。它保护的是跨组件协作，而不是穷举每个内部模块的所有边界情况。

E2E 不一定从浏览器开始。对于异步 API 产品，`submit request → worker processing → result persistence → polling completed` 本身就是系统级 E2E。

## What E2E Uniquely Proves

- 部署后的组件能够被正确连接；
- identity、tenant、configuration 和 feature flag 正确传播；
- queue、worker、database、API 等真实边界能够协作；
- 最终结果确实能从用户入口提交，并从用户出口读取；
- production-like environment 中没有被 mocks 隐藏的 wiring 问题。

## What It Should Not Own

- 每个 parser 的全部边界值；
- 每个 graph node 的所有语义样例；
- 所有 API field 的组合；
- 完整负载容量；
- 仅在内部实现中有意义的调用顺序。

这些行为通常应由 [[Unit Test]]、[[Integration Test]] 或 [[Contract Test]] 更便宜地覆盖。

## Selecting E2E Scenarios

优先保留：

1. 最关键的 happy path；
2. 一个重要业务分支；
3. 权限或 tenant isolation；
4. 关键失败与恢复路径；
5. 曾在 production 发生、且只能跨组件复现的问题。

每个场景都应能说明它跨越了哪些真实边界，以及为什么较低层测试不能提供同等证据。

## Asynchronous Systems

异步 E2E 应使用 deadline 和 observable condition，而不是固定 sleep：

```text
submit request
repeat until deadline:
    read status
    if completed: verify final result and stop
    if failed: report terminal error and stop
fail with collected diagnostics
```

客户端发现完成的时间包含 polling interval，不等于服务端实际完成时间。测试结果应区分：

- request acceptance latency；
- server completion latency；
- client-observed completion latency。

## Diagnosability

E2E failure 很难仅靠最终 assertion 定位。测试至少应记录：

- correlation/request ID；
- 部署版本与配置版本；
- 每个外部阶段的开始和结束时间；
- terminal status 与可安全记录的错误分类；
- 对应 trace 或服务端日志入口。

不要把敏感 payload 直接写入测试日志。

## Gotchas

- 只检查最终 HTTP 200，无法证明异步工作真正完成。
- 把所有内部 node 顺序写进 E2E assertion，会让合法重构造成大量无意义失败。
- 通过增加 sleep 掩盖 race condition，会让 suite 更慢但不更可靠。
- E2E 通过只证明所选场景在该环境成功，不代表容量、安全和所有兼容组合都已验证。
- UI E2E 与 API E2E 可以分别存在；前者保护用户交互，后者保护后端交付链路。

## Connections

### Positioned in
- [[Test Pyramid]]

### Designed through
- [[Risk-Based Test Design]]
- [[Test Oracle]]

### Complements
- [[Unit Test]]
- [[Integration Test]]
- [[Contract Test]]

### Observed through
- [[Observability]]
- [[Latency Percentiles]]
