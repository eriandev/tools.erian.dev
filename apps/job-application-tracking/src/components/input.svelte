<script lang="ts">
  import Icon from 'shared/components/icon.svelte'
  import type { InputProps } from './types'

  let { id, icon, label, errorMessage, type = 'text', value = $bindable() }: InputProps = $props()

  function handleInput(event: Event) {
    if (type !== 'decimal') return

    const input = event.target as HTMLInputElement
    let val = input.value

    val = val.replace(/[^0-9.]/g, '')

    if (val.startsWith('.')) val = '0' + val
    if (val.length > 1 && val.startsWith('0') && val[1] !== '.') val = val.slice(1)

    let [int, ...rest] = val.split('.')
    int = int.slice(0, 10)

    if (rest.length) {
      const decimals = rest.join('').slice(0, 2)
      value = `${int}.${decimals}`
      return
    }

    value = int
  }
</script>

<div class="flex flex-col gap-y-1.5 text-jat-gray-400">
  <label for={id} class="flex items-center gap-x-1.5">
    <Icon name={icon} size={16} />
    <span>{label}</span>
  </label>
  <input {id} bind:value inputmode={type} class="rounded bg-jat-secondary px-2 py-1" oninput={handleInput} />
  {#if errorMessage}
    <span class="text-xs text-red-400">{errorMessage}</span>
  {/if}
</div>
