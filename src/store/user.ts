import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, type LoginParams, type UserInfo } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  // === State ===
  const token = ref(getToken() || '')
  const userInfo = ref<UserInfo | null>(null)

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
  }

  /** 退出登录 */
  function logout() {
    token.value = ''
    userInfo.value = null
    removeToken()
  }

  return { token, userInfo, isLoggedIn, username, login, logout }
})
