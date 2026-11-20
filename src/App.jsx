import { Routes, Route, Navigate } from 'react-router-dom'
import { chapters } from './data/chapters.js'
import { ChapterProvider } from './context/ChapterContext.jsx'
import Library from './pages/Library.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Library />} />

      {chapters.map(ch => (
        <Route key={ch.id} path={ch.id} element={<ChapterProvider chapterId={ch.id} />}>
          {ch.pages.map(p => {
            const Comp = p.Component
            return p.path === ''
              ? <Route key="index" index element={<Comp />} />
              : <Route key={p.path} path={p.path} element={<Comp />} />
          })}
        </Route>
      ))}

      <Route path="/app" element={<Navigate to="/" replace />} />
      <Route path="/app/*" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
