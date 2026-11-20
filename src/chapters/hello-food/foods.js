// Twelve foods for the Hello, Food! chapter.
// Each one runs the same 5-screen shape: knock knock → open → journey → silly → grown-up card.
// Only the food-specific bits (art, sound, journey origin, silly bit, tip) differ.

import { BananaClosed } from './food-art/Banana.jsx'
import { PeasClosed } from './food-art/Peas.jsx'
import { EggClosed } from './food-art/Egg.jsx'
import { MangoClosed } from './food-art/Mango.jsx'
import { CarrotClosed } from './food-art/Carrot.jsx'
import { OrangeClosed } from './food-art/Orange.jsx'
import { TomatoClosed } from './food-art/Tomato.jsx'
import { RiceGrains } from './food-art/Rice.jsx'
import { CoconutClosed } from './food-art/Coconut.jsx'
import { MilkGlass } from './food-art/Milk.jsx'
import { DoughBall } from './food-art/Dough.jsx'
import { AppleClosed } from './food-art/Apple.jsx'

export const FOODS = [
  {
    slug: 'banana', name: 'banana', adjective: 'sweet',
    color: '#F6C93D', sceneBg: 'butter',
    ClosedArt: BananaClosed,
    openHint: 'Tap to peel', openSound: 'peel', openSteps: 3,
    journey: [
      { emoji: '🌴', label: 'on the tree' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🥣', label: 'in your bowl' },
    ],
    silly: { emoji: '🐒', text: 'A monkey wants a bite!' },
    grownup: "Next time you have a banana, let them peel it themselves — small hands love the pull.",
  },
  {
    slug: 'peas', name: 'peas', adjective: 'green',
    color: '#8FC96C', sceneBg: 'mint',
    ClosedArt: PeasClosed,
    openHint: 'Tap to pop', openSound: 'pop', openSteps: 3,
    journey: [
      { emoji: '🌿', label: 'in the field' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🥣', label: 'in your bowl' },
    ],
    silly: { emoji: '⛵', text: 'The pod is a little boat.' },
    grownup: "Let them pop the pods open — the tiny snap is half the fun.",
  },
  {
    slug: 'egg', name: 'egg', adjective: 'smooth',
    color: '#FBEFDC', sceneBg: 'cream',
    ClosedArt: EggClosed,
    openHint: 'Tap to crack', openSound: 'crack', openSteps: 3,
    journey: [
      { emoji: '🐔', label: 'from the hen' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🍳', label: 'in the pan' },
    ],
    silly: { emoji: '🐣', text: 'A chick peeks out!' },
    grownup: "Egg shells are a lovely first \"crack it on the bowl\" moment.",
  },
  {
    slug: 'mango', name: 'mango', adjective: 'juicy',
    color: '#F6A02D', sceneBg: 'blush',
    ClosedArt: MangoClosed,
    openHint: 'Tap to peel', openSound: 'peel', openSteps: 3,
    journey: [
      { emoji: '🌳', label: 'on the tree' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🥣', label: 'in your bowl' },
    ],
    silly: { emoji: '🦜', text: 'A parrot loves mango too.' },
    grownup: "Show them the big flat seed — it always surprises small children.",
  },
  {
    slug: 'carrot', name: 'carrot', adjective: 'crunchy',
    color: '#E8763A', sceneBg: 'blush',
    ClosedArt: CarrotClosed,
    openHint: 'Tap to pull', openSound: 'pull', openSteps: 3,
    journey: [
      { emoji: '🌱', label: 'in the soil' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🥕', label: 'on your plate' },
    ],
    silly: { emoji: '🐰', text: 'A bunny thinks it\'s dinner.' },
    grownup: "Carrots grow underground. That is a fun new fact for most toddlers.",
  },
  {
    slug: 'orange', name: 'orange', adjective: 'juicy',
    color: '#F58F1F', sceneBg: 'butter',
    ClosedArt: OrangeClosed,
    openHint: 'Tap to open', openSound: 'peel', openSteps: 3,
    journey: [
      { emoji: '🌳', label: 'on the tree' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🥣', label: 'in your bowl' },
    ],
    silly: { emoji: '⭐', text: 'Little sun-sections.' },
    grownup: "Peel one segment for them — then let them pull the rest apart.",
  },
  {
    slug: 'tomato', name: 'tomato', adjective: 'red',
    color: '#E23F2F', sceneBg: 'blush',
    ClosedArt: TomatoClosed,
    openHint: 'Tap to slice', openSound: 'slice', openSteps: 3,
    journey: [
      { emoji: '🌿', label: 'on the vine' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🍅', label: 'on your plate' },
    ],
    silly: { emoji: '👀', text: 'So many tiny seeds inside!' },
    grownup: "Slice one across in front of them — the seed pattern is a first look at how a fruit is built.",
  },
  {
    slug: 'rice', name: 'rice', adjective: 'warm',
    color: '#FBEFDC', sceneBg: 'cream',
    ClosedArt: RiceGrains,
    openHint: 'Tap to cook', openSound: 'squish', openSteps: 3,
    journey: [
      { emoji: '🌾', label: 'in the field' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🥣', label: 'in your bowl' },
    ],
    silly: { emoji: '💨', text: 'Steamy hot!' },
    grownup: "A handful of dry rice in a jar makes a great shaker.",
  },
  {
    slug: 'coconut', name: 'coconut', adjective: 'hard',
    color: '#7A4A2F', sceneBg: 'cream',
    ClosedArt: CoconutClosed,
    openHint: 'Tap to crack', openSound: 'crack', openSteps: 3,
    journey: [
      { emoji: '🌴', label: 'up the palm' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🥣', label: 'in your bowl' },
    ],
    silly: { emoji: '💦', text: 'Water was hiding inside!' },
    grownup: "There is water inside — let them shake it and hear the slosh.",
  },
  {
    slug: 'milk', name: 'milk', adjective: 'creamy',
    color: '#FFFFFF', sceneBg: 'sky',
    ClosedArt: MilkGlass,
    openHint: 'Tap to pour', openSound: 'splash', openSteps: 3,
    journey: [
      { emoji: '🐄', label: 'from the cow' },
      { emoji: '🧺', label: 'to the kitchen' },
      { emoji: '🥣', label: 'to the bowl' },
    ],
    silly: { emoji: '🌙', text: 'It sets while you sleep.' },
    grownup: "Warm milk + a spoon of curd, left overnight, becomes curd. Magic to a toddler.",
  },
  {
    slug: 'dough', name: 'dough', adjective: 'soft',
    color: '#F5E7C9', sceneBg: 'butter',
    ClosedArt: DoughBall,
    openHint: 'Tap to knead', openSound: 'squish', openSteps: 4,
    journey: [
      { emoji: '🌾', label: 'wheat' },
      { emoji: '⚙️', label: 'flour' },
      { emoji: '🍞', label: 'bread' },
    ],
    silly: { emoji: '🎈', text: 'It puffs up!' },
    grownup: "A small blob of dough is the best toddler-safe play thing there is.",
  },
  {
    slug: 'apple', name: 'apple', adjective: 'crunchy',
    color: '#D93B3B', sceneBg: 'blush',
    ClosedArt: AppleClosed,
    openHint: 'Tap to slice', openSound: 'slice', openSteps: 3,
    journey: [
      { emoji: '🌳', label: 'on the tree' },
      { emoji: '🧺', label: 'in the basket' },
      { emoji: '🥣', label: 'in your bowl' },
    ],
    silly: { emoji: '⭐', text: 'A tiny star inside!' },
    grownup: "Cut one across (not down) so they can see the star of seeds.",
  },
]

export function foodBySlug(slug) { return FOODS.find(f => f.slug === slug) }
export function foodActivityKey(slug) { return `food-${slug}` }
