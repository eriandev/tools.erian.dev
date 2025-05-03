import type { BoardInfo, EditCardInfo, NewCardInfo } from './types.ts'

export const flipDurationMs = 200
export const BOARD_INFO_KEY = 'jat'
export const JOB_APPLICATION_STATUS = ['wishlist', 'applied', 'interview'] as const
export const DEFAULT_BOARD_INFO: BoardInfo = {
  wishlist: [],
  applied: [],
  interview: [],
}

export const DEFAULT_NEW_CARD_INFO: NewCardInfo = {
  show: false,
  step: 'wishlist',
}

export const DEFAULT_EDIT_CARD_INFO: EditCardInfo = {
  show: false,
}
