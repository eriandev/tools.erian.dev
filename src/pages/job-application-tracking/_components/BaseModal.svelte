<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  import { useModal } from '../_utils/store'
  import Icon from 'shared/components/Icon.svelte'
  import type { BaseModalProps } from './types'

  const { closeModal } = useModal()
  let modal = $state<HTMLElement | null>(null)
  const { show, duration = 400, y = 200, options = {}, children }: BaseModalProps = $props()

  function closeMouseHandler(event: MouseEvent) {
    const { overlayClick = false } = options
    const isOverlayClicked = overlayClick ? (event?.target as HTMLDivElement)?.id === 'overlay' : false
    if (isOverlayClicked) closeModal()
  }

  function closeKeyboardHandler(event: KeyboardEvent) {
    const { escapeKeyPress = true } = options
    const isEscPressed = escapeKeyPress ? event?.key === 'Escape' : false
    if (isEscPressed) closeModal()
  }

  $effect(() => {
    if (show) modal?.focus()
  })
</script>

{#if show}
  <div
    id="overlay"
    tabindex="0"
    role="button"
    transition:fade={{ duration }}
    class="fixed top-0 z-40 grid h-screen w-full place-items-center bg-black/50 px-4 text-white"
    onkeydown={closeKeyboardHandler}
    onclick={closeMouseHandler}
  >
    <section
      id="modal"
      tabindex="-1"
      bind:this={modal}
      transition:fly={{ y, duration }}
      class="relative z-50 max-h-[95dvh] w-full max-w-xs overflow-y-auto rounded-lg bg-white p-5 sm:max-w-sm md:max-w-135 md:px-10 md:py-8"
    >
      <button
        aria-label="Close modal"
        class="absolute right-5 top-5 cursor-pointer text-jat-gray-200 size-10 lg:top-6"
        onclick={closeModal}
      >
        <Icon name="jat/x" size={40} class="relative" />
      </button>
      {@render children?.()}
    </section>
  </div>
{/if}
