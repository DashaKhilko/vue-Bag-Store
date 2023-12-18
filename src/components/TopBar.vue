<script setup>
const props = defineProps({
  countDrawerItems: Number
})

const emit = defineEmits(['openDrawer'])
</script>
<template>
  <header
    class="flex justify-between border-b border-slate-600 border-opacity-70 px-8 py-8 flex-col md:flex-row"
  >
    <router-link to="/">
      <div class="flex items-center">
        <img class="h-14 mx-auto md:mx-0" src="/public/logo.png" alt="Logo" />
      </div>
    </router-link>
    <ul class="flex items-center gap-7 mt-7 md:mt-0 mx-auto md:mx-0">
      <li
        @click="emit('openDrawer')"
        class="relative flex items-center gap-3 text-slate-300 hover:text-black cursor-pointer"
      >
        <img src="/public/drawer.svg" alt="Drawer" />
        <span
          v-if="props.countDrawerItems"
          class="absolute left-5 top-[-15px] rounded-full bg-rose-700 opacity-90 px-2 py-1 text-xs text-slate-800"
        >
          {{ props.countDrawerItems }}
        </span>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-slate-300 hover:text-black cursor-pointer">
          <img src="/public/heart.svg" alt="Like" />
        </li>
      </router-link>
    </ul>
  </header>
</template>
