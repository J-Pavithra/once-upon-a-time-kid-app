import { lazy } from 'react'

// Page components are code-split per file: a chapter's screens only download
// when that chapter is opened. Data modules (units, foods, moments) stay eager
// because the registry below needs their slugs to build the routes.
const Cover = lazy(() => import('../pages/Cover.jsx'))
const Meet = lazy(() => import('../pages/Meet.jsx'))
const StoryWheel = lazy(() => import('../pages/StoryWheel.jsx'))
const StoryBread = lazy(() => import('../pages/StoryBread.jsx'))
const StorySwap = lazy(() => import('../pages/StorySwap.jsx'))
const StoryMoney = lazy(() => import('../pages/StoryMoney.jsx'))
const StoryWriting = lazy(() => import('../pages/StoryWriting.jsx'))
const StoryHomes = lazy(() => import('../pages/StoryHomes.jsx'))
const StoryNeedWantIntro = lazy(() => import('../pages/StoryNeedWantIntro.jsx'))
const StoryPiggy = lazy(() => import('../pages/StoryPiggy.jsx'))
const StoryJobs = lazy(() => import('../pages/StoryJobs.jsx'))
const StoryTravel = lazy(() => import('../pages/StoryTravel.jsx'))
const StorySchool = lazy(() => import('../pages/StorySchool.jsx'))
const ActivityCoins = lazy(() => import('../pages/ActivityCoins.jsx'))
const ActivityMatch = lazy(() => import('../pages/ActivityMatch.jsx'))
const ActivityNeedWant = lazy(() => import('../pages/ActivityNeedWant.jsx'))
const ActivityMaze = lazy(() => import('../pages/ActivityMaze.jsx'))
const Certificate = lazy(() => import('../pages/Certificate.jsx'))

const HelloFoodCover = lazy(() => import('../chapters/hello-food/Cover.jsx'))
const Kitchen = lazy(() => import('../chapters/hello-food/Kitchen.jsx'))
const FoodRunner = lazy(() => import('../chapters/hello-food/FoodRunner.jsx'))
import { FOODS, foodActivityKey } from '../chapters/hello-food/foods.js'

const HangulCover = lazy(() => import('../chapters/hello-hangul/Cover.jsx'))
const HangulUnitMap = lazy(() => import('../chapters/hello-hangul/UnitMap.jsx'))
const HangulUnitRunner = lazy(() => import('../chapters/hello-hangul/UnitRunner.jsx'))
import { UNITS as HANGUL_UNITS, ALL_ACTIVITY_KEYS as HANGUL_KEYS, unitActivityKey as hangulKey } from '../chapters/hello-hangul/units.js'

// Say Something is clubbed under the Hangul chapter as Part 2 (`s-` prefix),
// Yesterday, Today is Part 3 (`y-` prefix), Let's Make a Plan is Part 4
// (`p-` prefix). One library card, four parts — the full Korean track.
const SsUnitRunner = lazy(() => import('../chapters/say-something/UnitRunner.jsx'))
import { UNITS as SS_UNITS, ALL_ACTIVITY_KEYS as SS_KEYS, unitActivityKey as ssKey } from '../chapters/say-something/units.js'
const YtUnitRunner = lazy(() => import('../chapters/yesterday-today/UnitRunner.jsx'))
import { UNITS as YT_UNITS, ALL_ACTIVITY_KEYS as YT_KEYS, unitActivityKey as ytKey } from '../chapters/yesterday-today/units.js'
const PlUnitRunner = lazy(() => import('../chapters/lets-make-a-plan/UnitRunner.jsx'))
import { UNITS as PL_UNITS, ALL_ACTIVITY_KEYS as PL_KEYS, unitActivityKey as plKey } from '../chapters/lets-make-a-plan/units.js'

const GkCover = lazy(() => import('../chapters/grandma-knows-why/Cover.jsx'))
const GkDayMap = lazy(() => import('../chapters/grandma-knows-why/DayMap.jsx'))
const GkMomentRunner = lazy(() => import('../chapters/grandma-knows-why/MomentRunner.jsx'))
const GkBedtime = lazy(() => import('../chapters/grandma-knows-why/BedtimeRunner.jsx'))
const GkJar = lazy(() => import('../chapters/grandma-knows-why/ReasonJar.jsx'))
import { MOMENTS, BEDTIME_MOMENT, ALL_ACTIVITY_KEYS as GK_KEYS, momentActivityKey } from '../chapters/grandma-knows-why/moments.js'

