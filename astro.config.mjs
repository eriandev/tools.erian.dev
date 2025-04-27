import { defineConfig } from 'astro/config'
import { getAstroConfig } from './config/astro'

const config = getAstroConfig()

// https://astro.build/config
export default defineConfig(config)
