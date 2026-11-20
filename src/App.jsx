import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { chapters } from './data/chapters.js'
import { ChapterProvider } from './context/ChapterContext.jsx'
import Library from './pages/Library.jsx'

// Shown for the brief moment a chapter's code is downloading.
function PageLoading() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span aria-hidden="true">📖</span> Loading…
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Library />} />

      {chapters.map(ch => (
        <Route key={ch.id} path={ch.id} element={<ChapterProvider chapterId={ch.id} />}>
          {ch.pages.map(p => {
            const Comp = p.Component
            const el = <Suspense fallback={<PageLoading />}><Comp /></Suspense>
            return p.path === ''
              ? <Route key="index" index element={el} />
              : <Route key={p.path} path={p.path} element={el} />
          })}
        </Route>
      ))}

      <Route path="/app" element={<Navigate to="/" replace />} />
      <Route path="/app/*" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
