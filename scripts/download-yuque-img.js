#!/usr/bin/env node
/**
 * 下载语雀图片到本地并替换链接
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  createWriteStream,
} from 'node:fs'
import { resolve, dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import https from 'node:https'
import http from 'node:http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')
// 知识库根目录
const KNOWLEDGE_BASE_ROOT = resolve(ROOT_DIR, '..')

// 需要处理的知识库文件夹
const KNOWLEDGE_BASES = ['nano-mind', 'nano-grid', 'nano-life', 'nano-book']

// 跳过的目录
const SKIP_DIRS = ['.obsidian', '.claude', 'node_modules', '.git', 'zimg']
// 跳过的文件
const SKIP_FILES = ['decoded_excalidraw.json']

console.log('🚀 开始下载语雀图片...')
console.log(`知识库根目录: ${KNOWLEDGE_BASE_ROOT}`)

let downloadedCount = 0
let replacedCount = 0
let failedCount = 0

/**
 * 生成唯一的图片文件名
 */
function generateImageFileName(url, index) {
  // 从 URL 中提取文件扩展名
  const extMatch = url.match(/\.(png|jpg|jpeg|gif|svg|webp)/i)
  const ext = extMatch ? extMatch[1].toLowerCase() : 'png'
  // 使用时间戳+索引的方式命名
  return `yuque-${Date.now()}-${index}.${ext}`
}

/**
 * 下载图片到本地
 */
async function downloadImage(url, destPath, maxRetries = 2) {
  let lastError

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http
        client
          .get(
            url,
            {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                Referer: 'https://www.yuque.com',
                Accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
              },
            },
            (response) => {
              if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`))
                return
              }
              const fileStream = createWriteStream(destPath)
              response.pipe(fileStream)
              fileStream.on('finish', () => {
                fileStream.close()
                resolve()
              })
            },
          )
          .on('error', (err) => {
            reject(err)
          })
          .setTimeout(10000)
      })
      return
    } catch (err) {
      lastError = err
      if (attempt < maxRetries) {
        console.log(`      重试 ${attempt + 1}/${maxRetries}...`)
        await new Promise((r) => setTimeout(r, 1000))
      }
    }
  }
  throw lastError
}

/**
 * 处理单个 Markdown 文件
 */
async function processMarkdownFile(filePath, zimgDir) {
  const content = readFileSync(filePath, 'utf-8')

  // 匹配所有语雀图片链接
  // 格式: ![|700](https://cdn.nlark.com/...)
  // 或: ![](https://cdn.nlark.com/...)
  // 或: ![](https://cdn.nlark.com/... "图片标题")
  const yuqueRegex =
    /!\[([^\]]*)\]\((https?:\/\/(?:cdn\.nlark\.com|s3\.nlark\.com)[^\)\s]+\.(?:png|jpg|jpeg|gif|svg|webp))(?:\s+"[^"]*")?\)/gi

  let result = content
  let match
  let fileIndex = 0
  const replacements = []

  // 先收集所有匹配
  while ((match = yuqueRegex.exec(content)) !== null) {
    const fullMatch = match[0]
    const altText = match[1]
    const url = match[2]
    fileIndex++

    // 提取宽度信息
    let widthInfo = ''
    const widthMatch = altText.match(/\|(\d+)(?:x\d+)?(?:\|\d+x\d+)?/)
    if (widthMatch) {
      widthInfo = `|${widthMatch[1]}`
    }

    replacements.push({
      fullMatch,
      url,
      widthInfo,
      index: fileIndex,
    })
  }

  if (replacements.length === 0) {
    return
  }

  console.log(`\n📄 处理文件: ${filePath}`)
  console.log(`   发现 ${replacements.length} 张语雀图片`)

  // 下载并替换
  for (const replacement of replacements) {
    const { fullMatch, url, widthInfo, index } = replacement

    try {
      const fileName = generateImageFileName(url, index)
      const destPath = join(zimgDir, fileName)

      console.log(`   📥 下载图片 ${index}/${replacements.length}: ${fileName}`)
      await downloadImage(url, destPath)

      // 替换为 Obsidian wiki 链接格式
      const wikiLink = `![[${fileName}${widthInfo}]]`
      result = result.replace(fullMatch, wikiLink)

      downloadedCount++
      replacedCount++
      console.log(`   ✅ 替换为: ${wikiLink}`)
    } catch (err) {
      failedCount++
      console.log(`   ❌ 下载失败: ${err.message} - 保持原链接不变`)
      // 下载失败时不替换，保持原链接
    }
  }

  // 写回文件
  if (content !== result) {
    writeFileSync(filePath, result, 'utf-8')
  }
}

/**
 * 递归处理目录
 */
async function processDirectory(dir, zimgDir) {
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) {
        continue
      }
      await processDirectory(fullPath, zimgDir)
    } else if (entry.name.endsWith('.md') && !SKIP_FILES.includes(entry.name)) {
      await processMarkdownFile(fullPath, zimgDir)
    }
  }
}

/**
 * 处理单个知识库
 */
async function processKnowledgeBase(baseName) {
  const baseDir = resolve(KNOWLEDGE_BASE_ROOT, baseName)
  if (!existsSync(baseDir)) {
    console.log(`\n⚠️  知识库不存在: ${baseName}`)
    return
  }

  // 确保 zimg 目录存在
  const zimgDir = join(baseDir, 'zimg')
  mkdirSync(zimgDir, { recursive: true })

  console.log(`\n====================================`)
  console.log(`📚 处理知识库: ${baseName}`)
  console.log(`====================================`)

  await processDirectory(baseDir, zimgDir)
}

/**
 * 主函数
 */
async function main() {
  for (const base of KNOWLEDGE_BASES) {
    await processKnowledgeBase(base)
  }

  console.log(`\n====================================`)
  console.log(`🎉 处理完成!`)
  console.log(`====================================`)
  console.log(`✅ 成功下载: ${downloadedCount} 张图片`)
  console.log(`✅ 成功替换: ${replacedCount} 个链接`)
  if (failedCount > 0) {
    console.log(`❌ 失败: ${failedCount} 张图片`)
  }
  console.log(`\n💡 提示: 运行 npm run sync 来同步到网站项目`)
}

main().catch(console.error)
