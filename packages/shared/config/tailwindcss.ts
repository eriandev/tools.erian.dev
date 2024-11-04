import tailwindPlugin from 'tailwindcss/plugin'
import type { ContentConfig, DarkModeConfig, ResolvableTo, ScreensConfig } from 'tailwindcss/types/config'

export type { Config } from 'tailwindcss'
export const plugin = tailwindPlugin

export const content: ContentConfig = ['src/**/*.{astro,html}', './node_modules/shared/components/*.astro']
export const darkMode: Partial<DarkModeConfig> = 'media'
export const screens: ResolvableTo<ScreensConfig> = {
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}
