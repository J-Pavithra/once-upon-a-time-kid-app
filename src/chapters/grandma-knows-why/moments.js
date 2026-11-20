import BubbleWash from './interactions/BubbleWash.jsx'
import RunOrWalk from './interactions/RunOrWalk.jsx'
import AskBox from './interactions/AskBox.jsx'
import SayHello from './interactions/SayHello.jsx'
import ServePlates from './interactions/ServePlates.jsx'
import WaitForEnd from './interactions/WaitForEnd.jsx'
import LoudToSoft from './interactions/LoudToSoft.jsx'
import CarryBags from './interactions/CarryBags.jsx'
import SorryFix from './interactions/SorryFix.jsx'

// The 10 daytime moments + the special bedtime moment (11).
// Text uses "{elder}" as a placeholder → replaced at render time with the child's chosen elder name.

export const MOMENTS = [
  {
    n: 1, slug: 'wash', title: 'Hands first', time: 'MORNING', tint: 'sky',
    grandma: '"Hands first, then breakfast."',
    reason: "Hands touch a hundred things before breakfast — the gate, the cat, the floor. You can't see what they picked up. Little bugs love to catch a ride.",
    memoryProps: [{ emoji: '🚪', x: 90, y: 170 }, { emoji: '🐱', x: 180, y: 190 }, { emoji: '👐', x: 300, y: 170 }],
    prompt: 'Rub the screen to wash your hands.',
    Interaction: BubbleWash,
    warm: 'Clean hands, warm chapatti.',
    reasonObj: '🫧', reasonLabel: 'bubble',
  },
  {
    n: 2, slug: 'wet-floor', title: 'The floor is wet', time: 'MORNING', tint: 'tomato',
    grandma: '"Walk, kanna. The floor is wet."',
    reason: "See this small white scar on {elder}'s knee? She was seven. The floor was wet. She was in a hurry. The scar has been there ever since.",
    memoryProps: [{ emoji: '💧', x: 90, y: 190 }, { emoji: '🩹', x: 260, y: 200 }],
    prompt: 'What will you do?',
    Interaction: RunOrWalk,
    warm: 'Slow feet, safe knees.',
    reasonObj: '🪨', reasonLabel: 'scar-pebble',
  },
  {
    n: 3, slug: 'ask-first', title: 'Ask before you take', time: 'MORNING', tint: 'grape',
    grandma: '"That\'s Thatha\'s box. Ask him first."',
    reason: "Things belong to people. A thing given feels different from a thing taken — even when it's the same thing.",
    memoryProps: [{ emoji: '🎁', x: 120, y: 180 }, { emoji: '🤲', x: 280, y: 190 }],
    prompt: 'Ask Thatha for the box.',
    Interaction: AskBox,
    warm: 'Given with both hands.',
    reasonObj: '📦', reasonLabel: 'wooden box',
  },
  {
    n: 4, slug: 'say-hello', title: 'Say hello to Aunty', time: 'MIDDAY', tint: 'sun',
    grandma: '"Come out and say hello."',
    reason: "Do you remember last week, when Aunty said your name? How lovely that felt? A hello is that same warm thing, given back.",
    memoryProps: [{ emoji: '👋', x: 110, y: 170 }, { emoji: '😊', x: 300, y: 170 }],
    prompt: 'Say hello.',
    Interaction: SayHello,
    warm: 'A warm hello, both ways.',
    reasonObj: '👋', reasonLabel: 'waving hand',
  },
  {
    n: 5, slug: 'wait-served', title: 'Everyone together', time: 'MIDDAY', tint: 'grass',
    grandma: '"Wait. Everyone together."',
    reason: "Starting together is the nicest part of a meal. {elder} once ate alone. She still remembers how quiet the room was.",
    memoryProps: [{ emoji: '🍽️', x: 120, y: 180 }, { emoji: '🕰️', x: 300, y: 190 }],
    prompt: 'Fill every plate before you begin.',
    Interaction: ServePlates,
    warm: 'Together, we begin.',
    reasonObj: '🍛', reasonLabel: 'full plate',
  },
  {
    n: 6, slug: 'let-me-finish', title: 'Let me finish', time: 'MIDDAY', tint: 'sand',
    grandma: '"Wait for the end, kanna."',
    reason: "The ending is where the story lives. If you guess halfway, the real ending stays hidden — and it is almost always different.",
    memoryProps: [{ emoji: '📖', x: 130, y: 180 }, { emoji: '✨', x: 300, y: 190 }],
    prompt: 'Wait for the whole story.',
    Interaction: WaitForEnd,
    warm: 'A story finished together.',
    reasonObj: '📖', reasonLabel: 'closed book',
  },
  {
    n: 7, slug: 'soft-voice', title: 'Softly, Thambi is sleeping', time: 'EVENING', tint: 'sky',
    grandma: '"Softly now. Your brother is sleeping."',
    reason: "Even when you can't see them, other people's needs are happening right now. A little quiet is a kind of gift.",
    memoryProps: [{ emoji: '👶', x: 110, y: 180 }, { emoji: '🌙', x: 300, y: 100 }],
    prompt: 'Slide the noise from LOUD to soft.',
    Interaction: LoudToSoft,
    warm: 'Thambi settles. The room warms.',
    reasonObj: '🌙', reasonLabel: 'sleeping moon',
  },
  {
    n: 8, slug: 'carry-bags', title: 'Carry it with me', time: 'EVENING', tint: 'tomato',
    grandma: '(nothing — she is struggling with the bags)',
    reason: "Nobody asked. You noticed. That is the whole thing — the noticing comes before the asking.",
    memoryProps: [{ emoji: '🛍️', x: 110, y: 170 }, { emoji: '❤️', x: 300, y: 170 }],
    prompt: 'Take a bag.',
    Interaction: CarryBags,
    warm: '{elder} stands a little taller.',
    reasonObj: '🛍️', reasonLabel: 'cloth bag',
  },
  {
    n: 9, slug: 'sorry', title: 'Say sorry properly', time: 'EVENING', tint: 'grape',
    grandma: '"Sorry is a start. What comes after?"',
    reason: "The word is not the apology. The mending is. Saying sorry makes the beginning — helping fix things makes the end.",
    memoryProps: [{ emoji: '🍵', x: 110, y: 180 }, { emoji: '🩹', x: 300, y: 190 }],
    prompt: 'Which one feels finished?',
    Interaction: SorryFix,
    warm: 'Together, mended.',
    reasonObj: '🍵', reasonLabel: 'mended cup',
  },
]

export const BEDTIME_MOMENT = {
  n: 10, slug: 'bedtime', title: 'A rule of your own', time: 'BEDTIME', tint: 'warm',
  reasonObj: '🪔', reasonLabel: 'little lamp',
}

export function momentBySlug(slug) {
  if (slug === BEDTIME_MOMENT.slug) return BEDTIME_MOMENT
  return MOMENTS.find(m => m.slug === slug)
}

export function momentActivityKey(slug) { return `mom-${slug}` }

export const ALL_ACTIVITY_KEYS = [...MOMENTS.map(m => momentActivityKey(m.slug)), momentActivityKey(BEDTIME_MOMENT.slug)]
