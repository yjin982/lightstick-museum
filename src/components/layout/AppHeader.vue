<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'

const agencies = ['All', 'HYBE', 'SM', 'JYP', 'YG', 'Kakao', 'CJ ENM']
const selectedAgency = ref('All')
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-6 py-8 pb-6">
      <!-- 타이틀 -->
      <div class="text-center mb-8">
        <h1
          class="text-3xl font-extrabold tracking-tight mb-1 bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
        >
          Light Stick Wiki
        </h1>
        <p class="text-sm text-gray-500 font-medium">K-POP 응원봉 아카이브</p>
      </div>

      <!-- 소속사 필터 -->
      <nav class="flex gap-2 justify-around flex-wrap mb-6">
        <div>
          <button
            v-for="agency in agencies"
            :key="agency"
            @click="selectedAgency = agency"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              selectedAgency === agency
                ? 'bg-linear-to-r from-purple-600 to-purple-800 text-purple shadow-lg shadow-purple-500/30'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-600 hover:text-purple-600 hover:-translate-y-0.5',
            ]"
          >
            {{ agency }}
          </button>
        </div>

        <!-- 검색창 -->
        <div
          class="max-w-lg mx-auto flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 transition-all duration-200 focus-within:bg-white focus-within:border-purple-600 focus-within:shadow-lg focus-within:shadow-purple-600/10"
        >
          <Search :size="18" class="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="응원봉, 아티스트 검색..."
            class="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
          />
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Tailwind로 표현하기 어려운 것만 */
.bg-clip-text {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
