// api/token.js
export default async function handler(request, response) {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const authOptions = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authOptions}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    const data = await res.json()
    return response.status(200).json(data)
  } catch (error) {
    return response.status(500).json({ error: 'Failed to fetch token' })
  }
}
