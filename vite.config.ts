import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps the build portable: dist/ works from any folder or static host
export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
})
