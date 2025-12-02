<script setup lang="ts">
import { useLightstickStore } from '@/stores/useLightstickStore'
import { storeToRefs } from 'pinia'
import LightstickCard from '@/components/lightsticks/LightstickCard.vue'
import Pagination from '@/components/lightsticks/Pagination.vue'

const store = useLightstickStore()
const { paginatedItems } = storeToRefs(store)
</script>

<template>
  <div class="home">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <LightstickCard
        v-for="group in paginatedItems"
        :key="group.main.id"
        :light-stick="group.main"
        :versions="group.versions"
        :url="group.main?.profile ?? ''"
      />
    </div>
    <div><Pagination /></div>
  </div>
</template>

<style scoped>
.home h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
</style>
