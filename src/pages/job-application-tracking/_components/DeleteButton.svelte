<script lang="ts">
  import Button from './Button.svelte'
  import Icon from 'shared/components/Icon.svelte'
  import type { DeleteButtonProps } from './types'

  let confirming = $state(false)
  let { onConfirm, onDelete }: DeleteButtonProps = $props()

  function confirmHandler(value: boolean) {
    confirming = value
    onConfirm(value)
  }

  function deleteHandler() {
    confirmHandler(false)
    onDelete()
  }
</script>

{#if confirming}
  <div class="flex gap-x-2">
    <Button variant="tertiary" onclick={deleteHandler}>
      <Icon name="jat/check" size={24} />
    </Button>
    <Button variant="secondary" onclick={() => confirmHandler(false)}>
      <Icon name="jat/x" size={24} />
    </Button>
  </div>
{:else}
  <Button
    class="text-jat-red flex items-center gap-x-1 border-transparent font-medium"
    onclick={() => confirmHandler(true)}
  >
    <Icon name="jat/trash" size={20} />
    <span class="hidden sm:block">Delete</span>
  </Button>
{/if}
