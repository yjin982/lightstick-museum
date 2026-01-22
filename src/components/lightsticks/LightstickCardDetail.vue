<script setup lang="ts">
import { useLightstickStore } from '@/stores/useLightstickStore'
import { storeToRefs } from 'pinia'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Carousel, Slide, Pagination, Navigation as CarouselNavigation } from 'vue3-carousel'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const store = useLightstickStore()
const { isOpen, selectedItem } = storeToRefs(store)

const config = {
  itemsToShow: 1,
  gap: 5,
}
</script>

<template>
  <Dialog :open="isOpen" @close="store.closeDetail" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>

    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full md:w-[70%] max-h-[90vh] flex flex-col rounded bg-white" as="div">
        <div class="relative flex-1 overflow-y-auto min-h-[500px]">
          <!-- 팝업 배경  -->
          <div class="absolute inset-0 z-0">
            <img
              :src="selectedItem.profile"
              class="w-full h-full object-cover blur-[80px] opacity-20"
            />
          </div>

          <!-- 닫기 버튼 -->
          <div class="w-full flex items-end justify-end pt-4 pr-4">
            <button
              @click="store.closeDetail"
              class="p-6 z-10 rounded-full border border-white/50 shadow-sm hover:bg-purple-200/60 text-gray-400 hover:text-black"
            >
              <X :size="24" class="shrink-0" />
            </button>
          </div>

          <div class="relative z-10 p-10 flex flex-col md:flex-row gap-10">
            <!-- 아티스트 정보 -->
            <div class="w-full md:w-1/2 flex flex-col gap-4">
              <div class="bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-inner">
                <img
                  :src="selectedItem.profile"
                  class="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-lg"
                />
              </div>
              <div class="px-2">
                <h2 class="text-4xl font-black text-zinc-900">{{ selectedItem.artist }}</h2>
                <p class="text-lg text-purple-600 font-semibold">{{ selectedItem.agency }}</p>
                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="tag in selectedItem.keywords"
                    :key="tag"
                    class="px-3 py-1 bg-white/60 text-xs rounded-full border border-white/50 shadow-sm"
                  >
                    # {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/2 flex flex-col justify-start">
              <!-- 응원봉 사진 -->
              <div
                class="relative bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/50"
              >
                <Carousel v-bind="config" id="sticks">
                  <Slide v-for="stick in selectedItem.items" :key="stick.id">
                    <div class="flex flex-col items-center">
                      <div class="flex items-center justify-between w-full">
                        <div class="font-medium text-zinc-700">
                          {{ stick.name || 'Official Lightstick' }}
                        </div>
                        <div
                          class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                        >
                          Ver. {{ stick.version }}
                        </div>
                      </div>
                      <div class="image-container">
                        <img
                          :src="stick.image"
                          class="w-full h-full object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  </Slide>
                  <template #addons>
                    <Pagination class="mt-10" />
                    <Navigation />
                  </template>
                </Carousel>
              </div>
            </div>
          </div>
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

.image-container {
  width: 300px;
  height: 350px;
}
</style>
