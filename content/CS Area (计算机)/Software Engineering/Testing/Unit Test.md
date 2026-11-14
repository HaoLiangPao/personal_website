---
title: Unit Test
tags:
  - CS
  - Testing
type: concept
source: work
Status: growing
draft: true
---

## Definition

Unit Test 隔离验证一个小范围行为。这里的 unit 不是固定等于一个 function 或 class，而是能够快速、确定地验证并在失败时清楚定位的最小有意义边界。

## Desired Properties

- **Fast**：适合在本地和每次 CI 运行。
- **Deterministic**：相同输入与受控环境产生相同判断。
- **Isolated**：不依赖共享 network、clock、filesystem 或 mutable global state。
- **Behavior-focused**：验证外部可观察行为，而不是实现步骤。
- **Diagnostic**：失败信息指出哪个业务规则或 invariant 被破坏。

## Good Candidates

- parsing、normalization 和 validation；
- state transition 与 reducer；
- permission decision；
- retry policy 的纯逻辑部分；
- serialization 前后的 deterministic mapping；
- ranking metric、Recall@k 等评分函数；
- bug fix 的最小复现。

## Test Doubles

| Double | 用途 |
| --- | --- |
| Dummy | 只满足参数要求，不参与行为 |
| Stub | 返回预设结果，控制测试分支 |
| Fake | 简化但可工作的实现，例如 in-memory repository |
| Spy | 记录调用，供测试检查 |
| Mock | 预先声明期望交互并验证调用 |

Test double 应隔离不可控边界，而不是复制第三方系统的全部行为。越复杂的 fake，越需要自己的 contract/integration tests 证明它没有偏离真实系统。

## State-Based vs Interaction-Based

- **State-based testing** 检查输入处理后的返回值或状态，通常对重构更稳定。
- **Interaction-based testing** 检查某个 collaborator 是否以特定方式被调用，适合验证 side effect boundary，但容易与实现耦合。

优先验证 observable outcome；只有调用本身构成 contract 时，才严格验证 interaction。

## Example

对于 retry delay，可以直接验证：

- attempt 增加时 delay 不减小；
- delay 不超过 cap；
- jitter 在允许范围内；
- non-retryable error 不产生下一次 delay。

不需要真的等待数秒，也不需要启动 worker。

## Gotchas

- Mock 所有 collaborator 可能让测试只证明 mocks 按脚本配合。
- 直接调用真实 database、LLM 或 HTTP endpoint 的测试通常不是 unit test。
- 对 private method 逐个测试会把实现结构固化成 contract。
- Flaky unit test 通常说明 clock、randomness、concurrency 或 global state 没有被控制。

## Connections

### Positioned in
- [[Test Pyramid]]

### Uses
- [[Test Oracle]]
- [[Data Invariant]]

### Complements
- [[Integration Test]]
- [[Contract Test]]

