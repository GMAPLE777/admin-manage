<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <aside class="layout-sidebar" :class="{ collapsed: appStore.sidebarCollapsed }">
      <div class="logo">
        <span v-if="!appStore.sidebarCollapsed">通信运营管理</span>
        <span v-else>通</span>
      </div>
      <SideMenu :menu-list="menuList" :is-collapse="appStore.sidebarCollapsed" />
    </aside>

    <!-- 右侧主体 -->
    <div class="layout-main" :class="{ collapsed: appStore.sidebarCollapsed }">
      <TopHeader
        :is-collapse="appStore.sidebarCollapsed"
        :username="userStore.username"
        @toggle-sidebar="appStore.toggleSidebar"
        @logout="handleLogout"
      />
      <main class="layout-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SideMenu from '@/components/SideMenu.vue'
import TopHeader from '@/components/TopHeader.vue'
import { useAppStore, useUserStore } from '@/store'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const menuList = [
  { path: '/dashboard', title: '首页', icon: 'HomeFilled' },
  { path: '/user', title: '用户管理', icon: 'User' },
  { path: '/package', title: '套餐管理', icon: 'Goods' },
  { path: '/statistics', title: '数据统计', icon: 'DataAnalysis' },
]

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  &-sidebar {
    width: 220px;
    min-width: 220px;
    background: #304156;
    transition: width 0.3s, min-width 0.3s;
    overflow-y: auto;
    overflow-x: hidden;

    &.collapsed {
      width: 64px;
      min-width: 64px;
    }

    .logo {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      white-space: nowrap;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  &-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f0f2f5;
  }
}
</style>
