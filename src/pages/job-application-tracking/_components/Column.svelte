<script>
  import { useNewJobPost } from './NewJobPostModal.svelte'

  import Icon from './Icon.svelte'
  import CardSkeleton from './CardSkeleton.svelte'

  /** @type {import('../util/consts').JobStep} */
  export let title
  /** @type {number} */
  export let count = 0
  /** @type {boolean} */
  export let loading = true

  const { openNewJobPostModal } = useNewJobPost()

  $: limitedCount = count > 99 ? 99 : count
</script>

<section class="min-w-[320px] max-w-xs pb-10">
  <header class="mb-2 flex flex-col gap-y-3">
    <div class="grid grid-cols-[fit-content(100%)_auto_fit-content(100%)] items-center gap-x-2">
      <Icon name={title} size={20} />
      <h2 class="text-xl capitalize">{title}</h2>
      {#if loading}
        <div class="h-5 w-5 animate-pulse rounded-full bg-slate-200" />
      {:else}
        <div class="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-medium text-jt-black">
          {limitedCount}
        </div>
      {/if}
    </div>
    <button
      class="w-full rounded-lg bg-jt-gray-100 py-2 text-center font-medium text-jt-gray-400 transition-transform duration-150 ease-in-out active:scale-95 disabled:opacity-50 disabled:active:scale-100"
      disabled={loading}
      on:click={() => (!loading ? openNewJobPostModal(title) : null)}
    >
      + Add Job
    </button>
  </header>

  {#if loading}
    <CardSkeleton />
  {:else}
    <slot />
  {/if}
</section>
