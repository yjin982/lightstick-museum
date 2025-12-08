// 응원봉 개별 버전 타입
export interface LightstickItem {
  id: number
  name: string
  version: number
  image: string
}

// 아티스트(그룹) 단위 타입
export interface LightstickData {
  id: number
  artist: string
  agency: string
  tag: string
  profile?: string
  keywords?: string[]
  items: LightstickItem[] // 버전별 응원봉 리스트
}

export const agencies = ['All', 'HYBE', 'SM', 'JYP', 'YG', 'Kakao', 'CJ ENM', 'ETC']
