<script lang="ts">
  import Input from './Input.svelte'
  import Button from './Button.svelte'
  import Checkbox from './Checkbox.svelte'
  import BaseModal from './BaseModal.svelte'
  import { useBoard } from '@/stores/use-board'
  import { useModal } from '@/stores/use-modal'
  import { isValidURL } from 'shared/utils/validations'

  const { createJobPost } = useBoard()
  const { closeModal, modalInfo, showModal } = useModal()

  let salary = $state('')
  let meetUrl = $state('')
  let jobTitle = $state('')
  let location = $state('')
  let remote = $state(false)
  let jobPostUrl = $state('')
  let meetUrlErrorMessage = $state<string>()
  let locationErrorMessage = $state<string>()
  let jobTitleErrorMessage = $state<string>()
  let jobPostUrlErrorMessage = $state<string>()
  let visible = $derived($showModal && $modalInfo.action === 'create')

  function reset() {
    salary = ''
    meetUrl = ''
    jobTitle = ''
    location = ''
    remote = false
    jobPostUrl = ''
    resetErrorMessages()
  }

  function resetErrorMessages() {
    meetUrlErrorMessage = undefined
    locationErrorMessage = undefined
    jobTitleErrorMessage = undefined
    jobPostUrlErrorMessage = undefined
  }

  function onSave() {
    resetErrorMessages()
    if (!validInputs()) return

    const timeStamp = Date.now()
    const id = crypto.randomUUID()
    createJobPost($modalInfo.status, { id, jobTitle, location, timeStamp, jobPostUrl, meetUrl, remote, salary })
    closeModal()
  }

  function validInputs() {
    if (location.length === 0) {
      locationErrorMessage = 'Location is required'
      return false
    }

    if (jobTitle.length === 0) {
      jobTitleErrorMessage = 'Job Title is required'
      return false
    }

    if (!(jobPostUrl.length === 0) && !isValidURL(jobPostUrl)) {
      jobPostUrlErrorMessage = 'URL is not a valid url'
      return false
    }

    if (!(meetUrl.length === 0) && !isValidURL(meetUrl)) {
      meetUrlErrorMessage = 'Meet URL is not a valid url'
      return false
    }

    return true
  }

  $effect(() => {
    if (!visible) reset()
  })
</script>

<BaseModal show={visible}>
  <h3 class="text-xl capitalize text-jat-gray-400 md:text-2xl">new {$modalInfo.status} job</h3>

  <section class="grid gap-y-4 pb-14 pt-6 md:grid-cols-[repeat(2,minmax(auto,220px))] md:gap-x-5 md:gap-y-4.5">
    <Input
      label="Location"
      id="location-field"
      icon="location"
      bind:value={location}
      errorMessage={locationErrorMessage}
    />
    <Input
      label="Job Title"
      id="job-title-field"
      icon="briefcase"
      bind:value={jobTitle}
      errorMessage={jobTitleErrorMessage}
    />
    <Input id="url-field" bind:value={jobPostUrl} icon="link" label="URL" errorMessage={jobPostUrlErrorMessage} />
    <Input id="salary-field" type="decimal" bind:value={salary} icon="paid" label="Salary" />
    <Input
      icon="link"
      label="Meet URL"
      id="meet-url-field"
      bind:value={meetUrl}
      errorMessage={meetUrlErrorMessage}
    />
    <Checkbox id="remote-field" bind:checked={remote} icon="remote" label="Remote" />
  </section>

  <section class="flex justify-end gap-x-4">
    <Button variant="secondary" onclick={closeModal}>Cancel</Button>
    <Button variant="primary" onclick={onSave}>Save</Button>
  </section>
</BaseModal>
