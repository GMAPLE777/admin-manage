import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/auth'

/** 公开路由 — 无需登录 */
const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/LoginView.vue'),
    meta: { title: '登录', hidden: true },
  },
]

/** 受保护路由 — 需登录 */
const protectedRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/DashboardView.vue'),
        meta: { title: '首页', icon: 'HomeFilled' },
      },
      {
        path: 'user',
        name: 'UserManage',
        component: () => import('@/views/UserManage/UserManageView.vue'),
        meta: { title: '用户管理', icon: 'User' },
      },
      {
        path: 'package',
        name: 'PackageManage',
        component: () => import('@/views/PackageManage/PackageManageView.vue'),
        meta: { title: '套餐管理', icon: 'Goods' },
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/Statistics/StatisticsView.vue'),
        meta: { title: '数据统计', icon: 'DataAnalysis' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...protectedRoutes],
})

/** 路由守卫 — 登录校验 */
router.beforeEach((to, _from, next) => {
  const token = getToken()

  if (to.path === '/login') {
    token ? next('/') : next()
    return
  }

  if (!token) {
    next('/login')
    return
  }

  next()
})

export default router
