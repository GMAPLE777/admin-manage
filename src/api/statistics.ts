import { get } from '@/utils/request'

/** 数据看板概览 */
export interface DashboardData {
  totalUsers: number
  newUsersThisMonth: number
  totalPackages: number
  activeUsers: number
}

/** 用户增长趋势 */
export interface GrowthItem {
  month: string
  newUsers: number
  totalUsers: number
}

/** 套餐分布 */
export interface PackageDistItem {
  name: string
  value: number
}

/** 活跃用户统计 */
export interface ActiveItem {
  month: string
  daily: number
  weekly: number
  monthly: number
}

/** 图表数据汇总 */
export interface ChartData {
  userGrowth: GrowthItem[]
  packageDistribution: PackageDistItem[]
  activeUsers: ActiveItem[]
}

// ========== 统计 API（路径对齐文档） ==========

/** 获取数据看板概览 */
export function getDashboard() {
  return get<DashboardData>('/statistics/dashboard')
}

/** 获取图表数据（用户增长 + 套餐占比 + 活跃度） */
export function getChartData() {
  return get<ChartData>('/statistics/chart')
}
