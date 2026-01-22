import axios from 'axios'

let cachedToken: string | null = null

// 1. 내부 API를 통해 토큰 가져오기
async function getAccessToken() {
  if (cachedToken) return cachedToken

  try {
    const { data } = await axios.get('/api/token') // Vercel Function 호출
    cachedToken = data.access_token
    return cachedToken
  } catch (e) {
    console.error('Token Error:', e)
    return null
  }
}

// 2. 아티스트 이미지 검색 (외부 호출)
export async function getArtistProfileImage(artistName: string): Promise<string | null> {
  const token = await getAccessToken()
  if (!token) return null

  try {
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: artistName, type: 'artist', limit: 1 },
    })

    const items = data.artists.items
    // 이미지가 존재하면 첫 번째(가장 큰) 이미지 반환
    if (items.length > 0 && items[0].images.length > 0) {
      return items[0].images[0].url
    }
  } catch (e) {
    console.warn('Search Error:', artistName)
  }
  return null
}
