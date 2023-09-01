<script>
  import { createEventDispatcher } from 'svelte'

  import Icon from './Icon.svelte'
  import Button from './Button.svelte'

  /** @type {boolean} */
  export let confirming = false

  const dispatch = createEventDispatcher()

  /**
   * @param {boolean} value
   */
  function confirmHandler(value) {
    confirming = value
    dispatch('confirming', value)
  }

  function deleteHandler() {
    dispatch('delete', true)
    confirmHandler(false)
  }
</script>

{#if confirming}
  <div class="flex gap-x-2">
    <Button tertiary on:click={deleteHandler}>
      <Icon name="check" size={24} />
    </Button>
    <Button secondary on:click={() => confirmHandler(false)}>
      <Icon name="x" size={24} />
    </Button>
  </div>
{:else}
  <Button
    class="flex items-center gap-x-1 border-transparent font-medium text-jt-red"
    on:click={() => confirmHandler(true)}
  >
    <Icon name="trash" size={20} />
    <span class="hidden sm:block">Delete</span>
  </Button>
{/if}
