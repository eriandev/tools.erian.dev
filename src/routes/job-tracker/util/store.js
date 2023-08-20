import { get, writable } from 'svelte/store'
import { BOARD_INFO_KEY, DEFAULT_BOARD_INFO, DEFAULT_MODAL_INFO } from './consts'

export const boardInfo = writable(DEFAULT_BOARD_INFO)
/**
 * @param {import('./consts.js').ColumnHeadlines} headline
 * @param {import('./consts.js').ColumnInfo} newJobInfo
*/
export function addNewJobTo (headline, newJobInfo) {
  boardInfo.update(info => info.map(({ id, items }) => id === headline ? { id, items: [newJobInfo, ...items] } : { id, items }))
  persistBoardInfo()
}

export function persistBoardInfo () {
  const info = get(boardInfo)
  localStorage.setItem(BOARD_INFO_KEY, JSON.stringify(info))
}

export function initBoardInfo () {
  const rawInfo = localStorage.getItem(BOARD_INFO_KEY)

  if (!rawInfo) {
    resetBoardInfo()
    return
  }

  /** @type {import('./consts.js').BoardInfo[]} */
  const recoveredInfo = JSON.parse(rawInfo)
  boardInfo.set(recoveredInfo)
}

export function resetBoardInfo () {
  boardInfo.set(DEFAULT_BOARD_INFO)
}

export const modalInfo = writable(DEFAULT_MODAL_INFO)
export function closeModal () {
  modalInfo.set(DEFAULT_MODAL_INFO)
}
