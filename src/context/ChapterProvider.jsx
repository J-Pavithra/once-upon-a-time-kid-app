import { Outlet } from 'react-router-dom'
import { chapters } from '../data/chapters.js'
import { ChapterCtx } from './ChapterContext.jsx'

export function ChapterProvider({ chapterId }) {
  const chapter = chapters.find(c => c.id === chapterId) || null
  return (
    <ChapterCtx.Provider value={chapter}>
      <Outlet />
    </ChapterCtx.Provider>
  )
}
