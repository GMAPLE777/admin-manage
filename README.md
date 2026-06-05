# 通信运营数据管理平台

Communication Operation Data Management Platform

面向通信运营场景的数据后台管理系统，实现用户管理、通信套餐管理、运营数据统计分析等核心功能。

## 技术栈

| 分类     | 技术                        |
| -------- | --------------------------- |
| 前端框架 | Vue 3 (Composition API)     |
| 构建工具 | Vite                        |
| 语言     | TypeScript                  |
| UI 组件库 | Element Plus               |
| 路由管理 | Vue Router                  |
| 状态管理 | Pinia                       |
| HTTP 请求 | Axios                      |
| 图表库   | ECharts + vue-echarts       |
| Mock 服务 | vite-plugin-mock + mockjs  |
| 样式     | SCSS                        |
| 版本管理 | Git                         |

## 项目目标

- 熟练掌握 Vue3 企业级项目开发流程
- 实现完整后台管理系统架构
- 掌握组件化开发思想
- 实现前后端数据交互
- 规范化 Git 开发流程
- 提升代码维护性与复用性

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（Mock 数据自动启用，访问 http://localhost:3000）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

**测试账号**：admin / 123456

---

## 目录结构

```
admin-manage/
├── public/
│   └── vite.svg                    # 网站图标
├── src/
│   ├── api/                        # 接口请求封装
│   │   ├── login.ts                # 登录 API
│   │   ├── user.ts                 # 用户 CRUD API
│   │   ├── package.ts              # 套餐 CRUD API
│   │   ├── statistics.ts           # 统计 API
│   │   └── index.ts                # 统一导出
│   ├── assets/                     # 全局资源
│   │   └── styles/
│   │       ├── reset.css           # 样式重置
│   │       └── global.scss         # SCSS 变量与混入
│   ├── components/                 # 全局公共组件
│   │   ├── SideMenu.vue            # 侧边栏菜单
│   │   ├── TopHeader.vue           # 顶部导航栏
│   │   ├── Breadcrumb.vue          # 面包屑导航
│   │   ├── CommonSearch.vue        # 通用搜索栏
│   │   ├── CommonPagination.vue    # 通用分页组件
│   │   └── CommonDialog.vue        # 通用弹窗组件
│   ├── layout/
│   │   └── index.vue               # 后台主布局
│   ├── mock/                       # 模拟后端接口
│   │   ├── login.ts                # 登录 Mock
│   │   ├── user.ts                 # 用户 Mock（含 36 条数据）
│   │   ├── package.ts              # 套餐 Mock（含 12 条数据）
│   │   ├── statistics.ts           # 统计图表 Mock
│   │   └── index.ts                # 汇总导出
│   ├── router/
│   │   └── index.ts                # 路由配置 + 登录守卫
│   ├── store/                      # Pinia 状态管理
│   │   ├── user.ts                 # 用户状态（token/登录/登出）
│   │   ├── app.ts                  # 应用状态（侧边栏折叠）
│   │   └── index.ts                # Pinia 实例 + 统一导出
│   ├── utils/                      # 工具函数
│   │   ├── request.ts              # Axios 封装（拦截器/token注入）
│   │   ├── auth.ts                 # Token 存取工具
│   │   ├── validate.ts             # 表单校验规则
│   │   └── format.ts               # 日期格式化
│   ├── views/                      # 页面业务代码
│   │   ├── Login/                  # 登录页
│   │   ├── Dashboard/              # 系统首页（数据看板）
│   │   ├── UserManage/             # 用户管理
│   │   ├── PackageManage/          # 套餐管理
│   │   └── Statistics/             # 数据报表
│   ├── App.vue                     # 根组件
│   ├── main.ts                     # 应用入口
│   └── env.d.ts                    # TS 类型声明
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
└── README.md
```

---

## 功能清单

### 1. 登录模块
- ✅ 用户名/密码登录
- ✅ 表单校验（长度/必填）
- ✅ Token 存储与状态维护
- ✅ 路由守卫（未登录拦截 → 登录页）

### 2. 系统首页（数据看板）
- ✅ 4 张统计卡片：总用户数 / 本月新增用户 / 套餐总数 / 活跃用户数
- ✅ 月度用户增长趋势（折线图 — ECharts）
- ✅ 套餐占比分析（饼图 — ECharts）
- ✅ 用户活跃度统计（柱状图 — ECharts）

### 3. 用户管理
- ✅ 用户列表展示（表格）
- ✅ 关键词搜索（用户名 / 手机号）
- ✅ 新增用户（弹窗表单 + 校验）
- ✅ 编辑用户（弹窗回填 + 校验）
- ✅ 删除用户（确认提示）
- ✅ 分页查询
- **数据字段**：id / username / phone / packageName / createTime / status

### 4. 套餐管理
- ✅ 套餐列表展示（表格）
- ✅ 关键词搜索 + 分类筛选
- ✅ 新增套餐（弹窗表单 + 校验）
- ✅ 编辑套餐（弹窗回填 + 校验）
- ✅ 删除套餐（确认提示）
- ✅ 分页查询
- **数据字段**：id / packageName / price / flow / callMinutes / status

### 5. 数据报表
- ✅ 用户增长趋势（折线图）
- ✅ 套餐销售统计（饼图）
- ✅ 用户分布分析（柱状图）
- ✅ 活跃用户分析（分组柱状图）

### 6. Mock 接口

| 模块 | 接口 |
|------|------|
| 登录 | `POST /api/login` |
| 用户 | `GET /api/user/list` `POST /api/user/add` `PUT /api/user/update` `DELETE /api/user/delete` |
| 套餐 | `GET /api/package/list` `POST /api/package/add` `PUT /api/package/update` `DELETE /api/package/delete` |
| 统计 | `GET /api/statistics/dashboard` `GET /api/statistics/chart` |

---

## 项目验收标准

- ✅ 登录功能正常
- ✅ 路由权限控制正常
- ✅ 用户管理 CRUD 完整
- ✅ 套餐管理 CRUD 完整
- ✅ Mock 接口联调成功
- ✅ ECharts 图表正常显示
- ✅ 分页与搜索功能正常
- ✅ 项目代码结构规范
- ✅ README 文档完整

---

## 开发原则

1. 严格按照目录结构编写代码
2. 使用 Vue3 Composition API
3. 使用 `<script setup>` 语法
4. 所有接口统一封装至 api 目录
5. 所有状态统一使用 Pinia 管理
6. 所有业务数据通过 Mock API 获取
7. 公共组件必须抽离复用
8. 页面样式采用 SCSS 编写
9. 代码符合 ESLint 规范

---

## 后续扩展方向

### Java 后端对接
推荐技术栈：Spring Boot + MyBatis Plus + MySQL + Redis + JWT

### 可扩展功能
- RBAC 权限管理（超级管理员 / 运营人员 / 客服人员）
- 数据导出（Excel / PDF）
- 数据大屏（ECharts 大屏展示 / 实时运营监控）
- 系统日志（登录日志 / 操作日志 / 异常日志）
- 暗色主题切换
