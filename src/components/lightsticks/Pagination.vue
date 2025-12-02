<script setup lang="ts">
import { useLightstickStore } from '@/stores/useLightstickStore'
import { storeToRefs } from 'pinia'
import { ChevronLeft, ChevronRight, ChevronFirst, ChevronLast, Ellipsis } from 'lucide-vue-next'

const store = useLightstickStore()
const { totalPage, currentPage, pageToShow } = storeToRefs(store)

const btnStyle = `px-4 rounded-full border border-gray-500/30 hover:border-purple-500/30 text-gray-400 hover:text-purple-600 bg-white hover:bg-purple-100`
</script>
<template>
  <div class="mt-12">
    <div class="flex justify-center items-center gap-2 mt-4 text-sm">
      <button :class="btnStyle" @click="store.goToFirst" :disabled="currentPage === 1">
        <ChevronFirst :size="18" class="shrink-0" />
      </button>
      <button :class="btnStyle" @click="store.goToPrev" :disabled="currentPage === 1">
        <ChevronLeft :size="18" class="shrink-0" />
      </button>

      <div class="flex justify-center items-center">
        <template v-for="(page, index) in pageToShow" :key="index">
          <button
            v-if="page !== null"
            class="px-4 rounded-full hover:bg-purple-100 hover:text-purple-600"
            :class="
              currentPage === page
                ? 'text-purple-600 bg-purple-100 border border-purple-500/30 '
                : 'text-gray-600'
            "
            @click="store.goToPage(page as number)"
          >
            {{ page }}
          </button>

          <button v-else class="px-4 rounded-full text-gray-400" disabled>
            <Ellipsis :size="18" class="shrink-0" />
          </button>
        </template>
      </div>
      <button :class="btnStyle" @click="store.goToPrev" :disabled="currentPage === totalPage">
        <ChevronRight :size="18" class="shrink-0" />
      </button>
      <button :class="btnStyle" @click="store.goToLast" :disabled="currentPage === totalPage">
        <ChevronLast :size="18" class="shrink-0" />
      </button>
    </div>
  </div>
</template>
