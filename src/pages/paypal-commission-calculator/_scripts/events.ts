import { getParsedValues, getRecieveValues, getSendValues } from './calculatorActions.ts'
import {
  $send,
  $amount,
  $receive,
  $sendComission,
  $fixedCommision,
  $percentCommision,
  $receiveComission,
} from './declareRefs.ts'

window.isOnlyNumbers = isOnlyNumbers

function isOnlyNumbers({ key }: KeyboardEvent): boolean {
  const pattern = /^[0-9]$/
  return pattern.test(key)
}

$amount?.addEventListener('input', ({ target }) => {
  const { value } = target as HTMLInputElement
  const { parsedAmount, parsedFixedCommision, parsedPercentCommision } = getParsedValues(
    value,
    $fixedCommision?.value,
    $percentCommision?.value,
  )

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
  if ($send != null) $send.value = sendValue
  if ($receive != null) $receive.value = recieveValue
  if ($sendComission != null) $sendComission.value = sendCommision
  if ($receiveComission != null) $receiveComission.value = recieveCommision
}
