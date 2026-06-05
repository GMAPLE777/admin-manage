<template>
  <div class="common-pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="currentPageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handleChange"
      @current-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  total?: number
  page?: number
  pageSize?: number
}>(), {
  total: 0,
  page: 1,
  pageSize: 10,
})

const emit = defineEmits<{
  (e: 'change', payload: { page: number; pageSize: number }): void
}>()

const currentPage = ref(props.page)
const currentPageSize = ref(props.pageSize)

watch(() => props.page, (v) => { currentPage.value = v })
watch(() => props.pageSize, (v) => { currentPageSize.value = v })

function handleChange() {
  emit('change', { page: currentPage.value, pageSize: currentPageSize.value })
}
</script>

<style lang="scss" scoped>
.common-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;
}
</style>
