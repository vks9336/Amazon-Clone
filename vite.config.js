import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      port: 24678, // Use a different port for HMR
      clientPort: 24678,
    },
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
    cors: true,
    watch: {
      usePolling: true,
    },
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
