import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // On GitHub Pages the app is served from /phone_catalogue_react/,
  // so production assets must be requested from that sub-path.
  base: command === 'build' ? '/phone_catalogue_react/' : '/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
}))
