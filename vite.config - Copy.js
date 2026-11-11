import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) {
            return 'react-vendor';
          }
          if (/\/node_modules\/(react-markdown|remark-|rehype-|micromark|mdast-|hast-|unist-|vfile|lowlight|highlight\.js)/.test(id)) {
            return 'markdown-vendor';
          }
        },
      },
    },
  },
});
