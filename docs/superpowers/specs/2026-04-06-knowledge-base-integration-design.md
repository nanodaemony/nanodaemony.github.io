---
title: 知识库整合设计
date: 2026-04-06
status: approved
---

# 知识库整合设计文档

## Context

用户希望将四个独立的 Markdown 知识库（NanoBook、NanoGrid、NanoLife、NanoMind）整合到一个 VitePress 站点中，通过 Web 进行查看和管理。知识库分布在 `E:\KnowledgeOcean` 目录下，每个知识库都有独立的目录结构和图片资源。

**Why:** 用户需要一个统一的 Web 端入口来浏览和管理分散的知识库内容，便于日常查阅和分享。

**How to apply:** 设计应关注统一的访问入口、清晰的导航结构、以及便捷的内容同步机制。

---

## Requirements Summary

| 项目     | 选择                                |
| -------- | ----------------------------------- |
| 网站名称 | 达尔文的猹                          |
| 导航布局 | 顶部导航 + 首页卡片                 |
| 首页内容 | 知识库卡片、个人简介、统计信息      |
| 图片存放 | 各知识库独立 zimg                   |
| 侧边栏   | 自动生成（支持多层级嵌套）          |
| 同步脚本 | Node.js，删除旧文件再同步，自动构建 |
| 部署方式 | GitHub Pages                        |

---

## Architecture

### 方案选择

采用 **单 VitePress + 多侧边栏配置** 方案，原因：

- 总文档数约 75 个，单站点足够应对
- 所有知识库在同一站点内，导航切换流畅
- 维护简单，部署方便

### 目录结构

```
vitepress-nav/
├── docs/
│   ├── index.md                 # 首页
│   ├── NanoMind/                # 技术知识库（38个文档）
│   │   ├── index.md             # 知识库首页
│   │   ├── zimg/                # 图片资源
│   │   ├── A-AIGC/, B-知识库/, C-工作/, ...  # 分类目录
│   ├── NanoGrid/                # 项目知识库（12个文档）
│   │   ├── index.md
│   │   ├── zimg/
│   │   ├── A-小方格/, B-轻记/, ...
│   ├── NanoLife/                # 生活知识库（25个文档）
│   │   ├── index.md
│   │   ├── zimg/
│   │   ├── A-书架/, B-生活/, ...
│   ├── NanoBook/                # 书籍知识库（预留空目录）
│   │   ├── index.md
│   │   └── zimg/
│   └── public/                  # 静态资源（logo等）
├── scripts/
│   └ sync-knowledge.js          # 同步脚本
│   └── generate-sidebar.js      # 侧边栏生成脚本
├── docs/.vitepress/
│   └ config.ts                  # VitePress配置（更新标题等）
│   ├── configs/
│   │   └ nav.ts                 # 导航栏配置
│   │   └ sidebar.ts             # 侧边栏配置（自动生成）
│   └── theme/                   # 保留现有主题
└── package.json                 # 添加sync脚本命令
```

---

## Components

### 1. 首页设计

**布局结构：**

```
┌────────────────────────────────────────────┐
│  个人简介区域                                │
│  ┌──────────────────────────────────────┐  │
│  │ Logo + 名称 "达尔文的猹"              │  │
│  │ 一段个人介绍文字                       │  │
│  └──────────────────────────────────────┐  │
├────────────────────────────────────────────┤
│  知识库统计                                 │
│  ┌──────────────────────────────────────┐  │
│  │ 总文档数: 75 | 最后更新: 2026-04-06   │  │
│  └──────────────────────────────────────┐  │
├────────────────────────────────────────────┤
│  知识库卡片                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ 书籍      │ │ 项目     │ │ 生活     │    │
│  │ NanoBook │ │ NanoGrid │ │ NanoLife │    │
│  │ 0 文档   │ │ 12 文档  │ │ 25 文档  │    │
│  └──────────┘ ┌──────────┐ └──────────┘    │
│              │ 技术      │                 │
│              │ NanoMind  │                 │
│              │ 38 文档   │                 │
│              └──────────┘                 │
└────────────────────────────────────────────┘
```

**实现方式：**

- 使用 VitePress frontmatter 自定义布局
- 知识库卡片使用现有的 `MNavLinks` 组件
- 统计信息通过脚本生成到 `stats.json`，首页读取显示

### 2. 导航栏

**配置：**

```typescript
// docs/.vitepress/configs/nav.ts
export const nav = [
  { text: '首页', link: '/' },
  { text: '书籍', link: '/NanoBook/' },
  { text: '项目', link: '/NanoGrid/' },
  { text: '生活', link: '/NanoLife/' },
  { text: '技术', link: '/NanoMind/' },
]
```

