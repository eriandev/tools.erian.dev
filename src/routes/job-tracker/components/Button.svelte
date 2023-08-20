<script>
  /** @type {boolean=} */
  export let primary = false

  const primaryClass = 'border-jt-primary bg-jt-primary font-semibold text-white'
  const secondaryClass = 'border-jt-gray-200 bg-transparent font-normal text-jt-black'
  const baseClass = 'rounded border px-5 py-3 transition-transform duration-150 ease-in-out active:scale-95'
</script>

<button class="{baseClass} {primary ? primaryClass : secondaryClass}" {...$$restProps} on:click|preventDefault>
  <slot />
</button>
