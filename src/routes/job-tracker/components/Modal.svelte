<script>
  import { fade, fly } from 'svelte/transition'

  import { closeModal, modalInfo } from '../util/store'

  import Icon from './Icon.svelte'

  /** @type {number=} */
  export let y = 200
  /** @type {number=} */
  export let duration = 400

  /**
   * @param {any} event
   */
  function closeHandler(event) {
    if (event.target?.id === 'overlay') closeModal()
  }
</script>

{#if $modalInfo.isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    id="overlay"
    transition:fade={{ duration }}
    class="fixed top-0 z-40 grid h-screen w-full place-items-center bg-[rgba(0,0,0,0.5)] px-4 text-white"
    on:click={closeHandler}
  >
    <section
      transition:fly={{ y, duration }}
      class="relative z-50 w-full max-w-sm rounded-lg bg-white p-5 md:max-w-[540px] md:px-10 md:py-8"
    >
      <Icon
        name="x"
        role="button"
        class="absolute right-5 top-5 cursor-pointer text-jt-gray-200"
        on:click={closeModal}
      />
      <slot />
    </section>
  </div>
{/if}
