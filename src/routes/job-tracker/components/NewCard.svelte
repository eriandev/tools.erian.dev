<script>
  import Modal from './Modal.svelte'
  import Input from './Input.svelte'
  import Button from './Button.svelte'
</script>

<Modal>
  <h4 class="text-xl capitalize text-jt-gray-400 md:text-2xl">Whishlist Job</h4>

  <div class="grid gap-y-4 pb-14 pt-6 md:grid-cols-[repeat(2,minmax(auto,220px))] md:gap-x-5 md:gap-y-[18px]">
    <Input icon="briefcase" label="Job Title" />
    <Input icon="location" label="Location" />
    <Input icon="link" label="URL" />
    <Input icon="paid" label="Salary" />
  </div>

  <div class="flex justify-end gap-x-4">
    <Button>Cancel</Button>
    <Button primary>Save</Button>
  </div>
</Modal>
