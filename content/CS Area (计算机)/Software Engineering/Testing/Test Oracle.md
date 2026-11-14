---
title: Test Oracle
tags:
  - CS
  - Testing
type: concept
source: work
Status: growing
draft: true
---

## Definition

Test Oracle 是判断某次执行结果是否可接受的依据。测试代码负责运行 system under test，而 oracle 回答“为什么这个结果算正确”。

没有可信 oracle 的测试，即使执行了大量路径，也只能证明系统运行过，不能证明行为正确。

## Common Oracle Types

| Oracle | 判断方式 | 适用场景 |
| --- | --- | --- |
| Exact expected value | 实际值必须等于 reference | 纯函数、serialization、固定格式 |
| Invariant | 结果必须始终满足约束 | 金额守恒、权限隔离、状态单向推进 |
| Property-based oracle | 对大量生成输入验证通用性质 | parser、排序、边界值和组合输入 |
| Differential oracle | 与旧实现或另一实现比较 | migration、compiler、算法替换 |
| Metamorphic relation | 输入按已知方式变化时，输出应满足对应关系 | 缺少唯一 expected answer 的系统 |
| Golden/reference data | 与人工审查的样例集合比较 | 搜索、推荐、LLM evaluation |
| Human or model judge | 根据 rubric 评分 | 开放式文本质量与主观标准 |

## Oracle Quality

好的 oracle 应尽可能具备：

- **Relevant**：直接对应要保护的业务或技术要求。
- **Independent**：不要把 production implementation 原样复制到 expected calculation。
- **Stable**：实现重构但行为不变时不应大量失败。
- **Diagnostic**：失败能说明哪一条约束没有满足。
- **Versioned**：reference、schema 和规则变化时可以追溯。

## Example

假设异步任务允许状态：

`accepted → processing → completed | failed`

Oracle 不一定要求每次观察到完全相同的状态序列，因为 polling 可能跳过瞬时状态；但可以验证这些 invariant：

- terminal state 只能是 `completed` 或 `failed`；
- terminal state 之后不能回到 `processing`；
- request A 的结果不能被 request B 读取；
- `completed` 可见时，对应最终结果也必须可读取。

这种 invariant-based oracle 比把某一次运行日志当作唯一正确序列更稳健。

## The Oracle Problem

复杂系统经常不存在唯一正确答案：

- 多个文档都可能支持答案；
- 自然语言可以有多种正确表达；
- 并发执行的合法顺序不止一种；
- 新实现可能比旧 baseline 更好。

这时应把一个模糊的总分拆成多个可解释标准，例如 correctness、groundedness、format、latency 和 cost，而不是强迫所有输出完全相等。

## Gotchas

- Regex 适合验证格式和必需片段，不等于语义正确性。
- Baseline 表示旧版本实际表现，不一定代表理想答案。
- Mock 的返回值是测试输入安排，不是 production behavior 的证据。
- Oracle 自身也可能有 bug；关键规则需要人工审查、交叉实现或 mutation testing 检验其有效性。

## Connections

### Uses
- [[Data Invariant]]

### Guides
- [[Unit Test]]
- [[Integration Test]]
- [[Contract Test]]
- [[End-to-End Test]]

### Designed through
- [[Risk-Based Test Design]]

