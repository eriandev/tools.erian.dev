<script>
  /** @type {string|number|null} */
  export let value = null
  /** @type {string|null} */
  export let label = null
  /** @type {string} */
  export { extraClass as class }

  const id = crypto.randomUUID()
  const inputClass =
    'block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'

  let extraClass = ''
</script>

{#if label}
  <label for={id} class="text-right">{label}</label>
  <div class="flex items-center gap-1.5">
    <input {id} bind:value class="{inputClass} {extraClass}" {...$$restProps} />
    <span>USDs</span>
  </div>
{:else}
  <input {id} bind:value class="{inputClass} {extraClass}" {...$$restProps} />
{/if}
