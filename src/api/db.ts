import { db } from '@vercel/postgres'

export default async function handler(req, res) {
  const client = await db.connect()

  try {
    // 아티스트와 아이템을 JOIN하여 한 번에 가져오거나 따로 조회
    const { rows: artists } = await client.sql`SELECT * FROM artists`
    const { rows: lightsticks } = await client.sql`SELECT * FROM lightsticks`

    // 가공: 아티스트 객체 안에 items 배열을 넣어주기
    const result = artists.map((artist) => ({
      ...artist,
      items: lightsticks.filter((item) => item.artist_id === artist.id),
    }))

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
