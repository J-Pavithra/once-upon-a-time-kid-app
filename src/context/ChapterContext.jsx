import { createContext, useContext } from 'react'

// The current chapter object (from src/data/chapters.js) for everything under
// its route. ChapterProvider.jsx supplies it; pages read it with useChapter().
export const ChapterCtx = createContext(null)

export function useChapter() {
  return useContext(ChapterCtx)
}
