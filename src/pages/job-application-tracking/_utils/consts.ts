import { derived, writable } from 'svelte/store'
import type { BoardInfo, ModalInfo } from './types'

export const flipDurationMs = 200
export const BOARD_INFO_KEY = 'jat'
export const JOB_APPLICATION_STATUS = ['wishlist', 'applied', 'interview'] as const

export const DEFAULT_BOARD_INFO: BoardInfo = {
  wishlist: [],
  applied: [],
  interview: [],
}

export const DEFAULT_MODAL_INFO: ModalInfo = {
  action: 'create',
  status: 'wishlist',
}

export const isLoading = writable(true)
export const showModal = writable(false)
export const boardInfo = writable(DEFAULT_BOARD_INFO)
export const modalInfo = writable(DEFAULT_MODAL_INFO)
export const boardCount = derived(boardInfo, ({ wishlist, applied, interview }) => ({
  wishlist: wishlist.length,
  applied: applied.length,
  interview: interview.length,
}))
