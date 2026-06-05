import { get, post, put, del } from '@/utils/request'

/** 用户信息 — 字段对齐 project.md */
export interface UserInfo {
  id: number
  username: string
  phone: string
  packageName: string
  createTime: string
  status: number
}

/** 分页查询参数 */
export interface PageParams {
  page: number
  pageSize: number
  keyword?: string
}

/** 分页结果 */
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// ========== 用户 API（路径对齐文档） ==========

/** 获取用户列表（分页 + 搜索） */
export function getUserList(params: PageParams) {
  return get<PageResult<UserInfo>>('/user/list', { params })
}

/** 新增用户 */
export function addUser(params: Partial<UserInfo>) {
  return post<UserInfo>('/user/add', params)
}

/** 更新用户 */
export function updateUser(params: Partial<UserInfo> & { id: number }) {
  return put<UserInfo>('/user/update', params)
}

/** 删除用户 */
export function deleteUser(id: number) {
  return del<void>('/user/delete', { params: { id } })
}
