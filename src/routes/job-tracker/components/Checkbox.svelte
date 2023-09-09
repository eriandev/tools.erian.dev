<script>
  import Icon from './Icon.svelte'

  /** @type {string=} */
  export let label = ''
  /** @type {import('./Icon.svelte').IconNames=} */
  export let icon = undefined
  /** @type {boolean} */
  export let disabled = false
  /** @type {boolean} */
  export let checked

  const id = crypto.randomUUID()

  const beforeClass =
    'before:absolute before:left-0 before:block before:h-full before:w-full before:text-center before:font-bold before:leading-8 before:text-white before:transition-[left,right,background-color] before:duration-200 before:ease-in-out before:content-[attr(data-off)] before:[text-shadow:0_1px_0_rgba(0,0,0,0.4)]'
  const labelClass =
    'relative block w-10 cursor-pointer select-none overflow-hidden rounded bg-jt-gray-200 pb-8 outline-0 transition-[left,right,background-color] duration-200 ease-in-out [-webkit-backface-visibility:hidden] [backface-visibility:hidden]'
  const afterClass =
    'after:absolute after:left-full after:block after:h-full after:w-full after:text-center after:font-bold after:leading-8 after:text-white after:transition-[left,right,background-color] after:duration-200 after:ease-in-out after:content-[attr(data-on)] after:[text-shadow:0_1px_0_rgba(0,0,0,0.4)]'
  const peerClass =
    'peer-checked:bg-jt-primary peer-checked:before:-left-full peer-checked:after:left-0 peer-checked:active:after:left-[10%]'
</script>

<div class="flex w-max flex-col gap-y-1 text-jt-gray-400{disabled ? ' opacity-70' : ''}">
  {#if label}
    <label for={id} class="flex items-center gap-x-[6px]">
      {#if icon}
        <Icon name={icon} size={20} stroke="currentColor" />
      {/if}
      <span>{label}</span>
    </label>
  {/if}

  <div class={label ? 'pl-[26px]' : ''}>
    <input {id} type="checkbox" bind:checked class="peer sr-only" {disabled} />
    <label for={id} data-on="YES" data-off="NO" class="{beforeClass} {labelClass} {afterClass} {peerClass}" />
  </div>
</div>
