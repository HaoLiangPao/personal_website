---
title: Cache Invalidation
tags:
  - CS
  - Distributed-Systems
type: concept
source: reading
Status: growing
draft: false
---

## Definition

Cache Invalidation 是在源数据变化后删除、更新或自然淘汰旧缓存的过程。

## Common Strategies

- TTL：在限定时间后自动过期。
- Write-through：写入时同步更新缓存。
- Explicit invalidation：数据变化后主动删除缓存 Key。
- Versioned key：把版本放进 Key，避免新旧数据冲突。

## Gotchas

- 更新数据库和删除缓存是两个操作，存在部分失败窗口。
- TTL 越短不一定越好，会增加后端负载。
- 热点 Key 同时过期可能形成 Cache Stampede。
- 金融关键判断需要明确 Source of Truth，不能把缓存当成权威账本。

## Connections

### Part of
- [[Caching]]

### Related concepts
- [[Consistency]]
- [[Reliable Asynchronous Processing]]

