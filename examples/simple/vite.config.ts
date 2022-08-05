import { defineConfig } from 'vite';
export default defineConfig({
  root: 'src',
  resolve: {
    dedupe: ['react', 'react-dom'],
  }
});
