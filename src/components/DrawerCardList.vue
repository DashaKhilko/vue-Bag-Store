<script setup>
import { inject } from 'vue'
import DrawerCard from './DrawerCard.vue'

const { drawerItems, removeFromDrawer } = inject('drawer')
</script>

<template>
  <div class="flex flex-col gap-4" v-auto-animate>
    <DrawerCard
      v-for="item in drawerItems"
      :key="item.id"
      :title="item.title"
      :model="item.model"
      :price="item.price"
      :imageUrl="item.imageUrl"
      @onClickRemove="() => removeFromDrawer(item)"
    />
  </div>
</template>
