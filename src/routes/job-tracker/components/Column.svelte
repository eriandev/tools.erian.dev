<script>
  import { modalInfo } from '../util/store'

  import Icon from './Icon.svelte'

  /** @type {'applied'|'wishlist'|'interview'} */
  export let title
</script>

<section class="min-w-[320px] max-w-xs">
  <header class="mb-2 flex flex-col gap-y-3">
    <div class="grid grid-cols-[fit-content(100%)_auto_fit-content(100%)] items-center gap-x-2">
      <Icon name={title} />
      <h2 class="text-xl capitalize">{title}</h2>
      <div class="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-medium text-jt-black">88</div>
    </div>
    <button
      class="w-full rounded-lg bg-jt-gray-100 py-2 text-center font-medium text-jt-gray-400"
      on:click={() => modalInfo.set({ isOpen: true, title })}
    >
      + Add Job
    </button>
  </header>

  <slot />
</section>
