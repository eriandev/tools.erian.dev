import type { Snippet } from 'svelte'
import type { HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements'

import type { IconName } from 'virtual:icon'
import type { JobApplicationInfo, JobApplicationStatus } from '../_utils/types.ts'

export interface BaseModalProps {
  y?: number
  show: boolean
  duration?: number
  options?: BaseModalOptions
  children?: Snippet
}

export interface ButtonProps extends HTMLButtonAttributes {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
}

export interface CardProps extends JobApplicationInfo {
  showMeet?: boolean
}

export interface CardsContainer {
  status: JobApplicationStatus
  children?: Snippet
}

export interface CheckboxProps extends HTMLInputAttributes {
  id: string
  icon: IconName
  label?: string
}

export interface ColumnProps {
  headline: JobApplicationStatus
}

export interface CreateButtonProps {
  status: JobApplicationStatus
}

export interface InputProps {
  id: string
  value: string
  icon: IconName
  label?: string
}

interface BaseModalOptions {
  overlayClick?: boolean
  escapeKeyPress?: boolean
}
