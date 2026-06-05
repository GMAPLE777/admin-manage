import { get, post, put, del } from '@/utils/request'
import type { PageParams, PageResult } from './user'

/** 套餐信息 — 字段对齐 project.md */
export interface PackageInfo {
  id: number
  packageName: string
  price: number
  flow: string
  callMinutes: number
  status: number
}

/** 套餐筛选参数 */
export interface PackagePageParams extends PageParams {
  category?: string
}

/** 获取套餐列表（分页 + 搜索 + 分类筛选） */
export function getPackageList(params: PackagePageParams) {
  return get<PageResult<PackageInfo>>('/package/list', { params })
}

/** 新增套餐 */
export function addPackage(params: Partial<PackageInfo>) {
  return post<PackageInfo>('/package/add', params)
}

/** 更新套餐 */
export function updatePackage(params: Partial<PackageInfo> & { id: number }) {
  return put<PackageInfo>('/package/update', params)
}

/** 删除套餐 */
export function deletePackage(id: number) {
  return del<void>('/package/delete', { params: { id } })
}
