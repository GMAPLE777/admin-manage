/**
 * 格式化时间
 * @param date 日期对象 / 时间戳 / 日期字符串
 * @param fmt  格式模板（默认 yyyy-MM-dd HH:mm:ss）
 */
export function formatDate(
  date: Date | number | string,
  fmt = 'yyyy-MM-dd HH:mm:ss',
): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const pad = (n: number, len = 2) => String(n).padStart(len, '0')

  const map: Record<string, string> = {
    'y+': String(d.getFullYear()),
    'M+': pad(d.getMonth() + 1),
    'd+': pad(d.getDate()),
    'H+': pad(d.getHours()),
    'h+': pad(d.getHours() % 12 || 12),
    'm+': pad(d.getMinutes()),
    's+': pad(d.getSeconds()),
  }

  for (const [k, v] of Object.entries(map)) {
    const reg = new RegExp(k)
    if (reg.test(fmt)) {
      fmt = fmt.replace(reg, (match) =>
        match.length > 1 ? v.padStart(match.length, '0') : v,
      )
    }
  }

  return fmt
}

/** 相对时间描述（刚刚 / x分钟前 / x小时前 / x天前） */
export function timeAgo(date: Date | number | string): string {
  const now = Date.now()
  const past = new Date(date).getTime()
  const diff = now - past

  if (diff < 60_000) return '刚刚'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}分钟前`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}小时前`
  if (diff < 2_592_000_000) return `${Math.floor(diff / 86_400_000)}天前`
  return formatDate(date)
}
