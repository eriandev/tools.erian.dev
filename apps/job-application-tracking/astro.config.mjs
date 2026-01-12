import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({
  useSvelte: true,
  useAstroIcon: true,
  project: 'job-application-tracking',
})

// https://astro.build/config
export default defineConfig(config)
