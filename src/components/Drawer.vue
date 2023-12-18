<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'
import DrawerCardList from './DrawerCardList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})
const emit = defineEmits(['closeDrawer'])

const isLoading = ref(false)
const orderId = ref(null)

const { drawerItems } = inject('drawer')

const createOrder = async () => {
  try {
    isLoading.value = true
    const { data } = await axios.post('https://9dc78925d4005c15.mokky.dev/orders', {
      items: drawerItems.value,
      totalPrice: props.totalPrice
    })
    drawerItems.value = []
    orderId.value = data.id
    return data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-slate-500 w-96 h-full fixed right-0 top-0 z-20 p-5">
    <div class="flex items-center gap-5 mb-5">
      <img
        @click="emit('closeDrawer')"
        class="opacity-50 cursor-pointer hover:opacity-100 transition hover:-translate-x-1"
        src="/public/arrow.svg"
        alt="Arrow"
      />
      <h2 class="text-2xl font-bolt text-slate-950">Корзина</h2>
    </div>
    <div v-if="props.totalPrice == 0 || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ №${orderId} будет передан курьерской доставке`"
      />
      <InfoBlock
        v-else
        title="Ваша корзина пока пуста"
        description="Для оформления заказа необходимо добавить товары в корзину"
      />
    </div>
    <div v-else>
      <DrawerCardList />
      <div class="flexflex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed border-slate-600 border-opacity-4"></div>
          <b>{{ props.totalPrice }} руб.</b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed border-slate-600 border-opacity-4"></div>
          <b>{{ props.vatPrice }} руб.</b>
        </div>
        <button
          :disabled="props.isLoading || props.totalPrice == 0"
          @click="createOrder"
          class="mt-4 w-full py-3 bg-rose-800 opacity-90 text-slate-300 rounded transition hover:bg-rose-600 active:bg-rose-800 disabled:bg-slate-400 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
