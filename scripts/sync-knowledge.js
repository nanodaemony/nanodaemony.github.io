#!/usr/bin/env node
/**
 * 知识库同步脚本
 * 将 E:\KnowledgeOcean 下的知识库同步到 VitePress docs 目录
 */

import { existsSync, mkdirSync, rmSync, readdirSync, cpSync, writeFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
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
// 跳过的文件
const SKIP_FILES = ['decoded_excalidraw.json']

console.log('🚀 开始同步知识库...')
console.log(`源目录: ${KNOWLEDGE_BASE_ROOT}`)
console.log(`目标目录: ${DOCS_DIR}`)

/**
 * 清理目标知识库目录
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

/**
 * 递归复制目录，跳过指定目录
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
      // 跳过指定文件
      if (SKIP_FILES.includes(entry.name)) {
        continue
      }
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

/**
 * 自然排序比较函数
 */
function naturalSort(a, b) {
  return a.localeCompare(b, 'zh-CN', { numeric: true })
}

/**
 * 生成单个目录的侧边栏 items
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
      const subItems = generateSidebarItems(fullPath, linkPath, level + 1)
      if (subItems.length > 0) {
        items.push({
          text: entry.name,
          collapsed: level > 1,
          items: subItems,
        })
      }
    } else if (entry.name.endsWith('.md')) {
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

  const configPath = resolve(DOCS_DIR, '.vitepress/configs/sidebar.ts')
  const configContent = `import type { DefaultTheme } from 'vitepress'\n\nexport const sidebar: DefaultTheme.Config['sidebar'] = ${JSON.stringify(
    sidebar,
    null,
    2,
  )}\n`

  writeFileSync(configPath, configContent, 'utf-8')
  console.log(`  ✅ 写入: ${configPath}`)
}

/**
 * 统计目录中的 Markdown 文件数量
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

  const statsPath = resolve(DOCS_DIR, 'stats.json')
  writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf-8')
  console.log(`  ✅ 写入: ${statsPath}`)

  return stats
}

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

/**
 * 主函数
 */
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
