# 知识库整合实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将四个独立知识库整合到单个 VitePress 站点，提供统一 Web 访问入口和自动同步机制。

**Architecture:** 单 VitePress 站点 + 多侧边栏配置，通过 Node.js 同步脚本将外部知识库复制到 docs 目录并自动生成配置。

**Tech Stack:** VitePress, Node.js (ESM), TypeScript

---

## File Structure

### 新增文件

| 文件路径                             | 职责                                                   |
| ------------------------------------ | ------------------------------------------------------ |
| `scripts/sync-knowledge.js`          | 主同步脚本：清理、复制、生成侧边栏、生成统计、生成首页 |
| `docs/index.md`                      | 站点首页：个人简介、统计信息、知识库卡片               |
| `docs/.vitepress/configs/sidebar.ts` | 侧边栏配置（由脚本生成）                               |
| `docs/stats.json`                    | 统计信息（由脚本生成）                                 |

### 修改文件

| 文件路径                         | 职责           |
| -------------------------------- | -------------- |
| `package.json`                   | 添加 sync 命令 |
| `docs/.vitepress/config.ts`      | 更新标题、描述 |
| `docs/.vitepress/configs/nav.ts` | 更新导航栏     |

---

## Task 1: 创建同步脚本基础结构

**Files:**

- Create: `scripts/sync-knowledge.js`
- Modify: `package.json:7-13`

- [ ] **Step 1: 创建 scripts 目录**

```bash
mkdir -p scripts
```

- [ ] **Step 2: 创建同步脚本骨架**

创建 `scripts/sync-knowledge.js`:

```javascript
#!/usr/bin/env node
/**
 * 知识库同步脚本
 * 将 E:\KnowledgeOcean 下的知识库同步到 VitePress docs 目录
 */

import { existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')
const DOCS_DIR = resolve(ROOT_DIR, 'docs')
const KNOWLEDGE_BASE_ROOT = 'E:/KnowledgeOcean'

// 知识库配置
const KNOWLEDGE_BASES = [
  { name: 'NanoBook', title: '书籍', description: '书籍阅读笔记与知识整理' },
  { name: 'NanoGrid', title: '项目', description: '项目文档与功能格子说明' },
  { name: 'NanoLife', title: '生活', description: '生活记录、读书笔记、影音感想' },
  { name: 'NanoMind', title: '技术', description: '技术知识、工作总结、学习笔记' },
]

// 跳过的目录
const SKIP_DIRS = ['.obsidian', '.claude', 'node_modules', '.git']

console.log('🚀 开始同步知识库...')
console.log(`源目录: ${KNOWLEDGE_BASE_ROOT}`)
console.log(`目标目录: ${DOCS_DIR}`)

// 主函数（后续步骤填充）
async function main() {
  // TODO: Step 3 填充
}

main().catch(console.error)
```

- [ ] **Step 3: 修改 package.json 添加 sync 命令**

修改 `package.json` scripts 部分:

```json
{
  "scripts": {
    "dev": "vitepress dev docs --port=8732",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs --port 8730",
    "prepare": "husky install",
    "format": "prettier --write .",
    "sync": "node scripts/sync-knowledge.js",
    "sync:dev": "node scripts/sync-knowledge.js && pnpm dev"
  }
}
```

- [ ] **Step 4: 验证脚本可执行**

```bash
node scripts/sync-knowledge.js
```

Expected: 输出 "🚀 开始同步知识库..." 和目录信息，无报错

---

## Task 2: 实现清理功能

**Files:**

- Modify: `scripts/sync-knowledge.js`

- [ ] **Step 1: 添加清理目标目录的函数**

在 `scripts/sync-knowledge.js` 添加清理函数（在 `SKIP_DIRS` 定义之后）:

```javascript
import { existsSync, mkdirSync, rmSync, readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// ... 前面的配置保持不变 ...

/**
 * 清理目标知识库目录
 * @param {string} baseName 知识库名称
 */
function cleanTargetDir(baseName) {
  const targetDir = resolve(DOCS_DIR, baseName)
  if (existsSync(targetDir)) {
    console.log(`  🧹 清理目录: ${targetDir}`)
    rmSync(targetDir, { recursive: true, force: true })
  }
}

/**
 * 清理所有目标目录
 */
function cleanAllTargetDirs() {
  console.log('\n📦 Step 1: 清理目标目录')
  for (const base of KNOWLEDGE_BASES) {
    cleanTargetDir(base.name)
  }
}
```

