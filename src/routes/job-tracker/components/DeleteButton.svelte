<script>
  import { createEventDispatcher } from 'svelte'

  import Icon from './Icon.svelte'
  import Button from './Button.svelte'

  /** @type {boolean} */
  export let confirming = false

  const dispatch = createEventDispatcher()

  /**
   * @param {boolean} isConfirmed
   */
  function handleConfirmation(isConfirmed) {
    if (isConfirmed) {
      dispatch('delete', true)
      confirming = false
      return
    }

    confirming = false
  }
</script>

{#if confirming}
  <div class="flex gap-x-2">
    <Button tertiary on:click={() => handleConfirmation(true)}>
      <Icon name="check" size={24} />
    </Button>
    <Button secondary on:click={() => handleConfirmation(false)}>
      <Icon name="x" size={24} />
    </Button>
  </div>
{:else}
  <Button
    class="flex items-center gap-x-1 border-transparent font-medium text-jt-red"
    on:click={() => (confirming = true)}
  >
    <Icon name="trash" size={20} />
    <span>Delete</span>
  </Button>
{/if}
