# 文档标题显示功能实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在每个普通文档页面的正文顶部显示处理后的文件名，以一级标题大小居中展示

**Architecture:** 通过 VitePress 主题的 `doc-before` 插槽注入自定义 Vue 组件 MDocTitle，该组件获取当前路由、处理文件名并显示

**Tech Stack:** Vue 3, VitePress, TypeScript, SCSS

---

## 任务分解

### Task 1: 创建 MDocTitle.vue 组件骨架

**Files:**

- Create: `docs/.vitepress/theme/components/MDocTitle.vue`

- [ ] **Step 1: 创建组件基础结构**

```vue
<script setup lang="ts">
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

// TODO: 实现标题处理逻辑
</script>

<template>
  <div v-if="shouldShow" class="m-doc-title">
    <!-- TODO: 显示处理后的标题 -->
  </div>
</template>

<style scoped>
/* TODO: 添加样式 */
</style>
```

- [ ] **Step 2: 提交**

```bash
git add docs/.vitepress/theme/components/MDocTitle.vue
git commit -m "feat: 创建 MDocTitle 组件骨架"
```

---

### Task 2: 实现文件名处理逻辑

**Files:**

- Modify: `docs/.vitepress/theme/components/MDocTitle.vue`

- [ ] **Step 1: 添加文件名处理函数**

```vue
<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()
const route = useRoute()

const shouldShow = computed(() => {
  // 默认显示，除非 frontmatter 中明确设置 showTitle: false
  return frontmatter.value.showTitle !== false
})

const docTitle = computed(() => {
  const path = route.path
  // 获取路径最后一段
  const lastSegment = path.split('/').filter(Boolean).pop() || ''
  // 去掉扩展名
  const nameWithoutExt = lastSegment.replace(/\.(md|html)$/, '')
  // 替换连字符和下划线为空格
  const withSpaces = nameWithoutExt.replace(/[-_]/g, ' ')
  // 首字母大写
  return withSpaces.replace(/\b\w/g, (c) => c.toUpperCase())
})
</script>

<template>
  <div v-if="shouldShow" class="m-doc-title">
    {{ docTitle }}
  </div>
</template>

<style scoped>
/* TODO: 添加样式 */
</style>
```

- [ ] **Step 2: 提交**

```bash
git add docs/.vitepress/theme/components/MDocTitle.vue
git commit -m "feat: 实现 MDocTitle 文件名处理逻辑"
```

---

### Task 3: 添加标题样式

**Files:**

- Modify: `docs/.vitepress/theme/components/MDocTitle.vue`

- [ ] **Step 1: 添加样式**

```vue
<style scoped>
.m-doc-title {
  font-size: 34px;
  line-height: 42px;
  font-weight: 700;
  text-align: center;
  color: var(--vp-c-text-1);
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .m-doc-title {
    font-size: 26px;
    line-height: 36px;
  }
}
</style>
```

- [ ] **Step 2: 提交**

```bash
git add docs/.vitepress/theme/components/MDocTitle.vue
git commit -m "style: 添加 MDocTitle 组件样式"
```

---

### Task 4: 在 MLayout.vue 中集成组件

**Files:**

- Modify: `docs/.vitepress/theme/components/MLayout.vue`

- [ ] **Step 1: 引入 MDocTitle 组件并添加插槽**

在 `<script setup>` 开头添加导入：

```typescript
import MDocTitle from './MDocTitle.vue'
```

在 `<template>` 中 `<Layout>` 组件内添加：

```vue
<template #doc-before>
  <MDocTitle />
</template>
```

完整修改后的 MLayout.vue 关键部分：

```vue
<script setup lang="ts">
import { useData, inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'
import Giscus from '@giscus/vue'

import { usePageId } from '../composables'

import MNavVisitor from './MNavVisitor.vue'
import MDocFooter from './MDocFooter.vue'
import MDocTitle from './MDocTitle.vue'

const { Layout } = DefaultTheme
// ... 其余代码保持不变
</script>

<template>
  <Layout v-bind="$attrs">
    <template #doc-before>
      <MDocTitle />
    </template>

    <template #nav-bar-title-after>
      <MNavVisitor />
    </template>

    <template v-if="comment && frontmatter.comment !== false" #doc-footer-before>
      <div class="doc-comments">
        <Giscus
          id="comments"
          mapping="specific"
          :term="pageId"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          :theme="isDark ? 'dark' : 'light'"
          lang="zh-CN"
          loading="lazy"
          v-bind="{ ...comment }"
        />
      </div>
    </template>

    <template #doc-after>
      <MDocFooter />
    </template>
  </Layout>
</template>
```

- [ ] **Step 2: 提交**

```bash
git add docs/.vitepress/theme/components/MLayout.vue
git commit -m "feat: 在 MLayout 中集成 MDocTitle 组件"
```

---

### Task 5: 测试验证

**Files:**

- 无新文件，测试现有功能

- [ ] **Step 1: 启动开发服务器**

```bash
npm run dev
```

- [ ] **Step 2: 手动测试**

  - 访问一个文档页面，验证标题是否显示
  - 验证标题是否正确处理（去掉扩展名、连字符转空格、首字母大写）
  - 验证样式是否正确（居中、大小合适）
  - 在文档 frontmatter 中添加 `showTitle: false`，验证标题是否隐藏
  - 访问首页，验证标题不显示
  - 切换深色/浅色模式，验证颜色是否正确

- [ ] **Step 3: 提交（如果有修复）**

如果发现问题并修复，提交修复：

```bash
git status
# 根据修改添加文件并提交
```

---

## 自我审查检查清单

- [x] Spec 覆盖: 所有需求都有对应任务实现
- [x] 无占位符: 所有步骤都有具体代码和命令
- [x] 类型一致: 组件和函数命名一致

---

## 最终检查

完成所有任务后，确认：

1. 文档页面顶部显示处理后的文件名
2. 样式正确（居中、一级标题大小）
3. 可通过 frontmatter 控制显示/隐藏
4. 首页等特殊页面不显示
