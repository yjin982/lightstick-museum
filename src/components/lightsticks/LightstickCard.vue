<script setup lang="ts">
import { computed } from 'vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import type { LightstickData } from '@/utils/types.ts'
import { useLightstickStore } from '@/stores/useLightstickStore'

interface Prop {
  lightStick: LightstickData
}

const {
  lightStick = {
    id: 0,
    artist: '',
    agency: '',
    tag: '',
    items: [],
  },
} = defineProps<Prop>()

const store = useLightstickStore()

const config = computed(() => {
  if (lightStick.items.length > 1) {
    return {
      itemsToShow: 1,
      gap: 5,
      autoplay: 3000,
      wrapAround: true,
    }
  } else {
    return {
      itemsToShow: 1,
      gap: 5,
    }
  }
})
</script>

<template>
  <div
    class="group relative w-52 h-78 bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
  >
    <!-- 앞면 -->
    <div class="w-full h-full flex items-center justify-center">
      <Carousel v-bind="config" :key="lightStick.id">
        <Slide v-for="item of lightStick.items" :key="item.id" class="h-70">
          <img :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain" />
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>

    <!-- 뒷면 -->
    <div
      class="absolute bg-zinc-100 inset-0 -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-40 flex flex-col"
      @click="store.openDetail(lightStick)"
    >
      <div class="w-full h-4/5 bg-zinc-100">
        <img
          :src="lightStick.profile"
          :alt="lightStick.artist"
          class="w-full! h-full! object-contain"
        />
      </div>
      <div class="w-full h-1/5 flex items-center justify-center">
        <div class="text-lg font-bold text-center text-gray-900">{{ lightStick.artist }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.carousel__viewport {
  margin-top: 10px;
  height: 88%;
}
.carousel__pagination-button {
  background-color: rgba(206, 206, 206, 0.7);
}
.carousel__pagination-button--active {
  background-color: var(--color-purple-300);
}
</style>
