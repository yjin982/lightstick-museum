import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LightstickType } from '@/utils/types'

export const useDialogStore = defineStore('dialog', () => {
  const isOpen = ref(false)
  const selectedItem = ref<LightstickType[] | null>(null)

  const openDetail = (item: LightstickType[]) => {
    isOpen.value = true
    selectedItem.value = item
  }

  const closeDetail = () => {
    isOpen.value = false
    selectedItem.value = null
  }

  return {
    isOpen,
    selectedItem,
    openDetail,
    closeDetail,
  }
})
