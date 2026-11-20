# Once Upon a Time Kid App — Browser-Only Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a new open-source repo, `once-upon-a-time-kid-app`, that carries 4 of the reference app's 7 chapters and runs with zero backend, deployable to GitHub Pages.

**Architecture:** Copy the reference React 19 + Vite 8 + React Router 7 app, drop the three Catalyst-dependent chapters, and replace the one shared backend call (natural-voice TTS) with the browser's Web Speech API behind the unchanged `speak/stop/isSpeaking` interface. Add a Vite `base` plus a Router `basename` so the same build works at `/` locally and at `/once-upon-a-time-kid-app/` on Pages.

**Tech Stack:** React 19, Vite 8, React Router 7, Web Speech API, GitHub Actions (`actions/deploy-pages`). No test runner exists in the reference and adding one would be a new dependency (forbidden), so verification is `npm run build` + the browser checks in Task 7.

**Spec:** The user's pasted brief (2026-11-19). Phase 1 only; Phase 2 (dependency diet) is a separate, optional plan after push.

## Global Constraints

- Never edit `~/Downloads/once-upon-a-thing` (reference, read-only). Always use absolute paths into the new project.
- Never run `git config --global …`. Per-repo identity only: `user.name "Pavithra J"`, `user.email` = GitHub no-reply address (ask if not given).
- No backend, no fetch to any host. Only allowed network: `fonts.googleapis.com`, `fonts.gstatic.com`.
- No new npm dependencies in Phase 1.
- Don't change chapter content, characters, or Korean curriculum data.
- Don't touch the 17 kept files that import from `src/lib/tts.js` (list in Task 3). `AppShell.jsx` uses `speak`, `stop`, `isSpeaking`.
- `package.json`: `"name": "once-upon-a-time-kid-app"`, `"private": false`, `"repository": "https://github.com/J-Pavithra/once-upon-a-time-kid-app"`, `"build": "vite build && cp dist/index.html dist/404.html"`.
- Live URL: `https://j-pavithra.github.io/once-upon-a-time-kid-app/`. Pages base: `/once-upon-a-time-kid-app/`.
- One commit for Phase 1: `Initial commit — Once Upon a Time kid app (4 chapters, browser-only)`. Show `git status` and `git config user.email` and wait for OK before committing. If push auth fails: stop, do not retry, do not touch Keychain.

## Review Focus

1. **Deep link on Pages** (`/once-upon-a-time-kid-app/hello-food/kitchen`): `BrowserRouter` has no `basename`, so every route would redirect to `/`. Expected: the page renders. Pinned in Task 5 (basename + preview under the Pages base).
2. **Chrome first `getVoices()` is empty** when the Hangul Cover mounts: `hasKoreanVoice()` would return false and the "no Korean voice" card would flash on a device that has one. Expected: card only appears once the voice list is known. Pinned in Task 4 (`voicesLoaded()` guard + `voiceschanged` re-check).
3. **Safari/Firefox never fire `voiceschanged`** (voices are synchronous). Expected: TTS still works and `hasKoreanVoice()` is correct. Pinned in Task 3 (every call reads `getVoices()` live; the cached list is a fallback, not the source of truth).
4. **Korean text when no Korean voice exists**: spec says set `utterance.lang = 'ko-KR'` and let the OS pick, so it may be mispronounced instead of silent. Accepted by the spec; the Task 4 card tells the grown-up how to install a voice.
5. **`speak()` returning sync `undefined`**: `AppShell` passes `speak` as a callback and polls `isSpeaking()`; nothing awaits it today, but keep `speak` `async` so the public contract (returns a Promise) is unchanged. Pinned in Task 3.

---

### Task 1: Copy the reference, excluding Catalyst and dropped chapters

**Files:**
- Create: `~/Downloads/once-upon-a-time-kid-app/` (rsync target)
- Delete: `src/lib/api.js`, `src/components/WordExplain.jsx`
- Modify: `package.json`

- [ ] **Step 1: rsync with excludes**

