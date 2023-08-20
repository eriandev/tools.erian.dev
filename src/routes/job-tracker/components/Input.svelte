<script>
  import Icon from './Icon.svelte'

  /** @type {'text'|'number'=} */
  export let type = 'text'
  /** @type {string=} */
  export let label = ''
  /** @type {import('./Icon.svelte').IconNames=} */
  export let icon = undefined

  const id = crypto.randomUUID()
</script>

<div class="flex flex-col gap-y-[6px] text-jt-gray-400">
  <label for={id} class="flex items-center gap-x-[6px]">
    {#if icon}
      <Icon name={icon} size={14} />
    {/if}
    <span>{label}</span>
  </label>
  <input {id} {type} class="bg-jt-sky-blue px-4 py-2" />
</div>
