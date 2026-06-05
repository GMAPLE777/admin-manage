import type { MockMethod } from 'vite-plugin-mock'

/** 月度趋势数据（最近12个月） */
const months = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2026, i, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
})

export const statisticsMock: MockMethod[] = [
  // 数据看板概览
  {
    url: '/api/statistics/dashboard',
    method: 'get',
    response: () => ({
      code: 200,
      message: 'success',
      data: {
        totalUsers: 1286,
        newUsersThisMonth: 138,
        totalPackages: 12,
        activeUsers: 856,
      },
    }),
  },
  // 图表数据（用户增长 + 套餐占比 + 活跃度）
  {
    url: '/api/statistics/chart',
    method: 'get',
    response: () => ({
      code: 200,
      message: 'success',
      data: {
        // 月度用户增长趋势（折线图）
        userGrowth: months.map((m, i) => ({
          month: m,
          newUsers: Math.floor(Math.random() * 200) + 50,
          totalUsers: 800 + i * 40 + Math.floor(Math.random() * 100),
        })),
        // 套餐占比分析（饼图）
        packageDistribution: [
          { name: '5G畅享套餐', value: 486 },
          { name: '4G基础套餐', value: 352 },
          { name: '5G尊享套餐', value: 298 },
          { name: '校园套餐', value: 150 },
        ],
        // 用户活跃度统计（柱状图）
        activeUsers: months.map((m) => ({
          month: m,
          daily: Math.floor(Math.random() * 300) + 100,
          weekly: Math.floor(Math.random() * 500) + 200,
          monthly: Math.floor(Math.random() * 700) + 300,
        })),
      },
    }),
  },
]