```bash
rsync -a --exclude node_modules/ --exclude dist/ --exclude .catalystrc --exclude catalyst.json --exclude functions/ \
  --exclude src/chapters/trade-detectives/ --exclude src/chapters/homework/ --exclude src/chapters/what-is-this/ \
  ~/Downloads/once-upon-a-thing/ ~/Downloads/once-upon-a-time-kid-app/
```

- [ ] **Step 2: Verify excludes took effect**

Run: `cd ~/Downloads/once-upon-a-time-kid-app && ls -a && ls src/chapters && ls src/lib src/components`
Expected: no `.catalystrc`, `catalyst.json`, `functions/`, `node_modules/`, `dist/`; `src/chapters` = `grandma-knows-why hello-food hello-hangul lets-make-a-plan say-something yesterday-today`.

- [ ] **Step 3: Delete the two dropped-only files**

`rm src/lib/api.js src/components/WordExplain.jsx`

- [ ] **Step 4: Edit `package.json`** — name, `private: false`, `repository`, and `build` script per Global Constraints. Keep all deps and the `lint`/`preview` scripts.

- [ ] **Step 5: `npm install`** — Expected: completes, `package-lock.json` updated with the new name, no audit-blocking errors.

### Task 2: Unregister the dropped chapters

**Files:**
- Modify: `src/data/chapters.js`

- [ ] **Step 1: Remove the 7 dropped imports** (`TradeCover`, `CaseMap`, `CaseRunner`, `TradeCert`, `CASES`, `HomeworkRunner`, `WhatIsThisRunner`).
- [ ] **Step 2: Remove `const tradeDetectivesPages = [...]`.**
- [ ] **Step 3: Remove the three `chapters` entries** with ids `what-is-this`, `read-my-homework`, `trade-detectives`. Leave `upcomingChapters` and `chapterFromPathname` alone.
- [ ] **Step 4: Verify** — Run: `npm run build`. Expected: exit 0, `dist/404.html` exists. Also `grep -c "id: '" src/data/chapters.js` → `4`.

### Task 3: Web Speech–only `tts.js` and localStorage event counter

**Files:**
- Rewrite: `src/lib/tts.js`
- Modify: `src/chapters/hello-hangul/components/HangulOnlyToggle.jsx`

**Interfaces:**
- Produces (unchanged): `speak(text: string, opts?: { voice?: 'Seoyeon'|'Amy'|string }): Promise<void>`, `stop(): void`, `isSpeaking(): boolean`.
- Produces (new): `hasKoreanVoice(): boolean` — true if any `speechSynthesis` voice has `lang` starting `ko` (case-insensitive). `voicesLoaded(): boolean` — true once `getVoices()` has returned a non-empty list at least once (used by Task 4 to avoid a false hint on Chrome).
- Must not change the 17 importers: `components/AppShell.jsx`, `chapters/grandma-knows-why/ReasonJar.jsx`, `chapters/hello-food/{Kitchen,screens/Journey,screens/KnockKnock,screens/SillyBit}.jsx`, `chapters/hello-hangul/{Cover,UnitMap,UnitRunner}.jsx`, `chapters/hello-hangul/components/{BlockBuilder,LetterCard,VowelMerge,YunasPostcard,ko-parts}.jsx`, `chapters/{lets-make-a-plan,say-something,yesterday-today}/UnitRunner.jsx`. (Cover.jsx is edited in Task 4 only to add the hint, not its `speak` usage.)

- [ ] **Step 1: Rewrite `src/lib/tts.js`**
  - Delete `SAY_IT_NATURAL_URL`, `playNatural`, `currentAudio`/`currentSrc`/`audioUnlocked`, the silent-MP3 unlock block, `stopAudioOnly`.
  - Keep `KOREAN_RE` verbatim.
  - Module load: `let cachedVoices = []`; `function loadVoices() { cachedVoices = speechSynthesis.getVoices() || [] }`; call once, and `speechSynthesis.addEventListener('voiceschanged', loadVoices, { once: true })` when `speechSynthesis` exists. `function voices()` returns live `getVoices()` if non-empty, else `cachedVoices`.
  - `speak`: trim, bail on empty, `stop()`, Korean → voice whose `lang` starts `ko` (set `u.voice` and `u.lang`), else `u.lang = 'ko-KR'` and no voice; rate 0.9 / pitch 1.0. English → rate 0.95 / pitch 1.05 / `lang 'en-GB'`, prefer `/female|zira|samantha|karen|kate|serena|amy/i` name, else first `en*`. `opts.voice` is accepted and ignored except as a hint (Korean hint names like `Seoyeon` may be matched by name if present). Stay `async`.
  - `stop` = `speechSynthesis.cancel()` guarded. `isSpeaking` = `speechSynthesis.speaking` guarded.
  - Export `hasKoreanVoice()` and `voicesLoaded()` per Interfaces.

