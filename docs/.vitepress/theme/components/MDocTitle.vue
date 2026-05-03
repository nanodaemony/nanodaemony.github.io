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
