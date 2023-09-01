<script>
  import Icon from './Icon.svelte'

  /** @type {string=} */
  export let label = ''
  /** @type {import('./Icon.svelte').IconNames=} */
  export let icon = undefined
  /** @type {string} */
  export let value

  const id = crypto.randomUUID()
</script>

<div class="flex flex-col gap-y-[6px] text-jt-gray-400">
  <label for={id} class="flex items-center gap-x-[6px]">
    {#if icon}
      <Icon name={icon} />
    {/if}
    <span>{label}</span>
  </label>
  <input bind:value {id} class="bg-jt-secondary px-4 py-2" />
</div>
