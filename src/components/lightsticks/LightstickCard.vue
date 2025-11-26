<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { LightstickType } from '@/utils/types.ts'
import { useDialogStore } from '@/stores/dialog'
import LightstickCardDetail from './LightstickCardDetail.vue'
import { Carousel, Slide } from 'vue3-carousel'

interface Prop {
  lightStick: LightstickType
  url: string
  versions?: LightstickType[]
}

const { lightStick, url = '', versions = [] } = defineProps<Prop>()

const store = useDialogStore()
const { isOpen, selectedItem } = storeToRefs(store)

const openDialog = () => {
  console.log('open')
  isOpen.value = true
  selectedItem.value = versions
}

const config = {
  itemsToShow: 1,
  gap: 5,
  autoplay: 3000,
  wrapAround: true,
}
</script>

<template>
  <div
    class="group relative w-52 h-78 bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
  >
    <!-- 앞면 -->
    <div class="w-full h-full flex items-center justify-center">
      <!-- <img
        :src="lightStick.image"
        :alt="lightStick.artist"
        class="h-full object-contain px-2 items-center"
      /> -->
      <Carousel v-bind="config">
        <Slide v-for="item of versions" :key="item.id">
          <img :src="item.image" :alt="lightStick.artist" />
        </Slide>
      </Carousel>
    </div>

    <!-- 뒷면 -->
    <div
      class="absolute bg-white inset-0 flex flex-col gap-2 -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-40"
      @click="openDialog"
    >
      <div class="h-4/5 bg-zinc-100 flex items-center justify-center">
        <img
          :src="lightStick.profile ?? url"
          :alt="lightStick.artist"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="h-1/5 pb-4">
        <div class="text-lg font-bold text-center text-gray-900">{{ lightStick.artist }}</div>
        <div class="text-sm text-center text-gray-600">{{ lightStick.agency }}</div>
      </div>
      <LightstickCardDetail />
    </div>
  </div>
</template>
