<script>
  /** @type {'h2'|'h3'|'h4'|'h5'|'h6'} */
  export let tag = 'h3'
</script>

<svelte:element this={tag} class="text-center text-2xl font-bold tracking-tight">
  <slot />
</svelte:element>
