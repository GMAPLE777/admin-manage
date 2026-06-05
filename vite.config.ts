import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'src/mock',
      enable: command === 'serve',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          echarts: ['echarts', 'vue-echarts'],
          vue: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
}))
