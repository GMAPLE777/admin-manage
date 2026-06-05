<template>
  <div class="common-search">
    <el-input
      v-model="keyword"
      :placeholder="placeholder"
      clearable
      @keyup.enter="handleSearch"
      @clear="handleSearch"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: '请输入关键词搜索',
})

const emit = defineEmits<{
  (e: 'search', keyword: string): void
}>()

const keyword = ref('')

function handleSearch() {
  emit('search', keyword.value.trim())
}
</script>

<style lang="scss" scoped>
.common-search {
  display: flex;
  align-items: center;
  gap: 12px;
  .el-input { width: 240px; }
}
</style>
