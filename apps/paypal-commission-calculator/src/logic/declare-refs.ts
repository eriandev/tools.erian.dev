import { $ } from 'shared/utils/dom'
import { amountID, receiveCommissionID, receiveID, sendCommissionID, sendID } from './consts'

export const $send = $<HTMLInputElement>('#' + sendID)
export const $amount = $<HTMLInputElement>('#' + amountID)
export const $receive = $<HTMLInputElement>('#' + receiveID)
export const $sendCommission = $<HTMLInputElement>('#' + sendCommissionID)
export const $receiveCommission = $<HTMLInputElement>('#' + receiveCommissionID)
