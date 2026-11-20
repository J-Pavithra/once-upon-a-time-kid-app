import { createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { chapters } from '../data/chapters.js'

const ChapterCtx = createContext(null)

export function useChapter() {
  return useContext(ChapterCtx)
}

export function ChapterProvider({ chapterId }) {
  const chapter = chapters.find(c => c.id === chapterId) || null
  return (
    <ChapterCtx.Provider value={chapter}>
      <Outlet />
    </ChapterCtx.Provider>
  )
}

export function chapterByPath(pathname) {
  return chapters.find(c => pathname === `/${c.id}` || pathname.startsWith(`/${c.id}/`))
}

export function pageHref(chapterId, pagePath) {
  return pagePath ? `/${chapterId}/${pagePath}` : `/${chapterId}`
}
