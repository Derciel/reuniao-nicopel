// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      include: /node_modules/,
    })
  ],
  resolve: {
    alias: {
      './env/data.js': 'axios/lib/env/data.js'
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});