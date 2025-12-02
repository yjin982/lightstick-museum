import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LightstickType } from '@/utils/types'
import lightsticks from '@/assets/lightsticks.json'

export const useLightstickStore = defineStore('lightstick', () => {
  const items = ref<LightstickType[]>(lightsticks.lightsticks)
  const isOpen = ref(false)
  const selectedItem = ref<LightstickType[] | null>(null)
  const selectedAgency = ref('All')
  const query = ref('')

  const filteredItems = computed(() => {
    return items.value.filter((item) => {
      const matchAgency = selectedAgency.value === 'All' || item.tag === selectedAgency.value

      const searchTerm = query.value.toLowerCase()
      if (searchTerm) {
        const matchQuery =
          item.artist.toLowerCase().includes(searchTerm) ||
          item.name.toLowerCase().includes(searchTerm) ||
          item.keywords?.some((k: string) => k.trim().toLowerCase().includes(searchTerm))

        return matchQuery && matchAgency
      } else {
        return matchAgency
      }
    })
  })

  const groupedItems = computed(() => {
    const groups: Record<string, LightstickType[]> = {}

    filteredItems.value.forEach((item) => {
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

  const openDetail = (item: LightstickType[]) => {
    isOpen.value = true
    selectedItem.value = item
  }

  const closeDetail = () => {
    isOpen.value = false
    selectedItem.value = null
  }

  const setAgency = (agency: string) => {
    if (agency === 'ETC') {
      selectedAgency.value = ''
    } else {
      selectedAgency.value = agency
    }
  }

  const resetFilters = () => {
    selectedAgency.value = 'All'
  }

  const setQuery = (q: string) => {
    query.value = q
  }

  return {
    query,
    filteredItems,
    groupedItems,
    selectedAgency,
    isOpen,
    selectedItem,
    openDetail,
    closeDetail,
    setAgency,
    resetFilters,
    setQuery,
  }
})
