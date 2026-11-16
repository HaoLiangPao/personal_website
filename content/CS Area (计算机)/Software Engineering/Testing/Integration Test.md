---
title: Integration Test
tags:
  - CS
  - Testing
type: concept
source: work
Status: growing
draft: false
---

## Definition

Integration Test 验证两个或多个真实组件在实际边界上的协作，例如 application 与 database、worker 与 queue、service 与 object storage。它重点发现单元内部正确但连接后失败的问题。

Integration test 不等于“整个系统测试”，也不要求经过 UI。边界可以很小，但至少有一个重要协作者使用真实实现或高保真环境。

## Key Terms

| 中文 | English | 含义 |
| --- | --- | --- |
| 集成测试 | Integration Test | 验证组件在真实边界上的协作 |
| 窄集成测试 | Narrow Integration Test | 只测自己服务里与外部交互的那部分代码，对方用替身 |
| 宽集成测试 | Broad Integration Test | 需要所有服务的真实版本，穿过所有服务的代码路径 |
| 测试夹具 | Fixture | 测试需要的最小、明确的数据和环境 |
| 一次性容器 | Throwaway Container | 为测试临时创建、用完即删的依赖实例 |
| 环境污染 | Test Pollution | 一个测试留下的数据影响其他测试 |

## Narrow vs Broad

Fowler 提醒“integration test”这个词已经被用得很模糊，很多人以为它必须范围很大。他区分：

- **Narrow integration test**：只执行自己服务里与另一个服务交互的那部分代码，使用对方服务的 test double（进程内或远程），因此由许多范围很小的测试组成，范围常常不比 unit test 大，也常常用同一个测试框架。
- **Broad integration test**：需要所有服务的真实版本，需要大量测试环境和网络访问，并穿过所有服务的代码路径。

他更倾向于把 broad integration test 叫作 system test 或 end-to-end test（见 [[End-to-End Test]]）。Practical Test Pyramid 则把 integration test 定义为：测试应用与它外部所有部分（数据库、文件系统、其他服务）的集成，例如数据库集成测试会启动数据库、连接应用、触发写入、再从数据库读回数据来验证。

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

像 Testcontainers 这样的工具可以为测试提供一次性的、轻量的数据库、消息代理或任何能跑在 Docker 容器里的依赖实例：测试运行时创建容器，结束后删除，用代码定义测试依赖，省去复杂的环境配置。

## Test Environment

可靠的 integration suite 应管理自己的数据生命周期：

```mermaid
flowchart LR
    A[创建隔离 schema / tenant / queue] --> B[加载最小明确的 fixture]
    B --> C[执行被测行为]
    C --> D[读取持久化结果]
    D --> E[验证 side effects 和 invariants]
    E --> F[清理或销毁环境]
```

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
- 用 in-memory database 代替生产 database，可能遗漏 SQL dialect、index、locking 和 isolation 差异。Practical Test Pyramid 的示例项目就用内存数据库代替了生产环境的 PostgreSQL，这类取舍要清楚自己放弃了什么。
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

## Sources

- [Martin Fowler — Integration Test](https://martinfowler.com/bliki/IntegrationTest.html)
- [Ham Vocke — The Practical Test Pyramid: Integration Tests](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Testcontainers](https://testcontainers.com/)
