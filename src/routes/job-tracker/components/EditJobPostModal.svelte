<script context="module">
  import { get, writable } from 'svelte/store'

  import { DEFAULT_EDIT_CARD_INFO } from '../util/consts'
  import { getCardInfoById, updateCardInfo } from '../util/store'

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

    return { openEditJobPostModal, closeEditJobPostModal, saveEditJobPost }
  }
</script>

<script>
  import { onMount, onDestroy } from 'svelte'

  import Icon from './Icon.svelte'
  import Button from './Button.svelte'
  import BaseModal from './BaseModal.svelte'
  import EditableText from './EditableText.svelte'

  let salary = ''
  let jobTitle = ''
  let location = ''
  let jobPostUrl = ''
  let editing = false
  /** @type {import('svelte/store').Unsubscriber} */
  let unsubStore = () => {}

  const { saveEditJobPost, closeEditJobPostModal } = useEditJobPost()

  onMount(
    () =>
      (unsubStore = store.subscribe(({ info, show }) => {
        if (show) {
          salary = info?.salary ?? ''
          jobTitle = info?.jobTitle ?? ''
          location = info?.location ?? ''
          jobPostUrl = info?.jobPostUrl ?? ''
          return
        }

        salary = ''
        jobTitle = ''
        location = ''
        jobPostUrl = ''
        editing = false
      }))
  )
  onDestroy(() => unsubStore())

  function editSaveHandler() {
    if (editing) {
      saveEditJobPost({ location, jobTitle, jobPostUrl, salary })
      editing = false
      return
    }
    editing = true
  }
</script>

<BaseModal show={$store.show} on:close={closeEditJobPostModal}>
  <EditableText
    bind:value={location}
    editable={editing}
    extraClass="text-xl capitalize text-jt-black md:text-2xl px-0"
  />

  <section class="grid gap-y-4 pb-14 pt-6 md:gap-x-5 md:gap-y-[18px]">
    <article class="grid grid-cols-[124px_auto]">
      <div class="flex items-center gap-x-1.5 text-jt-black">
        <Icon name="briefcase" size={18} />
        <span class="text-jt-black">Job Title</span>
      </div>
      <EditableText bind:value={jobTitle} editable={editing} />
    </article>
    <article class="grid grid-cols-[124px_auto]">
      <div class="flex items-center gap-x-1.5 text-jt-black">
        <Icon name="link" />
        <span class="text-jt-black">URL</span>
      </div>
      <EditableText bind:value={jobPostUrl} type="link" label="Go to job post" editable={editing} />
    </article>
    <article class="grid grid-cols-[124px_auto]">
      <div class="flex items-center gap-x-1.5 text-jt-black">
        <Icon name="paid" />
        <span class="text-jt-black">Salary</span>
      </div>
      <EditableText bind:value={salary} editable={editing} />
    </article>
  </section>

  <section class="flex justify-end gap-x-4">
    {#if editing}
      <Button on:click={() => (editing = false)}>Cancel</Button>
    {/if}
    <Button primary on:click={editSaveHandler}>
      {editing ? 'Save' : 'Edit'}
    </Button>
  </section>
</BaseModal>
