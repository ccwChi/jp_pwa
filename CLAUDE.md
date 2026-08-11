# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Nihongo Journey (日文語感練習) — a Japanese-learning PWA built with Next.js App Router. All UI copy is Traditional Chinese, targeting JLPT N5–N2 learners. It has two content pillars: 文章閱讀 (graded reading, sentence-by-sentence furigana + translation) and 文法學習 (grammar lessons + practice). There is no backend/database — all user state lives in browser `localStorage`, and the production build is a static export deployed to GitHub Pages.

## Commands

- `npm run dev` — dev server (Next.js, hot reload)
- `npm run build` — standard Next.js build
- `npm run build:pages` — dry-runs the actual GitHub Pages static-export build locally (sets `NEXT_STATIC_EXPORT=true`, temporarily moves out the server-only routes, restores them after, even on failure)
- `npm run lint` — ESLint (`eslint-config-next`, flat config)
- `npm run start` — serve a production build

There is no test suite/runner configured in this repo.

Dictionary data (`public/dict/jmdict.json`) is generated manually and out-of-band with `node scripts/build-dictionary.mjs <path-to-jmdict-simplified-eng.json>` — not part of `npm run build`, and rarely needs re-running.

## Architecture

### Content = code, auto-loaded from `./data`

Reading articles (`src/lib/reading/articles/data/*.js`), grammar lessons (`src/lib/grammar/lessons/data/*.js`), grammar practice sets (`src/lib/grammar/practice/data/*.js`), and grammar bank questions (`src/lib/grammar/bank/data/*.js`) are plain JS modules, each default-exporting an array of content objects. Every one of these areas is collected the same way via `import.meta.glob('./data/*.js', { eager: true, import: 'default' })` in that folder's `index.js` — **to add content, just drop a new file into the relevant `./data` folder; nothing else needs registering.**

- A reading "series" is one or more article-part objects sharing a `seriesId`; a standalone article is just a series of one. See `src/lib/reading/articles/index.js` for the series/part grouping helpers.
- Furigana is authored inline as `漢字[かな]` directly in `jp` sentence strings (parsed by `src/lib/reading/furigana.js` via regex — this is the one and only annotation mechanism, no separate lookup/dictionary step for rendering ruby text).
- `src/doc/article-format-prompt.md` is the prompt template used to have an AI convert raw Japanese text into a properly-shaped article object (sentences/vocab/grammar) — reuse it when authoring new reading content.
- `resources/` holds raw past-JLPT-N4 exam PDFs/audio/images — reference material for authoring content, not consumed by the app itself.

### Unified practice question bank (type+level-based, decoupled from lessons/practice sets)

Every practice question in the app — lesson quick-quizzes, practice-set article/cloze questions, and transcribed JLPT past-exam questions (vocabulary/kanji/listening/reading, not just grammar) — lives as a standalone item in `src/lib/practice/bank/data/*.js`, never embedded in a lesson or practice-set object. A lesson (`grammar/lessons/data`) only carries its explanation/examples; a practice set (`grammar/practice/data`) only carries its `grammarIds` + title/intro metadata. Neither stores its own questions.

Files are named `{level}-{type}-{part}.js` (e.g. `N3-pattern-practice-01.js`) — `part` is a zero-padded counter that only advances once a `(level, type)` pair holds more than ~100 items, purely to keep files a manageable size to hand-curate; it has no effect on querying, since `src/lib/practice/bank/index.js` flattens every file in `./data` into one pool via `import.meta.glob` regardless of which file an item lives in. `type` is a fixed, closed enum (see the `TYPES` export and header comment in `index.js`) — 11 values mirror real JLPT past-exam problem types (`particle-fill-in-blank`, `reading-comprehension`, `listening-with-image-options`, ...), plus two app-authored types (`usage-choice`, `pattern-practice`) for content with no direct past-exam equivalent.

