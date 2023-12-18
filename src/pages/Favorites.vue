<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import BagCardList from '../components/BagCardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://9dc78925d4005c15.mokky.dev/favorites')
    favorites.value = data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h2 class="text-2xl mb-5 md:mb-8 text-slate-100">Избранные товары</h2>
  <BagCardList :items="favorites" favorites />
</template>