- [ ] **Step 2: Edit `HangulOnlyToggle.jsx`** — delete `LOG_EVENT_URL`; `logEvent(event)` increments the integer in `localStorage['hh-hangul-only-switch-count']` (parse-int with fallback 0, wrapped in try/catch). Keep the two call sites and the function name.

- [ ] **Step 3: Verify no backend strings remain**

Run: `grep -rniE "catalyst|zia|onslate|catalystserverless|60083084905|say_it_natural|log_event" src/`
Expected: no output. Then `grep -rnE "fetch\(|XMLHttpRequest" src/` → no output.

- [ ] **Step 4: Verify build** — `npm run build` → exit 0. `npm run lint` → no errors (warnings allowed, same as reference).

### Task 4: Korean voice hint on the Hangul cover

**Files:**
- Modify: `src/chapters/hello-hangul/Cover.jsx` (add one import line and one card; leave existing `speak` call as is)

**Interfaces:**
- Consumes: `hasKoreanVoice()`, `voicesLoaded()` from Task 3.
- localStorage key: `hh-korean-voice-hint-dismissed` = `'1'`.

- [ ] **Step 1: Add state + effect** — `const [showHint, setShowHint] = useState(false)`; effect runs `check()` on mount and on `speechSynthesis` `voiceschanged`: `if (voicesLoaded() && !hasKoreanVoice() && localStorage[key] !== '1') setShowHint(true)`. Clean up the listener.
- [ ] **Step 2: Render the card** below the hero card, only when `showHint`: `<div className="hh-card tinted-sun">` with eyebrow `NO KOREAN VOICE FOUND`, body text exactly: "Your device has no Korean voice installed, so Yuna will be quiet. macOS/iOS: Settings → Accessibility → Spoken Content → Voices → add Korean. Windows: Settings → Time & Language → Language → add Korean (speech)." and a `hh-btn small` "Got it" button that sets the localStorage key and hides the card.
- [ ] **Step 3: Verify** — `npm run build` passes. In DevTools on the running app: `speechSynthesis.getVoices().filter(v=>/^ko/i.test(v.lang))` empty ⇒ card visible; click "Got it" ⇒ reload keeps it hidden; `localStorage.removeItem('hh-korean-voice-hint-dismissed')` + reload ⇒ card returns. On a Mac with a Korean voice the card must never appear.

### Task 5: GitHub Pages base path and workflow

**Files:**
- Modify: `vite.config.js`, `src/main.jsx`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: `vite.config.js`** — `base: process.env.VITE_BASE || '/'` inside `defineConfig`.
- [ ] **Step 2: `src/main.jsx`** — `<BrowserRouter basename={import.meta.env.BASE_URL}>`. (Not in the spec but required: without it every Pages deep link redirects to the library. `BASE_URL` is `/` locally so dev is unchanged.)
- [ ] **Step 3: `.github/workflows/deploy.yml`** — `on: push: branches: [main]` + `workflow_dispatch`; `permissions: contents: read, pages: write, id-token: write`; `concurrency: group: pages, cancel-in-progress: true`; single job `deploy` with `environment: github-pages`, `runs-on: ubuntu-latest`: `actions/checkout@v4` → `actions/setup-node@v4` (`node-version: 20`, `cache: npm`) → `npm ci` → `npm run build` with `env: VITE_BASE: /once-upon-a-time-kid-app/` → `actions/configure-pages@v5` → `actions/upload-pages-artifact@v3` (`path: dist`) → `actions/deploy-pages@v4` (id `deployment`, `environment.url: ${{ steps.deployment.outputs.page_url }}`).
- [ ] **Step 4: Verify the Pages build locally**

