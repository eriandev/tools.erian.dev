<script context="module">
  import { get, writable } from 'svelte/store'

  import { DEFAULT_EDIT_CARD_INFO } from '../util/consts'
  import { getCardInfoById, updateCardInfo, deleteCardById } from '../util/store'

  const store = writable(DEFAULT_EDIT_CARD_INFO)

  export function useEditJobPost() {
    /**
     * @param {string} id
     */
    const openEditJobPostModal = (id) => {
      const info = getCardInfoById(id)
      store.set({ show: true, info })
    }

    const closeEditJobPostModal = () => {
      store.set({ show: false })
    }

    /**
     * @param {Omit<Partial<import('../util/consts.js').JobPostInfo>, 'id' | 'timestamp'>} newJobPostInfo
     */
    const saveEditJobPost = (newJobPostInfo) => {
      const { info } = get(store)
      if (!info?.id) return

      updateCardInfo(info.id, newJobPostInfo)
    }

    /**
     * @param {string} cardId
     */
    const deleteJobPost = async (cardId) => {
      await deleteCardById(cardId)
      closeEditJobPostModal()
    }

    return { openEditJobPostModal, closeEditJobPostModal, saveEditJobPost, deleteJobPost }
  }
</script>

<script>
  import { onMount, onDestroy } from 'svelte'

  import Icon from './Icon.svelte'
  import Button from './Button.svelte'
  import BaseModal from './BaseModal.svelte'
  import EditableText from './EditableText.svelte'
  import DeleteButton from './DeleteButton.svelte'

  let id = ''
  let salary = ''
  let jobTitle = ''
  let location = ''
  let jobPostUrl = ''
  let editing = false
  let deleting = false
  /** @type {import('svelte/store').Unsubscriber} */
  let unsubStore = () => {}

  const { saveEditJobPost, closeEditJobPostModal, deleteJobPost } = useEditJobPost()

  onMount(
    () =>
      (unsubStore = store.subscribe(({ info, show }) => {
        if (show) {
          id = info?.id ?? ''
          salary = info?.salary ?? ''
          jobTitle = info?.jobTitle ?? ''
          location = info?.location ?? ''
          jobPostUrl = info?.jobPostUrl ?? ''
          return
        }

        id = ''
        salary = ''
        jobTitle = ''
        location = ''
        jobPostUrl = ''
        editing = false
      }))
  )
  onDestroy(() => unsubStore())

  /**
   * @param {CustomEvent<boolean>} value
   */
  function changeDeletionState(value) {
    editing = false
    deleting = value.detail
  }

  function editSaveHandler() {
    if (editing) {
      saveEditJobPost({ location, jobTitle, jobPostUrl, salary })
      editing = false
      return
    }
    editing = !deleting
  }

  function cancelHandler() {
    const { info } = get(store)

    salary = info?.salary ?? ''
    jobTitle = info?.jobTitle ?? ''
    location = info?.location ?? ''
    jobPostUrl = info?.jobPostUrl ?? ''

    editing = false
  }

  async function deleteCard() {
    await deleteJobPost(id)
  }
</script>

<BaseModal show={$store.show} options={{ overlayClick: !editing }} on:close={closeEditJobPostModal}>
  <div class="pr-10 md:pr-5">
    <EditableText large bind:value={location} editable={editing} />
  </div>

  <section class="grid gap-y-4 pb-14 pt-6 md:gap-x-5 md:gap-y-[18px]">
    <article class="grid grid-cols-[100px_auto] md:grid-cols-[120px_auto]">
      <div class="flex items-center gap-x-1.5 text-jt-black">
        <Icon name="briefcase" size={18} />
        <span>Job Title</span>
      </div>
      <EditableText bind:value={jobTitle} editable={editing} />
    </article>
    <article class="grid grid-cols-[100px_auto] md:grid-cols-[120px_auto]">
      <div class="flex items-center gap-x-1.5 text-jt-black">
        <Icon name="link" />
        <span>URL</span>
      </div>
      <EditableText bind:value={jobPostUrl} type="link" label="Go to job post" editable={editing} />
    </article>
    <article class="grid grid-cols-[100px_auto] md:grid-cols-[120px_auto]">
      <div class="flex items-center gap-x-1.5 text-jt-black">
        <Icon name="paid" />
        <span>Salary</span>
      </div>
      <EditableText bind:value={salary} editable={editing} />
    </article>
  </section>

  <section class="flex items-center justify-between gap-x-4">
    <DeleteButton on:delete={deleteCard} on:confirming={changeDeletionState} />

    <div class="flex gap-x-2">
      {#if editing}
        <Button secondary on:click={cancelHandler}>Cancel</Button>
      {/if}
      <Button primary on:click={editSaveHandler}>
        {editing ? 'Save' : 'Edit'}
      </Button>
    </div>
  </section>
</BaseModal>
