declare global {
  interface Window {
    isOnlyNumberOrDot: (event: KeyboardEvent) => boolean
  }
}

export {}
