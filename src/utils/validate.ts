/** 常用表单校验规则 */

/** 必填校验 */
export const required = { required: true, message: '此项为必填', trigger: 'blur' }

/** 手机号校验 */
export const phoneValidator = (_rule: unknown, value: string, callback: (err?: Error) => void) => {
  if (!value) return callback()
  /^1[3-9]\d{9}$/.test(value)
    ? callback()
    : callback(new Error('请输入正确的手机号'))
}

/** 邮箱校验 */
export const emailValidator = (_rule: unknown, value: string, callback: (err?: Error) => void) => {
  if (!value) return callback()
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ? callback()
    : callback(new Error('请输入正确的邮箱地址'))
}

/** 密码校验 — 6~20位字母/数字/符号 */
export const passwordValidator = (_rule: unknown, value: string, callback: (err?: Error) => void) => {
  if (!value) return callback()
  value.length >= 6 && value.length <= 20
    ? callback()
    : callback(new Error('密码长度需在6~20位之间'))
}
