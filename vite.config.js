import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// QUAN TRỌNG: GitHub Pages đặt trang ở https://<username>.github.io/<tên-repo>/
// nên `base` phải trùng với tên repository của bạn.
export default defineConfig({
  plugins: [react()],
  base: '/yu-majors-mini/',
});