- [ ] **Step 2: 在 main 函数中调用清理**

更新 `main` 函数:

```javascript
async function main() {
  cleanAllTargetDirs()
  console.log('✅ 清理完成')
}

main().catch(console.error)
```

- [ ] **Step 3: 运行脚本验证清理功能**

```bash
node scripts/sync-knowledge.js
```

Expected: 输出清理步骤信息

---

## Task 3: 实现复制功能

**Files:**

- Modify: `scripts/sync-knowledge.js`

- [ ] **Step 1: 添加复制目录的函数**

在 `scripts/sync-knowledge.js` 添加复制函数（在 `cleanAllTargetDirs` 之后）:

```javascript
import { existsSync, mkdirSync, rmSync, readdirSync, statSync, cpSync } from 'node:fs'

// ... 前面的代码保持不变 ...

/**
 * 递归复制目录，跳过指定目录
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 */
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true })
  const entries = readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    // 跳过指定目录
    if (entry.isDirectory() && SKIP_DIRS.includes(entry.name)) {
      continue
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      // 复制文件
      cpSync(srcPath, destPath, { force: true })
    }
  }
}

/**
 * 复制所有知识库
 */
function copyAllKnowledgeBases() {
  console.log('\n📦 Step 2: 复制知识库内容')
  for (const base of KNOWLEDGE_BASES) {
    const srcDir = resolve(KNOWLEDGE_BASE_ROOT, base.name)
    const destDir = resolve(DOCS_DIR, base.name)

    if (existsSync(srcDir)) {
      console.log(`  📁 复制: ${base.name} (${srcDir} → ${destDir})`)
      copyDir(srcDir, destDir)
    } else {
      console.log(`  ⚠️ 源目录不存在: ${srcDir}`)
      mkdirSync(destDir, { recursive: true })
    }
  }
}
```

- [ ] **Step 2: 更新 main 函数调用复制**

```javascript
async function main() {
  cleanAllTargetDirs()
  console.log('✅ 清理完成')

  copyAllKnowledgeBases()
  console.log('✅ 复制完成')

  // 后续步骤继续填充...
}

main().catch(console.error)
```

- [ ] **Step 3: 运行脚本验证复制功能**

```bash
node scripts/sync-knowledge.js
```

Expected: 输出复制步骤信息，docs 目录下应出现四个知识库目录

---

## Task 4: 实现侧边栏生成功能

**Files:**

- Modify: `scripts/sync-knowledge.js`
- Create: `docs/.vitepress/configs/sidebar.ts` (由脚本生成)

- [ ] **Step 1: 添加侧边栏生成函数**

在 `scripts/sync-knowledge.js` 添加侧边栏生成函数（在 `copyAllKnowledgeBases` 之后）:

