# Quartz 5：同步、核验与本地预览

本目录是 Quartz 5 的正式维护目录。发布分支为 `codex/quartz5`；推送到该分支会先测试和核验，再部署到 GitHub Pages。旧版 v4 分支与 `/home/hao/Desktop/personal_website` 目录保留用于恢复。

## 启动预览

在候选目录运行：

```bash
./publishing/preview.sh
```

它先生成插件索引、执行发布检查并构建，通过后才启动只监听本机的预览。地址为 `http://127.0.0.1:8885/personal_website/`，可用第一个参数更换端口。重启电脑后再次运行即可；没有配置开机自启。

## 发布规则

| 内容 | 规则 |
|---|---|
| Markdown | 必须显式使用布尔 draft；false 允许生成文章，true 隐藏草稿文章 |
| tags | 保留原始主题分类，不控制发布；v5 标签网址会规范为小写 |
| HTML 与附件 | 必须登记 publishing/assets.json；HTML 还必须明确 publish:true |
| 隐藏配置 | 不进入同步或生成产物；未知文件会停止检查 |
| 索引、sitemap 与 RSS | 只包含审核通过的文章，不混入 v5 的虚拟目录和标签导航页 |
| 独立 HTML | 专用发射器保留 .html 后缀；卡片跳转保留项目站点前缀 |
| 旧网址 | 保留 v4 文章、目录、标签和附件入口；搬迁的已发布文章在 `publishing/moved-articles.json` 登记旧新路径 |

文章、草稿和资源数量以每次发布检查的实时输出为准。目录重组或新建笔记后，不沿用旧基线数字。

## 独立检查

```bash
node --import tsx --test publishing/check.test.mjs publishing/compatibility.test.ts
node node_modules/typescript/bin/tsc --noEmit --incremental false
QUARTZ_LOCAL_PREVIEW=1 node publishing/publish.mjs check --source content --site . --output public
node publishing/verify-preview.mjs
```

最后一条需要预览服务已运行。`npm test` 会运行包含上述发布保护在内的完整测试。全部 npm 插件版本由 package-lock.json 固定；使用 `npm ci` 恢复依赖，再运行 `npm run install-plugins` 生成本地插件加载索引。本候选没有从未锁定的 Git 插件分支拉取代码。

## 后续从 Obsidian 内容源更新候选

```bash
node publishing/publish.mjs sync --apply \
  --source /home/hao/Desktop/HaoLifeOS/Personal_Website/content \
  --policy /home/hao/Desktop/HaoLifeOS/Personal_Website/publishing/assets.json \
  --site .
```

同步先临时构建验证，再备份并替换网站 content。独立编辑过的目标文件会阻止覆盖，已发布文章换路径却未登记迁移也会停止。之后重新启动预览。这个命令只更新本地 content，不提交、不推送、不部署。内容源的 pw_deploy.sh 会委托本目录的同一检查器运行；资源清单仍在内容源的 publishing/assets.json 中维护。

用户已授权每天中午 12 点（多伦多时间）自动检查并发布 `draft: false` 的文章。自动任务要先核对源文件保存稳定、Git 状态、构建与旧网址；有冲突或失败时停止并通知，不强行覆盖。草稿源码允许进入公开 Git 仓库，但草稿正文不生成网页。

## 迁移适配

`quartz.config.yaml` 保存站点设置和布局；`quartz.ts` 接入严格草稿过滤、独立 HTML 和旧网址兼容。仅本地预览设置 `QUARTZ_LOCAL_PREVIEW=1`，关闭生产统计。

v5 会把部分文件规范到 index 路径。隐藏草稿可能与生成目录导航共享网址；生成导航只列已发布条目，不含草稿正文，也不进入文章索引或 sitemap。目录自身的旧导航网址可跳转至新导航页，必须标记 `noindex`；普通草稿文章的旧网址仍返回 404。

保留 giscus 的仓库与分类配置。迁移时只读核验仓库尚无评论讨论；没有创建讨论或发送评论。本地页面尚无对应讨论时出现的 giscus 查询 404 与文章页面状态分开处理。

正式部署工作流为 .github/workflows/deploy-quartz5.yml，只有 codex/quartz5 分支推送或手动触发才部署；全部测试、类型检查和发布门槛通过后才允许发布。每次上线提供 static/release.json 记录版本与提交。旧 v4 自动部署在切换后停用。
