import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

const NODE_MODULES_REGEX = /node_modules/;

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      // Ensures compatibility with CommonJS modules that export default values
      requireReturnsDefault: 'auto',
      include: NODE_MODULES_REGEX,
      transformMixedEsModules: true // Necessary for compatibility with mixed ES and CommonJS modules
    })
  ],
  build: {
    commonjsOptions: {
      // Removed esmExternals for consistency
      esmExternals: ['react', 'react-dom']
    },
    external: ['react', 'react-dom', 'react-dom/client']
  }
  }
});