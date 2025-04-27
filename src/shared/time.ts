const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
} as const

function getTimeValueAndUnit(timestamp: number) {
  const secondsElapsed = (Date.now() - timestamp) / 1000
  return getUnitAndValueDate(secondsElapsed)
}

export function parseFloat(value: string | number) {
  const number = typeof value === 'number' ? value.toString() : value
  return Number.parseFloat(number)
}

export function getTimeAgo(timestamp: number) {
  const rtf = new Intl.RelativeTimeFormat()
  const { value, unit } = getTimeValueAndUnit(timestamp)

  if (unit === 'second') return 'just now'
  if (unit === 'minute' && value > -9) return 'minutes ago'
  if (unit === 'minute' && value <= -10) return `${Math.abs(value).toString()[0]}0 minutes ago`

  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}

export function getFormattedDate(
  timestamp: number,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
) {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

const getUnitAndValueDate = (secondsElapsed: number) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }

  return { value: 0, unit: 'second' }
}
