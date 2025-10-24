// vite.config.ts

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// A função defineConfig agora recebe um contexto (command, mode)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/', 
  };
});