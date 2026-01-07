import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/charta-obscura-v2/', // Sostituisci con il nome esatto del tuo repository su GitHub
})