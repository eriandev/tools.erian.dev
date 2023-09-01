import { DATE_UNITS } from './consts'

/**
 * @param {string|number?} value
*/
export function parseFloat (value) {
  const number = typeof value === 'number' ? value.toString() : value
  return Number.parseFloat(number || '0')
}

/**
 * @param {number} timestamp
 */
export function getTimeAgo (timestamp) {
  const rtf = new Intl.RelativeTimeFormat()
  const { value, unit } = getTimeValueAndUnit(timestamp)

  if (unit === 'second') return 'just now'
  if (unit === 'minute' && value > -9) return 'minutes ago'
  if (unit === 'minute' && value <= -10) return `${Math.abs(value).toString()[0]}0 minutes ago`
  // @ts-ignore
  return rtf.format(value, unit)
}

/**
 * @param {number} timestamp
 * @param {Intl.DateTimeFormatOptions=} options
 */
export function getFormattedDate (timestamp, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

/**
 * @param {number} timestamp
*/
function getTimeValueAndUnit (timestamp) {
  const secondsElapsed = (Date.now() - timestamp) / 1000
  return getUnitAndValueDate(secondsElapsed)
}

/**
 * @param {number} secondsElapsed
*/
const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }

  return { value: 0, unit: 'second' }
}
