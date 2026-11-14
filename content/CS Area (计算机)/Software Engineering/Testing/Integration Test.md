---
title: Integration Test
tags:
  - CS
  - Testing
type: concept
source: work
Status: growing
draft: true
---

## Definition

Integration Test 验证两个或多个真实组件在实际边界上的协作，例如 application 与 database、worker 与 queue、service 与 object storage。它重点发现单元内部正确但连接后失败的问题。

Integration test 不等于“整个系统测试”，也不要求经过 UI。边界可以很小，但至少有一个重要协作者使用真实实现或高保真环境。

## Risks It Protects

- schema、migration、query 和 transaction semantics；
- serialization、encoding 和 type conversion；
- authentication、headers 和 network timeout；
- queue delivery、duplicate message 和 acknowledgement；
- configuration、dependency injection 和 runtime wiring；
- SDK、driver 或 managed service 的实际行为。

## Choosing Real Dependencies

优先使用真实依赖的场景：

- 行为由数据库、broker 或 gateway 自身定义；
- fake 很难忠实模拟 transaction、ordering 或 error behavior；
- 曾经出现过“mock 通过、部署失败”的问题。

可以替换依赖的场景：

- 第三方服务昂贵、不可控或有副作用；
- 当前测试只关心本地 adapter 的 mapping；
- 已有独立 [[Contract Test]] 验证 fake 与真实服务的边界一致。

## Test Environment

可靠的 integration suite 应管理自己的数据生命周期：

1. 创建隔离 schema、tenant、queue 或 namespace；
2. 使用最小且明确的 fixture；
3. 执行行为并读取 persisted result；
4. 验证 side effects 和 invariants；
5. 清理或销毁环境，避免跨测试污染。

只检查 HTTP 200 而不读取持久化结果，不能证明写入真正成功。

## Integration Test vs Contract Test

| Integration Test | [[Contract Test]] |
| --- | --- |
| 验证真实组件确实能协作 | 验证双方对协议的理解一致 |
| 常包含 infrastructure behavior | 可在 provider 不运行时验证 consumer expectation |
| 更容易发现 wiring/config 问题 | 更容易快速发现 compatibility break |

二者互补：contract 正确不保证部署配置正确，integration 成功也不保证所有 consumer expectation 都被覆盖。

## Gotchas

- 共享 staging data 会导致顺序依赖和 flaky tests。
- 用 in-memory database 代替生产 database，可能遗漏 SQL dialect、index、locking 和 isolation 差异。
- 只验证调用返回，不验证实际 side effect，会产生假阳性。
- 不区分 product failure 与 environment failure，会让 CI 结果难以诊断。

## Connections

### Positioned in
- [[Test Pyramid]]

### Validates
- [[Reliable Asynchronous Processing]]
- [[Transaction Isolation]]
- [[Delivery Semantics]]

### Complements
- [[Unit Test]]
- [[Contract Test]]
- [[End-to-End Test]]

