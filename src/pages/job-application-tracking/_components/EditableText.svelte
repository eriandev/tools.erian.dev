<script lang="ts">
  import Icon from '@/shared/components/Icon.svelte'
  import type { EditableTextProps } from './types'

  interface Props extends EditableTextProps {}

  let { type = 'text', editable = false, label = '', large = false, class: extraClass, value = $bindable() }: Props = $props()
</script>

<input
  type="text"
  bind:value
  readonly={!editable}
  class={['w-full rounded bg-jat-secondary px-2 py-1 text-jat-gray-400', extraClass, { 'hidden': !editable, 'text-xl md:text-2xl': large }]}
/>

{#if !editable}
  {#if type === 'link' && value}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={value}
      title={value}
      class={['flex w-max items-center gap-x-1 py-1 text-jat-blue underline', extraClass, { 'text-xl md:text-2xl': large }]}
    >
      {label}
      <Icon name="jat/link" size={12} />
    </a>
  {:else if type === 'text'}
    <span class={['block truncate py-1 text-jat-gray-400', extraClass, { 'text-xl md:text-2xl': large }]}>
      {value}
    </span>
  {/if}
{/if}
