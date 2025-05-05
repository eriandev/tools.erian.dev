<script lang="ts">
  import { fade, fly, type TransitionConfig } from 'svelte/transition'
  import type { PopoverProps } from './types'

  let visible = $state(false)
  const { label, duration = 150, y = 10, children }: PopoverProps = $props()

  function fadeFly(node: Element, { duration = 150, y = 10 } = {}): TransitionConfig {
    const fadeT = fade(node, { duration });
    const flyT = fly(node, { y, duration });

    return {
      delay: Math.max(fadeT.delay ?? 0, flyT.delay ?? 0),
      duration: Math.max(fadeT.duration ?? 150, flyT.duration ?? 150),
      css: (t, u) => {
        return `${fadeT.css?.(t, u) ?? ''}; ${flyT.css?.(t, u) ?? ''}`;
      }
    };
  }
</script>

<div
  role="button"
  tabindex="0"
  class="popover-container relative"
  onmouseenter={() => visible = true}
  onmouseleave={() => visible = false}
>
  {#if visible}
    <div
      transition:fadeFly={{ y, duration }}
      class="popover bg-jat-popover absolute -top-7 left-1/2 z-10 w-max -translate-x-1/2 rounded-lg px-2 py-0.5 text-sm font-medium text-white">
      {label}
    </div>
  {/if}
  {@render children()}
</div>
