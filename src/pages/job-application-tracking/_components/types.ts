import type { Snippet } from 'svelte'
import type { HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements'

import type { IconName } from 'virtual:icon'
import type { JobApplicationInfo, JobApplicationStatus } from '../_utils/types.ts'

interface BaseModalOptions {
  overlayClick?: boolean
  escapeKeyPress?: boolean
}

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

export interface CardsContainerProps {
  status: JobApplicationStatus
  children?: Snippet
}

export interface CheckboxProps extends HTMLInputAttributes {
  id: string
  icon?: IconName
  label?: string
}

export interface ColumnProps {
  headline: JobApplicationStatus
}

export interface ColumnCountProps {
  status: JobApplicationStatus
  children?: Snippet
}

export interface CreateButtonProps {
  status: JobApplicationStatus
}

export interface DeleteButtonProps {
  confirming?: boolean
  onDelete: () => void
  onConfirm: (state: boolean) => void
}

export interface EditableTextProps {
  value?: string
  label?: string
  class?: string
  large?: boolean
  editable?: boolean
  errorMessage?: string
  type?: 'link' | 'text'
}

export interface InputProps {
  id: string
  value: string
  icon: IconName
  label?: string
  errorMessage?: string
  type?: 'text' | 'decimal'
}

export interface PopoverProps {
  y?: number
  label: string
  duration?: number
  children: Snippet
}
