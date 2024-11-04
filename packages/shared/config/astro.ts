import tailwind from '@astrojs/tailwind'
import type { AstroUserConfig } from 'astro/config'

export interface GetAstroConfig {
  project?: string
}

export function getAstroConfig({ project }: GetAstroConfig = {}): AstroUserConfig {
  const assets = 'assets'
  const base = `/${project ?? ''}`.trim()
  const hasProjectName = typeof project === 'string'
  const outDir = hasProjectName ? `../../dist/${project}` : undefined

  return {
    base,
    build: { assets },
    integrations: [tailwind()],
    outDir,
  }
}