```javascript
import {
  existsSync,
  mkdirSync,
  rmSync,
  readdirSync,
  statSync,
  cpSync,
  writeFileSync,
} from 'node:fs'

// ... 前面的代码保持不变 ...

/**
 * 自然排序比较函数
 */
function naturalSort(a, b) {
  return a.localeCompare(b, 'zh-CN', { numeric: true })
}

/**
 * 生成单个目录的侧边栏 items
 * @param {string} dirPath 目录路径
 * @param {string} basePath VitePress 路径基础
 * @param {number} level 当前层级
 * @returns {Array} 侧边栏 items
 */
function generateSidebarItems(dirPath, basePath, level = 1) {
  const entries = readdirSync(dirPath, { withFileTypes: true })
    .filter((e) => !SKIP_DIRS.includes(e.name) && e.name !== 'zimg' && e.name !== 'index.md')
    .sort((a, b) => naturalSort(a.name, b.name))

  const items = []

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name)
    const linkPath = `${basePath}/${entry.name}`

    if (entry.isDirectory()) {
      // 递归处理子目录
      const subItems = generateSidebarItems(fullPath, linkPath, level + 1)
      if (subItems.length > 0) {
        items.push({
          text: entry.name,
          collapsed: level > 1,
          items: subItems,
        })
      }
    } else if (entry.name.endsWith('.md')) {
      // 处理 Markdown 文件
      const text = entry.name.replace('.md', '')
      items.push({
        text,
        link: linkPath.replace('.md', ''),
      })
    }
  }

  return items
}

/**
 * 生成所有知识库的侧边栏配置
 */
function generateSidebarConfig() {
  console.log('\n📦 Step 3: 生成侧边栏配置')
  const sidebar = {}

  for (const base of KNOWLEDGE_BASES) {
    const baseDir = resolve(DOCS_DIR, base.name)
    const basePath = `/${base.name}`

    if (existsSync(baseDir)) {
      const items = generateSidebarItems(baseDir, basePath)
      sidebar[basePath] = items.length > 0 ? items : []
      console.log(`  📝 ${base.name}: ${items.length} 个侧边栏项`)
    }
  }

  // 写入配置文件
  const configPath = resolve(DOCS_DIR, '.vitepress/configs/sidebar.ts')
  const configContent = `import type { DefaultTheme } from 'vitepress'\n\nexport const sidebar: DefaultTheme.Config['sidebar'] = ${JSON.stringify(
    sidebar,
    null,
    2,
  )}\n`

  writeFileSync(configPath, configContent, 'utf-8')
  console.log(`  ✅ 写入: ${configPath}`)
}
```

- [ ] **Step 2: 更新 main 函数调用侧边栏生成**

```javascript
async function main() {
  cleanAllTargetDirs()
  console.log('✅ 清理完成')

  copyAllKnowledgeBases()
  console.log('✅ 复制完成')

  generateSidebarConfig()
  console.log('✅ 侧边栏配置生成完成')

  // 后续步骤继续填充...
}

main().catch(console.error)
```

- [ ] **Step 3: 运行脚本验证侧边栏生成**

```bash
node scripts/sync-knowledge.js
```

Expected: `docs/.vitepress/configs/sidebar.ts` 文件生成，包含四个知识库的侧边栏配置

---

## Task 5: 实现统计信息生成功能

**Files:**

- Modify: `scripts/sync-knowledge.js`
- Create: `docs/stats.json` (由脚本生成)

- [ ] **Step 1: 添加统计信息生成函数**

在 `scripts/sync-knowledge.js` 添加统计函数（在 `generateSidebarConfig` 之后）:

```javascript
/**
 * 统计目录中的 Markdown 文件数量
 * @param {string} dirPath 目录路径
 * @returns {number} 文件数量
 */
function countMarkdownFiles(dirPath) {
  let count = 0

  function traverse(path) {
    if (!existsSync(path)) return
    const entries = readdirSync(path, { withFileTypes: true })

    for (const entry of entries) {
      if (SKIP_DIRS.includes(entry.name) || entry.name === 'zimg') continue

      const fullPath = join(path, entry.name)
      if (entry.isDirectory()) {
        traverse(fullPath)
      } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
        count++
      }
    }
  }

  traverse(dirPath)
  return count
}

/**
 * 生成统计信息
 */
function generateStats() {
  console.log('\n📦 Step 4: 生成统计信息')

  const stats = {
    lastUpdated: new Date().toISOString().split('T')[0],
    totalDocs: 0,
    bases: [],
  }

  for (const base of KNOWLEDGE_BASES) {
    const baseDir = resolve(DOCS_DIR, base.name)
    const docCount = countMarkdownFiles(baseDir)

    stats.bases.push({
      name: base.name,
      title: base.title,
      description: base.description,
      docCount,
    })
    stats.totalDocs += docCount

    console.log(`  📊 ${base.title} (${base.name}): ${docCount} 个文档`)
  }

  console.log(`  📊 总计: ${stats.totalDocs} 个文档`)

  // 写入统计文件
  const statsPath = resolve(DOCS_DIR, 'stats.json')
  writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf-8')
  console.log(`  ✅ 写入: ${statsPath}`)

  return stats
}
```

- [ ] **Step 2: 更新 main 函数调用统计生成**

```javascript
async function main() {
  cleanAllTargetDirs()
  console.log('✅ 清理完成')

  copyAllKnowledgeBases()
  console.log('✅ 复制完成')

  generateSidebarConfig()
  console.log('✅ 侧边栏配置生成完成')

  const stats = generateStats()
  console.log('✅ 统计信息生成完成')

  // 后续步骤继续填充...
}

main().catch(console.error)
```

