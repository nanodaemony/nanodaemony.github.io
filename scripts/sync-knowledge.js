#!/usr/bin/env node
/**
 * 知识库同步脚本
 * 将 E:\KnowledgeOcean 下的知识库同步到 VitePress docs 目录
 */

import {
  existsSync,
  mkdirSync,
  rmSync,
  readdirSync,
  cpSync,
  writeFileSync,
  readFileSync,
} from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')
const DOCS_DIR = resolve(ROOT_DIR, 'docs')
const PUBLIC_DIR = resolve(DOCS_DIR, 'public')
// 知识库根目录：当前项目往上两级就是 KnowledgeOcean
const KNOWLEDGE_BASE_ROOT = resolve(ROOT_DIR, '..')

// 知识库配置：sourceFolder 是实际的文件夹名，name 是 docs 下的目标文件夹名
const KNOWLEDGE_BASES = [
  {
    sourceFolder: 'nano-mind',
    name: 'NanoMind',
    title: '技术',
    description: '技术知识、工作总结、学习笔记',
  },
  {
    sourceFolder: 'nano-grid',
    name: 'NanoGrid',
    title: '项目',
    description: '项目文档与功能格子说明',
  },
  {
    sourceFolder: 'nano-life',
    name: 'NanoLife',
    title: '生活',
    description: '生活记录、读书笔记、影音感想',
  },
  {
    sourceFolder: 'nano-book',
    name: 'NanoBook',
    title: '书籍',
    description: '书籍阅读笔记与知识整理',
  },
]

// 跳过的目录
const SKIP_DIRS = ['.obsidian', '.claude', 'node_modules', '.git', 'zimg']
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

// 用于存储所有找到的图片路径
const allImages = new Map()

/**
 * 收集所有 zimg 目录下的图片
 */
function collectImages(srcDir, baseName) {
  const entries = readdirSync(srcDir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(srcDir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === 'zimg') {
        // 找到 zimg 目录，收集里面的图片
        const images = readdirSync(fullPath, { withFileTypes: true })
        for (const img of images) {
          if (!img.isDirectory()) {
            const imgName = img.name
            if (!allImages.has(imgName)) {
              allImages.set(imgName, join(fullPath, imgName))
            }
          }
        }
      } else if (!SKIP_DIRS.includes(entry.name)) {
        collectImages(fullPath, baseName)
      }
    }
  }
}

/**
 * 复制所有收集到的图片到 public 目录
 */
function copyImagesToPublic() {
  const publicZimg = join(PUBLIC_DIR, 'zimg')
  mkdirSync(publicZimg, { recursive: true })

  let count = 0
  for (const [imgName, srcPath] of allImages) {
    const destPath = join(publicZimg, imgName)
    cpSync(srcPath, destPath, { force: true })
    count++
  }
  console.log(`  📷 复制了 ${count} 张图片到 public/zimg/`)
}

/**
 * 转换 Obsidian wiki 链接为标准 Markdown 图片链接（使用 public 目录）
 * ![[image.png]] → ![](/zimg/image.png)
 * ![[image.png|353]] → <img src="/zimg/image.png" style="width: 353px">
 */
function convertWikiLinks(content) {
  // 匹配 ![[image.png]] 和 ![[image.png|353]] 格式的图片链接
  const wikiImageRegex = /!\[\[([^\]|]+\.(?:png|jpg|jpeg|gif|svg|webp))(?:\|([^\]]*))?\]\]/gi
  let result = content

  result = result.replace(wikiImageRegex, (match, imageName, widthInfo) => {
    if (allImages.has(imageName)) {
      // 对文件名进行 URL 编码，处理空格等特殊字符
      const encodedName = encodeURI(imageName)

      // 如果有宽度信息，输出带宽度的 HTML img 标签
      if (widthInfo && /^\d+$/.test(widthInfo.trim())) {
        const width = widthInfo.trim()
        return `<img src="/zimg/${encodedName}" style="width: ${width}px">`
      }

      // 否则输出标准 Markdown 图片
      return `![](/zimg/${encodedName})`
    }
    // 找不到图片，保持原样
    return match
  })

  return result
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
 * 递归转换目录中所有 Markdown 文件的 wiki 链接
 */
function convertAllMarkdownFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name) && entry.name !== 'zimg') {
        convertAllMarkdownFiles(fullPath)
      }
    } else if (entry.name.endsWith('.md')) {
      const content = readFileSync(fullPath, 'utf-8')
      const convertedContent = convertWikiLinks(content)
      if (content !== convertedContent) {
        writeFileSync(fullPath, convertedContent, 'utf-8')
      }
    }
  }
}

/**
 * 复制所有知识库
 */
function copyAllKnowledgeBases() {
  console.log('\n📦 Step 2: 复制知识库内容')
  for (const base of KNOWLEDGE_BASES) {
    const srcDir = resolve(KNOWLEDGE_BASE_ROOT, base.sourceFolder)
    const destDir = resolve(DOCS_DIR, base.name)

    if (existsSync(srcDir)) {
      console.log(`  📁 复制: ${base.sourceFolder} → ${base.name} (${srcDir} → ${destDir})`)
      copyDir(srcDir, destDir)
    } else {
      console.log(`  ⚠️ 源目录不存在: ${srcDir}`)
      mkdirSync(destDir, { recursive: true })
    }
  }
}

/**
 * 收集所有知识库中的图片
 */
function collectAllImages() {
  console.log('\n📦 Step 2.3: 收集所有图片')
  allImages.clear()

  for (const base of KNOWLEDGE_BASES) {
    const srcDir = resolve(KNOWLEDGE_BASE_ROOT, base.sourceFolder)
    if (existsSync(srcDir)) {
      collectImages(srcDir, base.name)
    }
  }
  console.log(`  📸 共找到 ${allImages.size} 张图片`)
}

/**
 * 转换所有知识库中的 Markdown 文件
 */
function convertAllKnowledgeBasesMarkdown() {
  console.log('\n📦 Step 2.5: 转换 Obsidian wiki 图片链接')
  for (const base of KNOWLEDGE_BASES) {
    const baseDir = resolve(DOCS_DIR, base.name)
    if (existsSync(baseDir)) {
      convertAllMarkdownFiles(baseDir)
      console.log(`  ✅ 转换完成: ${base.name}`)
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
 * 去掉文件名前缀（用于显示）
 * 支持: A-, B-, 1-, 2-, 10-, 1., 2., 10. 等格式
 */
function removePrefix(name) {
  // 去掉 .md 后缀
  let text = name.replace('.md', '')
  // 去掉前缀：字母- 或 数字- 或 数字.
  text = text.replace(/^[A-Za-z]-/, '')
  text = text.replace(/^\d+[-.]/, '')
  return text
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
        // 一级文件夹不加 Emoji，二级及以下加 📁
        const folderEmoji = level === 1 ? '' : '📁 '
        items.push({
          text: folderEmoji + removePrefix(entry.name),
          collapsed: level > 1,
          items: subItems,
        })
      }
    } else if (entry.name.endsWith('.md')) {
      items.push({
        text: '📄 ' + removePrefix(entry.name),
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
 * 清理 public/zimg 目录
 */
function cleanPublicZimg() {
  const publicZimg = join(PUBLIC_DIR, 'zimg')
  if (existsSync(publicZimg)) {
    rmSync(publicZimg, { recursive: true, force: true })
  }
}

/**
 * 主函数
 */
async function main() {
  cleanAllTargetDirs()
  cleanPublicZimg()
  console.log('✅ 清理完成')

  collectAllImages()
  console.log('✅ 图片收集完成')

  copyAllKnowledgeBases()
  console.log('✅ 复制完成')

  copyImagesToPublic()
  console.log('✅ 图片复制到 public 目录完成')

  convertAllKnowledgeBasesMarkdown()
  console.log('✅ Obsidian 链接转换完成')

  generateSidebarConfig()
  console.log('✅ 侧边栏配置生成完成')

  const stats = generateStats()
  console.log('✅ 统计信息生成完成')

  generateIndexPages(stats)
  console.log('✅ 知识库首页生成完成')

  console.log('\n🎉 同步完成！')
  console.log('💡 运行 npm run dev 查看效果，或运行 npm run build 构建')
}

main().catch(console.error)
