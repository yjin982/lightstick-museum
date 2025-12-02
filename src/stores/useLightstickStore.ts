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

  const truncSize = ref(5)
  const currentPage = ref(1)
  const itemsPerPage = ref(15)

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

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return groupedItems.value.slice(start, end)
  })

  const totalPage = computed(() => Math.ceil(groupedItems.value.length / itemsPerPage.value))

  const pageToShow = computed<Array<number | null>>(() => {
    const pages: Array<number | null> = []
    const maxPage = totalPage.value
    const current = currentPage.value

    // 1. 페이지 수가 1개 이하일 경우
    if (maxPage <= 1) {
      return maxPage === 1 ? [1] : []
    }

    // 2. truncSize가 전체 페이지 수보다 크거나 같을 경우, 모두 표시
    if (truncSize.value >= maxPage) {
      for (let i = 1; i <= maxPage; i++) {
        pages.push(i)
      }
      return pages
    }

    // 3. 페이지네이션 생략 로직
    const fixedSize = truncSize.value // 중앙 블록에 표시할 페이지 수 (예: 5)
    const radius = Math.floor(fixedSize / 2) // 현재 페이지 기준 좌우 거리 (예: 2)

    let start = current - radius
    let end = current + radius

    // **경계 조건 A: 시작 지점 조정 (1페이지 근처)**
    // 중앙 블록이 1페이지를 넘어갈 때, 블록을 우측으로 확장하여 fixedSize만큼 표시
    if (start <= 2) {
      start = 2
      // end는 maxPage-1과 fixedSize 중 작은 값으로 설정하여 페이지 1과 겹치지 않게 함
      end = Math.min(maxPage - 1, fixedSize)
    }

    // **경계 조건 B: 끝 지점 조정 (마지막 페이지 근처)**
    // 중앙 블록이 maxPage를 넘어갈 때, 블록을 좌측으로 이동하여 fixedSize만큼 표시
    else if (end >= maxPage - 1) {
      end = maxPage - 1
      // 시작점을 maxPage - fixedSize + 1로 설정 (예: 15-5+1=11)
      start = Math.max(2, maxPage - fixedSize + 1)
    }

    // 4. 배열 구성
    pages.push(1) // 항상 1페이지 포함

    // 선행 생략 부호 (...)
    // start가 2보다 크면 1과 start 사이에 생략된 페이지가 있음
    if (start > 2) {
      pages.push(null)
    }

    // 중앙 페이지 블록 추가
    for (let i = start; i <= end; i++) {
      // 1페이지와 maxPage는 이미 포함되었거나 나중에 포함되므로 중복 방지
      if (i !== 1 && i !== maxPage) {
        pages.push(i)
      }
    }

    // 후행 생략 부호 (...)
    // end가 maxPage-1보다 작으면 end와 maxPage 사이에 생략된 페이지가 있음
    if (end < maxPage - 1) {
      pages.push(null)
    }

    // 마지막 페이지 추가
    if (maxPage > 1 && pages[pages.length - 1] !== maxPage) {
      pages.push(maxPage)
    }

    return pages
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
    currentPage.value = 1
  }

  const resetFilters = () => {
    selectedAgency.value = 'All'
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

  return {
    query,
    filteredItems,
    groupedItems,
    paginatedItems,
    currentPage,
    totalPage,
    pageToShow,
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
  }
})
