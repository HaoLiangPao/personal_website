# 本地同步与发布前检查

本流程使用现有 Quartz 和已安装依赖，不负责升级、提交、拉取、推送或部署。

## 常用操作

在本项目根目录运行：

```bash
# 默认：验证文章、预览差异、临时构建并核对输出；不改网站 content
./pw_deploy.sh

# 只预览差异，不构建
./pw_deploy.sh plan

# 检查成功后，同步到网站仓库根目录的 content；仍不发布
./pw_deploy.sh sync --apply
```

也可以用 `--site /绝对路径` 指定网站仓库，或设置 `QUARTZ_SITE_DIR`。`--report` 可保存不含文章正文的 JSON 核验结果。默认网站目录是 `/home/hao/Desktop/personal_website`，不是其 `quartz/content` 子目录。

## 发布规则

| 内容 | 规则 |
|---|---|
| Markdown 文章 | 每篇必须有布尔 `draft: false` 或 `draft: true`；缺失、带引号的字符串等格式会停止检查 |
| `draft: false` | 允许生成网页，必须出现在文章索引和 sitemap 中 |
| `draft: true` | 草稿源码可同步到公开仓库，但不能生成独立文章网页或进入文章索引 / sitemap |
| 分类 tags | 列表格式；只用于主题分类，不控制发布 |
| 图片 / PDF / 媒体 | 必须登记在 `assets.json` 的 `assets` 中；这里延续已有 15 个站点附件 |
| 独立 HTML | 必须登记在 `html_pages` 中，每项明确指定布尔 `publish`；false 不进入构建或网站目录 |
| Obsidian / Claudian 等隐藏文件 | 源库隐藏文件不进入同步或构建；网站目标中已有的隐藏配置原样保留在本地 |
| 已知非网页文件 | `ignored_files` 中的 `Untitled.base` 不进入构建；未登记的新文件会停止检查 |

HTML 条目示例：

```json
{"path": "CS Area (计算机)/Algorithm/CS6515/demo.html", "publish": false}
```

把 `publish` 改为 true 之前，应先确认内容和依赖，再运行检查。独立 HTML 不会因为旁边的 Markdown 是草稿就自动隐藏；二者分别控制。

## 同步与回退

同步先从源库形成干净输入并临时构建，通过文章索引、草稿文件和 sitemap 核对之后才替换目标 `content`。旧目录完整保存到网站仓库忽略目录 `.quartz-cache/publish-backups/`，检查报告记录具体路径。

如果目标文章有独立的未提交改动，同步会停止；由本工具上一次同步产生且没有被另外编辑的改动，允许重复检查或同步。工具不会自动 reset、stash 或提交。同步过程中源文件或目标变化也会停止。源笔记不被修改。

网站旧的 `quartz/content` 重复目录本轮不再写入，也不自动删除。自动构建只使用根目录 `content`。本地已有隐藏配置会保留，但不会进入构建输出。

## 网站仓库的 CI

网站仓库保留一份 `publishing/` 检查程序和资源清单。日常只修改本内容库的 `assets.json`：`sync --apply` 会把资源清单一并带到网站仓库，CI 使用同一发布决定。网站资源清单有独立改动时会停止覆盖。只有开发检查程序本身时才需要同步程序文件；没有自动安装或升级步骤。

CI 的依赖安装完成后运行：

```bash
node --test publishing/check.test.mjs
node node_modules/typescript/bin/tsc --noEmit --incremental false
node publishing/publish.mjs check --source content --site . --output public
```

第二条命令只把通过验证的构建导出到 `public`。部署工作流随后才允许上传产物；本轮只修改本地工作流，不触发远端运行。

## 框架版本范围

检查器当前适配 Quartz 4 的网址大小写和构建结构。将来迁移 Quartz 5 时，需要一起适配其小写网址规则、插件安装和配置方式；不能直接复用后就认定升级成功。

CS6515 卡片使用 `data-standalone` 和 `data-router-ignore`。网站配置中的 `StandaloneHtmlLinks` 在 CrawlLinks 之后恢复这些链接的 `.html` 后缀，并避开普通笔记悬浮预览和关系图链接处理。`cs6515-cards.scss` 的样式仅作用于这三张卡片；网站的 custom.scss 保存实际样式。

CS6515 入口和三个互动页已获准发布。入口默认显示英文，以原生语言选项切换中文；三个互动页每次打开默认英文，页面内的 `中文` / `English` 按钮用于当前页面的语言切换，不读取旧的语言偏好。Downloads 中的原始 HTML 保持不变。
