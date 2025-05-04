<script lang="ts">
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import Card from './Card.svelte'
  import { flipDurationMs } from '../_utils/consts'
  import { useBoard, useModal } from '../_utils/store'
  import type { CardsContainerProps } from './types'

  const { openModal } = useModal()
  const { status, children }: CardsContainerProps = $props()
  const { boardInfo, isLoading, updateColumnCards } = useBoard()
  let items = $derived($boardInfo[status])
</script>

{#if $isLoading}
  <div class="flex min-h-[400px] flex-col gap-y-2">
    {@render children?.()}
  </div>
{:else}
  <div
    use:dndzone={{ items, flipDurationMs, dropTargetStyle: { outline: 'none' } }}
    onconsider={({ detail }) => updateColumnCards(status, detail.items)}
    onfinalize={({ detail }) => updateColumnCards(status, detail.items, { persist: true })}
    class="flex min-h-[400px] flex-col gap-y-2"
  >
    {#each items as jobApplication (jobApplication.id)}
      <button
        animate:flip={{ duration: flipDurationMs }}
        onclick={() => openModal({ action: 'edit', status, jobApplication })}
      >
        <Card {...jobApplication} showMeet={status === 'interview'} />
      </button>
    {/each}
  </div>
{/if}
