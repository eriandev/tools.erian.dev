<script lang="ts">
  import type { ButtonProps } from './types'

  const { variant = 'ghost', class: extraClass, children, ...restProps }: ButtonProps = $props()
</script>

<button {...restProps} class={['btn', variant, extraClass]}>
  {@render children?.()}
</button>
