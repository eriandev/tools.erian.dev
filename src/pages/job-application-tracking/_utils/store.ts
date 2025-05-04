import { get } from 'svelte/store'
import { storage } from '@/shared/utils/dom.ts'
import {
  boardInfo,
  modalInfo,
  showModal,
  isLoading,
  BOARD_INFO_KEY,
  DEFAULT_BOARD_INFO,
  DEFAULT_MODAL_INFO,
} from './consts.ts'
import type { BoardInfo, JobApplicationInfo, JobApplicationStatus, ModalInfo } from './types.ts'

export function useBoard() {
  const initBoardInfo = () => {
    const rawInfo = storage.get<BoardInfo>(BOARD_INFO_KEY, true)

    if (rawInfo == null || typeof rawInfo === 'string') {
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

  const updateColumnCards = (status: JobApplicationStatus, updatedCards: JobApplicationInfo[]) => {
    const newBoardInfo = get(boardInfo)
    newBoardInfo[status] = updatedCards
    boardInfo.set(newBoardInfo)
    persistBoardInfo()
  }

  const persistBoardInfo = () => {
    const boardInfoValue = get(boardInfo)
    storage.set(BOARD_INFO_KEY, boardInfoValue)
  }

  return {
    boardInfo,
    isLoading,
    initBoardInfo,
    createJobPost,
    updateColumnCards,
  }
}

export function useModal() {
  const openModal = ({ action, status, jobApplication }: ModalInfo) => {
    showModal.set(true)
    modalInfo.set({ status, action, jobApplication })
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
