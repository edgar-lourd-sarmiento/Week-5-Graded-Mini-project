import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/Week-5-Graded-Mini-project/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})