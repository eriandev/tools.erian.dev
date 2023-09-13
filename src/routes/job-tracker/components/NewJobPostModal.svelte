<script context="module">
  import { writable } from 'svelte/store'
  import { createNewJobPost } from '../util/store'
  import { DEFAULT_NEW_CARD_INFO } from '../util/consts'

  const state = writable(DEFAULT_NEW_CARD_INFO)

  export function useNewJobPost() {
    /**
     * @param {import('../util/consts.js').JobStep} step
     */
    const openNewJobPostModal = (step) => {
      state.set({ show: true, step })
    }

    const closeNewJobPostModal = () => {
      state.set({ show: false, step: 'wishlist' })
    }

    /**
     * @param {import('../util/consts.js').JobStep} step
     * @param {Omit<import('../util/consts.js').JobPostInfo, 'id' | 'timestamp'>} info
     */
    const addNewCardTo = (step, info) => {
      const { salary, location, jobTitle, jobPostUrl, remote, meetUrl } = info

      if (!Boolean(jobTitle && location)) return

      const id = crypto.randomUUID()
      const timestamp = new Date().getTime()

      createNewJobPost(step, {
        id,
        salary,
        remote,
        meetUrl,
        location,
        jobTitle,
        timestamp,
        jobPostUrl,
      })

      closeNewJobPostModal()
    }

    return { openNewJobPostModal, closeNewJobPostModal, addNewCardTo }
  }
</script>

<script>
  import { onDestroy, onMount } from 'svelte'

  import Input from './Input.svelte'
  import Button from './Button.svelte'
  import Checkbox from './Checkbox.svelte'
  import BaseModal from './BaseModal.svelte'

  let salary = ''
  let meetUrl = ''
  let jobTitle = ''
  let location = ''
  let remote = false
  let jobPostUrl = ''
  /** @type {import('svelte/store').Unsubscriber} */
  let unsubStore = () => {}

  const { closeNewJobPostModal, addNewCardTo } = useNewJobPost()

  onMount(
    () =>
      (unsubStore = state.subscribe(({ show }) => {
        if (!show) {
          salary = ''
          jobTitle = ''
          location = ''
          remote = false
          jobPostUrl = ''
        }
      })),
  )
  onDestroy(() => unsubStore())
</script>

<BaseModal show={$state.show} on:close={closeNewJobPostModal}>
  <h4 class="text-xl capitalize text-jt-gray-400 md:text-2xl">new {$state.step} job</h4>

  <section class="grid gap-y-4 pb-14 pt-6 md:grid-cols-[repeat(2,minmax(auto,220px))] md:gap-x-5 md:gap-y-[18px]">
    <Input bind:value={jobTitle} icon="briefcase" label="Job Title" />
    <Input bind:value={location} icon="location" label="Location" />
    <Input bind:value={jobPostUrl} icon="link" label="URL" />
    <Input bind:value={salary} icon="paid" label="Salary" />
    <Input bind:value={meetUrl} icon="paid" label="Meet URL" />
    <Checkbox bind:checked={remote} icon="remote" label="Remote" />
  </section>

  <section class="flex justify-end gap-x-4">
    <Button secondary on:click={closeNewJobPostModal}>Cancel</Button>
    <Button
      primary
      disabled={!Boolean(jobTitle && location)}
      on:click={() => addNewCardTo($state.step, { salary, location, jobTitle, jobPostUrl, remote })}
    >
      Save
    </Button>
  </section>
</BaseModal>
