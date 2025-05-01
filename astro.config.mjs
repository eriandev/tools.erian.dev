import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { iconTyping } from './scripts/integrations.ts'

// https://astro.build/config
export default defineConfig({
  build: { assets: 'assets' },
  vite: { plugins: [tailwindcss()] },
  integrations: [icon(), iconTyping()],
})
