import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FOODS, foodActivityKey } from './foods.js'
import ResetButton from '../../components/ResetButton.jsx'
import { isDone, getScore } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import { pop, ding } from '../../lib/sound.js'
import { speak } from '../../lib/tts.js'
import './theme.css'

export default function Kitchen() {
  const navigate = useNavigate()
  const chapter = useChapter()
  const [, force] = useState(0)
  const score = getScore(chapter.id, chapter.activities)

  function openFood(food) {
    pop()
    if (isDone(chapter.id, foodActivityKey(food.slug))) {
      // Already met — replay the name, and let them open again from anywhere
      ding(); speak(food.name)
    }
    navigate(`/${chapter.id}/food-${food.slug}`)
  }

  return (
    <div className="hf">
      <div className="hf-app">
        <div className="hf-topbar">
          <Link to="/" className="hf-pill">← Library</Link>
          <span className="spacer" />
          <span className="hf-pill" style={{ background: score.count === score.total ? '#DFF5D3' : 'var(--hf-cream-2)' }}>
            met {score.count} of {score.total}
          </span>
          <ResetButton
            chapterId={chapter.id}
            className="hf-pill"
            label="↺ Start over"
            note="Every food will go back to unmet so you can meet them again."
            onReset={() => force(x => x + 1)}
          />
        </div>

        <div className="hf-word" style={{ fontSize: 30, textAlign: 'left' }}>The kitchen</div>
        <div className="hf-adj" style={{ textAlign: 'left', marginBottom: 6 }}>Tap a basket to meet a food.</div>

        <div className="hf-shelf">
          {FOODS.map((f, i) => {
            const met = isDone(chapter.id, foodActivityKey(f.slug))
            return (
              <button
                key={f.slug}
                className={`hf-tile ${met ? 'met' : 'unmet'}`}
                onClick={() => openFood(f)}
                style={{ background: met ? f.color + '22' : undefined, font: 'inherit', color: 'inherit' }}
                aria-label={met ? f.name : `unmet food ${i + 1}`}
              >
                {met ? (
                  <>
                    <f.ClosedArt size={96} />
                    <span className="name-chip">{f.name}</span>
                  </>
                ) : (
                  <div style={{ fontSize: 44, opacity: 0.6 }}>🧺</div>
                )}
              </button>
            )
          })}
        </div>

        {score.count === score.total && (
          <div className="hf-grownup" style={{ marginTop: 8 }}>
            <div className="icon">🎉</div>
            <div>
              <div className="label">ALL MET!</div>
              <div className="tip">Twelve foods, twelve hellos. Tap any tile again to hear its name.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
