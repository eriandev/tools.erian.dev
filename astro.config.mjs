import { defineConfig } from 'astro/config'
import { BASE_URL } from 'shared/utils/consts'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig()

// https://astro.build/config
export default defineConfig({ ...config, site: BASE_URL })
