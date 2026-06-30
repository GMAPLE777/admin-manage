import type { MockMethod } from 'vite-plugin-mock'

/** 套餐数据 — 字段对齐 project.md：id, packageName, price, flow, callMinutes, status */
interface PackageRecord {
  id: number
  packageName: string
  price: number
  flow: string
  callMinutes: number
  status: number
}

const packages: PackageRecord[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  packageName: ['5G畅享套餐', '4G基础套餐', '5G尊享套餐', '校园套餐'][i % 4],
  price: [99, 59, 199, 39][i % 4],
  flow: ['100GB', '30GB', '200GB', '50GB'][i % 4],
  callMinutes: [1000, 500, 2000, 300][i % 4],
  status: i % 4 === 0 ? 0 : 1,
}))

/** 自增 ID */
let nextId = packages.length + 1

/** 从前端 body 中提取合法字段，构建干净的套餐对象 */
function buildPackage(body: Record<string, unknown>): PackageRecord {
  return {
    id: nextId++,
    packageName: (body.packageName as string) || '',
    price: Number(body.price ?? 0),
    flow: (body.flow as string) || '',
    callMinutes: Number(body.callMinutes ?? 0),
    status: (body.status as number) ?? 1,
  }
}

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
      if (keyword) filtered = filtered.filter((p) => p.packageName.includes(keyword))
      if (category) filtered = filtered.filter((p) => p.packageName.includes(category))

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
    response: ({ body }: { body: Record<string, unknown> }) => {
      const newPkg = buildPackage(body)
      packages.unshift(newPkg)
      return { code: 200, message: '新增成功', data: newPkg }
    },
  },
  // 更新套餐
  {
    url: '/api/package/update',
    method: 'put',
    response: ({ body }: { body: Record<string, unknown> }) => {
      const id = (body.id as number) ?? 0
      const idx = packages.findIndex((p) => p.id === id)
      if (idx === -1) {
        return { code: 400, message: '套餐不存在', data: null }
      }
      // spread 不可变风格，与 user.ts 一致
      packages[idx] = {
        ...packages[idx],
        packageName: (body.packageName as string) ?? packages[idx].packageName,
        price: body.price !== undefined ? Number(body.price) : packages[idx].price,
        flow: (body.flow as string) ?? packages[idx].flow,
        callMinutes: body.callMinutes !== undefined ? Number(body.callMinutes) : packages[idx].callMinutes,
        status: (body.status as number) ?? packages[idx].status,
      }
      return { code: 200, message: '更新成功', data: packages[idx] }
    },
  },
  // 删除套餐
  {
    url: '/api/package/delete',
    method: 'delete',
    response: ({ query }: { query: { id: string } }) => {
      const id = Number(query.id)
      const idx = packages.findIndex((p) => p.id === id)
      if (idx === -1) {
        return { code: 400, message: '套餐不存在', data: null }
      }
      packages.splice(idx, 1)
      return { code: 200, message: '删除成功', data: null }
    },
  },
]
