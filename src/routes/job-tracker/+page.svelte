<script>
  import { get } from 'svelte/store'
  import { dndzone } from 'svelte-dnd-action'

  import { boardInfo } from './util/store'
  import { flipDurationMs } from './util/consts'

  import Card from './components/Card.svelte'
  import Column from './components/Column.svelte'

  /**
   * @param {CustomEvent} event
   * @param {import('./util/consts').ColumnHeadlines} columnName
   */
  function handleDndConsiderCards({ detail }, columnName) {
    const newBoardInfo = get(boardInfo)
    const colId = newBoardInfo.findIndex(({ id }) => id === columnName)
    newBoardInfo[colId].items = detail.items
    boardInfo.set(newBoardInfo)
  }

  /**
   * @param {CustomEvent} event
   * @param {import('./util/consts').ColumnHeadlines} columnName
   */
  function handleDndFinalizeCards({ detail }, columnName) {
    const newBoardInfo = get(boardInfo)
    const colId = newBoardInfo.findIndex(({ id }) => id === columnName)
    newBoardInfo[colId].items = detail.items
    boardInfo.set(newBoardInfo)
  }
</script>

<h1 class="px-5 pb-5 pt-10 text-[2rem]">Job Tracking</h1>

<main class="flex gap-x-8 overflow-x-auto px-5 md:px-8">
  {#each $boardInfo as column (column.id)}
    <Column title={column.id}>
      <div
        class="flex min-h-[400px] flex-col gap-y-2"
        use:dndzone={{ items: column.items, flipDurationMs }}
        on:consider={(/** @type {CustomEvent} */ event) => handleDndConsiderCards(event, column.id)}
        on:finalize={(/** @type {CustomEvent} */ event) => handleDndFinalizeCards(event, column.id)}
      >
        {#each column.items as { id, remote, place, position, timestamp, jobPostUrl, meetUrl, salary } (id)}
          <Card {remote} {place} {position} {timestamp} {salary} {jobPostUrl} {meetUrl} />
        {/each}
      </div>
    </Column>
  {/each}
</main>
