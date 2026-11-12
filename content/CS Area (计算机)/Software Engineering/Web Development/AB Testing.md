---
title: AB Testing
tags:
  - CS
  - Web
type: concept
source: reading
Status: growing
draft: false
---

## Definition

A/B Testing 将用户随机分配到不同实验组，通过预先定义的产品或业务指标比较不同方案的效果。

## Different From Canary Deployment

虽然两者都可能拆分流量，但目标不同：

| | A/B Testing | [[Canary Deployment]] |
| --- | --- | --- |
| 主要目标 | 评估产品或业务假设 | 降低新版本发布风险 |
| 分组依据 | 实验设计和随机分配 | 发布阶段与风险控制 |
| 主要指标 | 转化、留存、参与度 | 错误率、延迟、业务正确性 |
| 结束方式 | 根据统计结果选择方案 | 扩大到 100% 或回滚 |

同一次流量路由可以同时支持实验和发布，但不应把两种决策过程混为一谈。

## Connections

### Compared with
- [[Canary Deployment]]

### Related
- [[Observability]]
- [[Latency Percentiles]]
