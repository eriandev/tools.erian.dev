import { getParsedValues, getRecieveValues, getSendValues } from './calculator-actions'
import { $send, $amount, $receive, $sendCommission, $receiveCommission } from './declare-refs'

window.isOnlyNumberOrDot = isOnlyNumberOrDot

function isOnlyNumberOrDot({ key }: KeyboardEvent): boolean {
  const pattern = /^\d+(\.\d+)?$/
  return pattern.test(key)
}

$amount?.addEventListener('input', ({ target }) => {
  const { value } = target as HTMLInputElement
  const { parsedAmount, parsedFixedCommision, parsedPercentCommision } = getParsedValues(value)

  if (Number.isNaN(parsedAmount)) {
    updateValues('', '', '', '')
    return
  }

  const { fixedSendCommision, fixedSendValue } = getSendValues(
    parsedAmount,
    parsedFixedCommision,
    parsedPercentCommision,
  )
  const { fixedRecieveCommision, fixedRecieveValue } = getRecieveValues(
    parsedAmount,
    parsedFixedCommision,
    parsedPercentCommision,
  )

  updateValues(fixedSendValue, fixedRecieveValue, fixedSendCommision, fixedRecieveCommision)
})

function updateValues(sendValue: string, recieveValue: string, sendCommision: string, recieveCommision: string) {
  if ($send !== null) $send.value = sendValue
  if ($receive !== null) $receive.value = recieveValue
  if ($sendCommission !== null) $sendCommission.value = sendCommision
  if ($receiveCommission !== null) $receiveCommission.value = recieveCommision
}
