import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirect',
      // Este plugin se encarga de copiar el archivo _redirects al directorio de salida (dist)
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: '_redirects',
          source: '/* /index.html 200',  // Regla de redirección para todas las rutas
        })
      },
    },
  ],
})