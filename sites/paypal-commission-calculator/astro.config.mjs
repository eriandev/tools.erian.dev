import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({ project: 'paypal-commission-calculator' })

// https://astro.build/config
export default defineConfig(config)
