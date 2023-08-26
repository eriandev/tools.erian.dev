<script>
  import { createEventDispatcher } from 'svelte'

  /** @type {string=} */
  export let value = ''
  /** @type {'text'|'link'} */
  export let type = 'text'
  /** @type {string=} */
  export let label = ''
  /** @type {boolean} */
  export let editable = false
  /** @type {string=} */
  export let extraClass = ''

  const dispatch = createEventDispatcher()
</script>

<input
  type="text"
  bind:value
  on:input={() => dispatch('value', value)}
  class="w-full rounded bg-jt-sky-blue px-2 py-1 text-jt-gray-400{editable ? '' : ' hidden'}"
  readonly={!editable}
/>

{#if !editable}
  {#if type === 'link' && value}
    <a target="_blank" rel="noopener noreferrer" href={value} class="w-max px-2 py-1 text-jt-gray-400">{label}</a>
  {:else if type !== 'link'}
    <span class="max-w-[336px] truncate px-2 py-1 text-jt-gray-400 {extraClass}">{value}</span>
  {/if}
{/if}
