<script>
  import Icon from './Icon.svelte'

  /** @type {string=} */
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
</script>

<article
  {id}
  class="flex cursor-pointer flex-col gap-y-1 rounded-lg bg-white p-4 shadow-sm outline-none transition-shadow duration-200 ease-in-out hover:shadow-md"
>
  <h3 class="line-clamp-1 text-xl capitalize leading-none">{location}</h3>
  <p class="mb-2 line-clamp-2 overflow-hidden text-lg leading-none text-jt-gray-400">{jobTitle}</p>

  <div class="grid auto-cols-max grid-flow-col gap-x-2 text-jt-gray-300">
    {#if timestamp}
      <span class="max-w-max rounded-full bg-jt-secondary px-2 py-1 text-xs">12 months ago</span>
    {/if}

    <div class="grid auto-cols-min grid-flow-col items-center gap-x-2">
      {#if remote}
        <Icon name="remote" size={18} stroke="currentColor" />
      {/if}
      {#if salary}
        <Icon name="paid" />
      {/if}
      {#if jobPostUrl}
        <a target="_blank" rel="noopener noreferrer" href={jobPostUrl}>
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
