import type { Recording } from '@serp/types/types'

function postProcessLyrics(lyrics: string) {
  if (!lyrics)
    return null

  return lyrics
    .split('\n')
    .map(line => (line.trim() ? `<p>${line}</p>` : '<br>'))
    .join('')
}

export async function useSong(slug: string) {
  const song = await useFetchWithCache<Recording>(
    `/entity/${slug}?module=music_songs`,
  )
  if (song.lyrics) {
    song.lyrics = postProcessLyrics(song.lyrics)
  }
  return song
}
