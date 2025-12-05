<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Search, X } from 'lucide-vue-next'
import { agencies } from '@/utils/data'
import { useLightstickStore } from '@/stores/useLightstickStore'

const store = useLightstickStore()
const { selectedAgency } = storeToRefs(store)

const query = ref('')

const handleSetAgency = (agency: string) => {
  store.setAgency(agency)
}

const handleSearch = () => {
  store.setQuery(query.value)
}

const clearSearch = () => {
  query.value = ''
  store.setQuery(query.value)
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 text-sm">
    <div class="max-w-6xl mx-auto px-6">
      <!-- 타이틀 -->
      <div class="text-center mb-6">
        <h1
          class="text-3xl font-extrabold tracking-tight mb-1 bg-linear-to-r from-sky-200 from-35% to-fuchsia-200 to-60% bg-clip-text text-transparent"
        >
          LIGHTSTICK MUSEUM
        </h1>
      </div>

      <!-- 소속사 필터 -->
      <nav class="flex gap-2 justify-around flex-wrap pb-2">
        <div class="mr-auto items-center flex flex-wrap group-first:gap-1">
          <button
            v-for="agency in agencies"
            :key="agency"
            @click="handleSetAgency(agency)"
            :class="[
              'px-4 rounded-full font-normal transition-all duration-200',
              selectedAgency === agency
                ? 'text-purple-600 border border-purple-500/30 shadow-md shadow-purple-500/20'
                : 'text-gray-600 hover:text-purple-600 bg-white hover:bg-purple-100 hover:-translate-y-0.5',
            ]"
          >
            {{ agency }}
          </button>
        </div>

        <!-- 검색창 -->
        <div
          class="max-w-lg ml-auto flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full py-1 transition-all duration-200 focus-within:bg-white focus-within:border-purple-500/30 focus-within:shadow-lg focus-within:shadow-purple-600/10"
        >
          <Search :size="18" class="text-gray-400 shrink-0 ml-4" />
          <input
            v-model="query"
            id="search"
            type="text"
            placeholder="응원봉, 아티스트 검색..."
            class="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
            @keyup.enter="handleSearch"
          />
          <button
            :class="query ? 'opacity-100' : 'opacity-0 pointer-events-none'"
            @click="clearSearch"
          >
            <X :size="18" class="text-gray-400 shrink-0" />
          </button>
        </div>
        <button
          class="px-4 rounded-full border border-gray-500/30 hover:border-purple-500/30 text-gray-600 hover:text-purple-600 bg-white hover:bg-purple-100"
          @click="handleSearch"
        >
          Search
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
