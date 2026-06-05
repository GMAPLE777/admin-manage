/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'mockjs' {
  const Mock: {
    mock: (url: string | RegExp, method: string, template: unknown) => void
    setup: (config: { timeout?: number }) => void
  }
  export default Mock
}
