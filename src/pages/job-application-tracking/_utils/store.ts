import { get } from 'svelte/store'
import { storage } from '@/shared/utils/dom.ts'
import {
  boardInfo,
  modalInfo,
  showModal,
  isLoading,
  boardCount,
  BOARD_INFO_KEY,
  DEFAULT_BOARD_INFO,
  DEFAULT_MODAL_INFO,
} from './consts.ts'
import type { BoardInfo, JobApplicationInfo, JobApplicationStatus, ModalInfo } from './types.ts'

export function useBoard() {
  const initBoardInfo = () => {
    const rawInfo = storage.get<BoardInfo>(BOARD_INFO_KEY, true)

    if (rawInfo === null || typeof rawInfo === 'string') {
      storage.set(BOARD_INFO_KEY, DEFAULT_BOARD_INFO)
      boardInfo.set(DEFAULT_BOARD_INFO)
    } else {
      boardInfo.set(rawInfo)
    }

    isLoading.set(false)
  }

  const createJobPost = (status: JobApplicationStatus, newJobApp: JobApplicationInfo) => {
    const newBoardInfo = get(boardInfo)
    newBoardInfo[status] = [newJobApp, ...newBoardInfo[status]]
    boardInfo.set(newBoardInfo)
    persistBoardInfo()
  }

  const updateCardInfo = (status: JobApplicationStatus, jobPostId: string, newJobApp: Partial<JobApplicationInfo>) => {
    const actualBoardInfo = get(boardInfo)
    actualBoardInfo[status] = actualBoardInfo[status].map((info) =>
      info.id === jobPostId ? { ...info, ...newJobApp } : info,
    )
    boardInfo.set(actualBoardInfo)
    persistBoardInfo()
  }

  const deleteJobPost = (status: JobApplicationStatus, jobPostId: string) => {
    const actualBoardInfo = get(boardInfo)
    actualBoardInfo[status] = actualBoardInfo[status].filter(({ id }) => id !== jobPostId)
    boardInfo.set(actualBoardInfo)
    persistBoardInfo()
  }

  const updateColumnCards = (
    status: JobApplicationStatus,
    updatedCards: JobApplicationInfo[],
    { persist = false } = {},
  ) => {
    const newBoardInfo = get(boardInfo)
    newBoardInfo[status] = updatedCards
    boardInfo.set(newBoardInfo)
    if (persist) persistBoardInfo()
  }

  const persistBoardInfo = () => {
    const boardInfoValue = get(boardInfo)
    storage.set(BOARD_INFO_KEY, boardInfoValue)
  }

  return {
    boardInfo,
    isLoading,
    boardCount,
    initBoardInfo,
    createJobPost,
    deleteJobPost,
    updateCardInfo,
    updateColumnCards,
  }
}

export function useModal() {
  const openModal = ({ action, status, jobApplication }: ModalInfo) => {
    modalInfo.set({ status, action, jobApplication })
    showModal.set(true)
  }

  const closeModal = () => {
    showModal.set(false)
    modalInfo.set(DEFAULT_MODAL_INFO)
  }

  return {
    modalInfo,
    showModal,
    openModal,
    closeModal,
  }
}
