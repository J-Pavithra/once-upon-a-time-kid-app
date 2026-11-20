# Once Upon a Time — kid app

An interactive children's-book library that runs entirely in the browser.
Mira, Pip the owl and their friends read stories aloud, play little activities,
and hand out certificates. Four chapters are included, from toddler taps to a
full beginner Korean course.

**Live:** https://j-pavithra.github.io/once-upon-a-time-kid-app/

> Runs entirely in your browser — no accounts, no servers, no tracking; voices
> come from your device.

## Chapters

| Chapter | Audience | What it is |
| --- | --- | --- |
| **Once Upon a Thing** | for curious 5-year-olds | 18-page reader: where wheels, bread, money and writing came from, with four activities and a certificate |
| **Hello, Food!** | for toddlers · every tap works | Twelve foods in Pip's kitchen; every tap talks |
| **Hello, Hangul!** | for readers who want a new alphabet | 55-unit beginner Korean track, alphabet → TOPIK 1, Hangul-only toggle, Revised Romanization throughout |
| **Grandma Knows Why** | for older kids · read together | A whole day at Grandma's where every rule has a reason, collected in the Reason Jar |

Progress, names and settings are saved in your browser's `localStorage` only.

## Quick start

```bash
git clone https://github.com/J-Pavithra/once-upon-a-time-kid-app.git
cd once-upon-a-time-kid-app
npm install
npm run dev
```

Other scripts: `npm run build` (static site in `dist/`), `npm run preview`
(serve the build), `npm run lint`.

Requires Node 20 or newer.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site on every push to
`main` and publishes it with GitHub Pages. One-time setup after your first
push: on GitHub open **Settings → Pages** and set **Source** to **GitHub
Actions**.

The build is run with `VITE_BASE=/once-upon-a-time-kid-app/` so assets and
routes resolve under the project path. If you fork this under a different repo
name, change that value in the workflow to `/<your-repo-name>/`. `dist/404.html`
is a copy of `index.html` so deep links such as `/hello-food/kitchen` load on
Pages.

## Known limits

- **Speech comes from your operating system.** The app uses the Web Speech API,
  so voice quality and availability depend on the device.
- **Korean needs a Korean voice.** macOS and iOS: Settings → Accessibility →
  Spoken Content → Voices → add Korean. Windows: Settings → Time & Language →
  Language → add Korean with the speech pack. Without one, the Hangul chapter
  shows a one-time hint and Yuna stays quiet or is read by a non-Korean voice.
- **Fonts load from Google Fonts.** That is the only network request the app
  makes.

## Folder layout

```
src/
  pages/               Once Upon a Thing — the original 18-page reader
  chapters/
    hello-food/        Hello, Food!
    hello-hangul/      Hello, Hangul! Part 1 — the alphabet
    say-something/     Hello, Hangul! Part 2 — first sentences
    yesterday-today/   Hello, Hangul! Part 3 — past tense, time, counters
    lets-make-a-plan/  Hello, Hangul! Part 4 — adjectives, connectors, plans
    grandma-knows-why/ Grandma Knows Why
  components/          Shared UI (AppShell, characters, chalkboards, toasts)
  context/             Chapter context provider
  data/chapters.js     Chapter registry — add a chapter by pushing an entry here
  lib/                 tts.js (Web Speech), sound.js (WebAudio effects), storage.js (localStorage)
  styles.css           Global styles
public/                Icons and static files
```

## Contributing

1. Fork and create a branch.
2. `npm run lint` and `npm run build` must pass.
3. Keep it browser-only: no servers, accounts, API keys or trackers.
4. Open a pull request describing what changed and which chapter it touches.

Issues and ideas for new chapters are welcome.

## License

MIT — see [LICENSE](LICENSE). Stories, characters, artwork and the Korean
curriculum are © 2026 Pavithra J and released under the same license.

---

This project began life on Zoho Catalyst (Slate hosting + serverless functions)
as *Once Upon a Thing*; this edition is the browser-only port.
