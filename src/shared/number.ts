export function isEven(n: number) {
  return (n ^ 1) === n + 1
}

export function parseFloat(value?: string | number) {
  const number = typeof value === 'number' ? value.toString() : value
  return Number.parseFloat(number ?? '0')
}
