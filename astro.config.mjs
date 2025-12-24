import path from 'node:path'
import icon from 'astro-icon'
import { loadEnv } from 'vite'
import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { iconTyping } from './scripts/integrations.ts'

const { PUBLIC_BASE_URL } = loadEnv('', '', 'PUBLIC')

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_BASE_URL,
  build: { assets: 'assets' },
  integrations: [icon(), svelte(), iconTyping()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
