import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // This ensures it listens on 0.0.0.0
    port: parseInt(process.env.PORT || '3000'),
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT || '3000'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
}});