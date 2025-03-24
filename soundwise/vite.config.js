// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   publicDir: 'public'
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This ensures that the base path is set correctly
  base: '/',
  build: {
    // Ensure that the outDir is correctly set
    outDir: 'dist',
  },
});