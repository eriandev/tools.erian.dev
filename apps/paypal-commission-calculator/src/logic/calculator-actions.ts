import { parseFloat } from 'shared/utils/number'

export function getParsedValues(amount: string) {
  const parsedAmount = parseFloat(amount)
  const parsedFixedCommision = parseFloat('0.3')
  const parsedPercentCommision = parseFloat('5.4')

  return {
    parsedAmount,
    parsedFixedCommision,
    parsedPercentCommision,
  }
}

export function getSendValues(amount = 0.0, fixed = 0.0, percent = 0.0) {
  const sendValue = getReceiveValue(amount, fixed, percent)
  const sendCommision = sendValue - amount

  return {
    sendValue,
    sendCommision,
    fixedSendValue: sendValue.toFixed(2),
    fixedSendCommision: sendCommision.toFixed(2),
  }
}

export function getRecieveValues(amount = 0.0, fixed = 0.0, percent = 0.0) {
  const recieveValue = getSendValue(amount, fixed, percent)
  const recieveCommision = amount - recieveValue

  return {
    recieveValue,
    recieveCommision,
    fixedRecieveValue: recieveValue.toFixed(2),
    fixedRecieveCommision: recieveCommision.toFixed(2),
  }
}

function getReceiveValue(amount = 0.0, fixed = 0.0, percent = 0.0) {
  return (amount + fixed) / (1 - percent / 100)
}

function getSendValue(amount = 0.0, fixed = 0.0, percent = 0.0) {
  return amount - fixed - (amount * percent) / 100
}
