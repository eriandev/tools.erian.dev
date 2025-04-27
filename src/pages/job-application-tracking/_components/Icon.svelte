<script context="module">
  /**
   * @typedef IconNames
   * @type {'applied'|'briefcase'|'check'|'interview'|'link'|'location'|'paid'|'remote'|'trash'|'wishlist'|'x'}
   */
</script>

<script>
  import x from '../icons/X.svelte'
  import link from '../icons/Link.svelte'
  import paid from '../icons/Paid.svelte'
  import trash from '../icons/Trash.svelte'
  import check from '../icons/Check.svelte'
  import remote from '../icons/Remote.svelte'
  import applied from '../icons/Applied.svelte'
  import wishlist from '../icons/Wishlist.svelte'
  import location from '../icons/Location.svelte'
  import interview from '../icons/Interview.svelte'
  import briefcase from '../icons/Briefcase.svelte'

  /** @type {IconNames} */
  export let name
  /** @type {number} */
  export let size = 16

  const icons = {
    x,
    link,
    paid,
    check,
    trash,
    remote,
    applied,
    wishlist,
    location,
    briefcase,
    interview,
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  {name}
  fill="none"
  width={size}
  height={size}
  {...$$restProps}
  on:click
>
  <svelte:component this={icons[name]} />
</svg>
