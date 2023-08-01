<script>
  /** @type {string} */
  export { extraClass as class }

  let extraClass = ''
</script>

<article
  class="mx-auto block max-w-xs rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 {extraClass}"
>
  <slot />
</article>
