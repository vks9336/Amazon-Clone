import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fallback configuration that disables WebSocket HMR
// Use this if WebSocket issues persist: cp vite.config.fallback.js vite.config.js

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false, // Disable HMR WebSocket completely
    host: 'localhost',
    port: 5173,
    strictPort: false,
    cors: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons'],
          animation: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})