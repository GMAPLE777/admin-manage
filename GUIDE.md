# 🚀 通信运营数据管理平台

> Vue 3 企业级后台管理系统的完整开发流程。

---

## 📖 目录

- [🚀 通信运营数据管理平台](#-通信运营数据管理平台)
  - [📖 目录](#-目录)
  - [一、项目是什么](#一项目是什么)
    - [它能做什么？](#它能做什么)
  - [二、开发前的规划（需求分析）](#二开发前的规划需求分析)
    - [第一步：梳理功能模块](#第一步梳理功能模块)
    - [第二步：定义数据长什么样](#第二步定义数据长什么样)
    - [第三步：规划 API 接口](#第三步规划-api-接口)
    - [第四步：拆分成开发阶段](#第四步拆分成开发阶段)
  - [三、技术选型：为什么选这些](#三技术选型为什么选这些)
    - [全家福](#全家福)
    - [新手最常问的三个问题](#新手最常问的三个问题)
    - [依赖关系图](#依赖关系图)
  - [四、项目结构详解](#四项目结构详解)
    - ["这个文件干什么"速查表](#这个文件干什么速查表)
  - [五、开发阶段：8 步搭起整个项目](#五开发阶段8-步搭起整个项目)
    - [阶段一：搭脚手架](#阶段一搭脚手架)
    - [阶段二：登录模块](#阶段二登录模块)
      - [涉及的文件](#涉及的文件)
      - [数据流向](#数据流向)
      - [路由守卫是什么？](#路由守卫是什么)
      - [Axios 拦截器是什么？](#axios-拦截器是什么)
    - [阶段三：后台布局](#阶段三后台布局)
      - [涉及的文件](#涉及的文件-1)
      - [关键概念：`<router-view />`](#关键概念router-view-)
      - [侧边栏怎么折叠？](#侧边栏怎么折叠)
    - [阶段四：业务页面（静态）](#阶段四业务页面静态)
      - [涉及的文件](#涉及的文件-2)
      - [组件化思想](#组件化思想)
      - [三个公共组件一览](#三个公共组件一览)
    - [阶段五：Mock 假数据](#阶段五mock-假数据)
      - [Mock 怎么工作的？](#mock-怎么工作的)
      - [一个 Mock 写法示例](#一个-mock-写法示例)
      - [数据在哪？](#数据在哪)
    - [阶段六：增删改查（CRUD）](#阶段六增删改查crud)
      - [查询（Read）— 已在上一步实现](#查询read-已在上一步实现)
      - [搜索 — 带参数查询](#搜索--带参数查询)
      - [新增（Create）— 弹窗 + 表单](#新增create-弹窗--表单)
      - [编辑（Update）— 弹窗回填](#编辑update-弹窗回填)
      - [删除（Delete）— 确认提示](#删除delete-确认提示)
      - [状态机：弹窗的生死周期](#状态机弹窗的生死周期)
    - [阶段七：图表可视化（ECharts）](#阶段七图表可视化echarts)
      - [ECharts 怎么集成？](#echarts-怎么集成)
      - [图表用法模板](#图表用法模板)
      - [本项目 3 种图表](#本项目-3-种图表)
    - [阶段八：收尾优化](#阶段八收尾优化)
  - [六、核心概念速通](#六核心概念速通)
    - [1. Vue 3 的单文件组件(.vue)](#1-vue-3-的单文件组件vue)
    - [2. Composition API 与 setup 语法糖](#2-composition-api-与-setup-语法糖)
    - [3. 路由：前端多页面的秘密](#3-路由前端多页面的秘密)
    - [4. 状态管理：Pinia 是什么](#4-状态管理pinia-是什么)
    - [5. Axios：前端如何和后端说话](#5-axios前端如何和后端说话)
    - [6. Mock：没有后端也能跑](#6-mock没有后端也能跑)
    - [7. 组件化：搭积木一样写页面](#7-组件化搭积木一样写页面)
  - [七、关键代码走读](#七关键代码走读)
    - [登录全流程](#登录全流程)
    - [用户管理的增删改查](#用户管理的增删改查)
    - [ECharts 图表是怎么画出来的](#echarts-图表是怎么画出来的)
  - [八、动手跑起来](#八动手跑起来)
    - [第一次运行](#第一次运行)
    - [玩一玩](#玩一玩)
    - [构建上线版本](#构建上线版本)
    - [目录热力图：先看哪些文件](#目录热力图先看哪些文件)
  - [九、下一步学什么](#九下一步学什么)
    - [如果你想继续深入](#如果你想继续深入)
    - [推荐学习资源](#推荐学习资源)
    - [建议的学习路径](#建议的学习路径)

---

## 一、项目是什么

这是一个**通信运营数据管理平台**——通俗地说，就是一个给运营人员用的后台系统，用来管理用户、套餐，以及查看运营数据报表。

你可以把它想象成"中国移动内部员工用的那个系统"的简化版。

### 它能做什么？

```
登录 → 看到数据看板 → 管理用户 → 管理套餐 → 查看统计报表
```

具体来说有 5 个页面：

| 页面 | 功能 |
|------|------|
| 登录页 | 输入账号密码，校验通过后进入后台 |
| 首页（数据看板） | 4 个统计卡片 + 折线图/饼图/柱状图 |
| 用户管理 | 搜索、新增、编辑、删除用户，分页浏览 |
| 套餐管理 | 搜索、分类筛选、新增、编辑、删除套餐 |
| 数据报表 | 用户增长趋势、套餐分布、活跃度分析图表 |

界面效果（文字描述）：

```
┌─────────────────────────────────────────────────┐
│ ┌──────────┐  ┌──────────────────────────────┐  │
│ │ 通信运营  │  │ 面包屑: 首页 / 用户管理        │  │
│ │          │  │                      [▼ admin] │  │
│ │ ■ 首页   │  ├──────────────────────────────┤  │
│ │ ■ 用户管理│  │                              │  │
│ │ ■ 套餐管理│  │     (页面内容区域)             │  │
│ │ ■ 数据统计│  │                              │  │
│ │          │  │                              │  │
│ └──────────┘  └──────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 二、开发前的规划（需求分析）

写代码之前，先要想清楚：**要做什么、怎么做、分几步做**。

### 第一步：梳理功能模块

把需求拆成一块一块的，这个项目在 [project.md](project.md) 里已经梳理好了：

```
登录模块 → 系统首页 → 用户管理 → 套餐管理 → 数据报表
```

### 第二步：定义数据长什么样

后端传过来的数据要有固定的"形状"，这叫**数据模型**（Model）。

用户数据模型：

```json
{
  "id": 1,                    // 用户 ID（数字）
  "username": "张三",          // 用户名（字符串）
  "phone": "13800138000",      // 手机号（字符串）
  "packageName": "5G畅享套餐", // 关联的套餐名（字符串）
  "status": 1,                // 状态：1=启用，0=禁用（数字）
  "createTime": "2026-06-01"  // 创建时间（字符串）
}
```

套餐数据模型：

```json
{
  "id": 1,                    // 套餐 ID
  "packageName": "5G畅享套餐", // 套餐名称
  "price": 99,                // 价格（元）
  "flow": "100GB",            // 包含流量
  "callMinutes": 1000,        // 包含通话分钟数
  "status": 1                 // 状态：1=上架，0=下架
}
```

> **新手重点**：开始写代码前，先把数据字段定下来。后续的 API 接口、Mock 数据、表格列、表单输入框，全都围绕这些字段展开。

### 第三步：规划 API 接口

前端和后端通过 **HTTP 请求** 交流，每个功能对应一个接口：

| 操作 | 方法 | 路径 |
|------|------|------|
| 登录 | POST | `/api/login` |
| 查用户列表 | GET | `/api/user/list` |
| 新增用户 | POST | `/api/user/add` |
| 编辑用户 | PUT | `/api/user/update` |
| 删除用户 | DELETE | `/api/user/delete` |

### 第四步：拆分成开发阶段

一口气写完不现实，分阶段逐步推进（下方会逐阶段讲解）：

```
阶段一: 搭框架     → 阶段二: 做登录     → 阶段三: 做布局
阶段四: 做页面     → 阶段五: 接数据     → 阶段六: 做交互
阶段七: 画图表     → 阶段八: 收尾优化
```

---

## 三、技术选型：为什么选这些

### 全家福

```
Vue 3        ← 前端框架（页面逻辑）
TypeScript   ← 带类型的 JavaScript（减少 bug）
Vite         ← 构建工具（启动快、热更新快）
Element Plus ← UI 组件库（按钮/表格/弹窗开箱即用）
Vue Router   ← 路由（管理页面跳转）
Pinia        ← 状态管理（全局数据仓库）
Axios        ← HTTP 请求库（和服务器通信）
ECharts      ← 图表库（画折线图/饼图/柱状图）
```

### 新手最常问的三个问题

**Q1: Vue 3 还是 React？**

选 Vue 3。语法更直白，中文社区活跃，Element Plus 配套成熟，对新手友好。

**Q2: Composition API 还是 Options API？**

选 Composition API（`<script setup>`）。Vue 3 推荐写法，逻辑更清晰，配合 TypeScript 类型推导更好。

**Q3: Pinia 还是 Vuex？**

选 Pinia。Vuex 是上一代，Pinia 是官方新一代，API 更简洁，也支持 Composition API 风格。

### 依赖关系图

```
项目
 ├─ Vue 3          ← 核心框架
 ├─ Vue Router     ← 管页面跳转
 ├─ Pinia          ← 管全局数据（用户信息等）
 ├─ Axios          ← 发 HTTP 请求
 │    └─ 拦截器: 自动加 Token、自动弹错误提示
 ├─ Element Plus   ← 按钮/表格/表单/弹窗/分页...
 │    └─ @element-plus/icons-vue ← 图标
 ├─ ECharts        ← 底层图表引擎
 │    └─ vue-echarts ← 封装成 Vue 组件
 └─ vite-plugin-mock ← 开发时模拟后端
      └─ mockjs      ← 生成随机假数据
```

---

## 四、项目结构详解

```
admin-manage/
│
├── index.html               # 入口 HTML（所有页面套在这个壳里）
├── package.json             # 依赖清单（npm install 就靠这个）
├── vite.config.ts           # Vite 配置（代理 / 别名 / 插件）
├── tsconfig.json            # TypeScript 配置
├── .gitignore               # 哪些文件不提交到 Git
│
├── public/
│   └── vite.svg             # 网站图标（浏览器标签页那个小图）
│
└── src/                     # ← 所有代码在这
    │
    ├── main.ts              # 程序入口：注册 Vue/路由/Pinia/ElementPlus
    ├── App.vue              # 根组件（只有一个 <router-view> 占位符）
    ├── env.d.ts             # 告诉 TypeScript 怎么理解 .vue 文件
    │
    ├── api/                 # 📡 接口层：定义所有后端请求
    │   ├── login.ts         #   登录接口
    │   ├── user.ts          #   用户 CRUD 接口
    │   ├── package.ts       #   套餐 CRUD 接口
    │   ├── statistics.ts    #   统计图表接口
    │   └── index.ts         #   统一导出
    │
    ├── assets/              # 🎨 静态资源
    │   └── styles/
    │       ├── reset.css    #   抹平浏览器默认样式
    │       └── global.scss  #   全局 SCSS 变量（主题色、布局尺寸）
    │
    ├── components/          # 🧩 公共组件（可复用的 UI 积木）
    │   ├── SideMenu.vue     #   侧边栏菜单
    │   ├── TopHeader.vue    #   顶部导航栏（含面包屑和用户下拉）
    │   ├── Breadcrumb.vue   #   面包屑导航
    │   ├── CommonSearch.vue #   搜索栏
    │   ├── CommonPagination.vue  # 分页器
    │   └── CommonDialog.vue #   通用弹窗
    │
    ├── layout/              # 📐 页面骨架
    │   └── index.vue        #   左（侧边栏）+ 右（顶栏+内容区）
    │
    ├── mock/                # 🎭 模拟后端（开发时用，不用真后端）
    │   ├── login.ts         #   登录假接口
    │   ├── user.ts          #   用户假接口（内置 36 条数据）
    │   ├── package.ts       #   套餐假接口（内置 12 条数据）
    │   ├── statistics.ts    #   统计假接口（随机生成趋势数据）
    │   └── index.ts         #   汇总导出
    │
    ├── router/              # 🧭 路由：URL ↔ 页面 的映射
    │   └── index.ts         #   路由表 + 登录守卫
    │
    ├── store/               # 🏪 全局状态仓库（Pinia）
    │   ├── user.ts          #   用户信息 / token / 登录登出
    │   ├── app.ts           #   侧边栏折叠状态
    │   └── index.ts         #   创建 Pinia 实例
    │
    ├── utils/               # 🔧 工具函数
    │   ├── request.ts       #   Axios 实例（统一配置/拦截器）
    │   ├── auth.ts          #   Token 存取（存/取/删 localStorage）
    │   ├── validate.ts      #   表单校验规则（手机号/邮箱/密码）
    │   └── format.ts        #   日期格式化（yyyy-MM-dd / 时间前）
    │
    └── views/               # 📄 页面
        ├── Login/           #   登录页
        ├── Dashboard/       #   首页（数据看板）
        ├── UserManage/      #   用户管理
        ├── PackageManage/   #   套餐管理
        └── Statistics/      #   数据报表
```

### "这个文件干什么"速查表

| 你遇到的问题 | 去哪个文件改 |
|-------------|-------------|
| 想改页面外观 | `src/views/` 或 `src/components/` |
| 想改接口地址 | `src/api/` |
| 想改假数据 | `src/mock/` |
| 想改路由/加页面 | `src/router/index.ts` |
| 想改全局配色 | `src/assets/styles/global.scss` |
| 想改登录逻辑 | `src/store/user.ts` + `src/views/Login/` |
| 想改请求头/错误处理 | `src/utils/request.ts` |
| 想改侧边栏菜单 | `src/layout/index.vue` 里的 `menuList` |
| 想改页面标题 | `src/router/index.ts` 里路由的 `meta.title` |

---

## 五、开发阶段：8 步搭起整个项目

### 阶段一：搭脚手架

**目标**：让项目能启动起来。

```bash
# 如果没有 Vite，先全局安装
npm create vite@latest admin-manage -- --template vue-ts

# 进入项目，安装基础依赖
cd admin-manage
npm install vue-router@4 pinia axios element-plus @element-plus/icons-vue

# 安装开发依赖
npm install -D sass mockjs vite-plugin-mock
```

**关键动作**：
1. 在 `main.ts` 里注册 Element Plus（别忘了导入 CSS 和中文语言包）
2. 配置 `vite.config.ts` — 路径别名 `@`、开发端口、代理、Mock 插件
3. 写好目录结构骨架（空文件夹也行，但要先把架子搭好）

**此时项目能跑吗？** 能。`npm run dev` 会打开一个空白页面。

---

### 阶段二：登录模块

**目标**：用户能输入账号密码登录，未登录不能进后台。

#### 涉及的文件

```
src/views/login/LoginView.vue   ← 登录页面 UI
src/api/login.ts                ← 登录接口定义
src/mock/login.ts               ← 登录假接口
src/store/user.ts               ← 存 token 和用户信息
src/utils/auth.ts               ← token 存/取/删
src/utils/request.ts            ← Axios 封装（自动带 token）
src/utils/validate.ts           ← 表单校验
src/router/index.ts             ← 路由守卫（未登录→跳登录页）
```

#### 数据流向

```
用户在登录页输入账号密码
        │
        ▼
点击"登录"按钮 → 表单校验 → 通过？
        │                    │
        ▼                    ▼ 不通过
调用 login API            显示红色提示
        │
        ▼
Mock 拦截请求，返回 { token, userInfo }
        │
        ▼
存 token 到 localStorage（auth.ts）
        │
        ▼
存用户信息到 Pinia（store/user.ts）
        │
        ▼
路由跳转到首页（/dashboard）
```

#### 路由守卫是什么？

```typescript
// 每次路由变化时触发
router.beforeEach((to, _from, next) => {
  const token = getToken()
  
  if (to.path === '/login') {
    // 去登录页 → 已登录就跳到首页，没登录就放行
    token ? next('/') : next()
  } else {
    // 去其他页 → 没 token 就跳到登录页，有就放行
    token ? next() : next('/login')
  }
})
```

> **大白话**：路由守卫就像公司门口的保安。没工卡（token）不让进，有工卡就放行。

#### Axios 拦截器是什么？

```typescript
// 请求拦截器：每次发请求前，自动把 token 塞到请求头里
service.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})

// 响应拦截器：每次收到响应后，自动检查是否报错
service.interceptors.response.use(
  (response) => response.data.data,  // 成功，直接返回数据
  (error) => {
    if (error.response?.status === 401) {  // token 过期
      removeToken()
      router.push('/login')  // 踢回登录页
    }
    ElMessage.error(error.message)  // 弹错误提示
  }
)
```

> **大白话**：拦截器就像收发室的自动盖章。发出前自动盖"授权章"（加 token），收到后发现有问题就自动报警。

---

### 阶段三：后台布局

**目标**：搭出后台管理系统的骨架——左菜单 + 右内容区。

```
┌──────────┬──────────────────────────────┐
│          │  面包屑: 首页 / 用户管理  [头像] │ ← TopHeader
│  侧边栏   ├──────────────────────────────┤
│  菜单     │                              │
│          │      <router-view />          │ ← 内容区（哪个页面的内容放这）
│          │                              │
└──────────┴──────────────────────────────┘
```

#### 涉及的文件

```
src/layout/index.vue              ← 左右布局骨架
src/components/SideMenu.vue       ← 侧边栏（可折叠）
src/components/TopHeader.vue      ← 顶栏（面包屑 + 用户头像）
src/components/Breadcrumb.vue     ← 面包屑（自动从路由读取）
src/store/app.ts                  ← 侧边栏是否折叠的全局状态
```

#### 关键概念：`<router-view />`

`<router-view />` 是一个**占位符**。它的意思是："当前路由匹配到的组件，渲染在这里"。

```vue
<!-- layout/index.vue -->
<template>
  <div class="layout">
    <aside><!-- 侧边栏 --></aside>
    <div class="layout-main">
      <TopHeader />
      <main>
        <router-view />  <!-- ← 这里会根据当前 URL 显示不同内容 -->
      </main>
    </div>
  </div>
</template>
```

当 URL 是 `/user` → 这里渲染 `UserManageView.vue`
当 URL 是 `/dashboard` → 这里渲染 `DashboardView.vue`

#### 侧边栏怎么折叠？

```typescript
// store/app.ts — 一个简单的开关
const sidebarCollapsed = ref(false)
function toggleSidebar() { sidebarCollapsed.value = !sidebarCollapsed.value }
```

侧边栏宽度用 CSS transition 做动画：

```scss
.layout-sidebar {
  width: 220px;
  transition: width 0.3s;
  &.collapsed { width: 64px; }  // 折叠后只显示图标
}
```

---

### 阶段四：业务页面（静态）

**目标**：把每个页面的 HTML/CSS 写出来，先不管数据。

#### 涉及的文件

```
src/views/Dashboard/DashboardView.vue
src/views/UserManage/UserManageView.vue
src/views/PackageManage/PackageManageView.vue
src/views/Statistics/StatisticsView.vue
src/components/CommonSearch.vue
src/components/CommonPagination.vue
src/components/CommonDialog.vue
```

#### 组件化思想

不要在每个页面里重复写搜索栏。提取成一个公共组件：

```vue
<!-- CommonSearch.vue -->
<template>
  <div class="common-search">
    <el-input v-model="keyword" placeholder="请输入关键词" />
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>
```

使用时只需一行：

```vue
<CommonSearch placeholder="搜索用户名" @search="handleSearch" />
```

> **法则**：同样的代码出现 2 次以上，考虑提取成组件。

#### 三个公共组件一览

| 组件 | 作用 | 关键 props | 关键 emits |
|------|------|-----------|-----------|
| CommonSearch | 搜索栏 | `placeholder` | `@search(keyword)` |
| CommonPagination | 分页器 | `total`, `page`, `pageSize` | `@change({page, pageSize})` |
| CommonDialog | 弹窗 | `modelValue`, `title` | `@confirm`, `@close` |

---

### 阶段五：Mock 假数据

**目标**：没有后端时，让页面能加载出数据。

#### Mock 怎么工作的？

```
浏览器发请求 GET /api/user/list?page=1&pageSize=10
        │
        ▼
Vite 开发服务器拦截（vite-plugin-mock）
        │
        ▼
匹配到 mock/user.ts 里定义的路由 → 用假数据拼出返回值
        │
        ▼
浏览器收到 { code: 200, data: { list: [...], total: 36, ... } }
```

对前端代码来说，完全不知道这是假数据——和真实后端行为一模一样。

#### 一个 Mock 写法示例

```typescript
// mock/user.ts
{
  url: '/api/user/list',
  method: 'get',
  response: ({ query }) => {
    // query = { page: '1', pageSize: '10', keyword: '' }
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10
    const start = (page - 1) * pageSize
    
    return {
      code: 200,
      message: 'success',
      data: {
        list: users.slice(start, start + pageSize),  // 切片分页
        total: users.length,
        page,
        pageSize,
      },
    }
  },
}
```

> **注意**：Mock 只在 `npm run dev` 时生效。`npm run build` 不会包含 Mock 代码。

#### 数据在哪？

- 用户数据：`mock/user.ts`，内置 36 条假数据
- 套餐数据：`mock/package.ts`，内置 12 条假数据
- 统计图表数据：`mock/statistics.ts`，随机生成 12 个月的趋势

---

### 阶段六：增删改查（CRUD）

**目标**：页面上能真正操作数据。

> **CRUD** = Create（新增）+ Read（查询）+ Update（编辑）+ Delete（删除）

以用户管理为例：

#### 查询（Read）— 已在上一步实现

```
页面加载 → 调用 getUserList({ page: 1, pageSize: 10 })
          → Mock 返回数据 → 填入表格
```

#### 搜索 — 带参数查询

```typescript
function handleSearch(keyword: string) {
  keyword.value = keyword       // 保存搜索词
  pageInfo.page = 1             // 重置到第 1 页
  fetchData()                   // 重新请求（这次带上 keyword）
}
```

#### 新增（Create）— 弹窗 + 表单

```
点击"新增用户" → 弹出 CommonDialog → 填写表单
→ 点"确定" → 表单校验 → 校验通过 → 调用 addUser(form)
→ 关闭弹窗 → 刷新列表 → 提示"新增成功"
```

#### 编辑（Update）— 弹窗回填

```
点击某行的"编辑" → 弹出 CommonDialog（标题变为"编辑用户"）
→ 把该行数据填入表单 → 修改内容 → 点"确定"
→ 调用 updateUser({ id: row.id, ...form })
→ 关闭弹窗 → 刷新列表 → 提示"编辑成功"
```

#### 删除（Delete）— 确认提示

```typescript
async function handleDelete(row) {
  // 弹确认框
  await ElMessageBox.confirm(`确认删除「${row.username}」？`, '提示', { type: 'warning' })
  // 用户点"确定"
  await deleteUser(row.id)
  ElMessage.success('删除成功')
  fetchData()  // 刷新列表
}
```

#### 状态机：弹窗的生死周期

```
dialogVisible === false ────────→ dialogVisible === true
       ↑ 关闭弹窗                            │
       │                                     │ 填表单
       │                                     │
       │                                     ▼
  刷新列表 ←── submitLoading: true ─── 点击"确定"
                     │
                     └── 调 API → 成功/失败 → submitLoading: false
```

---

### 阶段七：图表可视化（ECharts）

**目标**：把数字变成图表。

#### ECharts 怎么集成？

```
ECharts (底层引擎) → vue-echarts (封装成 Vue 组件) → 你的页面
```

使用步骤：

```bash
npm install echarts vue-echarts
```

```typescript
// 按需引入（只引入用到的，打包体积小）
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])
```

#### 图表用法模板

```vue
<template>
  <v-chart :option="chartOption" style="height: 350px" autoresize />
</template>

<script setup>
import VChart from 'vue-echarts'
import { computed } from 'vue'

// 只需要准备一个 option 对象，v-chart 自动渲染
const chartOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['1月', '2月', '3月', ...] },
  yAxis: { type: 'value' },
  series: [{
    type: 'line',
    data: [100, 200, 150, ...],
    smooth: true,
  }],
}))
</script>
```

> **只用操心数据**，不要管 Canvas 绘制——ECharts 全部帮你搞定。

#### 本项目 3 种图表

| 图表类型 | 在哪用 | 数据来源 |
|---------|-------|---------|
| 折线图 (line) | 用户增长趋势 | `chartData.userGrowth` |
| 饼图 (pie) | 套餐占比分析 / 套餐销售统计 | `chartData.packageDistribution` |
| 柱状图 (bar) | 活跃用户统计 / 用户分布分析 | `chartData.activeUsers` |

---

### 阶段八：收尾优化

```bash
npm run build  # 构建生产版本
```

优化项：

1. **代码拆分** — `vite.config.ts` 里配置 manualChunks，让 Element Plus 和 ECharts 各成独立文件，首屏加载更快
2. **路由懒加载** — 每个页面用 `() => import(...)`，访问时才加载
3. **README 完善** — 写清楚技术栈/结构/如何运行/接口文档

---

## 六、核心概念速通

### 1. Vue 3 的单文件组件(.vue)

一个 `.vue` 文件包含三部分：

```vue
<template>
  <!-- HTML：页面结构（展示在哪儿） -->
</template>

<script setup lang="ts">
  // JavaScript/TypeScript：页面逻辑（数据从哪来，事件做什么）
</script>

<style lang="scss" scoped>
  /* CSS：页面样式（长什么样） */
  /* scoped 表示样式只作用于本组件，不会污染其他组件 */
</style>
```

> **类比**：`template` = 骨架，`script` = 大脑，`style` = 皮肤。

### 2. Composition API 与 setup 语法糖

对比两种写法：

```vue
<!-- 旧写法 (Options API) -->
<script>
export default {
  data() { return { count: 0 } },
  methods: { increment() { this.count++ } },
  mounted() { console.log('mounted') },
}
</script>

<!-- 新写法 (Composition API + <script setup>) -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const count = ref(0)
function increment() { count.value++ }
onMounted(() => { console.log('mounted') })
</script>
```

> **`ref`** 是 Vue 3 里让数据"可响应"的包装。`count.value` 变化，页面上显示的数字自动更新。这就是**响应式**。

常用 API 速记：

| API | 作用 | 例子 |
|-----|------|------|
| `ref(值)` | 基本类型响应式 | `const n = ref(0)` |
| `reactive({})` | 对象响应式 | `const obj = reactive({a:1})` |
| `computed(() => ...)` | 计算属性（依赖别的值自动算） | `const full = computed(() => a + b)` |
| `watch(源, callback)` | 监听变化后干啥 | `watch(n, (newVal) => {...})` |
| `onMounted(() => ...)` | 组件挂载后执行 | 页面加载时请求数据 |

### 3. 路由：前端多页面的秘密

前端只有**一个** HTML 页面。切换页面是 Vue Router 在"演戏"——它根据 URL 变化，替换 `<router-view />` 里的组件。

```typescript
// router/index.ts
const routes = [
  { path: '/login',    component: () => import('@/views/Login/LoginView.vue') },
  { path: '/dashboard', component: () => import('@/views/Dashboard/DashboardView.vue') },
]

// 访问 /login → 显示 LoginView
// 访问 /dashboard → 显示 DashboardView
```

> **类比**：路由 = 电视遥控器。按不同按钮（URL）切换到不同频道（组件）。

### 4. 状态管理：Pinia 是什么

**问题**：组件 A 里的数据，组件 B 也需要用，怎么办？

```
┌──────────┐     ???     ┌──────────┐
│ 组件 A    │ ─────────→ │ 组件 B   │
│ userInfo │             │ 需要显示  │
└──────────┘             │ 用户名    │
                         └──────────┘
```

**解决**：把共享数据提到全局仓库里。

```
 ┌──────────────┐
 │  Pinia Store │ ← 全局数据放在这
 │  userInfo    │
 └──────┬───────┘
   ↗      ↖
 ┌──┐    ┌──┐
 │A │    │B │   ← 任何组件都能读/写
 └──┘    └──┘
```

```typescript
// store/user.ts
export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const isLoggedIn = computed(() => !!userInfo.value)
  
  async function login(params) { ... }
  function logout() { userInfo.value = null }
  
  return { userInfo, isLoggedIn, login, logout }
})

// 在任何组件里使用
import { useUserStore } from '@/store'
const userStore = useUserStore()
console.log(userStore.username)  // 读
userStore.logout()               // 写
```

### 5. Axios：前端如何和后端说话

```
前端（浏览器）
    │
    │ HTTP 请求：GET /api/user/list?page=1
    ▼
后端（服务器）
    │
    │ HTTP 响应：{ code: 200, data: { list: [...], total: 36 } }
    ▼
前端收到，更新页面
```

Axios 就是负责发请求、收响应的工具。本项目对它做了三层封装：

```
Axios 原生库
  └─ request.ts  — 创建实例、配 baseURL 和超时时间
       └─ 请求拦截器  — 自动带 token
       └─ 响应拦截器  — 自动弹错误、401 跳登录
            └─ api/login.ts  — 具体接口（get/post/put/del）
                 └─ 组件里直接调用
```

### 6. Mock：没有后端也能跑

```
开发阶段：你的代码 → Mock 拦截 → 假数据返回
上线阶段：你的代码 → 真实后端 → 真数据返回

前端代码完全不用改，只改一个开关就行。
```

### 7. 组件化：搭积木一样写页面

```
页面 = 布局组件 + 业务组件 + 公共组件

DashboardView = layout/index.vue 的 <router-view /> 里
                 ├── 4 个 el-card（统计卡片）
                 ├── 2 个 v-chart（折线图 + 饼图）
                 └── 1 个 v-chart（柱状图）

UserManageView = CommonSearch + el-table + CommonPagination + CommonDialog
```

---

## 七、关键代码走读

### 登录全流程

```
1. 用户输入账号密码，点击登录
   ↓
2. LoginView.vue 里 handleLogin()
   ├── 表单校验 formRef.value?.validate()
   ├── loading = true（按钮变灰、显示"登录中..."）
   ├── userStore.login({ username, password })
   └── loading = false
   ↓
3. store/user.ts 里 login()
   ├── 调用 loginApi({ username, password })
   ↓
4. api/login.ts
   ├── post('/login', params)
   ↓
5. mock/login.ts 拦截
   ├── 校验参数
   ├── 生成 token: "mock_token_admin_时间戳"
   └── 返回 { token, userInfo: { id, username, ... } }
   ↓
6. store/user.ts 拿到返回值
   ├── setToken(result.token)    → 存 localStorage
   ├── token.value = result.token
   └── userInfo.value = result.userInfo
   ↓
7. LoginView.vue 里
   ├── ElMessage.success('登录成功')
   └── router.push('/')          → 跳首页
   ↓
8. router/index.ts 路由守卫
   ├── 要去 / → 检查 token → 有 → 放行
   └── 加载 layout/index.vue → /dashboard 页面
```

### 用户管理的增删改查

完整的**用户管理**操作演示。先看页面结构：

```vue
<template>
  <div class="user-manage">
    <!-- 工具栏：搜索 + 新增按钮 -->
    <div class="toolbar">
      <CommonSearch @search="handleSearch" />
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
    </div>

    <!-- 数据表格 -->
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="username" label="用户名" />
      <!-- ...更多列 -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button link @click="handleEdit(row)">编辑</el-button>
          <el-button link @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <CommonPagination :total="total" @change="handlePageChange" />

    <!-- 新增/编辑弹窗 -->
    <CommonDialog v-model="dialogVisible" :title="dialogTitle" @confirm="handleSubmit">
      <el-form :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <!-- ...更多表单项 -->
      </el-form>
    </CommonDialog>
  </div>
</template>
```

**核心数据流**：

```typescript
// ===== 状态 =====
const tableData = ref<UserInfo[]>([])  // 表格数据
const total = ref(0)                   // 总条数
const loading = ref(false)             // 加载状态
const pageInfo = reactive({ page: 1, pageSize: 10 })
const keyword = ref('')                // 搜索关键词

// ===== 弹窗状态 =====
const dialogVisible = ref(false)       // 弹窗是否显示
const isEdit = ref(false)              // 是新增还是编辑
const form = reactive({ username: '', phone: '', ... })

// ===== 请求数据 =====
async function fetchData() {
  loading.value = true
  const result = await getUserList({ ...pageInfo, keyword: keyword.value })
  tableData.value = result.list
  total.value = result.total
  loading.value = false
}

// ===== 搜索 =====
function handleSearch(kw: string) {
  keyword.value = kw
  pageInfo.page = 1     // ← 关键！搜索后回到第 1 页
  fetchData()
}

// ===== 分页 =====
function handlePageChange({ page, pageSize }) {
  pageInfo.page = page
  pageInfo.pageSize = pageSize
  fetchData()
}

// ===== 新增 =====
function handleAdd() {
  isEdit.value = false
  resetForm()            // 清空表单
  dialogVisible.value = true  // 打开弹窗
}

// ===== 编辑 =====
function handleEdit(row: UserInfo) {
  isEdit.value = true
  // 把选中行的数据填进表单
  form.username = row.username
  form.phone = row.phone
  form.packageName = row.packageName
  form.status = row.status
  dialogVisible.value = true
}

// ===== 提交（新增或编辑） =====
async function handleSubmit() {
  const valid = await formRef.value?.validate()  // 表单校验
  if (!valid) return
  
  submitLoading.value = true
  if (isEdit.value) {
    await updateUser({ id: editId.value!, ...form })
  } else {
    await addUser(form)
  }
  dialogVisible.value = false
  fetchData()  // 刷新列表
}

// ===== 删除 =====
async function handleDelete(row: UserInfo) {
  await ElMessageBox.confirm('确认删除？', '提示', { type: 'warning' })
  await deleteUser(row.id)
  ElMessage.success('删除成功')
  fetchData()
}

// ===== 页面加载 =====
onMounted(() => { fetchData() })  // 一进页面就请求数据
```

### ECharts 图表是怎么画出来的

以首页的折线图为例：

```typescript
// 1. 请求数据
const chartData = ref<ChartData | null>(null)
onMounted(async () => {
  chartData.value = await getChartData()
})
// chartData.value.userGrowth = [
//   { month: '2026-01', newUsers: 120, totalUsers: 850 },
//   { month: '2026-02', newUsers: 150, totalUsers: 920 },
//   ...
// ]

// 2. 把数据转成 ECharts 需要的格式
const userGrowthOption = computed(() => ({
  tooltip: { trigger: 'axis' },        // 鼠标悬停显示提示框
  legend: { data: ['新增用户', '累计用户'] },  // 图例
  xAxis: {                              // X 轴：月份
    type: 'category',
    data: chartData.value?.userGrowth.map(d => d.month) ?? [],
  },
  yAxis: { type: 'value' },             // Y 轴：数值
  series: [                             // 两条线
    {
      name: '新增用户',
      type: 'line',                     // 折线图
      data: chartData.value?.userGrowth.map(d => d.newUsers) ?? [],
      smooth: true,                     // 平滑曲线
    },
    {
      name: '累计用户',
      type: 'line',
      data: chartData.value?.userGrowth.map(d => d.totalUsers) ?? [],
      smooth: true,
    },
  ],
}))

// 3. 模板里：
// <v-chart :option="userGrowthOption" style="height: 350px" autoresize />
//                      ↑
//             computed 自动计算，数据一变图表就刷新
```

> **魔法**：你只改数据，图表自动重绘。`autoresize` 让图表在窗口大小变化时自动调整。

---

## 八、动手跑起来

### 第一次运行

```bash
# 1. 克隆项目
git clone https://github.com/GMAPLE777/admin-manage.git
cd admin-manage

# 2. 安装依赖（只需要做一次）
npm install

# 3. 启动
npm run dev
```

浏览器会自动打开 `http://localhost:3000`，输入：

```
用户名: admin
密码: 123456
```

点击登录，进入后台。

### 玩一玩

1. **首页**：看 4 个数据卡片和 3 张图表（数据每次刷新随机变化）
2. **用户管理**：搜索框输入"用户001"试试搜索 → 点"新增"填表单 → 点某行"编辑"回填修改 → 点"删除"确认删除
3. **套餐管理**：试试分类筛选下拉框 → 新增套餐 → 编辑套餐
4. **数据统计**：3 张报表图表

### 构建上线版本

```bash
npm run build
```

生成的文件在 `dist/` 文件夹，可以直接部署到服务器。

### 目录热力图：先看哪些文件

如果你是第一次接触这个项目，建议按以下顺序阅读代码：

```
第 1 遍（5 分钟，建立印象）:
  README.md          ← 项目介绍
  src/main.ts        ← 入口，看注册了什么
  src/App.vue        ← 根组件，就一行 <router-view />

第 2 遍（15 分钟，理解骨架）:
  src/router/index.ts     ← 有哪些页面，路由守卫
  src/layout/index.vue    ← 页面骨架怎么搭
  src/store/user.ts       ← 全局用户数据怎么管

第 3 遍（30 分钟，搞懂一个页面）:
  src/views/Login/LoginView.vue        ← 登录完整流程
  src/api/login.ts + src/mock/login.ts ← 接口 + 假数据
  src/utils/request.ts                 ← Axios 怎么封装的

第 4 遍（1 小时，搞懂 CRUD）:
  src/views/UserManage/UserManageView.vue  ← 增删改查全套
  src/api/user.ts + src/mock/user.ts       ← 接口定义 + 假数据生成
  src/components/CommonDialog.vue          ← 弹窗怎么抽离的
```

---

## 九、下一步学什么

### 如果你想继续深入

| 方向 | 学什么 | 本项目可做的事情 |
|------|--------|-----------------|
| 权限控制 | RBAC 角色权限模型 | 加角色管理页面，不同角色看不同菜单 |
| 后端对接 | Spring Boot + MySQL | 把 `vite-plugin-mock` 关掉，接真实后端 |
| 数据导出 | Excel/PDF 导出 | 表格上加"导出"按钮，调后端导出接口 |
| 数据大屏 | ECharts 高级用法 | Statistics 页面改成全屏数据大屏 |
| 暗色模式 | CSS 变量 + Element Plus 暗色主题 | 顶栏加个切换按钮 |
| 国际化 | vue-i18n | 加中英文切换 |
| 测试 | Vitest + Vue Test Utils | 给组件写单元测试 |
| 部署 | Nginx / Docker / CI/CD | 把 dist 部署到云服务器 |
| TypeScript | 泛型、工具类型 | 把 `any` 全部改成精确类型 |

### 推荐学习资源

- **Vue 3 官方文档**：https://cn.vuejs.org （最好的入门资料）
- **Element Plus 文档**：https://element-plus.org （查组件用法）
- **ECharts 示例**：https://echarts.apache.org/examples/zh/index.html （找图表模板）
- **Pinia 文档**：https://pinia.vuejs.org/zh/
- **Vue Router 文档**：https://router.vuejs.org/zh/

### 建议的学习路径

```
① HTML/CSS 基础
② JavaScript 基础（ES6+）
③ TypeScript 入门（类型注解 / interface）
④ Vue 3 基础（ref / reactive / computed / watch / 组件通信）
⑤ Vue Router（路由 / 守卫 / 懒加载）
⑥ Pinia（defineStore / 读写全局状态）
⑦ Axios + Mock（拦截器 / 请求封装 / 假数据）
⑧ Element Plus（表格 / 表单 / 弹窗 / 分页 配合 Vue3 使用）
⑨ ECharts（option 配置 / 数据映射）
⑩ 做一个完整的 CRUD 页面（本项目的 UserManageView 是很好的参考）
```

---

> 💡 **最后的话**：这个项目的代码就是你最好的教材。打开 `src/views/UserManage/UserManageView.vue`，对照本指南看一遍，你就理解了"一个增删改查页面是怎么写出来的"。然后打开 `src/layout/index.vue` 看布局，`src/store/user.ts` 看状态管理，`src/utils/request.ts` 看请求封装……一个接一个，知识就串起来了。
>
> 不要怕代码多。架子搭好了，每个页面都是**同样的模式**：请求数据 → 渲染表格 → 弹窗编辑 → 刷新列表。掌握一个，全部掌握。
