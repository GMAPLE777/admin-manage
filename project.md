# 通信运营数据管理平台

## 一、项目概述

### 项目名称

通信运营数据管理平台（Communication Operation Data Management Platform）

### 项目定位

面向通信运营场景的数据后台管理系统，实现用户管理、通信套餐管理、运营数据统计分析等核心功能。

### 技术栈

| 分类     | 技术           |
| ------ | ------------ |
| 前端框架   | Vue 3        |
| 构建工具   | Vite         |
| UI组件库  | Element Plus |
| 路由管理   | Vue Router   |
| 状态管理   | Pinia        |
| HTTP请求 | Axios        |
| Mock服务 | Mock.js      |
| 图表库    | ECharts      |
| 版本管理   | Git          |

### 项目目标

* 熟练掌握 Vue3 企业级项目开发流程
* 实现完整后台管理系统架构
* 掌握组件化开发思想
* 实现前后端数据交互
* 规范化 Git 开发流程
* 提升代码维护性与复用性

---

# 二、功能模块规划

## 1. 登录模块

### 功能说明

* 用户登录
* 表单校验
* Token存储
* 登录状态维护
* 路由权限控制

### 页面元素

* 用户名输入框
* 密码输入框
* 登录按钮
* 表单校验提示

---

## 2. 系统首页（数据看板）

### 功能说明

展示通信运营核心数据指标。

### 主要内容

#### 数据统计卡片

* 总用户数
* 本月新增用户
* 套餐总数
* 活跃用户数

#### 图表展示

* 月度用户增长趋势（折线图）
* 套餐占比分析（饼图）
* 用户活跃度统计（柱状图）

---

## 3. 用户管理模块

### 功能说明

实现用户信息管理。

### 功能列表

* 用户查询
* 条件搜索
* 新增用户
* 编辑用户
* 删除用户
* 分页查询

### 数据字段

| 字段          | 类型     |
| ----------- | ------ |
| id          | Number |
| username    | String |
| phone       | String |
| packageName | String |
| createTime  | String |
| status      | Number |

---

## 4. 通信套餐管理模块

### 功能说明

管理通信套餐信息。

### 功能列表

* 套餐查询
* 套餐分类筛选
* 新增套餐
* 编辑套餐
* 删除套餐
* 分页查询

### 数据字段

| 字段          | 类型     |
| ----------- | ------ |
| id          | Number |
| packageName | String |
| price       | Number |
| flow        | String |
| callMinutes | Number |
| status      | Number |

---

## 5. 数据报表模块

### 功能说明

统计分析平台运营数据。

### 报表内容

* 用户增长趋势
* 套餐销售统计
* 用户分布分析
* 活跃用户分析

---

# 三、项目目录结构

