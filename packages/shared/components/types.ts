import type { HTMLAnchorAttributes, SVGAttributes } from 'svelte/elements'
import type { HTMLAttributes } from 'astro/types'
import type { IconName } from 'virtual:icon'

export type HTMLProps = HTMLAttributes<'html'>
export type BodyProps = HTMLAttributes<'body'>

export interface AstroIconProps extends HTMLAttributes<'svg'> {
  name: IconName
  size?: number
  width?: number
  height?: number
}

export interface AstroLinkProps extends Omit<HTMLAttributes<'a'>, 'href'> {
  to: string
  external?: boolean
}

export interface BaseLayoutProps {
  title: string
  slug?: string
  html?: HTMLProps
  body?: BodyProps
  description: string
  themeColor?: string
}

export interface SvelteIconProps extends SVGAttributes<SVGSVGElement> {
  name: IconName
  size?: number
  width?: number
  height?: number
}

export interface SvelteLinkProps extends Omit<HTMLAnchorAttributes, 'href'> {
  to: string
  external?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
}
