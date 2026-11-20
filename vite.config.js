import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// VITE_BASE lets the GitHub Pages workflow build for /once-upon-a-time-kid-app/.
// Locally it is unset, so the app serves from '/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
