<script lang="ts">
  import Icon from '@/shared/components/Icon.svelte'
  import Link from '@/shared/components/Link.svelte'
  import type { EditableTextProps } from './types'

  let {
    label = '',
    errorMessage,
    type = 'text',
    large = false,
    editable = false,
    class: extraClass,
    value = $bindable(),
  }: EditableTextProps = $props()
</script>

<div>
  <div>
    <input
      type="text"
      bind:value
      readonly={!editable}
      class={[
        'w-full rounded bg-jat-secondary px-2 py-1 text-jat-gray-400',
        { hidden: !editable, 'text-xl md:text-2xl': large },
        extraClass,
      ]}
    />
    {#if errorMessage}
      <span class="text-xs text-red-400 block">{errorMessage}</span>
    {/if}
  </div>

  {#if !editable}
    {#if type === 'link' && value}
      <Link
        external
        to={value}
        title={value}
        class={[
          'flex w-max items-center gap-x-1 py-1 text-jat-blue underline',
          { 'text-xl md:text-2xl': large },
          extraClass,
        ]}
      >
        {label}
        <Icon name="jat/link" size={12} />
      </Link>
    {:else if type === 'text'}
      <span class={['block truncate py-1 text-jat-gray-400', extraClass, { 'text-xl md:text-2xl': large }]}>
        {value}
      </span>
    {/if}
  {/if}
</div>
