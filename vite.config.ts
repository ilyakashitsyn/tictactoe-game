// @ts-check
// @tsconfig tsconfig.vite.config.json

import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
});
