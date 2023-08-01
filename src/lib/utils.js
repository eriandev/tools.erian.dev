/**
 * @param {string|number?} value
*/
export function parseFloat (value) {
  const number = typeof value === 'number' ? value.toString() : value
  return Number.parseFloat(number || '0')
}
