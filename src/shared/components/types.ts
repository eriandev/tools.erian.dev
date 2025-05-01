import type { HTMLAttributes } from 'astro/types'
import type { IconName } from 'virtual:icon'

export interface IconProps extends HTMLAttributes<'svg'> {
  name: IconName
  size?: number
  width?: number
  height?: number
}
