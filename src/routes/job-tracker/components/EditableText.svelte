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
  /** @type {boolean} */
  export let large = false

  const dispatch = createEventDispatcher()
</script>

<input
  type="text"
  bind:value
  readonly={!editable}
  class="w-full rounded bg-jt-secondary px-2 py-1 text-jt-gray-400
    {editable ? '' : ' hidden'}
    {large ? ' text-xl md:text-2xl' : ''}"
  on:input={() => dispatch('value', value)}
/>

{#if !editable}
  {#if type === 'link' && value}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={value}
      class="w-max py-1 text-jt-gray-400 {large ? ' text-xl md:text-2xl' : ''}"
    >
      {label}
    </a>
  {:else if type !== 'link'}
    <span class="block truncate py-1 text-jt-gray-400 {large ? ' text-xl md:text-2xl' : ''}">
      {value}
    </span>
  {/if}
{/if}
