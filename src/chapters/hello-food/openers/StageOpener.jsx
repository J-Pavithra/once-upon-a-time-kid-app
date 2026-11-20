import { useState } from 'react'
import { peelSound, crunch, squish, splash, slice, pop, crackle, ding } from '../../../lib/sound.js'
import * as Banana from '../food-art/Banana.jsx'
import * as Peas from '../food-art/Peas.jsx'
import * as Egg from '../food-art/Egg.jsx'
import * as Mango from '../food-art/Mango.jsx'
import * as Carrot from '../food-art/Carrot.jsx'
import * as Orange from '../food-art/Orange.jsx'
import * as Tomato from '../food-art/Tomato.jsx'
import * as Rice from '../food-art/Rice.jsx'
import * as Coconut from '../food-art/Coconut.jsx'
import * as Milk from '../food-art/Milk.jsx'
import * as Dough from '../food-art/Dough.jsx'
import * as Apple from '../food-art/Apple.jsx'

// Tap-to-progress opener: at step 0 you see the CLOSED food. Each tap opens it more.
export default function StageOpener({ food, onDone }) {
  const [step, setStep] = useState(0)
  const steps = food.openSteps || 3
  const t = step === 0 ? 0 : step / steps

  function tap() {
    if (step >= steps) return
    const nextStep = step + 1
    setStep(nextStep)
    const soundMap = { peel: peelSound, pop: pop, crack: crackle, pull: squish, slice: slice, squish, splash, crunch, ding }
    const s = soundMap[food.openSound] || pop
    s()
    if (nextStep >= steps) {
      setTimeout(() => { ding(); onDone() }, 900)
    }
  }

  const bigSize = 400
  const artProps = { size: bigSize, peel: t, open: t, crack: t, pull: t, cut: t, pour: t, knead: t, steam: t }
  const openArt = {
    banana: <Banana.BananaPeeled {...artProps} />,
    peas: <Peas.PeasOpen {...artProps} />,
    egg: <Egg.EggCracked {...artProps} />,
    mango: <Mango.MangoOpen {...artProps} />,
    carrot: <Carrot.CarrotPulled {...artProps} />,
    orange: <Orange.OrangeSegments {...artProps} />,
    tomato: <Tomato.TomatoSliced {...artProps} />,
    rice: t < 0.99 ? <Rice.RiceGrains {...artProps} /> : <Rice.RiceBowl steam={1} size={bigSize} />,
    coconut: <Coconut.CoconutCracked {...artProps} />,
    milk: t < 0.99 ? <Milk.MilkGlass {...artProps} /> : <Milk.Curd size={bigSize} />,
    dough: t < 0.99 ? <Dough.DoughBall {...artProps} /> : <Dough.BreadLoaf size={bigSize} />,
    apple: <Apple.AppleCut {...artProps} />,
  }

  return (
    <div className={`hf-scene ${food.sceneBg || ''}`} onClick={tap} role="button" tabIndex={0}>
      <div key={step} className="hf-popin" style={{ animationDuration: '400ms' }}>
        {step === 0 ? <food.ClosedArt size={bigSize} /> : openArt[food.slug]}
      </div>
      {step < steps && (
        <div className="hf-tap-hint">{food.openHint || 'Tap to open'}</div>
      )}
    </div>
  )
}
