import { defineConfig } from 'astro/config'
import { BASE_URL } from 'shared/utils/env'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({
  useSvelte: true,
  useAstroIcon: true,
  site: BASE_URL,
  app: 'job-application-tracking',
})

// https://astro.build/config
export default defineConfig(config)
