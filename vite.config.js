import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      include: /node_modules/,
      // Força o Rollup a processar CommonJS corretamente
      requireReturnsDefault: 'auto'
    })
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // Garante que o React seja tratado como ES Module
      esmExternals: ['react', 'react-dom']
    }
  }
});