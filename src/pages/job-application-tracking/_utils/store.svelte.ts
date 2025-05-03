import { storage } from '@/shared/utils/dom.ts'
import { BOARD_INFO_KEY, DEFAULT_BOARD_INFO } from './consts.ts'
import type { BoardInfo, JobApplicationInfo, JobApplicationStatus } from './types.ts'

let boardInfo = $state(DEFAULT_BOARD_INFO)
let isBoardLoading = $state(true)

export function useBoard() {
  const initBoardInfo = () => {
    const rawInfo = storage.get<BoardInfo>(BOARD_INFO_KEY, true)

    if (rawInfo != null && typeof rawInfo !== 'string') {
      boardInfo = rawInfo
    }

    storage.set(BOARD_INFO_KEY, DEFAULT_BOARD_INFO)
    boardInfo = DEFAULT_BOARD_INFO
    isBoardLoading = false
  }

  const updateColumnCards = (status: JobApplicationStatus, updatedCards: JobApplicationInfo[]) => {
    const newBoardInfo = boardInfo
    newBoardInfo[status] = updatedCards
    boardInfo = newBoardInfo
    persistBoardInfo()
  }

  const persistBoardInfo = () => {
    storage.set(BOARD_INFO_KEY, JSON.stringify(boardInfo))
  }

  return {
    boardInfo,
    isBoardLoading,
    initBoardInfo,
    updateColumnCards,
  }
}
