import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Escucha en todas las interfaces: sirve localhost, 127.0.0.1 y el móvil por la red local.
    host: true,
    // La API de producción se llama a través del proxy para evitar problemas de CORS en desarrollo.
    proxy: {
      '/api-lamarta': {
        target: 'https://lamarta.es',
        changeOrigin: true,
        rewrite: (ruta) => ruta.replace(/^\/api-lamarta/, '/api/route.php'),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
