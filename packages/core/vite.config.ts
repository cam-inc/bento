import path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `${format}.js`,
    },
    outDir: path.resolve(__dirname, './dist'),
    sourcemap: true,
    emptyOutDir: false,
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
    },
  },
  define: {
    VERSION: JSON.stringify(pkg.version),
  },
  plugins: [vanillaExtractPlugin(), react()],
});
