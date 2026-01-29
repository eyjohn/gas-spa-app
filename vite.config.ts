import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '../test/setup.ts',
    include: [
      '**/*.{test,spec}.?(c|m)[jt]s?(x)',
      '../**/*.{test,spec}.?(c|m)[jt]s?(x)'
    ],
  },
  root: 'src/client',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
