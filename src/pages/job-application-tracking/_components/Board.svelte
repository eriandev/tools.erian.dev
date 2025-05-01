<script>
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import { flipDurationMs } from '../_utils/consts.js'
  import { boardInfo, initBoardInfo, updateColumnCards } from '../_utils/store.js'

  import Card from './Card.svelte'
  import Column from './Column.svelte'
  import NewJobPostModal from './NewJobPostModal.svelte'
  import EditJobPostModal from './EditJobPostModal.svelte'

  let isLoadingInitialInfo = true

  onMount(async () => (isLoadingInitialInfo = !(await initBoardInfo())))

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

{#each $boardInfo as { headline, items }, index (headline)}
  <Column title={headline} count={items.length} loading={isLoadingInitialInfo}>
    <div
      class="flex min-h-[400px] flex-col gap-y-2"
      use:dndzone={{ items, flipDurationMs, dropTargetStyle: { outline: 'none' } }}
      on:consider={(/** @type {CustomEvent} */ event) => handleDndConsiderCards(event, headline)}
      on:finalize={(/** @type {CustomEvent} */ event) => handleDndFinalizeCards(event, headline)}
    >
      {#each items as { id, remote, location, jobTitle, timestamp, salary, jobPostUrl, meetUrl } (id)}
        <div animate:flip={{ duration: flipDurationMs }}>
          <Card
            {id}
            {remote}
            {location}
            {jobTitle}
            {timestamp}
            {salary}
            {jobPostUrl}
            {meetUrl}
            showMeet={index === 2}
          />
        </div>
      {/each}
    </div>
  </Column>
{/each}

<NewJobPostModal />
<EditJobPostModal />
