declare global {
  interface Window {
    isOnlyNumbers: (event: KeyboardEvent) => boolean
  }
}

export {}
