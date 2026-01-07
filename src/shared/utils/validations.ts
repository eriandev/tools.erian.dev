import { VALID_HOST_REGEX, VALID_URL_REGEX } from '@/shared/consts'

export function isValidHost(possibleHost: string) {
  return possibleHost.match(VALID_HOST_REGEX) !== null
}

export function isValidURL(possibleURL: string) {
  return possibleURL.match(VALID_URL_REGEX) !== null
}
