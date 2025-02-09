import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // This ensures it listens on 0.0.0.0
    port: parseInt(process.env.PORT || '3000'),
    allowedHosts: [
      'localhost',
      '.onrender.com',
      'lcbrn.onrender.com'  // This allows all subdomains on render.com
    ]
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT || '3000'),
  }
});