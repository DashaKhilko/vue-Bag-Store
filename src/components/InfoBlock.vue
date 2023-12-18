<script setup>
const props = defineProps({
  title: String,
  description: String
})
</script>

<template>
  <div class="flex flex-col text-center w-72 mx-auto">
    <h2 class="mt-4 text-2xl font-medium text-slate-950">{{ props.title }}</h2>
    <p class="text-slate-800 mt-2">{{ props.description }}</p>
  </div>
</template>
