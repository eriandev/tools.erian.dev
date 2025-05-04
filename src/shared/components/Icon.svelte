<script lang="ts">
  import { InlineSvg } from '@usesvelte/inline-svg'
  import type { SvelteIconProps } from '@/shared/components/types'

  interface Props extends SvelteIconProps {}

  const { name, size, width, height, ...restProps }: Props = $props()
</script>

<InlineSvg {name} width={size ?? width} height={size ?? width} {...restProps} />
