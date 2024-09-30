import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Set base path for deployed assets
  build: {
    outDir: 'dist'  // Make sure the output directory aligns with your FastAPI static directory setup
  }
})
