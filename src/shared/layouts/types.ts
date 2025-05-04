import type { HTMLAttributes } from 'astro/types'

export type HTMLProps = HTMLAttributes<'html'>
export type BodyProps = HTMLAttributes<'body'>

export interface BaseLayoutProps {
  title: string
  slug?: string
  html?: HTMLProps
  body?: BodyProps
  description: string
  themeColor?: string
}
