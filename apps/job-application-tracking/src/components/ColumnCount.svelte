<script lang="ts">
  import { useBoard } from '@/stores/use-board'
  import type { ColumnCountProps } from './types'

  const { status, children }: ColumnCountProps = $props()
  const { boardCount, isLoading } = useBoard()
  let count = $derived($boardCount[status])
</script>

{#if $isLoading}
  {@render children?.()}
{:else}
  <div class="text-jat-black grid size-5 place-items-center rounded-full bg-white text-xs font-medium">
    {count}
  </div>
{/if}