- [ ] **Step 3: 运行脚本验证统计生成**

```bash
node scripts/sync-knowledge.js
```

Expected: `docs/stats.json` 文件生成，包含各知识库的文档数量统计

---

## Task 6: 实现知识库首页生成功能

**Files:**

- Modify: `scripts/sync-knowledge.js`
- Create: 各知识库 `index.md` (由脚本生成)

- [ ] **Step 1: 添加首页生成函数**

在 `scripts/sync-knowledge.js` 添加首页生成函数（在 `generateStats` 之后）:

```javascript
/**
 * 生成知识库首页
 */
function generateIndexPages(stats) {
  console.log('\n📦 Step 5: 生成知识库首页')

  for (const base of stats.bases) {
    const baseDir = resolve(DOCS_DIR, base.name)
    const indexPath = resolve(baseDir, 'index.md')

    const content = `---
title: ${base.title}
---

# ${base.title}

${base.description}

> 当前共有 **${base.docCount}** 个文档

## 目录导航

请使用左侧侧边栏浏览各分类内容。
`

    writeFileSync(indexPath, content, 'utf-8')
    console.log(`  ✅ ${base.name}/index.md`)
  }
}
```

- [ ] **Step 2: 更新 main 函数调用首页生成**

```javascript
async function main() {
  cleanAllTargetDirs()
  console.log('✅ 清理完成')

  copyAllKnowledgeBases()
  console.log('✅ 复制完成')

  generateSidebarConfig()
  console.log('✅ 侧边栏配置生成完成')

  const stats = generateStats()
  console.log('✅ 统计信息生成完成')

  generateIndexPages(stats)
  console.log('✅ 知识库首页生成完成')

  console.log('\n🎉 同步完成！')
  console.log('💡 运行 pnpm dev 查看效果，或运行 pnpm build 构建')
}

main().catch(console.error)
```

- [ ] **Step 3: 运行脚本验证首页生成**

```bash
node scripts/sync-knowledge.js
```

Expected: 四个知识库目录下各生成 `index.md` 文件

---

## Task 7: 修改 VitePress 配置

**Files:**

- Modify: `docs/.vitepress/config.ts`

- [ ] **Step 1: 更新 config.ts 标题和描述**

修改 `docs/.vitepress/config.ts`:

```typescript
import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-CN',
  title: '达尔文的猹',
  description: '个人知识库，包含技术笔记、项目文档、生活记录等内容',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/logo.png',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/nano' }],

    footer: {
      message: '知识在于积累',
      copyright: 'Copyright © 2026 达尔文的猹',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // 移除 visitor 和 comment 配置（原模板的）
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
```

- [ ] **Step 2: 验证配置文件语法**

```bash
pnpm dev
```

Expected: 开发服务器启动，无配置错误

---

## Task 8: 修改导航栏配置

**Files:**

- Modify: `docs/.vitepress/configs/nav.ts`

- [ ] **Step 1: 更新导航栏配置**

修改 `docs/.vitepress/configs/nav.ts`:

```typescript
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: '书籍', link: '/NanoBook/' },
  { text: '项目', link: '/NanoGrid/' },
  { text: '生活', link: '/NanoLife/' },
  { text: '技术', link: '/NanoMind/' },
]
```

- [ ] **Step 2: 验证导航栏**

```bash
pnpm dev
```

Expected: 顶部导航栏显示五个链接：首页、书籍、项目、生活、技术

---

## Task 9: 创建站点首页

**Files:**

- Modify: `docs/index.md`

- [ ] **Step 1: 创建首页内容**

修改 `docs/index.md`:

