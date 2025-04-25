import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Isso garante que os arquivos (JS, CSS) sejam carregados corretamente em produção
});
