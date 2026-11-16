---
draft: true
name: atomic-note-review
version: 0.1.0
description: |
  Audit and rewrite atomic notes in an Obsidian/Quartz vault: verify facts against
  official primary sources, fix errors, expand thin notes with mechanisms/examples,
  add a bilingual (中文 | English) Key Terms table and Mermaid diagrams, cite sources,
  and validate links/frontmatter/diagrams. Use when the user asks to "review/verify
  the quality of notes", "检查笔记质量", "原子笔记太简单, 补充/纠正", "核对事实并标注出处",
  or to process one knowledge area (e.g. Security, Cloud, Distributed Systems) note by note.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - WebSearch
  - AskUserQuestion
---

# /atomic-note-review — 原子笔记审核与改写

一次处理**一个领域**。先出计划、等用户确认，再改。改完汇报并问下一个领域，不要自己连着做。

## 先确认的事（只问用户才能定的）

- 范围：哪些目录；旧的 stub 笔记要不要一起处理。
- 深度：A = 补例子和来源；B = 补机制和对比；C = 只列清单、用户自己写。默认 A+B。
- 发布：`draft: true` 的笔记审完后是否改成 `false`；新增的讨论性笔记默认 `draft: true`，不要擅自发布。
- 用户的习惯：关键名词要**中英文对照**；讲知识点要**配图**；要**标注出处**；用户之后会自己再改，所以不必过度打磨措辞。

## 工作流

### 0. 机械检查（先做，结果写进计划）

```bash
S=~/.claude/skills/atomic-note-review/scripts
python3 $S/check_notes.py <领域目录> --vault <vault 根> --index <领域 index.md>
```

输出断链、标题锚点、frontmatter 缺项、孤儿、未进 index 的笔记，以及缺 Key Terms/配图/Sources 的清单。再用 `find -printf "%s"` 看篇幅，约 1KB 以下的原子笔记通常就是“太简单”的候选。

### 1. 通读整个领域，再列计划

- 把领域内所有笔记读完再动手，才能发现笔记之间的矛盾（例如同一个词在两篇里含义不同）和重复。
- 计划分四档给用户：**已验证无误 / 需要纠正 / 建议补充 / 待核实**。不要为了显得有收获而编造错误：真实经验里，成篇的事实错误很少，主要问题是内容偏薄、缺来源、概念表述含糊、产品事实过时。
- 同时列出需要用户决定的事，等确认。

### 2. 核对事实（对照一手来源，不要只信搜索摘要）

1. 用 WebSearch 找官方页面的 URL。
2. 用 `scripts/fetch_doc.py -d /tmp/src URL ...` 把页面抓成文本，再用 `grep`/`sed` 读到具体条款、数字、限制。
3. 一手来源优先级：官方文档 > 原论文/RFC/规范 > 权威工程博客（Google SRE、AWS Builders' Library、Jepsen、microservices.io）> 其他。
4. 只写**核对到**的说法。核对不到的：删掉、改成不带数字的稳妥表述，或在汇报里明确标为“未核实”。只从搜索摘要得到的，也要在汇报里说明。
5. 产品文档会比你的记忆新。**对云服务和框架，永远以当前文档为准**（实例：ECS 现在推荐原生 blue/green，不再是 CodeDeploy；Lambda 现在分 Event Functions / Web Functions / MicroVMs 三种计算原语，控制台里原函数类型改称 Event function；官方已经出现 Lambda Managed Instances 和 durable functions）。
6. 易变数字（配额、限制、价格）写上“以官方 Quotas 页面为准”。
7. 发现原笔记里的某条说法其实是对的，也要如实说“我核实过了，是对的”，并补上准确数字和出处。

### 3. 改写

按下面的规范写成 bundle 文件，用脚本一次落盘：

```bash
python3 $S/apply_bundle.py bundle.md --base "<笔记根目录>"      # 整篇正文重写, 保留 frontmatter
python3 $S/insert_terms.py terms.md --dir "<目录>"              # 只给已有笔记插入 Key Terms 表和配图
```

不要用 Edit 逐篇改：Edit 要求先 Read，且改几十篇太慢；bundle 脚本保留原 frontmatter，新建文件时在 bundle 里自带 frontmatter。

只改被确认的范围；不要顺手扩大改动，也不要改 frontmatter 字段（除非用户要求）。

### 4. 验证

```bash
python3 $S/check_notes.py <目录> --vault <vault 根> --index <index.md> --external
node $S/check_mermaid.mjs <目录>
```

