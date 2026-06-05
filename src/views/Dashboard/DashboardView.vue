<template>
  <div class="dashboard">
    <h2>数据看板</h2>

    <!-- 统计卡片 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="6" v-for="card in statCards" :key="card.label">
        <el-card shadow="hover" :style="{ borderTop: `3px solid ${card.color}` }">
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon :size="36" :color="card.color"><component :is="card.icon" /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-label">{{ card.label }}</div>
              <div class="stat-value">{{ card.value }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <!-- 月度用户增长趋势（折线图） -->
      <el-col :span="12">
        <el-card>
          <template #header><span>月度用户增长趋势</span></template>
          <v-chart :option="userGrowthOption" style="height: 350px" autoresize />
        </el-card>
      </el-col>

      <!-- 套餐占比分析（饼图） -->
      <el-col :span="12">
        <el-card>
          <template #header><span>套餐占比分析</span></template>
          <v-chart :option="packagePieOption" style="height: 350px" autoresize />
        </el-card>
      </el-col>
    </el-row>

    <!-- 用户活跃度统计（柱状图） -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-card>
          <template #header><span>用户活跃度统计</span></template>
          <v-chart :option="activeBarOption" style="height: 350px" autoresize />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import { getDashboard, getChartData, type DashboardData, type ChartData } from '@/api'

use([CanvasRenderer, LineChart, BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const dashboard = ref<DashboardData | null>(null)
const chartData = ref<ChartData | null>(null)

const statCards = computed(() => [
  { label: '总用户数', value: dashboard.value?.totalUsers ?? '--', icon: 'User', color: '#409eff' },
  { label: '本月新增用户', value: dashboard.value?.newUsersThisMonth ?? '--', icon: 'UserFilled', color: '#67c23a' },
  { label: '套餐总数', value: dashboard.value?.totalPackages ?? '--', icon: 'Goods', color: '#e6a23c' },
  { label: '活跃用户数', value: dashboard.value?.activeUsers ?? '--', icon: 'DataAnalysis', color: '#f56c6c' },
])

/** 折线图：月度用户增长 */
const userGrowthOption = computed(() => {
  const data = chartData.value?.userGrowth ?? []
  return {
    tooltip: { trigger: 'axis' },
    legend: { data: ['新增用户', '累计用户'] },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: data.map((d) => d.month), boundaryGap: false },
    yAxis: { type: 'value' },
    series: [
      { name: '新增用户', type: 'line', data: data.map((d) => d.newUsers), smooth: true, itemStyle: { color: '#409eff' } },
      { name: '累计用户', type: 'line', data: data.map((d) => d.totalUsers), smooth: true, itemStyle: { color: '#67c23a' } },
    ],
  }
})

/** 饼图：套餐占比 */
const packagePieOption = computed(() => {
  const data = chartData.value?.packageDistribution ?? []
  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical', right: '5%', top: 'center' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['38%', '50%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: true, formatter: '{b}\n{d}%' },
      data,
    }],
  }
})

/** 柱状图：用户活跃度 */
const activeBarOption = computed(() => {
  const data = chartData.value?.activeUsers ?? []
  return {
    tooltip: { trigger: 'axis' },
    legend: { data: ['日活跃', '周活跃', '月活跃'] },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: data.map((d) => d.month) },
    yAxis: { type: 'value' },
    series: [
      { name: '日活跃', type: 'bar', data: data.map((d) => d.daily), itemStyle: { color: '#409eff' } },
      { name: '周活跃', type: 'bar', data: data.map((d) => d.weekly), itemStyle: { color: '#67c23a' } },
      { name: '月活跃', type: 'bar', data: data.map((d) => d.monthly), itemStyle: { color: '#e6a23c' } },
    ],
  }
})

onMounted(async () => {
  try {
    const [dash, chart] = await Promise.all([getDashboard(), getChartData()])
    dashboard.value = dash
    chartData.value = chart
  } catch { /* mock 未启用时静默 */ }
})
</script>

<style lang="scss" scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  .stat-icon { flex-shrink: 0; }
  .stat-info { flex: 1; }
  .stat-label { color: #909399; font-size: 14px; margin-bottom: 4px; }
  .stat-value { font-size: 28px; font-weight: bold; color: #303133; }
}
</style>
