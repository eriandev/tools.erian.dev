<script lang="ts">
  import type { SvelteLinkProps } from './types'

  const {
    to,
    external = false,
    preventDefault = false,
    stopPropagation = false,
    children,
    onclick,
    ...restProps
  }: SvelteLinkProps = $props()
  const rel = external ? 'noopener noreferrer' : null
  const target = external ? '_blank' : null

  function clickHanlder(event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) {
    if (preventDefault) event.preventDefault()
    if (stopPropagation) event.stopPropagation()
    onclick?.(event)
  }
</script>

<a {rel} {target} href={to} {...restProps} onclick={clickHanlder}>
  {@render children?.()}
</a>
