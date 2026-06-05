import type { MockMethod } from 'vite-plugin-mock'

export const loginMock: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }: { body: { username: string; password: string } }) => {
      const { username, password } = body
      if (!username || !password) {
        return { code: 400, message: '用户名和密码不能为空', data: null }
      }
      if (password.length < 6) {
        return { code: 400, message: '密码长度不能少于6位', data: null }
      }
      return {
        code: 200,
        message: '登录成功',
        data: {
          token: `mock_token_${username}_${Date.now()}`,
          userInfo: {
            id: 1,
            username,
            phone: '13800000000',
            packageName: '5G畅享套餐',
            status: 1,
            createTime: '2026-01-01',
          },
        },
      }
    },
  },
]
