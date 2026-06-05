import type { MockMethod } from 'vite-plugin-mock'

/** 套餐数据 — 字段对齐 project.md：id, packageName, price, flow, callMinutes, status */
const packages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  packageName: ['5G畅享套餐', '4G基础套餐', '5G尊享套餐', '校园套餐'][i % 4],
  price: [99, 59, 199, 39][i % 4],
  flow: ['100GB', '30GB', '200GB', '50GB'][i % 4],
  callMinutes: [1000, 500, 2000, 300][i % 4],
  status: i % 4 === 0 ? 0 : 1,
}))

export const packageMock: MockMethod[] = [
  // 套餐列表（分页 + 搜索 + 分类筛选）
  {
    url: '/api/package/list',
    method: 'get',
    response: ({ query }: { query: { page: string; pageSize: string; keyword?: string; category?: string } }) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
      const keyword = query.keyword?.toLowerCase() || ''
      const category = query.category || ''

      let filtered = packages
      if (keyword) {
        filtered = filtered.filter((p) => p.packageName.includes(keyword))
      }
      if (category) {
        filtered = filtered.filter((p) => p.packageName.includes(category))
      }

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
  // 新增套餐
  {
    url: '/api/package/add',
    method: 'post',
    response: ({ body }: { body: Record<string, unknown> }) => ({
      code: 200,
      message: '新增成功',
      data: { id: packages.length + 1, ...body },
    }),
  },
  // 更新套餐
  {
    url: '/api/package/update',
    method: 'put',
    response: ({ body }: { body: Record<string, unknown> }) => ({
      code: 200,
      message: '更新成功',
      data: body,
    }),
  },
  // 删除套餐
  {
    url: '/api/package/delete',
    method: 'delete',
    response: () => ({
      code: 200,
      message: '删除成功',
      data: null,
    }),
  },
]
