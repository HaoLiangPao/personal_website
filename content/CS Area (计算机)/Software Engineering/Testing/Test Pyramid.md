---
title: Test Pyramid
tags:
  - CS
  - Testing
type: concept
source: work
Status: growing
draft: false
---

## Definition

Test Pyramid 是测试组合的成本模型：底层测试通常数量更多、运行更快、定位更清楚；越靠近完整系统，测试通常越慢、越脆弱、维护成本越高，因此只保留能提供独特信心的代表性场景。

```mermaid
flowchart BT
    U[Many fast Unit Tests] --> I[Focused Integration and Contract Tests]
    I --> E[Few critical End-to-End Tests]
```

它是 heuristic，不是固定比例，也不是要求所有系统拥有相同形状。

## Key Terms

| 中文 | English | 含义 |
| --- | --- | --- |
| 测试金字塔 | Test Pyramid | 底层测试多、顶层测试少的组合模型 |
| 冰淇淋筒 | Ice-Cream Cone | 反模式：主要靠慢的端到端测试，底层测试很少 |
| 测试奖杯 | Testing Trophy | 另一种形状：静态检查打底，集成测试占比最高 |
| 反馈速度 | Feedback Speed | 从改动到得到测试结果的时间 |
| 失败定位 | Failure Localization | 测试失败后找到原因的难易程度 |
| 脆弱测试 | Flaky Test | 同样代码有时过有时不过的测试 |
| 测试重复 | Test Duplication | 多个层级重复验证同一件事 |

## Trade-offs by Layer

| Layer | Feedback speed | Realism | Failure localization | Typical cost |
| --- | --- | --- | --- | --- |
| [[Unit Test]] | 最快 | 低到中 | 最清楚 | 低 |
| [[Contract Test]] | 快 | 中 | 边界清楚 | 低到中 |
| [[Integration Test]] | 中 | 中到高 | 通常可控 | 中 |
| [[End-to-End Test]] | 慢 | 最高 | 较困难 | 高 |

越接近真实系统，不代表测试自动更“高级”。高级工程能力体现在：把风险放到最便宜且仍可信的层级验证，同时保留少量真实链路证据。

## Origin and Shapes

Martin Fowler 的说明：测试金字塔的核心是，你应该有比通过 GUI 运行的高层测试多得多的底层单元测试。如果只靠录制回放式的 UI 测试，会很慢、难以维护，变成“冰淇淋筒”。Google 给出的“第一个猜测”是 70% 单元测试、20% 集成测试、10% 端到端测试，同时强调每个团队的比例不同，但应保持金字塔形状。

不同架构可能形成不同组合：

- CRUD service 可以大量依赖 integration tests，因为 database semantics 是核心风险。
- Event-driven system 需要加强 contract、idempotency 和 failure-recovery tests。
- UI-heavy product 可能采用 Testing Trophy：integration tests 占比更高。Kent C. Dodds 的口号是 “Write tests. Not too many. Mostly integration.”
- LLM application 往往需要 component/graph evaluation；它们不完全符合传统 unit test 的确定性假设。

所以“底层最多”表达的是成本与反馈原则，不是强制的测试数量 KPI。

## Avoiding Duplicate Coverage

同一业务规则可以跨层出现，但每层应保护不同风险。Practical Test Pyramid 的原则是：尽可能把测试往金字塔下面推；如果高层测试发现了一个低层测试本可以发现的问题，就应该补一个低层测试。

| Layer | Example responsibility |
| --- | --- |
| Unit | 分类规则对输入的判断正确 |
| Integration | 分类结果被正确写入 state 或 database |
| Contract | 结果被正确转换成 API event |
| E2E | event 能经过真实链路到达用户 |

如果每层都重新运行全部分类样例并断言相同语义，通常是在复制维护成本，而不是增加有效覆盖。

## Gotchas

- 只有 unit tests 的 suite 可能对 schema、configuration 和 wiring 错误失明。
- 只有 E2E tests 的 suite 通常反馈慢、定位差，并容易受环境噪声影响。
- 用固定 sleep 缓解异步 flaky test 会掩盖 race condition；应等待可观察条件并设置明确 deadline。
- 测试数量不等于信心；一个保护关键 invariant 的测试可能比数百个浅层 assertion 更重要。
- 实际比例难以直接度量，但偏离金字塔会带来可度量的副作用：更长的测试时间和更多的 flaky test。

## Connections

### Organized by
- [[Test Classification Dimensions]]

### Shaped by
- [[Risk-Based Test Design]]

### Layers
- [[Unit Test]]
- [[Integration Test]]
- [[Contract Test]]
- [[End-to-End Test]]

## Sources

- [Martin Fowler — Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [Ham Vocke — The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Google Testing Blog — Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)
- [Kent C. Dodds — The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
