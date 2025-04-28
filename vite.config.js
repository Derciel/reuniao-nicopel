// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['axios'], 
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      include: [/node_modules/], 
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      'axios': 'axios/dist/axios.js'  // 👉 Adiciona o alias aqui também!
    },
  },
});
