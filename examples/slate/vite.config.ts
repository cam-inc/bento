import { defineConfig } from 'vite';
export default defineConfig({
  root: 'src',
  dedupe: ['react', 'react-dom']
});
