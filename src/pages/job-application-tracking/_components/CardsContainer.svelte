<script lang="ts">
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import Card from './Card.svelte'
  import { flipDurationMs } from '../_utils/consts'
  import { useBoard, useModal } from '../_utils/store'
  import type { JobApplicationInfo, JobApplicationStatus } from '../_utils/types'
  import type { CardsContainerProps } from './types'

  let items: JobApplicationInfo[] = $state([])
  const { status, children }: CardsContainerProps = $props()
  const { boardInfo, isLoading, updateColumnCards } = useBoard()
  const { openModal } = useModal()

  function handleDndConsiderCards({ detail }: CustomEvent, status: JobApplicationStatus) {
    updateColumnCards(status, detail.items)
  }

  function handleDndFinalizeCards({ detail }: CustomEvent, status: JobApplicationStatus) {
    updateColumnCards(status, detail.items)
  }

  $effect(() => {
    items = $boardInfo[status]
  })
</script>

{#if $isLoading}
  <div class="flex min-h-[400px] flex-col gap-y-2">
    {@render children?.()}
  </div>
{:else}
  <div
    use:dndzone={{ items, flipDurationMs, dropTargetStyle: { outline: 'none' } }}
    onconsider={(event) => handleDndConsiderCards(event, status)}
    onfinalize={(event) => handleDndFinalizeCards(event, status)}
    class="flex min-h-[400px] flex-col gap-y-2"
  >
    {#each $boardInfo[status] as jobApplication (jobApplication.id)}
      <button
        animate:flip={{ duration: flipDurationMs }}
        onclick={() => openModal({ action: 'edit', status, jobApplication })}
      >
        <Card {...jobApplication} showMeet={status === 'interview'} />
      </button>
    {/each}
  </div>
{/if}
