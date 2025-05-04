<script lang="ts">
  import Icon from '@/shared/components/Icon.svelte'
  import type { InputProps } from './types'

  interface Props extends InputProps {}

  let { id, icon, label, value = $bindable() }: Props = $props()
</script>

<div class="flex flex-col gap-y-[6px] text-jat-gray-400">
  <label for={id} class="flex items-center gap-x-[6px]">
    <Icon name={icon} size={16} />
    <span>{label}</span>
  </label>
  <input bind:value {id} class="rounded bg-jat-secondary px-2 py-1" />
</div>
