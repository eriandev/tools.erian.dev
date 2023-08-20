<script>
  import { fade, fly } from 'svelte/transition'

  import Icon from './Icon.svelte'

  /** @type {boolean=} */
  export let show = false
  /** @type {number=} */
  export let y = 200
  /** @type {number=} */
  export let duration = 500
</script>

{#if show}
  <div
    transition:fade={{ duration }}
    class="fixed top-0 z-40 grid h-screen w-full place-items-center bg-[rgba(0,0,0,0.5)] px-4 text-white"
  >
    <section
      transition:fly={{ y, duration }}
      class="relative z-50 w-full max-w-sm rounded-lg bg-white p-5 md:max-w-[540px] md:px-10 md:py-8"
    >
      <Icon
        name="x"
        class="absolute right-5 top-5 cursor-pointer text-jt-gray-200"
        role="button"
        on:click={() => (show = false)}
      />
      <slot />
    </section>
  </div>
{/if}
