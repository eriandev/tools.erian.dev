import path from 'node:path'
import icon from 'astro-icon'
import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'
import { iconTyping } from 'shared/config/integrations'

export interface GetAstroConfig {
  site: string
  app?: string
  hostname?: string
  useSvelte?: boolean
  useAstroIcon?: boolean
}

const getSvelteIntegrations = (isNeeded: boolean) => (isNeeded ? [svelte()] : [])
const getIconIntegrations = (isNeeded: boolean) => (isNeeded ? [icon(), iconTyping()] : [])

export function getAstroConfig({ app, site, hostname, useSvelte = false, useAstroIcon = false }: GetAstroConfig) {
  const assets = 'assets'
  const hasAppName = typeof app === 'string'
  const base = hasAppName ? '/' + app : '/'
  const hasHostname = typeof hostname === 'string'

  return {
    base,
    site,
    build: { assets },
    image: hasHostname ? { domains: [hostname] } : undefined,
    integrations: [...getIconIntegrations(useAstroIcon), ...getSvelteIntegrations(useSvelte)],
    vite: {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@': path.resolve('./src'),
        },
      },
      ssr: useSvelte ? { noExternal: ['@usesvelte/inline-svg'] } : undefined,
    },
  } as const
}
