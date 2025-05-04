<script lang="ts">
  import type { ButtonProps } from './types'

  interface Props extends ButtonProps {}

  const { variant = 'ghost', class: extraClass, children, ...restProps }: Props = $props()
</script>

<button {...restProps} class={['btn', variant, extraClass]}>
  {@render children?.()}
</button>
