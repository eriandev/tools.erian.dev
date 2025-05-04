import type { MarkdownHeading } from 'astro'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

export interface AstroMarkdown {
  file: string
  url?: string
  Content: AstroComponentFactory
  frontmatter: Record<string, unknown>
  compiledContent: () => Promise<string>
  getHeadings: () => MarkdownHeading[]
  rawContent: () => string
}

export interface PageContent {
  title: string
  description: string
  subtitle?: string
}

export interface Site {
  slug: string
  title: string
  description: string
}

export type PageApiResponse = PageContent & {
  sites: Site[]
}
