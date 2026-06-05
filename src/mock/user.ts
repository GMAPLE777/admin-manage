import type { MockMethod } from 'vite-plugin-mock'

/** 用户数据 — 字段对齐 project.md：id, username, phone, packageName, createTime, status */
const users = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  username: `用户${String(i + 1).padStart(3, '0')}`,
  phone: `138${String(i + 1).padStart(8, '0')}`,
  packageName: ['5G畅享套餐', '4G基础套餐', '5G尊享套餐', '校园套餐'][i % 4],
  status: i % 3 === 0 ? 0 : 1,
  createTime: `2026-0${(i % 6) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

export const userMock: MockMethod[] = [
  // 用户列表（分页 + 搜索）
  {
    url: '/api/user/list',
    method: 'get',
    response: ({ query }: { query: { page: string; pageSize: string; keyword?: string } }) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
      const keyword = query.keyword?.toLowerCase() || ''

      const filtered = keyword
        ? users.filter((u) => u.username.includes(keyword) || u.phone.includes(keyword))
        : users

      const start = (page - 1) * pageSize
      return {
        code: 200,
        message: 'success',
        data: {
          list: filtered.slice(start, start + pageSize),
          total: filtered.length,
          page,
          pageSize,
        },
      }
    },
  },
  // 新增用户
  {
    url: '/api/user/add',
    method: 'post',
    response: ({ body }: { body: Record<string, unknown> }) => ({
      code: 200,
      message: '新增成功',
      data: { id: users.length + 1, createTime: '2026-06-05', status: 1, ...body },
    }),
  },
  // 更新用户
  {
    url: '/api/user/update',
    method: 'put',
    response: ({ body }: { body: Record<string, unknown> }) => ({
      code: 200,
      message: '更新成功',
      data: body,
    }),
  },
  // 删除用户
  {
    url: '/api/user/delete',
    method: 'delete',
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
]
