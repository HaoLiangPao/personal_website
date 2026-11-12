---
title: Transaction Isolation
tags:
  - CS
  - Distributed-Systems
  - Database
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Transaction Isolation 描述并发事务之间能够观察和影响彼此到什么程度。

## Important Distinctions

- **Atomicity**：单个事务是否全部成功或全部失败。
- **Isolation**：并发事务之间能看到什么中间状态。
- **Serializability**：并发执行结果是否等价于某种串行顺序。

一个事务内部完全原子，不代表多个并发事务组合起来一定满足所有业务约束。隔离级别不足时仍可能出现不可重复读、幻读或 Write Skew。

## Selection

应根据 [[Data Invariant|业务不变量]] 选择隔离方式，而不是默认所有操作都使用最强隔离。单行条件更新可能已经足够；跨记录约束则可能需要更强隔离、显式锁或重新设计数据模型。

## Connections

### Broader concepts
- [[Consistency]]
- [[Concurrency Control]]

### Related techniques
- [[Atomic Operation]]
- [[Optimistic Locking]]
- [[Database]]

