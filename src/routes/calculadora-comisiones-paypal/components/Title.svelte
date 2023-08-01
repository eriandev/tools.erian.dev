<script>
  /** @type {'h1'|'h2'|'h3'} */
  export let tag = 'h1'
</script>

<svelte:element this={tag} class="inline-block text-4xl font-extrabold tracking-wide">
  <slot />
</svelte:element>