- `check_notes.py` 会报告两类死链：①断链（目标不存在、标题锚点不存在）；②**指向 `draft: true` 笔记的链接**——已发布笔记链到草稿，在网站上就是死链。第二类要么把目标笔记转为 `false`，要么去掉链接，不要留着。
- 加 `--external` 会逐个请求笔记里的外部出处 URL：404/410/连接失败是真失效，要换成现行地址并确认页面内容仍支持笔记里的说法；403/429 是站点拦截脚本，只能人工打开确认。云厂商文档改版很频繁（实例：Well-Architected 的 `framework/` 路径已迁到 `reliability-pillar/`），写完一个领域就跑一次。
- Mermaid 校验的依赖只需装一次：`mkdir -p ~/.cache/atomic-note-review && cd ~/.cache/atomic-note-review && npm init -y && npm i mermaid@10 jsdom@22`（node 22 下 jsdom 必须是 22.x，更新的版本会报 ESM 错误）。
- 逐条回看自己写进去的数字和限制，确认都能在抓取的页面里找到。
- 文档类改动不需要走 code-guardian 审核。

### 5. 汇报

- 分四段：纠正了什么（带原因和出处）/ 补充了什么 / 没核实或只靠摘要核实的 / 需要用户决定的。
- 不要写成“审核通过”。如实说明哪些没验证。
- 默认**不提交**（vault 有自动备份）。`.obsidian/workspace.json` 的改动是 Obsidian 自己产生的，不用管。
- 最后问下一个领域。

## 笔记写作规范

保持原有 frontmatter（`title`、`tags`、`type`、`source`、`Status`、`draft`）。正文骨架：

```markdown
## Definition
一两句话：它是什么、解决什么问题。

## Key Terms
| 中文 | English | 含义 |
| --- | --- | --- |
| 幂等键 | Idempotency Key | ... |

## <机制或例子，配图放在这里>

## Gotchas
## Connections
### <分组>
- [[相关笔记]]

## Sources
- [官方文档标题](URL)
```

- **一篇一个概念**。一张大图或一个大主题要拆成几篇原子笔记再用总览笔记串起来（实例：Jepsen 一致性模型图 → `Consistency Models` 总览 + `Linearizability` / `Serializability` / `Snapshot Isolation`）。
- 正文用中文，关键名词保留英文并在 Key Terms 表里给出中文对照；表里每个术语都应是正文用到的。
- 定义要精确。词有多种含义时（如 Consistency 在 CAP / ACID / 事务隔离 / 复制里各不相同），用一张对照表说清。
- 对产品行为要写**条件**：例如 PostgreSQL 的行为随隔离级别不同，不要写成无条件成立。
- **原子笔记用中性例子**（库存、订单、支付）。雇主或业务领域的具体内容留在案例笔记里，不要写进概念笔记。
- 例子要能验证：给出具体数字、时间线或命令，不要空泛。
- 每篇的 `## Sources` 只放真正支撑了笔记内容的出处。通用方法确实找不到权威出处时，不要硬凑，在汇报里说明。
- `[[链接]]` 的标题锚点不要含冒号（`[[Note#Heading]]` 对含 `:` 的标题会失效）。

## 配图规范（Mermaid）

- 用代码块 ```` ```mermaid ````，Obsidian 里直接渲染。
- 选图：交互和时序用 `sequenceDiagram`；决策和流程用 `flowchart`；生命周期用 `stateDiagram-v2`；时间轴上的重叠操作用 `gantt`（`dateFormat X`）。
- 每张图服务于一个点，节点保持在十个以内，标签用中文。
- 节点标签里含 `(` `)` `/` `<br/>` `×` `^` 时整体加引号：`A["min(cap, base × 2^n)"]`。
- 带文字的虚线边写成 `A -. 文字 .-> B` 或 `A -.->|文字| B`，不要省略空格。
- 不要在标签里用分号 `;`。
- `xychart-beta` 在较旧的 Obsidian 里可能不渲染，用它时必须在图上方用文字写出数字。
- 画完一定跑 `check_mermaid.mjs`。

## 已知坑

- 工具：Edit/Write 需要先 Read；用 `sed -i` 改含中文和正则特殊字符的行容易不匹配，改完要重新核对；改完用脚本检查而不是肉眼。
- 路径里有空格和括号（如 `CS Area (计算机)`），命令里都要加引号。
- 抓取的临时文件放 `/tmp/src`，不要放进 vault。
- 一个领域内的数字、术语、链接要跨笔记保持一致：改完一篇，回头检查引用它的笔记（例如 SQS 的 `maxReceiveCount` 建议值同时出现在 SQS、DLQ、Delivery Semantics）。
- 改完一个领域后，扫一遍整个 vault 的“已发布 → 草稿”链接（`check_notes.py <整个知识库目录> --vault <vault 根>` 过滤“死链”），把结果告诉用户，由用户决定是转 `false` 还是去掉链接。
- 新增笔记要进对应 `index.md`。讨论性或未审的新笔记设 `draft: true`、暂不放进 index，并告诉用户：转为 `false` 之前，已发布笔记里指向它的链接在网站上是死链。
- `type: gap`（如 `AWS Gaps`）是盲区清单，`type: problem` 是踩坑记录，都不属于概念笔记，不要套用概念笔记的骨架，也不要擅自改它们的 `draft`。
