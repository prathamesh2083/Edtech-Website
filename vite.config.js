import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://edtech-website-backend.onrender.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Keep the /api prefix
      },
    },
  },
  plugins: [react()],
  define: {
    global: {},
  },
});
