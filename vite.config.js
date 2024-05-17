import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'
import terser from '@rollup/plugin-terser'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: { port: 3000 },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Tajweed Recognition',
        short_name: 'Tajweed Recognition',
        description: 'Recognizing Arabic Characters from an image and generating Tajweed Colors from recognized text',
        theme_color: '#166534',
        orientation: 'portrait',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          },
          {
            src: 'images/tr-logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'images/tr-logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        display: 'standalone'
      },
      registerType: 'autoUpdate'
    })
  ],
  build: {
    rollupOptions: {
      plugins: [
        terser()
      ]
    }
  }
})
