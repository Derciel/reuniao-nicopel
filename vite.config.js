// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['axios'], // Garante que o axios será pré-empacotado corretamente
  },
  build: {
    target: 'esnext',   // Mantém o código moderno e compatível com o ambiente do Render
    commonjsOptions: {
      include: [/node_modules/], // Trata CommonJS corretamente, incluindo o axios
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Permite usar imports como import X from '@/components/X'
    },
  },
});
