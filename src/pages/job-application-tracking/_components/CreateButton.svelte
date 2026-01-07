<script lang="ts">
  import { useModal } from '../_utils/store'
  import type { CreateButtonProps } from './types'

  const { status }: CreateButtonProps = $props()
  const { openModal } = useModal()

  function handleClick() {
    openModal({ action: 'create', status })
  }
</script>

<button
  class="bg-jat-gray-100 text-jat-gray-400 w-full cursor-pointer rounded-lg py-2 text-center font-medium transition-transform duration-150 ease-in-out active:scale-95 disabled:opacity-50 disabled:active:scale-100"
  onclick={handleClick}
>
  + Add Job
</button>
