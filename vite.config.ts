import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  root: './src',
  publicDir: '../public',
  plugins: [
    react(),
    legacy({
      targets: ['ie >= 11', 'defaults'],
      polyfills: true,
      modernPolyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: '../dist',
    target: ['es2015', 'edge79', 'firefox67', 'chrome64', 'safari12'],
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
