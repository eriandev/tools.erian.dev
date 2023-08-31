<script>
  /** @type {boolean=} */
  export let primary = false
  /** @type {boolean=} */
  export let secondary = false
  /** @type {boolean=} */
  export let tertiary = false
  /** @type {boolean=} */
  export let disabled = false
  /** @type {string=} */
  export { extraClass as class }

  let extraClass = ''

  const tertiaryBtnClass = 'border-jt-red bg-jt-red'
  const ghostBtnClass = 'border-transparent bg-transparent'
  const disabledBtnClass = 'cursor-not-allowed opacity-70 active:scale-100'
  const primaryBtnClass = 'border-jt-primary bg-jt-primary font-medium text-white'
  const secondaryBtnClass = 'border-jt-gray-200 bg-transparent font-normal text-jt-black'
  const baseBtnClass = 'rounded border px-5 py-3 transition-transform duration-150 ease-in-out active:scale-95'
</script>

<button
  class="
    {baseBtnClass}
    {primary ? primaryBtnClass : ''}
    {secondary ? secondaryBtnClass : ''}
    {tertiary ? tertiaryBtnClass : ''}
    {disabled ? disabledBtnClass : ''}
    {!primary && !secondary && !tertiary ? ghostBtnClass : ''}
    {extraClass}
  "
  {disabled}
  {...$$restProps}
  on:click|preventDefault
>
  <slot />
</button>
