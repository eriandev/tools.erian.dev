<script lang="ts">
  import Popover from './Popover.svelte'
  import Icon from '@/shared/components/Icon.svelte'
  import { getTimeAgo, getFormattedDate } from '@/shared/utils/time'
  import type { CardProps } from './types'

  const {
    id,
    salary,
    meetUrl,
    jobTitle,
    location,
    timeStamp,
    jobPostUrl,
    remote = false,
    showMeet = false,
  }: CardProps = $props()
</script>

<article
  {id}
  class="flex text-left cursor-pointer flex-col gap-y-1 rounded-lg bg-white p-4 shadow-sm transition-shadow duration-200 ease-in-out outline-none hover:shadow-md"
>
  <h3 class="line-clamp-1 text-xl leading-[1.25] capitalize">{location}</h3>
  <p class="text-jat-gray-400 mb-2 line-clamp-2 overflow-hidden text-lg leading-[1.2]">{jobTitle}</p>

  <footer class="text-jat-gray-300 flex justify-between">
    <div class="grid auto-cols-max grid-flow-col gap-x-2">
      <span title={getFormattedDate(timeStamp)} class="bg-jat-secondary max-w-max rounded-full px-2 py-1 text-xs">
        {getTimeAgo(timeStamp)}
      </span>

      <div class="grid auto-cols-min grid-flow-col items-center gap-x-2">
        {#if remote}
          <Popover label="Remote available!">
            <Icon name="jat/remote" size={20} />
          </Popover>
        {/if}
        {#if salary}
          <Popover label={salary}>
            <Icon name="jat/paid" size={16} />
          </Popover>
        {/if}
        {#if jobPostUrl}
          <a target="_blank" rel="noopener noreferrer" href={jobPostUrl}>
            <Popover label="Go to the post">
              <Icon name="jat/link" size={16} />
            </Popover>
          </a>
        {/if}
      </div>
    </div>

    {#if meetUrl && showMeet}
      <a target="_blank" rel="noopener noreferrer" title={meetUrl} href={meetUrl}>
        <span class="text-jat-gray-300 text-sm underline">Go to meeting</span>
      </a>
    {/if}
  </footer>
</article>
