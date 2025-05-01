<!-- svelte-ignore slot_element_deprecated -->
<script lang="ts">
  import type { HTMLAttributes } from 'astro/types'

  interface Props extends HTMLAttributes<'input'> {
    label: string
    children?: HTMLElement
  }

  const id = crypto.randomUUID()
  let { label, value }: Props = $props()
</script>

<div class="flex flex-col gap-y-[6px] text-theme-gray-400">
  <label for={id} class="flex items-center gap-x-[6px]">
    <slot />
    <span>{label}</span>
  </label>
  <input bind:value {id} class="rounded bg-theme-secondary px-2 py-1" />
</div>
