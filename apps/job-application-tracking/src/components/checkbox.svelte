<script lang="ts">
  import Icon from 'shared/components/icon.svelte'
  import type { CheckboxProps } from './types'

  const peerClass =
    'peer-checked:bg-jat-primary peer-checked:before:-left-full peer-checked:after:left-0 peer-checked:active:after:left-[10%]'

  let { id, label = '', icon, disabled = false, checked = $bindable(), ...restProps }: CheckboxProps = $props()
</script>

<div class={['flex w-max flex-col gap-y-1.5 text-jat-gray-400', { 'opacity-70': disabled }]}>
  {#if label}
    <label for={id} class="flex items-center gap-x-1.5">
      {#if icon}
        <Icon name={icon} size={20} stroke="currentColor" />
      {/if}
      <span>{label}</span>
    </label>
  {/if}

  <div class={{ 'pl-6.5': label }}>
    <input {id} {...restProps} bind:checked type="checkbox" class="peer sr-only" {disabled} />
    <label for={id} data-on="YES" data-off="NO" class={['checkbox-label', peerClass]}></label>
  </div>
</div>
