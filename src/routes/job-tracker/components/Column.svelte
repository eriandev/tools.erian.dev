<script>
  import Icon from './Icon.svelte'
  import Card from './Card.svelte'

  /** @type {'applied'|'wishlist'|'interview'} */
  export let title
</script>

<section class="w-full max-w-xs">
  <header class="mb-2 flex flex-col gap-y-3">
    <div class="grid grid-cols-[fit-content(100%)_auto_fit-content(100%)] items-center gap-x-2">
      <Icon name={title} />
      <h2 class="text-xl capitalize">{title}</h2>
      <div class="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-medium text-jt-black">88</div>
    </div>
    <button class="w-full rounded-lg bg-jt-gray-100 py-2 text-center font-medium text-jt-gray-400">+ Add Job</button>
  </header>

  <div class="flex flex-col gap-y-2">
    <Card
      remote
      place="Miskatonic University"
      position="Professor, Anthropology and Occultism Department"
      timestamp="1691721018580"
      salary="5000"
      jobPostUrl="https://google.com"
      meetUrl="https://meet.new"
    />

    <Card
      remote
      place="Gotham Electrical Inc."
      position="Bat Signal Operator"
      timestamp="1691721018580"
      salary="3000"
      jobPostUrl="https://twitter.com"
    />
  </div>
</section>
