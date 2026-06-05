import type { MockMethod } from 'vite-plugin-mock'
import { loginMock } from './login'
import { userMock } from './user'
import { packageMock } from './package'
import { statisticsMock } from './statistics'

export default [...loginMock, ...userMock, ...packageMock, ...statisticsMock] as MockMethod[]
