import { post } from '@/utils/request'
import type { UserInfo } from './user'

/** 登录参数 */
export interface LoginParams {
  username: string
  password: string
}

/** 登录返回值 */
export interface LoginResult {
  token: string
  userInfo: UserInfo
}

/** 登录 */
export function login(params: LoginParams) {
  return post<LoginResult>('/login', params)
}
