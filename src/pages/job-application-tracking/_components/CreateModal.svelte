<script lang="ts">
  import Input from './Input.svelte'
  import Button from './Button.svelte'
  import Checkbox from './Checkbox.svelte'
  import BaseModal from './BaseModal.svelte'
  import { useBoard, useModal } from '../_utils/store'

  const { createJobPost } = useBoard()
  const { closeModal, modalInfo, showModal } = useModal()

  let salary = $state('')
  let meetUrl = $state('')
  let jobTitle = $state('')
  let location = $state('')
  let remote = $state(false)
  let jobPostUrl = $state('')
  let visible = $derived($showModal && $modalInfo.action === 'create')

  function reset() {
    salary = ''
    meetUrl = ''
    jobTitle = ''
    location = ''
    remote = false
    jobPostUrl = ''
  }

  function onSave() {
    const timeStamp = Date.now()
    const id = crypto.randomUUID()
    createJobPost($modalInfo.status, { id, jobTitle, location, timeStamp, jobPostUrl, meetUrl, remote, salary })
    closeModal()
  }

  $effect(() => {
    if (!visible) reset()
  })
</script>

<BaseModal show={visible}>
  <h3 class="text-xl capitalize text-jat-gray-400 md:text-2xl">new {$modalInfo.status} job</h3>

  <section class="grid gap-y-4 pb-14 pt-6 md:grid-cols-[repeat(2,minmax(auto,220px))] md:gap-x-5 md:gap-y-[18px]">
    <Input id="job-title-field" bind:value={jobTitle} icon="jat/briefcase" label="Job Title" />
    <Input id="location-field" bind:value={location} icon="jat/location" label="Location" />
    <Input id="url-field" bind:value={jobPostUrl} icon="jat/link" label="URL" />
    <Input id="salary-field" type="decimal" bind:value={salary} icon="jat/paid" label="Salary" />
    <Input id="meet-url-field" bind:value={meetUrl} icon="jat/paid" label="Meet URL" />
    <Checkbox id="remote-field" bind:checked={remote} icon="jat/remote" label="Remote" />
  </section>

  <section class="flex justify-end gap-x-4">
    <Button variant="secondary" onclick={closeModal}>Cancel</Button>
    <Button variant="primary" onclick={onSave}>Save</Button>
  </section>
</BaseModal>
