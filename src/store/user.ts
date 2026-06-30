import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, type LoginParams, type UserInfo } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/auth'

const USER_INFO_KEY = 'userInfo'

/** 从 localStorage 恢复 userInfo */
function loadUserInfo(): UserInfo | null {
  try {
    const raw = localStorage.getItem(USER_INFO_KEY)
    return raw ? (JSON.parse(raw) as UserInfo) : null
  } catch {
    return null
  }
}

/** 将 userInfo 写入 localStorage */
function saveUserInfo(info: UserInfo | null) {
  if (info) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(info))
  } else {
    localStorage.removeItem(USER_INFO_KEY)
  }
}

export const useUserStore = defineStore('user', () => {
  // === State ===
  const token = ref(getToken() || '')
  const userInfo = ref<UserInfo | null>(loadUserInfo())

  // === Getters ===
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username || '')

  // === Actions ===
  /** 登录 */
  async function login(params: LoginParams) {
    const result = await loginApi(params)
    token.value = result.token
    userInfo.value = result.userInfo
    setToken(result.token)
    saveUserInfo(result.userInfo)
  }

  /** 退出登录 */
  function logout() {
    token.value = ''
    userInfo.value = null
    removeToken()
    saveUserInfo(null)
  }

  return { token, userInfo, isLoggedIn, username, login, logout }
})
