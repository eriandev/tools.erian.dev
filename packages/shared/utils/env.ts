import path from 'node:path'
import { loadEnv } from 'vite'

const root = path.resolve(process.cwd()).split('apps')[0]
const env = loadEnv(process.env.NODE_ENV ?? 'development', root, 'PUBLIC_')

export const API_URL = env.PUBLIC_API_URL
export const BASE_URL = env.PUBLIC_BASE_URL
