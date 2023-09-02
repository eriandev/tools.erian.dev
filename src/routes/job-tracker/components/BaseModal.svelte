<script context="module">
  /**
   * @typedef {object} BaseModalOptions
   *
   * @prop {boolean=} overlayClick
   * @prop {boolean=} escapeKeyPress
   */
</script>

<script>
  import { createEventDispatcher } from 'svelte'
  import { fade, fly } from 'svelte/transition'

  import Icon from './Icon.svelte'

  /** @type {boolean} */
  export let show = false
  /** @type {number=} */
  export let y = 200
  /** @type {number=} */
  export let duration = 400
  /** @type {BaseModalOptions} */
  export let options = {}

  const dispatch = createEventDispatcher()

  /**
   * @param {any} event
   * @param {boolean=} force
   */
  function closeHandler(event, force = false) {
    const { overlayClick = true, escapeKeyPress = true } = options
    const isEscPressed = escapeKeyPress ? event?.key === 'Escape' : false
    const isOverlayClicked = overlayClick ? event?.target?.id === 'overlay' : false

    if (isEscPressed || isOverlayClicked || force) {
      dispatch('close')
      show = false
    }
  }
</script>

<svelte:window on:keydown={closeHandler} />

{#if show}
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
      class="relative z-50 w-full max-w-xs rounded-lg bg-white p-5 sm:max-w-sm md:max-w-[540px] md:px-10 md:py-8"
    >
      <Icon
        name="x"
        size={36}
        role="button"
        class="absolute right-5 top-5 cursor-pointer text-jt-gray-200"
        on:click={() => closeHandler(null, true)}
      />
      <slot />
    </section>
  </div>
{/if}
