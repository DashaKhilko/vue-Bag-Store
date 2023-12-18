<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  model: String,
  price: Number
})

const emit = defineEmits(['onClickRemove'])
</script>

<template>
  <div class="flex items-center border border-slate-600 border-opacity-4 p-4 gap-4">
    <img :src="props.imageUrl" alt="Bag" class="h-25 w-20" />
    <div class="flex flex-col flex-1">
      <div>
        <p>{{ props.title }}</p>
        <p>{{ props.model }}</p>
      </div>
      <div class="flex items-center justify-between">
        <b class="flex-1">{{ props.price }} руб.</b>
        <img
          @click="emit('onClickRemove')"
          class="h-100 opacity-50 hover:opacity-100 transition cursor-pointer"
          src="/public/cross.svg"
          alt="Cross"
        />
      </div>
    </div>
  </div>
</template>
