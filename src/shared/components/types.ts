import type { HTMLAnchorAttributes, SVGAttributes } from 'svelte/elements'
import type { HTMLAttributes } from 'astro/types'
import type { IconName } from 'virtual:icon'

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
