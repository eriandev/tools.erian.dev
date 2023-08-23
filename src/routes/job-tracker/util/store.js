import { get, writable } from 'svelte/store'
import { BOARD_INFO_KEY, DEFAULT_BOARD_INFO } from './consts'

export const boardInfo = writable(DEFAULT_BOARD_INFO)
/**
 * @param {import('./consts.js').JobStep} step
 * @param {import('./consts.js').JobPostInfo} newJobInfo
*/
export function createNewJobPost (step, newJobInfo) {
  boardInfo.update(info => info.map(({ headline, items }) => headline === step ? { headline, items: [newJobInfo, ...items] } : { headline, items }))
  persistBoardInfo()
}
/**
 * @param {import('./consts.js').JobStep} columnTitle
 * @param {import('./consts.js').JobPostInfo[]} updatedCards
*/
export function updateColumnCards (columnTitle, updatedCards) {
  const newBoardInfo = get(boardInfo)
  const colId = newBoardInfo.findIndex(({ headline }) => headline === columnTitle)
  newBoardInfo[colId].items = updatedCards
  boardInfo.set(newBoardInfo)
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
