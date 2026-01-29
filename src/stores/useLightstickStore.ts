import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LightstickData } from '@/utils/types'
import lightsticks from '@/assets/lightsticks_grouped.json'

// 기본값 정의
const defaultItem: LightstickData = {
  id: 0,
  artist: '',
  agency: '',
  tag: '',
  items: [],
}

export const useLightstickStore = defineStore('lightstick', () => {
  const items = ref<LightstickData[]>(
    lightsticks.lightsticks.sort((a, b) => a.artist.localeCompare(b.artist, 'ko-KR')),
  )
  const selectedItem = ref<LightstickData>(defaultItem)
  const selectedAgency = ref<string>('All')
  const query = ref<string>('')

  const isOpen = ref<boolean>(false)
  const truncSize = ref<number>(5)
  const currentPage = ref<number>(1)
  const itemsPerPage = ref(15)

  const filteredItems = computed(() => {
    const searchTerm = query.value.trim().toLowerCase()
    const targetAgency = selectedAgency.value

    return items.value.filter((group) => {
      const matchAgency = targetAgency === 'All' || group.tag === targetAgency
      if (!searchTerm) return matchAgency

      // 아티스트명, 키워드, 혹은 내부 응원봉 이름 중 하나라도 맞으면 검색
      const matchQuery =
        group.artist.toLowerCase().includes(searchTerm) ||
        group.keywords?.some((k) => k.trim().toLowerCase().includes(searchTerm)) ||
        group.items.some((item) => item.name.toLowerCase().includes(searchTerm))

      return matchQuery && matchAgency
    })
  })

  const totalPage = computed(() => {
    if (filteredItems.value.length === 0) return 1
    return Math.ceil(filteredItems.value.length / itemsPerPage.value)
  })

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredItems.value.slice(start, end)
  })

  const pageToShow = computed<Array<number | null>>(() => {
    const total = totalPage.value
    const current = currentPage.value
    const size = truncSize.value // 중간에 표시할 페이지 개수

    // 1. 페이지가 없거나 1개뿐인 경우
    if (total <= 1) return [1]

    // 2. 전체 페이지가 설정된 사이즈보다 작거나 같으면 전체 표시 (1 ~ total)
    if (total <= size) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages: Array<number | null> = [1]

    // 3. 중간 블록의 시작(start)과 끝(end) 계산
    let start = current - Math.floor(size / 2)
    let end = start + size - 1

    // 4. 범위 보정 (Clamping)
    // start가 2보다 작아지면(1과 겹치면) 강제로 2로 고정하고 end를 늘림
    if (start <= 2) {
      start = 2
      end = Math.min(total - 1, start + size - 1)
    }
    // end가 마지막 페이지와 겹치면 강제로 줄이고 start를 당김
    else if (end >= total - 1) {
      end = total - 1
      start = Math.max(2, end - size + 1)
    }

    // 5. 배열 구성
    if (start > 2) pages.push(null)
    for (let i = start; i <= end; i++) pages.push(i) // 중간 페이지들
    if (end < total - 1) pages.push(null)
    pages.push(total) // 마지막 페이지

    return pages
  })

  const openDetail = (item: LightstickData) => {
    isOpen.value = true
    selectedItem.value = item
  }

  const closeDetail = () => {
    isOpen.value = false
    selectedItem.value = defaultItem
  }

  const setAgency = (agency: string) => {
    if (agency === 'ETC') {
      selectedAgency.value = ''
    } else {
      selectedAgency.value = agency
    }
    currentPage.value = 1
  }

  const resetFilters = () => {
    selectedAgency.value = 'All'
    currentPage.value = 1
  }

  const setQuery = (q: string) => {
    query.value = q
    currentPage.value = 1
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPage.value) {
      currentPage.value = page
    }
  }

  const goToPrev = () => {
    currentPage.value = currentPage.value - 1
  }
  const goToNext = () => {
    currentPage.value = currentPage.value + 1
  }

  const goToFirst = () => {
    currentPage.value = 1
  }
  const goToLast = () => {
    currentPage.value = totalPage.value
  }

  const setItemPerPage = (size: number = 15) => {
    itemsPerPage.value = size
    currentPage.value = 1
  }

  const setTruncSize = (size: number = 5) => {
    truncSize.value = size
  }

  return {
    query,
    filteredItems,
    paginatedItems,
    currentPage,
    totalPage,
    pageToShow,
    itemsPerPage,
    selectedAgency,
    isOpen,
    selectedItem,
    openDetail,
    closeDetail,
    setAgency,
    resetFilters,
    setQuery,
    goToPage,
    goToPrev,
    goToNext,
    goToFirst,
    goToLast,
    setItemPerPage,
    setTruncSize,
  }
})
