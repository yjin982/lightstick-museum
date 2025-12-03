<script setup lang="ts">
import { useLightstickStore } from '@/stores/useLightstickStore'
import { storeToRefs } from 'pinia'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const store = useLightstickStore()
const { isOpen, selectedItem } = storeToRefs(store)
</script>

<template>
  <Dialog :open="isOpen" @close="store.closeDetail" class="relative z-50">
    <!-- 배경 오버레이 -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- 모달 위치 -->
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-4xl max-h-[90vh] flex flex-col rounded bg-white" as="div">
        <!-- 헤더 고정 -->
        <DialogTitle class="text-lg font-bold p-6 border-b">
          {{ selectedItem?.[0]?.artist }}
        </DialogTitle>

        <!-- 스크롤 영역 -->
        <div class="flex-1 overflow-y-auto p-6">
          {{ selectedItem }}
        </div>

        <!-- 푸터 고정 -->
        <div class="p-6 border-t">
          <button @click="store.closeDetail" class="px-4 py-2 bg-blue-500 text-white rounded">
            닫기
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
