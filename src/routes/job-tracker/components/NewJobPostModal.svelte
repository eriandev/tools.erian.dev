<script context="module">
  import { writable } from 'svelte/store'
  import { DEFAULT_NEW_CARD_INFO } from '../util/consts'

  const store = writable(DEFAULT_NEW_CARD_INFO)

  export function useNewJobPost() {
    /**
     * @param {import('../util/consts.js').ColumnHeadlines} title
     */
    const openNewJobPostModal = (title) => {
      store.set({ show: true, title })
    }

    const closeNewJobPostModal = () => {
      store.set({ show: false, title: 'wishlist' })
    }

    /**
     * @param {import('../util/consts.js').ColumnHeadlines} title
     * @param {Omit<import('../util/consts.js').JobPostInfo, 'id' | 'timestamp'>} info
     */
    const saveJobPost = (title, info) => {
      const { salary, location, jobTitle, jobPostUrl } = info

      if (!Boolean(jobTitle && location)) return

      const id = crypto.randomUUID()
      const timestamp = new Date().getTime()

      addNewJobTo(title, {
        id,
        salary,
        location,
        jobTitle,
        timestamp,
        jobPostUrl,
      })

      closeNewJobPostModal()
    }

    return { openNewJobPostModal, closeNewJobPostModal, saveJobPost }
  }
</script>

<script>
  import { onDestroy, onMount } from 'svelte'
  import { addNewJobTo } from '../util/store'

  import Input from './Input.svelte'
  import Button from './Button.svelte'
  import BaseModal from './BaseModal.svelte'

  let salary = ''
  let jobTitle = ''
  let location = ''
  let jobPostUrl = ''
  /** @type {import('svelte/store').Unsubscriber} */
  let unsubStore = () => {}

  const { closeNewJobPostModal, saveJobPost } = useNewJobPost()

  onMount(
    () =>
      (unsubStore = store.subscribe(({ show }) => {
        if (!show) {
          salary = ''
          jobTitle = ''
          location = ''
          jobPostUrl = ''
        }
      }))
  )
  onDestroy(() => unsubStore())
</script>

<BaseModal show={$store.show} on:close={closeNewJobPostModal}>
  <h4 class="text-xl capitalize text-jt-gray-400 md:text-2xl">new {$store.title} job</h4>

  <section class="grid gap-y-4 pb-14 pt-6 md:grid-cols-[repeat(2,minmax(auto,220px))] md:gap-x-5 md:gap-y-[18px]">
    <Input bind:value={jobTitle} icon="briefcase" label="Job Title" />
    <Input bind:value={location} icon="location" label="Location" />
    <Input bind:value={jobPostUrl} icon="link" label="URL" />
    <Input bind:value={salary} icon="paid" label="Salary" />
  </section>

  <section class="flex justify-end gap-x-4">
    <Button on:click={closeNewJobPostModal}>Cancel</Button>
    <Button
      primary
      disabled={!Boolean(jobTitle && location)}
      on:click={() => saveJobPost($store.title, { salary, location, jobTitle, jobPostUrl })}
    >
      Save
    </Button>
  </section>
</BaseModal>
