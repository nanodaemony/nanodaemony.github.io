import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')
// 用户名仓库（username.github.io）的 base 是 '/'，其他仓库是 '/repo-name/'
const base = APP_BASE_PATH && !APP_BASE_PATH.endsWith('.github.io') ? `/${APP_BASE_PATH}/` : '/'

export default defineConfig({
  outDir: '../dist',
  base,

  lang: 'zh-CN',
  title: '达尔文的猹',
  description: '个人知识库，包含技术笔记、项目文档、生活记录等内容',
  head,

  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: 'localhostLinks',

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
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
