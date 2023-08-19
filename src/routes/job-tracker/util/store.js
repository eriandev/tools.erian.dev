import { writable } from 'svelte/store'
import { DEFAULT_BOARD_INFO } from './consts'

export const boardInfo = writable(DEFAULT_BOARD_INFO)
