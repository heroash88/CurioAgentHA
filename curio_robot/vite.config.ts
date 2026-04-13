import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    worker: {
      format: 'iife',
    },
    server: {
      port: 8080,
      host: '0.0.0.0',
      allowedHosts: ['curio-a4zm.onrender.com'],
      proxy: {
        '/api/nvidia-image': {
          target: 'https://ai.api.nvidia.com',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/nvidia-image/, ''),
          secure: true,
        },
        '/api/nvidia': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/nvidia/, ''),
          secure: true,
        },
      },
    },

    plugins: [
      react(),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ""),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ""),
    },
    esbuild: {
      pure: mode === 'production' ? ['console.log', 'console.debug'] : [],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    assetsInclude: ['**/*.onnx'],
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  };
});