<script setup>
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import BagCardList from '../components/BagCardList.vue'

const items = ref([])
const filters = reactive({
  sortBy: 'price',
  searchQuery: ''
})
const { drawerItems, addToDrawer, removeFromDrawer } = inject('drawer')

const onClickAddDrawer = async (item) => {
  if (!item.isAdded) {
    addToDrawer(item)
  } else {
    removeFromDrawer(item)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const { data } = await axios.post('https://9dc78925d4005c15.mokky.dev/favorites', {
        parentId: item.id,
        title: item.title,
        model: item.model,
        price: item.price,
        imageUrl: item.imageUrl
      })
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://9dc78925d4005c15.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://9dc78925d4005c15.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId == item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  const params = {
    sortBy: filters.sortBy
  }
  if (filters.searchQuery) {
    params.title = `*${filters.searchQuery}*`
  }
  try {
    const { data } = await axios.get('https://9dc78925d4005c15.mokky.dev/items', { params })
    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  drawerItems.value = JSON.parse(localStorage.getItem('drawer')) ?? []
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: drawerItems.value.some((drawerItem) => drawerItem.id == item.id)
  }))
})

watch(drawerItems, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
watch(filters, fetchItems)
</script>
<template>
  <div class="flex justify-between items-center flex-col xl:flex-row">
    <h2 class="text-2xl mb-5 md:mb-8 text-slate-100">Все товары</h2>
    <div class="flex gap-4 flex-col md:flex-row mb-5">
      <select
        class="rounded text-slate-300 bg-slate-500 border border-slate-700 focus:border-opacity-80 border-opacity-50 py-1.5 px-3 outline-none"
        @change="onChangeSelect"
      >
        <option value="price">По цене (низкая цена)</option>
        <option value="-price">По цене (высокая цена)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-2.5" src="/public/search.svg" alt="Search" />
        <input
          class="rounded text-slate-300 bg-slate-500 border border-slate-700 focus:border-opacity-80 border-opacity-50 py-1.5 pl-11 pr-4 outline-none"
          @input="onChangeSearchInput"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <BagCardList :items="items" @addToFavorite="addToFavorite" @addToDrawer="onClickAddDrawer" />
</template>
