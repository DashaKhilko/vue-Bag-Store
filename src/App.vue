<script setup>
import { ref, watch, provide, computed } from 'vue'
import TopBar from './components/TopBar.vue'
import Drawer from './components/Drawer.vue'

const drawerItems = ref([])
const drawerOpen = ref(false)
const totalPrice = computed(() => drawerItems.value.reduce((acc, item) => item.price + acc, 0))
const vatPrice = computed(() => Math.round(totalPrice.value * 0.05))
const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const addToDrawer = async (item) => {
  drawerItems.value.push(item)
  item.isAdded = true
}

const removeFromDrawer = async (item) => {
  drawerItems.value.splice(drawerItems.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  drawerItems,
  () => {
    localStorage.setItem('drawer', JSON.stringify(drawerItems.value))
  },
  { deep: true }
)
provide('drawer', { drawerItems, addToDrawer, removeFromDrawer})
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :totalPrice="totalPrice"
    :vatPrice="vatPrice"
    @closeDrawer="closeDrawer"
  />
  <div class="w-5/6 m-auto bg-slate-500 shadow-xl">
    <TopBar :countDrawerItems="drawerItems.length" @openDrawer="openDrawer" />
    <div class="p-4 md:p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
