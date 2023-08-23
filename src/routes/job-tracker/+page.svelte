<script>
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import { flipDurationMs } from './util/consts'
  import { boardInfo, initBoardInfo, updateColumnCards } from './util/store'

  import Card from './components/Card.svelte'
  import Column from './components/Column.svelte'
  import NewJobPostModal from './components/NewJobPostModal.svelte'

  onMount(() => initBoardInfo())

  /**
   * @param {CustomEvent} event
   * @param {import('./util/consts').JobStep} headline
   */
  function handleDndConsiderCards({ detail }, headline) {
    updateColumnCards(headline, detail.items)
  }

  /**
   * @param {CustomEvent} event
   * @param {import('./util/consts').JobStep} headline
   */
  function handleDndFinalizeCards({ detail }, headline) {
    updateColumnCards(headline, detail.items)
  }
</script>

<h1 class="px-5 pb-5 pt-10 text-[2rem] md:px-8">Job Tracking</h1>

<main class="flex gap-x-8 overflow-x-auto px-5 md:px-8">
  {#each $boardInfo as { headline, items } (headline)}
    <Column title={headline} count={items.length}>
      <div
        class="flex min-h-[400px] flex-col gap-y-2"
        use:dndzone={{ items, flipDurationMs, dropTargetStyle: { outline: 'none' } }}
        on:consider={(/** @type {CustomEvent} */ event) => handleDndConsiderCards(event, headline)}
        on:finalize={(/** @type {CustomEvent} */ event) => handleDndFinalizeCards(event, headline)}
      >
        {#each items as { id, remote, location, jobTitle, timestamp, salary, jobPostUrl, meetUrl } (id)}
          <div animate:flip={{ duration: flipDurationMs }}>
            <Card {id} {remote} {location} {jobTitle} {timestamp} {salary} {jobPostUrl} {meetUrl} />
          </div>
        {/each}
      </div>
    </Column>
  {/each}
</main>

<NewJobPostModal />