### 3. 侧边栏自动生成

**生成规则：**

- 递归扫描目录，生成嵌套侧边栏
- 一级目录（如 A-AIGC）默认展开（`collapsed: false`）
- 二级及以下目录默认折叠（`collapsed: true`）
- 文件和文件夹并列时，文件作为同级 `items` 显示
- 跳过目录：`zimg`, `.obsidian`, `.claude`, `index.md`
- 按文件名/目录名自然排序

**示例输出：**

```javascript
{
  '/NanoMind/': [
    {
      text: 'C-工作',
      collapsed: false,
      items: [
        {
          text: '1-工作总结',
          collapsed: true,
          items: [
            { text: '工作经验', link: '/NanoMind/C-工作/1-工作总结/工作经验' }
          ]
        },
        {
          text: '3-2025面试',
          collapsed: true,
          items: [
            { text: '1.总结', link: '/NanoMind/C-工作/3-2025面试/1.总结' },
            { text: '10.综合问题', link: '/NanoMind/C-工作/3-2025面试/10.综合问题' }
          ]
        }
      ]
    }
  ]
}
```

---

## Data Flow

### 同步脚本流程

```
┌─────────────────┐
│ 运行 pnpm sync  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 清理目标目录     │
│ 删除 docs/       │
│ NanoMind/*等     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 复制知识库内容   │
│ E:\KnowledgeOcean│
│ → docs/          │
│ 跳过.obsidian等  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 生成索引文件     │
│ 每个知识库       │
│ index.md         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 生成侧边栏配置   │
│ sidebar.ts       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 生成统计信息     │
│ stats.json       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 执行构建         │
│ pnpm docs:build  │
└─────────────────┘
```

---

## Implementation Details

### 同步脚本

**文件：** `scripts/sync-knowledge.js`

**功能：**

1. 清理目标目录
2. 复制知识库内容（跳过 `.obsidian`, `.claude`）
3. 为每个知识库生成 `index.md` 首页
4. 递归扫描目录生成 `sidebar.ts`
5. 生成 `stats.json` 统计信息
6. 执行 `pnpm docs:build`

**package.json 命令：**

```json
{
  "scripts": {
    "sync": "node scripts/sync-knowledge.js",
    "sync:build": "node scripts/sync-knowledge.js && pnpm docs:build"
  }
}
```

### 知识库首页模板

每个知识库的 `index.md` 内容：

```markdown
---
title: { 知识库名称 }
---

# {知识库名称}

{知识库描述}

## 目录导航

{自动生成的目录列表}
```

---

## Verification

### 本地测试

1. 运行同步脚本：`pnpm sync`
2. 启动开发服务器：`pnpm docs:dev`
3. 检查：
   - 首页显示正确（个人简介、统计信息、知识库卡片）
   - 导航栏链接正确跳转
   - 侧边栏结构正确反映目录层级
   - 各文档页面正常渲染
   - 图片正确加载

### 构建测试

1. 运行构建：`pnpm docs:build`
2. 预览构建结果：`pnpm docs:preview`
3. 检查生成的静态文件结构

### 部署测试

1. 推送到 GitHub
2. GitHub Actions 自动构建部署
3. 检查 GitHub Pages 是否正常访问

---

## File Changes

### 需要修改的文件

| 文件路径                         | 操作 | 说明                   |
| -------------------------------- | ---- | ---------------------- |
| `docs/.vitepress/config.ts`      | 修改 | 更新标题为"达尔文的猹" |
| `docs/.vitepress/configs/nav.ts` | 修改 | 更新导航栏配置         |
| `package.json`                   | 修改 | 添加 sync 命令         |
| `.github/workflows/deploy.yml`   | 检查 | 确保配置正确           |

### 需要新增的文件

| 文件路径                             | 说明                                 |
| ------------------------------------ | ------------------------------------ |
| `scripts/sync-knowledge.js`          | 同步脚本（主脚本，包含所有生成逻辑） |
| `docs/index.md`                      | 首页                                 |
| `docs/.vitepress/configs/sidebar.ts` | 侧边栏配置（由同步脚本生成）         |
| `docs/stats.json`                    | 统计信息（生成）                     |
| 各知识库 `index.md`                  | 知识库首页（生成）                   |

**注意：** `sidebar.ts` 由同步脚本自动生成，每次运行 `pnpm sync` 时会覆盖更新。