/**
 * Chapter model
 *  A chapter is one interactive book. Each object here becomes a route under `/{id}/...`.
 *  Fields:
 *    id, title, subtitle, tagline, emoji, accent, heroBg, ages
 *    activities   — array of activity keys the chapter tracks completion for
 *    milestones   — map of pageIndex → { emoji, title, note } (title supports {name})
 *    pages        — page routes under this chapter
 *      { path, Component, label, emoji, kind, activityKey? }
 *      path === '' is the index route (chapter cover).
 *      kind: 'cover' | 'meet' | 'story' | 'activity' | 'end' | 'map' | 'case'
 *  To add a chapter: build page components under src/chapters/<id>/ and push here.
 */

const helloFoodPages = [
  { path: '',        Component: HelloFoodCover, label: 'Cover',   emoji: '🧺', kind: 'cover' },
  { path: 'kitchen', Component: Kitchen,        label: 'Kitchen', emoji: '🍽️', kind: 'map' },
  ...FOODS.map(f => ({
    path: `food-${f.slug}`,
    Component: FoodRunner,
    label: f.name,
    emoji: '🥣',
    kind: 'activity',
    activityKey: foodActivityKey(f.slug),
  })),
]

const grandmaPages = [
  { path: '',       Component: GkCover,        label: 'Cover',      emoji: '👵', kind: 'cover' },
  { path: 'day',    Component: GkDayMap,       label: 'The day',    emoji: '🏠', kind: 'map' },
  { path: 'jar',    Component: GkJar,          label: 'Reason Jar', emoji: '🫙', kind: 'reference' },
  ...MOMENTS.map(m => ({
    path: `m-${m.slug}`, Component: GkMomentRunner,
    label: `${String(m.n).padStart(2, '0')} · ${m.title}`,
    emoji: '🌤️', kind: 'moment',
    activityKey: momentActivityKey(m.slug),
  })),
  { path: `m-${BEDTIME_MOMENT.slug}`, Component: GkBedtime, label: '10 · Bedtime', emoji: '🌙', kind: 'moment', activityKey: momentActivityKey(BEDTIME_MOMENT.slug) },
]

