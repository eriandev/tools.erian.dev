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

/**
 * @param {string} cardId
 * @returns {Partial<import('./consts.js').JobPostInfo>}
*/
export function getCardInfoById (cardId) {
  const actualInfo = get(boardInfo)
  const [colPos, cardPos] = getCardPositionById(cardId)
  return actualInfo[colPos].items[cardPos]
}

/**
 * @param {string} cardId
 * @param {Omit<Partial<import('./consts.js').JobPostInfo>, 'id' | 'timestamp'>} newCardInfo
*/
export function updateCardInfo (cardId, newCardInfo) {
  const [colPos, cardPos] = getCardPositionById(cardId)
  boardInfo.update(actualInfo => {
    const actualCardInfo = actualInfo[colPos].items[cardPos]
    actualInfo[colPos].items[cardPos] = { ...actualCardInfo, ...newCardInfo }
    return actualInfo
  })
  persistBoardInfo()
}

/**
 * @param {string} cardId
 * @returns {[number,number]}
*/
export function getCardPositionById (cardId) {
  const actualInfo = get(boardInfo)
  /** @type {[number,number]} */
  let result = [0, 0]

  actualInfo.some(({ items }, index1) => {
    // eslint-disable-next-line array-callback-return
    return items.some((item, index2) => {
      if (item.id === cardId) {
        result = [index1, index2]
        return true
      }
    })
  })

  return result
}

/**
 * @param {string} cardId
*/
export async function deleteCardById (cardId) {
  const [colPos] = getCardPositionById(cardId)
  boardInfo.update(actualInfo => {
    const actualColumnCards = actualInfo[colPos].items
    actualInfo[colPos].items = actualColumnCards.filter(({ id }) => id !== cardId)
    return actualInfo
  })
  persistBoardInfo()
}

export function persistBoardInfo () {
  const info = get(boardInfo)
  localStorage.setItem(BOARD_INFO_KEY, JSON.stringify(info))
}

export async function initBoardInfo () {
  const rawInfo = localStorage.getItem(BOARD_INFO_KEY)

  if (!rawInfo) {
    resetBoardInfo()
    return true
  }

  /** @type {import('./consts.js').BoardInfo[]} */
  const recoveredInfo = JSON.parse(rawInfo)
  boardInfo.set(recoveredInfo)
  return true
}

export function resetBoardInfo () {
  boardInfo.set(DEFAULT_BOARD_INFO)
}
