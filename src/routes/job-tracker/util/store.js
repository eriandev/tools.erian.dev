import { writable } from 'svelte/store'
import { DEFAULT_BOARD_INFO, DEFAULT_MODAL_INFO } from './consts'

export const boardInfo = writable(DEFAULT_BOARD_INFO)
/**
 * @param {import('./consts.js').ColumnHeadlines} headline
 * @param {import('./consts.js').ColumnInfo} newJobInfo
*/
export function addNewJobTo (headline, newJobInfo) {
  boardInfo.update(info => info.map(({ id, items }) => id === headline ? { id, items: [newJobInfo, ...items] } : { id, items }))
}

export const modalInfo = writable(DEFAULT_MODAL_INFO)
export function closeModal () {
  modalInfo.set(DEFAULT_MODAL_INFO)
}