Run: `VITE_BASE=/once-upon-a-time-kid-app/ npm run build && grep -c '/once-upon-a-time-kid-app/assets/' dist/index.html && diff dist/index.html dist/404.html && npm run preview`
Expected: count ≥ 1, no diff, then open `http://localhost:4173/once-upon-a-time-kid-app/hello-food/kitchen` → Kitchen renders (not the library). Stop preview, run `npm run build` (no env) so `dist/` is back to the `/` base.

### Task 6: Open-source scaffolding

**Files:**
- Create: `LICENSE`
- Rewrite: `README.md`

- [ ] **Step 1: `LICENSE`** — MIT, first line after title: `Copyright (c) 2026 Pavithra J`.
- [ ] **Step 2: `README.md`** with these sections in order: title + one-paragraph "what it is"; table of the 4 chapters (title / audience / one line, Hello Hangul line exactly: "55-unit beginner Korean track, alphabet → TOPIK 1, Hangul-only toggle, Revised Romanization throughout"; audiences from `chapters.js` `ages`); the sentence "Runs entirely in your browser — no accounts, no servers, no tracking; voices come from your device"; Quick start (`git clone`, `npm install`, `npm run dev`); Live URL; Deploy to Pages (workflow + one-time Settings → Pages → Source: GitHub Actions; fork note: change `VITE_BASE` to your repo name); Known limits (Korean voice depends on the OS; Windows needs the Korean language pack with speech); Folder layout (`src/pages`, `src/chapters/*`, `src/components`, `src/lib`, `src/data/chapters.js`); Contributing (fork, branch, `npm run lint`, `npm run build`, PR); License (MIT); one line: began life on Zoho Catalyst, now browser-only.
- [ ] **Step 3: Verify** — `head -3 LICENSE` shows the copyright line; `grep -c "j-pavithra.github.io/once-upon-a-time-kid-app" README.md` ≥ 1.

### Task 7: Verify in the browser, commit, push

**Files:** none new (git only).

- [ ] **Step 1: Static checks** — the Task 3 grep → empty; `npm run build` → exit 0; `test -f dist/404.html`.
- [ ] **Step 2: `npm run preview`** and in the built-in browser check:
  - Hello Hangul: cover "Hear Yuna say hello" → Korean speech or the Task 4 card; a letter's "Hear it" → Korean; Hangul-only toggle hides romanisation and `localStorage['hh-hangul-only-switch-count']` increments; unit map shows Part 1–4 headers and 55 unit tiles.
  - Hello Food: tap a food → English speech.
  - Grandma Knows Why: open a moment → Reason Jar reads aloud.
  - Once Upon a Thing: page through, activities and certificate work.
  - Network panel: only `fonts.googleapis.com` / `fonts.gstatic.com` plus `localhost`.
- [ ] **Step 3: Git init and per-repo identity**

```bash
cd ~/Downloads/once-upon-a-time-kid-app
git init -b main
git config user.name "Pavithra J"
git config user.email "<no-reply address — ask if not given>"
git add .
git status
git config user.email
```
  → Show both outputs to the user. **Wait for OK.**
- [ ] **Step 4: Code review the staged diff** (`/code-review`) and fix anything real before committing.
- [ ] **Step 5: Commit and push**

```bash
git commit -m "Initial commit — Once Upon a Time kid app (4 chapters, browser-only)"
git remote add origin https://github.com/J-Pavithra/once-upon-a-time-kid-app.git
git push -u origin main
```
  Push runs in the user's terminal tab so they can type the username and token. If auth fails: stop and report; no retry, no Keychain, no global config.
- [ ] **Step 6: Remind** — enable Pages once at `github.com/J-Pavithra/once-upon-a-time-kid-app/settings/pages` → Source: GitHub Actions. Then Phase 2 is unlocked; ask which of 2a/2b/2c to run.
