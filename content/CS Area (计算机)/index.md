---
title: CS Area
tags:
  - CS
draft: true
---
文件夹只按领域分,笔记的类型、来源、成熟度写在 frontmatter。

## Properties Reference

新建笔记请优先使用 `Template/` 里的模板,它们已带好这些属性。

| 属性 | 类型 | 可选值 | 说明 |
| --- | --- | --- | --- |
| `title` | Text | 自由文本 | 笔记标题,与文件名保持一致 |
| `tags` | List | `CS`、`AWS`、`LLM`、`LangGraph` 等 | 领域 / 技术标签,可多个 |
| `type` | Text | `concept` / `problem` / `howto` / `gap` | 概念 / 踩坑 / 操作步骤 / 盲区,**只选一个** |
| `source` | Text | `work` / `omscs` / `reading` | 知识来源:工作 / GT 课程 / 阅读 |
| `Status` | Text | `seed` / `growing` / `evergreen` | 成熟度:刚记下 / 在补充 / 已成型 |
| `draft` | Checkbox | `true` / `false` | `true` 不会发布到网站 |
| `aliases` | List | 自由文本 | 别名,方便 `[[链接]]` 搜索 |
| `cssclasses` | List | 自由文本 | 给单篇笔记加样式,很少用 |

**注意:**
- `type`、`source`、`Status` 都是**单值 Text**,不是 List。只有会同时取多个值的属性才用 List。
- 属性类型是整个 vault 共用的 (见 `.obsidian/types.json`)。同名属性在所有笔记里类型必须一致,否则会出现警告图标。
- `Status` 首字母大写,是因为 vault 里早就登记了这个名字,保持一致可避免冲突。
- 可选值写在这里,不要写进模板的行内注释,Obsidian 编辑属性时会把注释吞掉。
- 旧笔记缺少这些属性没关系,碰到时再补。

### 示例

```yaml
---
title: Lambda Cold Start
tags:
  - CS
  - AWS
type: problem
source: work
Status: seed
draft: true
---
```

### 模板

| 模板 | 用途 |
| --- | --- |
| CS Concept | 讲清楚一个概念 |
| CS Problem | 记录一次踩坑:现象、根因、修复 |
| CS Gap | 记录知识盲区和自测题 |

## Areas
- [[Cloud/index|Cloud]]: AWS
- [[LLM and Agents/Best AI Practice/index|LLM and Agents]]: LangChain、LangGraph、RAG、Best AI Practice
- AI and ML: ML、DL、RL
- Algorithms and Theory: CS6515
- DevOps and Tooling: Docker、Kubernetes、Deployment、Jenkins、Git
- Systems: OS、Linux、Networks、zOS
- [[Software Engineering/Distributed Systems/index|Distributed Systems]]: Consistency、Concurrency、Messaging、Resilience、Observability
- Software Engineering: Web、Database、Distributed Systems
- Security
