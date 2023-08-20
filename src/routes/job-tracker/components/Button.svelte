<script>
  /** @type {boolean=} */
  export let primary = false
  /** @type {boolean=} */
  export let disabled = false

  const primaryClass = 'border-jt-primary bg-jt-primary font-semibold text-white'
  const secondaryClass = 'border-jt-gray-200 bg-transparent font-normal text-jt-black'
  const baseClass = 'rounded border px-5 py-3 transition-transform duration-150 ease-in-out active:scale-95'
  const disabledClass = 'cursor-not-allowed opacity-70 active:scale-100'
</script>

<button
  class="{baseClass} {primary ? primaryClass : secondaryClass} {disabled ? disabledClass : ''}"
  {disabled}
  {...$$restProps}
  on:click|preventDefault
>
  <slot />
</button>