Each bank item is tagged (`pointIds` — optional array of lesson/grammar-point ids this drills, since vocabulary/listening items usually don't test a discrete grammar point — `level`, `type`, `section`, `verbCategory`/`verbConjugation`/`adjCategory`/`adjConjugation`, free-form `tags`). `getBankItems(filters)` / `pickBankItem(filters)` take a single filters object (`pointId`, `level`, `type`, `section`, `tags`, ...) — omit `pointId` to draw from the whole level/type pool instead of one grammar point's pool. `GrammarDetailClient`'s quiz tab and the article/cloze practice clients all draw randomly from this pool at render time (client-only, so the random pick doesn't get baked into the static export).

Past-exam items additionally carry `isPastExam: true` + `examMeta: { examId, year, level, section, sourcePdf, sourceNote, questionNumber }`, and listening/image items carry `imageUrl`/`audioUrl` (paths under `public/exam-images/`, `public/exam-audio/`) alongside `imageDescription`/`script` text fallbacks — `resolveAssetUrl(item, kind)` in `index.js` is how a component reads either without crashing when the asset hasn't been added yet (it logs a dev-only console warning naming the missing file instead). Raw exam transcriptions live first in `src/lib/past-exams/data/*.json` (one file per exam paper, preserving section/problem/passage structure); a migration step converts each into flat bank items, skipping any item flagged `needsReview` or missing its options until a human fixes the source JSON and reruns the conversion — the JSON stays as the permanent source of truth, it's never deleted post-migration.

`verbCategory`/`verbConjugation`/`adjCategory`/`adjConjugation` are populated separately from initial authoring — most items start without them. `src/lib/practice/bank/pos-options.json` is the canonical, extensible enum for all four fields (re-exported as `VERB_CATEGORIES`/`VERB_CONJUGATIONS`/`ADJ_CATEGORIES`/`ADJ_CONJUGATIONS` from `index.js`); `/practice/tag` (a dev-only authoring tool, see below) is how they get filled in one item at a time, and can append a brand-new option value to `pos-options.json` on the spot when none of the existing ones fit. An item is considered reviewed (removed from the tool's queue) once it carries `posReviewed: true`, whether or not any POS field actually ended up set — plenty of items have no verb/adjective to tag at all.

### Client-side persistence (no backend)

`src/lib/storage.js` implements every piece of user state (notes, reading/grammar progress, practice completion, font/speech/listen-mode prefs) as a small localStorage-backed store built on `useSyncExternalStore`, each under a key prefixed `nj_`. Follow the existing `createStore(key, fallback)` pattern for new persisted state rather than inventing a new mechanism. `src/lib/backup.js` provides full export/import by scanning for the `nj_` prefix, so new stores are automatically covered by backup/restore with no changes needed there.

### Static export deploy (GitHub Pages)

`next.config.mjs` only turns on `output: 'export'` (+ `/jp_pwa` basePath, unoptimized images) when `NEXT_STATIC_EXPORT=true` — local dev/build are unaffected. `.github/workflows/deploy.yml` builds with that flag on every push to `main` and publishes `out/` to Pages.

Three routes are dev-only authoring tools that need a real Node server and cannot survive static export, so the deploy workflow deletes them before building: `src/app/api/articles/import/route.js` (writes a new article `./data` file to disk from the import wizard) and `src/app/reading/import/` (the wizard UI itself, `useImportWizard.js` + `ImportTool.js`); and `src/app/api/practice-tag/route.js` + `src/app/practice/tag/` (the POS-tagging tool, backed by `src/lib/practice/bank/devTagStore.js`, which reads/writes `./data/*.js` files directly on disk). `npm run build:pages` reproduces this locally by temporarily moving those paths out of `src/app` and back.

### PWA shell

`src/app/manifest.js` + `src/app/RegisterSW.js` + `public/sw.js` wire up installability and offline support. The service worker is a simple stale-while-revalidate cache (`nj-cache-v1`) keyed off `self.registration.scope`, so it works correctly under the GitHub Pages basePath without hardcoding it.

### Routing shape

Dynamic detail pages (`src/app/reading/[id]/page.js`, `src/app/grammar/[id]/page.js`, `.../practice/[id]/{article,cloze}/page.js`) are thin server components that call `generateStaticParams()` off the content index (required since static export has no on-demand rendering) and immediately hand off to a co-located `*Client.js` component that does the actual (client-side) rendering — reading article ids can contain raw Japanese text, so these pages `decodeURIComponent` the route param before use.
