<template>
  <div class="statistics-page">
    <h2>数据报表</h2>

    <!-- 折线图：用户增长趋势 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-card>
          <template #header><span>用户增长趋势</span></template>
          <v-chart :option="userGrowthOption" style="height: 360px" autoresize />
        </el-card>
      </el-col>
    </el-row>

    <!-- 饼图 + 柱状图 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <!-- 套餐销售统计（饼图） -->
      <el-col :span="12">
        <el-card>
          <template #header><span>套餐销售统计</span></template>
          <v-chart :option="packagePieOption" style="height: 360px" autoresize />
        </el-card>
      </el-col>

      <!-- 用户分布分析（柱状图） -->
      <el-col :span="12">
        <el-card>
          <template #header><span>用户分布分析</span></template>
          <v-chart :option="userDistOption" style="height: 360px" autoresize />
        </el-card>
      </el-col>
    </el-row>

    <!-- 活跃用户分析（柱状图） -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-card>
          <template #header><span>活跃用户分析</span></template>
          <v-chart :option="activeBarOption" style="height: 360px" autoresize />
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
import { getChartData, type ChartData } from '@/api'

use([CanvasRenderer, LineChart, BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const chartData = ref<ChartData | null>(null)

/** 折线图：用户增长趋势 */
const userGrowthOption = computed(() => {
  const data = chartData.value?.userGrowth ?? []
  return {
    tooltip: { trigger: 'axis' },
    legend: { data: ['新增用户', '累计用户'] },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: data.map((d) => d.month), boundaryGap: false },
    yAxis: { type: 'value' },
    series: [
      { name: '新增用户', type: 'line', data: data.map((d) => d.newUsers), smooth: true, areaStyle: { opacity: 0.15 }, itemStyle: { color: '#409eff' } },
      { name: '累计用户', type: 'line', data: data.map((d) => d.totalUsers), smooth: true, itemStyle: { color: '#67c23a' } },
    ],
  }
})

/** 饼图：套餐销售统计 */
const packagePieOption = computed(() => {
  const data = chartData.value?.packageDistribution ?? []
  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c}人 ({d}%)' },
    legend: { bottom: 0 },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: true, formatter: '{b}\n{d}%' },
      emphasis: { label: { fontSize: 16, fontWeight: 'bold' } },
      data,
    }],
  }
})

/** 柱状图：用户分布分析 */
const userDistOption = computed(() => {
  const data = chartData.value?.packageDistribution ?? []
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: data.map((d) => d.name) },
    yAxis: { type: 'value', name: '用户数' },
    series: [{
      type: 'bar',
      data: data.map((d) => d.value),
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: '#409eff' }, { offset: 1, color: '#79bbff' }],
        },
        borderRadius: [6, 6, 0, 0],
      },
      barWidth: '50%',
    }],
  }
})

/** 柱状图：活跃用户分析 */
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
    chartData.value = await getChartData()
  } catch { /* mock 未启用 */ }
})
</script>
