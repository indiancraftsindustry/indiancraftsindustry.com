import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// The site is served from the root of indiancraftsindustry.com. BASE_PATH (e.g. "/repo-name/")
// lets a preview copy live in a sub-folder. The second, SSR build only pre-renders pages,
// so it skips copying /public.
export default defineConfig(({ mode, isSsrBuild }) => {
  const { BASE_PATH } = loadEnv(mode, '.', 'BASE_')
  return {
    base: BASE_PATH || '/',
    plugins: [vue(), tailwindcss()],
    build: { copyPublicDir: !isSsrBuild },
  }
})
