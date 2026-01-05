import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [sveltekit(), imagetools()],
  
  optimizeDeps: {
    include: ['svelte']
  },
  
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte', 'svelte/store', 'svelte/transition']
        }
      }
    }
  },
  
  server: {
    fs: {
      allow: ['.']
    }
  }
});