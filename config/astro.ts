import tailwindcss from '@tailwindcss/vite'
import type { AstroUserConfig } from 'astro'

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
    outDir,
    build: { assets },
    vite: { plugins: [tailwindcss()] },
  }
}
