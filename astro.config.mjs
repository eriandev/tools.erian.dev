import { defineConfig } from 'astro/config'
import { BASE_URL } from 'shared/utils/env'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({ site: BASE_URL })

// https://astro.build/config
export default defineConfig(config)
