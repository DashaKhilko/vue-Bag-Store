<script setup>
import BagCard from './BagCard.vue'

const props = defineProps({
  items: Array,
  favorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToDrawer'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mx-10" v-auto-animate>
    <BagCard
      v-for="item in props.items"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :model="item.model"
      :price="item.price"
      @onClickFavorite="() => emit('addToFavorite', item)"
      @onClickAdd="() => emit('addToDrawer', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :favorites="props.favorites"
    />
  </div>
</template>
