import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      include: [
        /node_modules\/@fullcalendar/,
        /node_modules\/axios/
      ],
      requireReturnsDefault: 'auto'
    })
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      esmExternals: true
    }
  },
  optimizeDeps: {
    include: ['axios']
  }
});