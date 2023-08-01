<script>
  import Title from './components/Title.svelte'
  import Input from './components/Input.svelte'
  import Block from './components/Block.svelte'
  import Subtitle from './components/Subtitle.svelte'
  import { parseFloat } from '$lib'

  /** @type {string|null} */
  let amount = null

  let fixedCommision = 0.3
  let percentCommision = 5.4

  let valueToSend = ''
  let commisionToSend = ''
  let valueToReceive = ''
  let commisionToReceive = ''

  $: {
    const { sendCommision, sendValue } = getSendValues(
      parseFloat(amount),
      parseFloat(fixedCommision),
      parseFloat(percentCommision)
    )
    const { recieveCommision, recieveValue } = getRecieveValues(
      parseFloat(amount),
      parseFloat(fixedCommision),
      parseFloat(percentCommision)
    )

    valueToSend = amount ? sendValue.toFixed(2) : ''
    commisionToSend = amount ? sendCommision.toFixed(2) : ''

    valueToReceive = amount ? recieveValue.toFixed(2) : ''
    commisionToReceive = amount ? recieveCommision.toFixed(2) : ''
  }

  function getSendValues(amount = 0.0, fixed = 0.0, percent = 0.0) {
    const sendValue = getReceiveValue(amount, fixed, percent)
    const sendCommision = sendValue - amount

    return { sendCommision, sendValue }
  }

  function getRecieveValues(amount = 0.0, fixed = 0.0, percent = 0.0) {
    const recieveValue = getSendValue(amount, fixed, percent)
    const recieveCommision = amount - recieveValue

    return { recieveCommision, recieveValue }
  }

  function getReceiveValue(amount = 0.0, fixed = 0.0, percent = 0.0) {
    return (amount + fixed) / (1 - percent / 100)
  }

  function getSendValue(amount = 0.0, fixed = 0.0, percent = 0.0) {
    return amount - fixed - (amount * percent) / 100
  }
</script>

<header class="flex w-full justify-center px-6 py-16 text-center">
  <Title>Calculadora Comisiones Paypal</Title>
</header>

<section>
  <Block>
    <Subtitle>Comisión de Paypal</Subtitle>

    <div class="mt-6 flex items-center justify-center gap-1.5">
      <Input bind:value={percentCommision} type="number" class="w-16 text-xl font-bold" readonly />
      <span class="font-bold">%</span>
      <span class="text-2xl font-bold">+</span>
      <span class="font-bold">$</span>
      <Input bind:value={fixedCommision} type="number" class="w-16 text-xl font-bold" readonly />
    </div>
  </Block>
</section>

<article class="mx-auto my-12 grid max-w-xs gap-3">
  <Subtitle>Monto</Subtitle>
  <Input bind:value={amount} class="w-full py-2 text-center text-2xl font-bold" />
</article>

<section class="grid justify-center gap-6 pb-12 md:grid-cols-[repeat(2,fit-content(100%))] md:gap-12">
  <Block>
    <Subtitle>Enviar</Subtitle>

    <div class="mt-6 flex flex-col gap-3">
      <div class="grid grid-cols-[106px_auto] items-center gap-2">
        <Input value={valueToSend} label="Hay que enviar" class="w-full py-2" readonly />
      </div>

      <div class="grid grid-cols-[106px_auto] items-center gap-2">
        <Input value={commisionToSend} label="Comisión" class="w-full py-2" readonly />
      </div>
    </div>
  </Block>

  <Block>
    <Subtitle>Recibir</Subtitle>

    <div class="mt-6 flex flex-col gap-3">
      <div class="grid grid-cols-[106px_auto] items-center gap-2">
        <Input value={valueToReceive} label="Se recibe" class="w-full py-2" readonly />
      </div>

      <div class="grid grid-cols-[106px_auto] items-center gap-2">
        <Input value={commisionToReceive} label="Comisión" class="w-full py-2" readonly />
      </div>
    </div>
  </Block>
</section>
