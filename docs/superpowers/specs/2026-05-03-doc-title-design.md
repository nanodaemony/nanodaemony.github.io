# 文档标题显示功能设计

## 概述

在每个普通文档页面的正文顶部显示处理后的文件名，以一级标题大小居中展示。

## 需求

- 在普通文档页面的正文内容最顶部显示（第一个 h1 之前）
- 显示文件名（去掉扩展名）
- 连字符/下划线转换为空格
- 纯文本，非链接
- 字体大小为一级标题大小，居中展示
- 可通过 frontmatter 单独控制某页面不显示

## 实现方案

### 技术选型

使用 VitePress 主题扩展的 `doc-before` 插槽 + 自定义 Vue 组件。

### 组件结构

#### 1. MDocTitle.vue

- **位置**: `docs/.vitepress/theme/components/MDocTitle.vue`
- **功能**:
  - 使用 `useData()` 获取当前页面的 frontmatter 和路由信息
  - 从 `useRoute()` 获取当前路径
  - 提取并处理文件名
  - 根据 frontmatter 中的 `showTitle` 决定是否显示

#### 2. MLayout.vue 修改

- 在 `Layout` 组件中添加 `<template #doc-before>` 插槽
- 引入并使用 `MDocTitle` 组件

### 文件名处理逻辑

```javascript
// 示例处理流程
输入: /NanoMind/my-awesome-doc.md
步骤:
1. 提取路径最后一段: my-awesome-doc.md
2. 去掉扩展名: my-awesome-doc
3. 替换连字符/下划线为空格: my awesome doc
4. 首字母大写: My Awesome Doc
输出: My Awesome Doc
```

### 样式规范

- 字体大小: 与 h1 一致（桌面端约 34px）
- 对齐: 居中 (`text-align: center`)
- 字重: 加粗 (`font-weight: 700`)
- 颜色: 使用 `var(--vp-c-text-1)` 或主题标题色
- 边距: 上下适当留白（如下边距 24px）
- 行高: 与 h1 一致

### 可配置性

- frontmatter 选项: `showTitle: false` - 单独控制某页面不显示标题
- 默认行为: 所有文档页面都显示标题

### 页面范围

- 显示: 普通文档页面（非首页、非特殊布局页）
- 不显示: layout: home 等特殊页面

## 文件清单

- 新建: `docs/.vitepress/theme/components/MDocTitle.vue`
- 修改: `docs/.vitepress/theme/components/MLayout.vue`

## 风险与注意事项

- 需要正确判断是否为文档页面（避免在首页等特殊页面显示）
- 文件名处理要考虑各种边界情况（空路径、多级目录等）
