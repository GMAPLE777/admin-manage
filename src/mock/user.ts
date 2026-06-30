import type { MockMethod } from 'vite-plugin-mock'

/** 用户数据 — 字段对齐 project.md：id, username, phone, packageName, createTime, status */
interface UserRecord {
  id: number
  username: string
  phone: string
  packageName: string
  createTime: string
  status: number
}

const users: UserRecord[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  username: `用户${String(i + 1).padStart(3, '0')}`,
  phone: `138${String(i + 1).padStart(8, '0')}`,
  packageName: ['5G畅享套餐', '4G基础套餐', '5G尊享套餐', '校园套餐'][i % 4],
  status: i % 3 === 0 ? 0 : 1,
  createTime: `2026-0${(i % 6) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

/** 自增 ID */
let nextId = users.length + 1

/** 从前端 body 中提取合法字段，构建干净的用户对象 */
function buildUser(body: Record<string, unknown>): UserRecord {
  return {
    id: nextId++,
    username: (body.username as string) || '',
    phone: (body.phone as string) || '',
    packageName: (body.packageName as string) || '',
    status: (body.status as number) ?? 1,
    createTime: new Date().toISOString().split('T')[0],
  }
}

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
    response: ({ body }: { body: Record<string, unknown> }) => {
      const newUser = buildUser(body)
      users.unshift(newUser)
      return { code: 200, message: '新增成功', data: newUser }
    },
  },
  // 更新用户
  {
    url: '/api/user/update',
    method: 'put',
    response: ({ body }: { body: Record<string, unknown> }) => {
      const id = (body.id as number) ?? 0
      const idx = users.findIndex((u) => u.id === id)
      if (idx === -1) {
        return { code: 400, message: '用户不存在', data: null }
      }
      // spread 创建新对象，不可变风格
      users[idx] = {
        ...users[idx],
        username: (body.username as string) ?? users[idx].username,
        phone: (body.phone as string) ?? users[idx].phone,
        packageName: (body.packageName as string) ?? users[idx].packageName,
        status: (body.status as number) ?? users[idx].status,
      }
      return { code: 200, message: '更新成功', data: users[idx] }
    },
  },
  // 删除用户
  {
    url: '/api/user/delete',
    method: 'delete',
    response: ({ query }: { query: { id: string } }) => {
      const id = Number(query.id)
      const idx = users.findIndex((u) => u.id === id)
      if (idx === -1) {
        return { code: 400, message: '用户不存在', data: null }
      }
      users.splice(idx, 1)
      return { code: 200, message: '删除成功', data: null }
    },
  },
]
