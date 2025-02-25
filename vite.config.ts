import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy';

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'IE 11'],
      polyfills: true,
    }),
  ],
  
})
