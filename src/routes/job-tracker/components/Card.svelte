<script>
  import { useEditJobPost } from './EditJobPostModal.svelte'

  import { getTimeAgo, getFormattedDate } from '$lib'
  import Icon from './Icon.svelte'

  /** @type {string} */
  export let id
  /** @type {string} */
  export let location
  /** @type {string} */
  export let jobTitle
  /** @type {number} */
  export let timestamp
  /** @type {string=} */
  export let salary
  /** @type {string=} */
  export let jobPostUrl
  /** @type {boolean=} */
  export let remote = false
  /** @type {string=} */
  export let meetUrl = undefined

  const { openEditJobPostModal } = useEditJobPost()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
  {id}
  class="flex cursor-pointer flex-col gap-y-1 rounded-lg bg-white p-4 shadow-sm outline-none transition-shadow duration-200 ease-in-out hover:shadow-md"
  on:click={() => openEditJobPostModal(id)}
>
  <h3 class="line-clamp-1 text-xl capitalize leading-[1.25]">{location}</h3>
  <p class="mb-2 line-clamp-2 overflow-hidden text-lg leading-[1.2] text-jt-gray-400">{jobTitle}</p>

  <div class="grid auto-cols-max grid-flow-col gap-x-2 text-jt-gray-300">
    {#if timestamp}
      <span title={getFormattedDate(timestamp)} class="max-w-max rounded-full bg-jt-secondary px-2 py-1 text-xs">
        {getTimeAgo(timestamp)}
      </span>
    {/if}

    <div class="grid auto-cols-min grid-flow-col items-center gap-x-2">
      {#if remote}
        <Icon name="remote" size={20} stroke="currentColor" />
      {/if}
      {#if salary}
        <Icon name="paid" />
      {/if}
      {#if jobPostUrl}
        <a target="_blank" rel="noopener noreferrer" title={jobPostUrl} href={jobPostUrl}>
          <Icon name="link" />
        </a>
      {/if}
    </div>

    {#if meetUrl}
      <a target="_blank" rel="noopener noreferrer" href={meetUrl}>
        <span class="text-sm text-jt-gray-300 underline">Go to meeting</span>
      </a>
    {/if}
  </div>
</article>
