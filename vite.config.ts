import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import {resolve} from 'path'

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
  ],
  resolve: {
    alias: {"@": resolve(__dirname, "src")},
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.4',	//实际请求地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  }
})