export const chapters = [
  {
    id: 'once-upon-a-thing',
    title: 'Once Upon a Thing',
    subtitle: 'Where do wheels, bread and money come from?',
    tagline: 'A first look at long ago and swapping.',
    emoji: '📖',
    accent: '#E8763A',
    heroBg: 'linear-gradient(135deg,#F6C34F 0%, #E8763A 100%)',
    ages: 'for curious 5-year-olds',
    activities: ['coins', 'match', 'needwant', 'maze'],
    milestones: {
      2:  { emoji: '🚀', title: 'Off we go{name}!',           note: 'Your adventure begins.' },
      5:  { emoji: '⭐', title: "You're doing great{name}!",  note: 'Read 6 of 18 pages.' },
      8:  { emoji: '🌟', title: 'Halfway there{name}!',       note: 'Read 9 of 18 pages.' },
      11: { emoji: '🎉', title: 'Nearly done{name}!',         note: 'Read 12 of 18 pages.' },
      13: { emoji: '🎯', title: 'Activity time{name}!',       note: "Let's see what you remember." },
      17: { emoji: '🏆', title: 'You did it{name}!',          note: 'All the way to the end.' },
    },
    pages: [
      { path: '',               Component: Cover,              label: 'Cover',               emoji: '📖', kind: 'cover' },
      { path: 'meet',           Component: Meet,               label: 'Meet Mira & Pip',     emoji: '👋', kind: 'meet' },
      { path: 'wheel',          Component: StoryWheel,         label: 'The Wheel',           emoji: '☸️',  kind: 'story' },
      { path: 'bread',          Component: StoryBread,         label: 'Where bread began',   emoji: '🌾', kind: 'story' },
      { path: 'swap',           Component: StorySwap,          label: "Let's swap!",         emoji: '🔄', kind: 'story' },
      { path: 'money',          Component: StoryMoney,         label: 'Why we made money',   emoji: '🪙', kind: 'story' },
      { path: 'writing',        Component: StoryWriting,       label: 'The first squiggles', emoji: '✍️',  kind: 'story' },
      { path: 'homes',          Component: StoryHomes,         label: 'Homes, then and now', emoji: '🏠', kind: 'story' },
      { path: 'needwant-intro', Component: StoryNeedWantIntro, label: 'Need or Want?',       emoji: '❓', kind: 'story' },
      { path: 'piggy',          Component: StoryPiggy,         label: 'The piggy bank',      emoji: '🐷', kind: 'story' },
      { path: 'jobs',           Component: StoryJobs,          label: "Everybody's job",     emoji: '👷', kind: 'story' },
      { path: 'travel',         Component: StoryTravel,        label: 'Getting around',      emoji: '✈️',  kind: 'story' },
      { path: 'school',         Component: StorySchool,        label: 'School long ago',     emoji: '📝', kind: 'story' },
      { path: 'coins',          Component: ActivityCoins,      label: 'Count the coins',     emoji: '🪙', kind: 'activity', activityKey: 'coins' },
      { path: 'match',          Component: ActivityMatch,      label: 'Old & new',           emoji: '🔗', kind: 'activity', activityKey: 'match' },
      { path: 'needwant',       Component: ActivityNeedWant,   label: 'Need or want?',       emoji: '💧', kind: 'activity', activityKey: 'needwant' },
      { path: 'maze',           Component: ActivityMaze,       label: 'To the shop!',        emoji: '🏪', kind: 'activity', activityKey: 'maze' },
      { path: 'done',           Component: Certificate,        label: 'Certificate',         emoji: '🏆', kind: 'end' },
    ],
  },
  {
    id: 'hello-food',
    title: 'Hello, Food!',
    subtitle: 'Pip has a basket. Something is inside.',
    tagline: 'Twelve foods for very small children.',
    emoji: '🧺',
    accent: '#E8763A',
    heroBg: 'linear-gradient(135deg,#FFD9C0 0%, #F19A8E 100%)',
    ages: 'for toddlers · every tap works',
    activities: FOODS.map(f => foodActivityKey(f.slug)),
    milestones: {},
    pages: helloFoodPages,
  },
  {
    id: 'hello-hangul',
    title: 'Hello, Hangul!',
    subtitle: 'Read Korean, speak it, talk about yesterday, plan tomorrow. 55 units, TOPIK 1 by the end.',
    tagline: 'The full Korean track — alphabet to first real conversation.',
    emoji: '한',
    accent: '#E8763A',
    heroBg: 'linear-gradient(135deg,#FFF3C4 0%, #F19A8E 100%)',
    ages: 'for readers who want a new alphabet',
    // Chapter tracks completion for all four parts.
    activities: [...HANGUL_KEYS, ...SS_KEYS, ...YT_KEYS, ...PL_KEYS],
    milestones: {},
    pages: [
      { path: '',     Component: HangulCover,      label: 'Cover',    emoji: '한', kind: 'cover' },
      { path: 'map',  Component: HangulUnitMap,    label: 'Units',    emoji: '📚', kind: 'map' },
      // Part 1 · Hello, Hangul! — the writing system
      ...HANGUL_UNITS.map(u => ({
        path: `u-${u.slug}`, Component: HangulUnitRunner,
        label: `${String(u.n).padStart(2, '0')} · ${u.title}`,
        emoji: '한', kind: 'unit',
        activityKey: hangulKey(u.slug),
      })),
      // Part 2 · Say Something — grammar and sentences
      ...SS_UNITS.map(u => ({
        path: `s-${u.slug}`, Component: SsUnitRunner,
        label: `${String(u.n).padStart(2, '0')} · ${u.title}`,
        emoji: '말', kind: 'unit',
        activityKey: ssKey(u.slug),
      })),
      // Part 3 · Yesterday, Today — past tense, time, counters
      ...YT_UNITS.map(u => ({
        path: `y-${u.slug}`, Component: YtUnitRunner,
        label: `${String(u.n).padStart(2, '0')} · ${u.title}`,
        emoji: '어제', kind: 'unit',
        activityKey: ytKey(u.slug),
      })),
      // Part 4 · Let's Make a Plan — adjectives, connectors, future, requests
      ...PL_UNITS.map(u => ({
        path: `p-${u.slug}`, Component: PlUnitRunner,
        label: `${String(u.n).padStart(2, '0')} · ${u.title}`,
        emoji: '계획', kind: 'unit',
        activityKey: plKey(u.slug),
      })),
    ],
  },
  {
    id: 'grandma-knows-why',
    title: 'Grandma Knows Why',
    subtitle: "A whole day at Grandma's. Every rule has a reason.",
    tagline: 'Because \"because I said so\" was never enough.',
    emoji: '👵',
    accent: '#A46BE8',
    heroBg: 'linear-gradient(135deg,#F2E9FF 0%, #A46BE8 100%)',
    ages: 'for older kids · read together',
    activities: GK_KEYS,
    milestones: {},
    pages: grandmaPages,
  },
]

// Placeholder cards on the Library — replace with real chapters as they ship.
export const upcomingChapters = [
  { id: 'once-upon-a-place', title: 'Once Upon a Place', subtitle: 'Where do towns and cities come from?', emoji: '🏙️', accent: '#6BB6DC', heroBg: 'linear-gradient(135deg,#A5D8F3,#6BB6DC)' },
]

export function chapterFromPathname(pathname) {
  return chapters.find(c => pathname === `/${c.id}` || pathname.startsWith(`/${c.id}/`))
}
