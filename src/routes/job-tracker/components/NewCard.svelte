<script>
  import { get } from 'svelte/store'

  import { addNewJobTo, closeModal, modalInfo } from '../util/store'

  import Modal from './Modal.svelte'
  import Input from './Input.svelte'
  import Button from './Button.svelte'

  let salary = ''
  let jobTitle = ''
  let location = ''
  let jobPostUrl = ''
  let saveDisabled = true

  function saveCard() {
    if (saveDisabled) return

    const id = crypto.randomUUID()
    const title = get(modalInfo).title
    const timestamp = new Date().getTime()

    addNewJobTo(title, {
      id,
      salary,
      location,
      jobTitle,
      timestamp,
      jobPostUrl,
    })

    closeModal()
  }

  $: saveDisabled = !Boolean(jobTitle && location)
</script>

<Modal>
  <h4 class="text-xl capitalize text-jt-gray-400 md:text-2xl">new {$modalInfo.title} job</h4>

  <div class="grid gap-y-4 pb-14 pt-6 md:grid-cols-[repeat(2,minmax(auto,220px))] md:gap-x-5 md:gap-y-[18px]">
    <Input bind:value={jobTitle} icon="briefcase" label="Job Title" />
    <Input bind:value={location} icon="location" label="Location" />
    <Input bind:value={jobPostUrl} icon="link" label="URL" />
    <Input bind:value={salary} icon="paid" label="Salary" />
  </div>

  <div class="flex justify-end gap-x-4">
    <Button on:click={closeModal}>Cancel</Button>
    <Button primary on:click={saveCard} disabled={saveDisabled}>Save</Button>
  </div>
</Modal>
