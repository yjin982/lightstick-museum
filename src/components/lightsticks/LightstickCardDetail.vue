<script setup lang="ts">
import { useLightstickStore } from '@/stores/useLightstickStore'
import { storeToRefs } from 'pinia'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { ref, computed } from 'vue'
import { Carousel, Slide, Pagination, Navigation as CarouselNavigation } from 'vue3-carousel'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const store = useLightstickStore()
const { isOpen, selectedItem } = storeToRefs(store)

const lightStickCarouselRef = ref(null)

const config = computed(() => {
  if (selectedItem.value.length > 1) {
    return {
      itemsToShow: 1,
      gap: 5,
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
  <Dialog :open="isOpen" @close="store.closeDetail" class="relative z-50">
    <!-- 배경 오버레이 -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>

    <!-- 모달 위치 -->
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-4xl max-h-[90vh] flex flex-col rounded bg-white" as="div">
        <DialogTitle as="div" class="pt-6 px-6 flex justify-end items-center">
          <button ref="completeButtonRef" @click="store.closeDetail" class="px-6 py-2">
            <X :size="24" class="text-gray-400 hover:text-black shrink-0" />
          </button>
        </DialogTitle>
        <!-- 스크롤 영역 -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- 텍스트 영역 -->
          <div class="px-6">
            <p class="text-lg font-bold">{{ selectedItem[0]?.artist }}</p>
            <p class="text-sm text-gray-600">{{ selectedItem[0]?.agency }}</p>
          </div>
          <div class="flex items-center gap-6 px-6">
            <div class="w-[40%] flex flex-col justify-start gap-4">
              <!-- 이미지 영역 고정 -->
              <div class="w-full h-90 flex items-center justify-start overflow-hidden">
                <img
                  class="object-contain w-auto! h-full! mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-left"
                  :src="selectedItem[0]?.profile"
                />
              </div>
            </div>
            <div class="w-[60%]">
              <Carousel
                id="sticks"
                v-bind="config"
                ref="lightStickCarouselRef"
                slide-effect="fade"
                :height="320"
              >
                <Slide
                  v-for="(item, index) of selectedItem"
                  :key="item.id"
                  class="flex flex-col h-80! w-hull items-start justify-start pb-10"
                >
                  <div class="font-mono text-xs text-purple-500 dark:text-purple-40">
                    <span class="absolute top-0 right-0">
                      {{ selectedItem[index]?.name }}
                    </span>
                    <span v-if="selectedItem.length > 1" class="absolute top-5 right-0"
                      >version {{ index + 1 }}</span
                    >
                  </div>
                  <img
                    :src="item.image"
                    :alt="item.artist"
                    class="w-full! h-auto! object-contain"
                  />
                </Slide>

                <template #addons>
                  <template v-if="selectedItem?.length > 1">
                    <CarouselNavigation>
                      <template #prev>
                        <ChevronLeft :size="20" class="text-gray-400 hover:text-black shrink-0" />
                      </template>
                      <template #next>
                        <ChevronRight :size="20" class="text-gray-400 hover:text-black shrink-0" />
                      </template>
                    </CarouselNavigation>
                    <Pagination />
                  </template>
                </template>
              </Carousel>
            </div>
          </div>
        </div>

        <!-- 푸터 고정 -->
        <div class="pb-6 px-6 flex justify-end items-center">
          <button
            @click="store.closeDetail"
            class="px-6 py-2 bg-purple-500/30 text-purple-600 rounded-4xl border! border-purple-500/30!"
          >
            닫기
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.carousel__viewport {
  margin-top: 0px !important;
}

#sticks img {
  height: 100%;
  object-fit: contain;
  overflow: hidden;
}
</style>
