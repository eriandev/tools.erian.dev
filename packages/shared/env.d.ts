/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string
  readonly PUBLIC_URL_ORIGIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
