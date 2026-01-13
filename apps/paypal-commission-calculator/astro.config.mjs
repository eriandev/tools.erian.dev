import { defineConfig } from 'astro/config'
import { BASE_URL } from 'shared/utils/env'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({
  site: BASE_URL,
  app: 'paypal-commission-calculator',
})

// https://astro.build/config
export default defineConfig(config)
