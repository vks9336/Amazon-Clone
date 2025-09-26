import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Alternative config without HMR for troublesome environments
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false, // Disable HMR completely
    host: 'localhost',
    port: 5173,
    strictPort: false,
    cors: true,
    open: false,
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