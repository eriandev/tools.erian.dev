<script>
  import Applied from '../icons/Applied.svelte'
  import Wishlist from '../icons/Wishlist.svelte'
  import Interview from '../icons/Interview.svelte'

  /** @type {'applied'|'wishlist'|'interview'} */
  export let name
  /** @type {number} */
  export let size = 20

  const icons = {
    applied: Applied,
    wishlist: Wishlist,
    interview: Interview,
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  {name}
  width={size}
  height={size}
  fill="none"
  {...$$restProps}
>
  <svelte:component this={icons[name]} />
</svg>
