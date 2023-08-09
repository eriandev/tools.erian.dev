<slot />

<style>
  :global(body) {
    color: theme('textColor.gray.900');
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      color: theme('colors.white');
      background: theme('colors.gray.900');
    }
  }
</style>
