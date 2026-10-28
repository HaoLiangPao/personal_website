# Quartz 5 候选版本：同步、核验与本地预览

本目录已通过本地验收，作为 Quartz 5 的正式维护目录。发布分支为 `codex/quartz5`；推送到该分支会先测试和核验，再部署到 GitHub Pages。旧版 v4 分支与 `/home/hao/Desktop/personal_website` 目录保留用于恢复。

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
| 旧网址 | 保留 v4 文章、目录、标签和附件入口；原草稿文章网址不生成重定向 |

当前基线：98 篇文章，其中 75 篇发布、23 篇草稿；15 个附件、3 个 HTML。导入的 116 个内容文件与已上线 v4 版本逐字节一致。

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

同步先临时构建验证，再备份并替换候选 content。独立编辑过的目标文件会阻止覆盖。之后重新启动预览。这个命令只更新本地 content，不提交、不推送、不部署。正式切换后，内容源的 pw_deploy.sh 会委托本目录的同一检查器运行；资源清单仍在内容源的 publishing/assets.json 中维护。

## 迁移适配

`quartz.config.yaml` 保存站点设置和布局；`quartz.ts` 接入严格草稿过滤、独立 HTML 和旧网址兼容。仅本地预览设置 `QUARTZ_LOCAL_PREVIEW=1`，关闭生产统计。

v5 会把与文件夹同名的文件规范到 index 路径。当前有一篇隐藏草稿与生成目录导航共享这个规范路径：生成的导航页被明确标记，只有已发布条目，不含草稿正文，也不进入文章索引或 sitemap；其原 v4 草稿文章网址继续返回 404。

保留 giscus 的仓库与分类配置。迁移时只读核验仓库尚无评论讨论；没有创建讨论或发送评论。本地页面尚无对应讨论时出现的 giscus 查询 404 与文章页面状态分开处理。

正式部署工作流为 .github/workflows/deploy-quartz5.yml，只有 codex/quartz5 分支推送或手动触发才部署；全部测试、类型检查和发布门槛通过后才允许发布。每次上线提供 static/release.json 记录版本与提交。旧 v4 自动部署在切换后停用。