```markdown
---
layout: home

hero:
  name: 达尔文的猹
  text: 个人知识库
  tagline: 知识在于积累，成长在于思考
  image:
    src: /logo.png
    alt: Logo
  actions:
    - theme: brand
      text: 开始浏览
      link: /NanoMind/
    - theme: alt
      text: 关于我
      link: /about

features:
  - icon: 📚
    title: 书籍
    details: 阅读笔记与知识整理
    link: /NanoBook/
    linkText: 浏览书籍
  - icon: 🗂️
    title: 项目
    details: 项目文档与功能格子说明
    link: /NanoGrid/
    linkText: 浏览项目
  - icon: 🏠
    title: 生活
    details: 生活记录、读书笔记、影音感想
    link: /NanoLife/
    linkText: 浏览生活
  - icon: 💻
    title: 技术
    details: 技术知识、工作总结、学习笔记
    link: /NanoMind/
    linkText: 浏览技术
---
```

- [ ] **Step 2: 验证首页**

```bash
pnpm dev
```

Expected: 首页显示 Hero 区域和四个知识库卡片

---

## Task 10: 完整测试同步脚本

**Files:**

- 无新增，仅验证

- [ ] **Step 1: 运行完整同步**

```bash
pnpm sync
```

Expected:

- 清理四个知识库目录
- 复制知识库内容
- 生成侧边栏配置
- 生成统计信息
- 生成知识库首页
- 输出 "🎉 同步完成！"

- [ ] **Step 2: 检查生成的文件结构**

```bash
ls -la docs/
ls -la docs/.vitepress/configs/
```

Expected:

- docs/ 下有 NanoBook, NanoGrid, NanoLife, NanoMind, stats.json
- configs/ 下有更新后的 sidebar.ts

- [ ] **Step 3: 启动开发服务器验证**

```bash
pnpm dev
```

Expected:

- 首页显示正确
- 导航栏链接正确
- 各知识库侧边栏结构正确
- 文档页面正常渲染

---

## Task 11: 本地构建测试

**Files:**

- 无新增，仅验证

- [ ] **Step 1: 运行构建**

```bash
pnpm build
```

Expected: 构建成功，dist 目录生成

- [ ] **Step 2: 预览构建结果**

```bash
pnpm preview
```

Expected: 预览服务器启动，http://localhost:8730 可访问

---

## Task 12: 提交代码

**Files:**

- Git commit

- [ ] **Step 1: 检查变更**

```bash
git status
```

- [ ] **Step 2: 添加新文件**

```bash
git add scripts/sync-knowledge.js
git add docs/superpowers/
```

- [ ] **Step 3: 添加修改文件**

```bash
git add package.json
git add docs/.vitepress/config.ts
git add docs/.vitepress/configs/nav.ts
git add docs/index.md
```

- [ ] **Step 4: 提交**

```bash
git commit -m "$(cat <<'EOF'
feat: 实现知识库整合功能

- 新增同步脚本 scripts/sync-knowledge.js
- 支持四个知识库自动同步（NanoBook/NanoGrid/NanoLife/NanoMind）
- 自动生成侧边栏配置（支持多层级嵌套）
- 自动生成统计信息和知识库首页
- 更新站点标题为"达尔文的猹"
- 更新导航栏配置
- 创建站点首页

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

---

## Verification Checklist

完成所有任务后，检查：

1. ✅ `pnpm sync` 运行成功
2. ✅ `pnpm dev` 首页显示正确
3. ✅ 导航栏：首页、书籍、项目、生活、技术
4. ✅ 各知识库侧边栏反映实际目录结构
5. ✅ 文档页面 Markdown 正常渲染
6. ✅ 图片正确加载（zimg 目录）
7. ✅ `pnpm build` 构建成功
8. ✅ `pnpm preview` 预览正常

---

## Self-Review

### Spec Coverage

| 规范要求             | 对应任务                    |
| -------------------- | --------------------------- |
| 网站名称"达尔文的猹" | Task 7                      |
| 顶部导航四个知识库   | Task 8                      |
| 首页卡片 + Hero      | Task 9                      |
| 各知识库独立 zimg    | Task 3 (跳过 zimg 复制逻辑) |
| 自动生成侧边栏       | Task 4                      |
| Node.js 同步脚本     | Task 1-6                    |
| 删除旧文件再同步     | Task 2                      |
| GitHub Pages 部署    | 已有 deploy.yml，无需修改   |

### Placeholder Scan

无 TBD、TODO、placeholder 内容

### Type Consistency

- `KNOWLEDGE_BASES` 配置在各函数中一致使用
- 侧边栏结构符合 VitePress `DefaultTheme.Sidebar` 类型
