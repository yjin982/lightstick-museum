<script setup lang="ts">
import { ref, computed } from 'vue'
import LightstickCard from '../components/lightsticks/LightstickCard.vue'
import lightsticks from '@/assets/lightsticks.json'
import type { LightstickType } from '@/utils/types.ts'

const items = ref<LightstickType[]>(lightsticks.lightsticks)

const groupedItems = computed(() => {
  const groups: Record<string, LightstickType[]> = {}

  items.value.forEach((item) => {
    const key = item.artist
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
  })

  Object.keys(groups).forEach((key) => {
    groups[key].sort((a, b) => b.version - a.version)
  })

  // 각 그룹의 첫 번째 아이템과 나머지 버전들 반환
  return Object.values(groups).map((versions) => ({
    main: versions[0],
    versions: versions,
  }))
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div></div>
    <div class="container mx-auto px-4 py-8">
      <!-- 그리드 -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <LightstickCard
          v-for="group in groupedItems"
          :key="group.main.id"
          :light-stick="group.main"
          :versions="group.versions"
          :url="group.main?.profile ?? ''"
        />
        <!-- <LightstickCard
          v-for="item in items"
          :key="item.id"
          :light-stick="item"
          :url="''"
          :ver="item.version"
        /> -->
      </div>
    </div>
  </div>
</template>
