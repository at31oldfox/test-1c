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
      targets: ['defaults', 'IE 11'],
      polyfills: true,
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
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/aurumFrontend/api': {
        target: 'http://212.41.9.83/additional-database',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aurumFrontend\/api/, ''),
      },

      '/apitables': {
        target: 'http://212.41.9.83',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apitables/, ''),
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      '/aurumFrontend/api': {
        target: 'http://212.41.9.83/additional-database',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aurumFrontend\/api/, ''),
      },

      '/apitables': {
        target: 'http://212.41.9.83',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apitables/, ''),
      },
    },
  },
});
