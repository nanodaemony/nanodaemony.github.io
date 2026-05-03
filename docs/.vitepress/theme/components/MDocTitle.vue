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
  // 获取路径最后一段并解码
  const lastSegment = decodeURIComponent(path.split('/').filter(Boolean).pop() || '')
  // 去掉扩展名
  const nameWithoutExt = lastSegment.replace(/\.(md|html)$/, '')
  // 替换连字符和下划线为空格
  const withSpaces = nameWithoutExt.replace(/[-_]/g, ' ')
  // 检查是否包含中文字符
  const hasChinese = /[一-龥]/.test(withSpaces)
  if (hasChinese) {
    // 中文直接返回，不做首字母大写
    return withSpaces
  }
  // 英文首字母大写
  return withSpaces.replace(/\b\w/g, (c) => c.toUpperCase())
})
</script>

<template>
  <div v-if="shouldShow" class="m-doc-title">
    {{ docTitle }}
  </div>
</template>

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
