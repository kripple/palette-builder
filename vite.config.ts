import * as childProcess from 'child_process';
import dns from 'dns';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';

dns.setDefaultResultOrder('verbatim');

const gitHash = childProcess
  .execSync('git rev-parse HEAD')
  .toString()
  .trimEnd();
const gitBranch = childProcess
  .execSync('git branch --show-current')
  .toString()
  .trimEnd();

// https://vitejs.dev/config/
export default defineConfig({
  base: '/palette-builder/',
  build: {
    outDir: 'docs',
  },
  clearScreen: false,
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(gitHash),
    'import.meta.env.GIT_BRANCH': JSON.stringify(gitBranch),
  },
  plugins: [
    react(),
    // visualizer({
    //   template: 'treemap',
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
  test: {
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
  },
});