```plaintext
admin-manage/
├── public/
│
├── src/
│   ├── api/
│   │   ├── user.js
│   │   ├── package.js
│   │   ├── statistics.js
│   │   └── login.js
│   │
│   ├── assets/
│   │   ├── css/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── CommonSearch.vue
│   │   ├── CommonPagination.vue
│   │   ├── CommonDialog.vue
│   │   ├── SideMenu.vue
│   │   ├── TopHeader.vue
│   │   └── Breadcrumb.vue
│   │
│   ├── layout/
│   │   └── index.vue
│   │
│   ├── mock/
│   │   ├── user.js
│   │   ├── package.js
│   │   ├── statistics.js
│   │   └── login.js
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── store/
│   │   ├── user.js
│   │   └── app.js
│   │
│   ├── utils/
│   │   ├── request.js
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── format.js
│   │
│   ├── views/
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── UserManage/
│   │   ├── PackageManage/
│   │   └── Statistics/
│   │
│   ├── App.vue
│   └── main.js
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

# 四、开发阶段规划

## 阶段一：项目初始化

### 开发任务

* 使用 Vite 创建项目
* 安装依赖
* 搭建目录结构
* 配置 ElementPlus
* 配置 Pinia
* 配置 VueRouter

### Git提交

```bash
feat: 初始化项目结构与基础环境
```

---

## 阶段二：登录模块开发

### 开发任务

* 登录页面开发
* 表单验证
* Token管理
* 路由守卫实现
* Pinia状态管理

### Git提交

```bash
feat: 完成登录模块与权限控制
```

---

## 阶段三：后台布局开发

### 开发任务

* Layout布局搭建
* 侧边菜单
* 顶部导航
* 面包屑导航
* 菜单折叠功能

### Git提交

```bash
feat: 完成后台基础布局开发
```

---

## 阶段四：业务页面开发

### 开发任务

* 首页开发
* 用户管理页面开发
* 套餐管理页面开发
* 数据统计页面开发

### Git提交

```bash
feat: 完成业务页面静态开发
```

---

## 阶段五：Mock接口开发

### 开发任务

#### 用户接口

```javascript
GET /user/list
POST /user/add
PUT /user/update
DELETE /user/delete
```

#### 套餐接口

```javascript
GET /package/list
POST /package/add
PUT /package/update
DELETE /package/delete
```

#### 数据统计接口

```javascript
GET /statistics/dashboard
GET /statistics/chart
```

### Git提交

```bash
feat: 完成Mock接口开发与联调
```

---

## 阶段六：CRUD功能开发

### 开发任务

#### 用户管理

* 搜索
* 新增
* 编辑
* 删除
* 分页

#### 套餐管理

* 搜索
* 新增
* 编辑
* 删除
* 分页

### Git提交

```bash
feat: 完成用户与套餐CRUD功能
```

---

## 阶段七：ECharts图表开发

### 图表功能

#### 折线图

月度用户增长趋势

#### 饼图

套餐占比分析

#### 柱状图

活跃用户统计

### Git提交

```bash
feat: 完成运营数据图表展示
```

---

## 阶段八：项目优化与发布

### 优化内容

* 图片压缩
* 路由懒加载
* 代码拆分
* 组件复用优化
* ESLint规范检查
* 浏览器兼容测试

### README完善

包含：

* 项目介绍
* 技术选型
* 安装步骤
* 运行方式
* 功能说明

### Git提交

```bash
chore: 项目优化与文档完善
```

---

# 五、Mock数据设计

## 用户数据示例

```json
{
  "id": 1,
  "username": "张三",
  "phone": "13800138000",
  "packageName": "5G畅享套餐",
  "status": 1,
  "createTime": "2026-06-01"
}
```

## 套餐数据示例

```json
{
  "id": 1,
  "packageName": "5G畅享套餐",
  "price": 99,
  "flow": "100GB",
  "callMinutes": 1000,
  "status": 1
}
```

---

# 六、后续扩展方向

## Java后端对接

推荐技术栈：

* Spring Boot
* MyBatis Plus
* MySQL
* Redis
* JWT

## 可扩展功能

### RBAC权限管理

* 超级管理员
* 运营人员
* 客服人员

### 数据导出

* Excel导出
* PDF报表导出

### 数据大屏

* ECharts大屏展示
* 实时运营监控

### 系统日志

* 登录日志
* 操作日志
* 异常日志

---

# 七、项目启动命令

安装依赖：

```bash
npm install
```

启动项目：

```bash
npm run dev
```

打包项目：

```bash
npm run build
```

代码检查：

```bash
npm run lint
```

---

# 八、项目验收标准

* 登录功能正常
* 路由权限控制正常
* 用户管理CRUD完整
* 套餐管理CRUD完整
* Mock接口联调成功
* ECharts图表正常显示
* 分页与搜索功能正常
* 项目代码结构规范
* README文档完整
* Git提交记录清晰规范

---

# 九、智能体执行要求（Claude Code / Cursor / Trae）

## 开发原则

1. 严格按照目录结构生成代码
2. 使用 Vue3 Composition API
3. 使用 `<script setup>`
4. 所有接口统一封装至 api 目录
5. 所有状态统一使用 Pinia 管理
6. 所有业务数据通过 Mock API 获取
7. 公共组件必须抽离复用
8. 页面样式采用 SCSS 编写
9. 所有页面支持响应式布局
10. 代码需符合 ESLint 规范

## 最终目标

生成一个可直接运行的企业级 Vue3 后台管理系统项目，包含完整页面、Mock接口、CRUD业务逻辑、权限控制、ECharts图表及项目文档。
