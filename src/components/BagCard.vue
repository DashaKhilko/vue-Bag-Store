<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  model: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  favorites: Boolean
})

const emit = defineEmits(['onClickAdd', 'onClickFavorite'])
</script>

<template>
  <div class="relative border border-slate-600 border-opacity-50 py-4">
    <img
      v-if="!props.favorites"
      class="absolute top-5 left-1 w-6 h-[23px]"
      @click="emit('onClickFavorite')"
      :src="props.isFavorite ? 'liked.png' : '/unliked.png'"
      alt="Like"
    />
    <img class="w-[100%]" :src="props.imageUrl" alt="Bag" />
    <div class="flex flex-col gap-2 mt-4 items-center text-center text-slate-300">
      <p>{{ props.title }}</p>
      <p>{{ props.model }}</p>
      <span class="text-slate-800 font-bold"> {{ props.price }} руб.</span>
      <button
        v-if="!props.favorites"
        class="transition ease-in-out border border-slate-800 border-opacity-70 px-4 py-2.5 hover:bg-slate-800 cursor-pointer flex gap-2"
        @click="emit('onClickAdd')"
      >
        {{ props.isAdded ? 'В корзине' : 'В корзину' }}
        <img v-if="props.isAdded" class="h-5" src="/public/added.svg" alt="Added" />
      </button>
    </div>
  </div>
</template>
