import { toast } from 'wc-toast'
import { getParsedValues, getRecieveValues, getSendValues } from './calculator-actions'
import { $send, $amount, $receive, $sendCommission, $receiveCommission } from './declare-refs'

window.isOnlyNumberOrDot = isOnlyNumberOrDot

function isOnlyNumberOrDot({ key }: KeyboardEvent): boolean {
  const pattern = /^\d+(\.\d+)?$/
  return pattern.test(key)
}

document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target

  if (!(target instanceof Element)) return

  const svg = target.closest('svg[id^="copy-btn-"]')
  if (svg === null) return

  const targetId = svg.id.replace('copy-btn-', '')
  const input = document.getElementById(targetId)

  if (!(input instanceof HTMLInputElement)) return

  void navigator.clipboard
    .writeText(input.value)
    .then(() => {
      toast('Copied value!')
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        console.error('Error coying:', err.message)
      }
    })
})

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
