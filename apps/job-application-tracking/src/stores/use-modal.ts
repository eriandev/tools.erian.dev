import { modalInfo, showModal, DEFAULT_MODAL_INFO } from './consts'
import type { ModalInfo } from './types'

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
