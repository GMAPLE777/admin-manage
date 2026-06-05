<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    :router="true"
    :unique-opened="true"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409eff"
  >
    <template v-for="item in menuList" :key="item.path">
      <!-- 单级菜单 -->
      <el-menu-item v-if="!item.children" :index="item.path">
        <el-icon><component :is="item.icon" /></el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>

      <!-- 多级菜单 -->
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        >
          {{ child.title }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export interface MenuItem {
  path: string
  title: string
  icon?: string
  children?: MenuItem[]
}

withDefaults(defineProps<{
  menuList: MenuItem[]
  isCollapse?: boolean
}>(), {
  isCollapse: false,
})

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>
