import { resolve } from 'path'
//import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve('src/renderer/src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/renderer/src/setupTests.ts'
  }
})
