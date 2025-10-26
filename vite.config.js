import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Bundle optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['clsx', 'tailwind-merge'],
          'data-vendor': ['zustand'],
          'utils-vendor': ['axios'],
          
          // Feature chunks
          'datatable': [
            './src/components/DataTable/DataTable.tsx',
            './src/components/DataTableShowcase.tsx'
          ],
          'pageheader': [
            './src/components/PageHeader/PageHeader.tsx',
            './src/components/PageHeaderShowcase.tsx'
          ],
          'forms': [
            './src/components/FormInput.tsx',
            './src/components/ValidatedFormInput.tsx',
            './src/components/ItemsFilters.tsx'
          ],
          'navigation': [
            './src/components/UnderlineNav.tsx',
            './src/components/UnderlineNavShowcase.tsx'
          ],
          'pages': [
            './src/pages/ItemsPage.tsx',
            './src/pages/TestingPage.tsx'
          ]
        },
        // Optimize chunk names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop().replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Source maps for production debugging
    sourcemap: false,
    // Target modern browsers
    target: 'esnext',
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Development optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'zustand',
      'clsx',
      'tailwind-merge',
      'axios'
    ],
    exclude: [
      // Exclude large components from pre-bundling
      './src/components/DataTable',
      './src/components/PageHeader',
      './src/pages'
    ]
  },
  // Server configuration
  server: {
    port: 3000,
    open: true,
  },
  // Preview configuration
  preview: {
    port: 4173,
    open: true,
  }
});
