<script lang="ts">
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import Card from './Card.svelte'
  import { useBoard } from '../_utils/store'
  import { flipDurationMs } from '../_utils/consts'
  import type { JobApplicationInfo, JobApplicationStatus } from '../_utils/types'
  import type { CardsContainer } from './types'

  interface Props extends CardsContainer {}

  let items: JobApplicationInfo[] = $state([])
  const { status, children }: Props = $props()
  const { boardInfo, isLoading, updateColumnCards } = useBoard()

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
    {#each $boardInfo[status] as item (item.id)}
      <article animate:flip={{ duration: flipDurationMs }}>
        <Card {...item} showMeet={status === 'interview'} />
      </article>
    {/each}
  </div>
{/if}
