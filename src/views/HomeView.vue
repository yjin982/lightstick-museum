<script setup lang="ts">
import { useLightstickStore } from '@/stores/useLightstickStore'
import { storeToRefs } from 'pinia'
import LightstickCard from '@/components/lightsticks/LightstickCard.vue'
import Pagination from '@/components/lightsticks/LightstickPagination.vue'

const store = useLightstickStore()
const { paginatedItems } = storeToRefs(store)
</script>

<template>
  <div class="home">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <LightstickCard
        v-for="(group, idx) in paginatedItems"
        :key="idx"
        :light-stick="group.main"
        :versions="group.versions"
        :url="group.main?.profile ?? ''"
      />
    </div>
    <div><Pagination :item-per-page="10" :size="3" /></div>
  </div>
</template>

<style scoped>
.home h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
</style>
