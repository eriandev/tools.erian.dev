<script lang="ts">
  import Button from './Button.svelte'
  import Checkbox from './Checkbox.svelte'
  import BaseModal from './BaseModal.svelte'
  import EditableText from './EditableText.svelte'
  import DeleteButton from './DeleteButton.svelte'
  import Icon from 'shared/components/Icon.svelte'
  import { useBoard, useModal } from '../_utils/store'
  import { isValidURL } from 'shared/utils/validations'

  const { deleteJobPost, updateCardInfo } = useBoard()
  const { modalInfo, showModal, closeModal } = useModal()

  let editing = $state(false)
  let deleting = $state(false)
  let meetUrlErrorMessage = $state<string>()
  let jobTitleErrorMessage = $state<string>()
  let locationErrorMessage = $state<string>()
  let jobPostUrlErrorMessage = $state<string>()
  let id = $derived($modalInfo?.jobApplication?.id ?? '')
  let salary = $derived($modalInfo?.jobApplication?.salary ?? '')
  let meetUrl = $derived($modalInfo?.jobApplication?.meetUrl ?? '')
  let remote = $derived($modalInfo?.jobApplication?.remote ?? false)
  let jobTitle = $derived($modalInfo?.jobApplication?.jobTitle ?? '')
  let location = $derived($modalInfo?.jobApplication?.location ?? '')
  let jobPostUrl = $derived($modalInfo?.jobApplication?.jobPostUrl ?? '')
  let visible = $derived($showModal && $modalInfo.action === 'edit')

  function clear() {
    salary = ''
    meetUrl = ''
    jobTitle = ''
    location = ''
    remote = false
    jobPostUrl = ''
    editing = false
    deleting = false
    resetErrorMessages()
  }

  function resetErrorMessages() {
    meetUrlErrorMessage = undefined
    locationErrorMessage = undefined
    jobTitleErrorMessage = undefined
    jobPostUrlErrorMessage = undefined
  }

  function reset() {
    id = $modalInfo?.jobApplication?.id ?? ''
    salary = $modalInfo?.jobApplication?.salary ?? ''
    meetUrl = $modalInfo?.jobApplication?.meetUrl ?? ''
    remote = $modalInfo?.jobApplication?.remote ?? false
    jobTitle = $modalInfo?.jobApplication?.jobTitle ?? ''
    location = $modalInfo?.jobApplication?.location ?? ''
    jobPostUrl = $modalInfo?.jobApplication?.jobPostUrl ?? ''
    resetErrorMessages()
  }

  function cancelHandler() {
    editing = false
    reset()
  }

  function editSaveHandler() {
    if (editing) {
      resetErrorMessages()
      if (!validInputs()) return

      updateCardInfo($modalInfo.status, id, { jobPostUrl, jobTitle, location, meetUrl, remote, salary })
      editing = false
      return
    }

    editing = !deleting
  }

  function deleteCard() {
    deleteJobPost($modalInfo.status, id)
    closeModal()
  }

  function changeDeletionState(state: boolean) {
    editing = false
    deleting = state
    cancelHandler()
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
    if (!visible) clear()
  })
</script>

<BaseModal show={visible} options={{ overlayClick: !editing }}>
  <div class="pr-10 md:pr-5">
    <EditableText
      large
      bind:value={location}
      editable={editing}
      class="capitalize"
      errorMessage={locationErrorMessage}
    />
  </div>

  <section class="grid gap-y-4 pb-14 pt-6 md:gap-x-5 md:gap-y-4.5">
    <article class="grid grid-cols-[100px_auto] grid-rows-[32px] md:grid-cols-[120px_auto]">
      <div class="flex items-center gap-x-1.5 text-jat-black">
        <Icon name="jat/briefcase" size={18} />
        <span>Job Title</span>
      </div>
      <EditableText bind:value={jobTitle} editable={editing} errorMessage={jobTitleErrorMessage} />
    </article>
    <article class="grid grid-cols-[100px_auto] grid-rows-[32px] md:grid-cols-[120px_auto]">
      <div class="flex items-center gap-x-1.5 text-jat-black">
        <Icon name="jat/link" size={16} />
        <span>URL</span>
      </div>
      <EditableText
        bind:value={jobPostUrl}
        type="link"
        label="Go to job post"
        editable={editing}
        errorMessage={jobPostUrlErrorMessage}
      />
    </article>
    <article class="grid grid-cols-[100px_auto] grid-rows-[32px] md:grid-cols-[120px_auto]">
      <div class="flex items-center gap-x-1.5 text-jat-black">
        <Icon name="jat/paid" size={16} />
        <span>Salary</span>
      </div>
      <EditableText bind:value={salary} editable={editing} />
    </article>
    <article class="grid grid-cols-[100px_auto] grid-rows-[32px] md:grid-cols-[120px_auto]">
      <div class="flex items-center gap-x-1.5 text-jat-black">
        <Icon name="jat/link" size={16} />
        <span>Meet URL</span>
      </div>
      <EditableText
        bind:value={meetUrl}
        type="link"
        label="Go to meeting"
        editable={editing}
        errorMessage={meetUrlErrorMessage}
      />
    </article>
    <article class="grid grid-cols-[100px_auto] grid-rows-[32px] md:grid-cols-[120px_auto]">
      <div class="flex items-center gap-x-1.5 text-jat-black">
        <Icon name="jat/remote" size={20} stroke="currentColor" />
        <span>Remote</span>
      </div>
      <Checkbox id="asdadad" bind:checked={remote} disabled={!editing} />
    </article>
  </section>

  <section class="flex items-center justify-between gap-x-4">
    <DeleteButton onDelete={deleteCard} onConfirm={changeDeletionState} />

    <div class="flex gap-x-2">
      {#if editing}
        <Button variant="secondary" onclick={cancelHandler}>Cancel</Button>
      {/if}
      <Button variant="primary" onclick={editSaveHandler}>
        {editing ? 'Save' : 'Edit'}
      </Button>
    </div>
  </section>
</BaseModal>
