#!/usr/bin/env node
// Batch-generates natural-voice Japanese audio via a locally-running VOICEVOX
// (https://voicevox.hiroshiba.jp/) engine — NOT part of `npm run build`, run
// by hand whenever you want to (re)voice content. VOICEVOX must already be
// running on this machine (default http://127.0.0.1:50021) — this script
// never downloads or installs it.
//
// Usage:
//   node scripts/generate-audio.mjs --target=reading --file=ごん狐.js
//   node scripts/generate-audio.mjs --target=bank --file=N4-listening-with-image-options-01.js
//   node scripts/generate-audio.mjs --target=bank --file=N4-listening-with-image-options-01.js --force
//   node scripts/generate-audio.mjs --speakers
//
// Flags:
//   --target=reading|bank   which content pool --file belongs to (required
//                           unless --speakers)
//   --file=<name>           filename inside the target's ./data folder
//                           (reading: src/lib/reading/articles/data/*.js;
//                           bank: src/lib/practice/bank/data/*.js)
//   --speaker=<id>          VOICEVOX speaker/style id (default 3 — ずんだもん
//                           ノーマル; run --speakers to list choices)
//   --voicevox-url=<url>    default http://127.0.0.1:50021
//   --force                 re-generate + overwrite even if audio already
//                           exists (reading: file exists on disk; bank: item
//                           already has audioUrl)
//   --speakers              list available speaker/style ids from the running
//                           VOICEVOX engine, then exit (no --target/--file
//                           needed)
//
// Reading articles are hand-authored JS (comments, mixed quoting) — this
// script never rewrites those files. Instead it writes audio to a
// predictable path, `public/audio/reading/{articleId}/{sentenceIndex}.mp3`,
// that the frontend can construct directly from an article id + sentence
// index with no stored field needed. Bank data files, by contrast, are
// strict `const items = <JSON>; export default items;` (see
// src/lib/practice/bank/devTagStore.js) — this script reuses that same
// read/JSON.parse/write convention to fill in each item's `audioUrl` field
// after generating its file.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const READING_DATA_DIR = path.join(ROOT, 'src', 'lib', 'reading', 'articles', 'data');
const BANK_DATA_DIR = path.join(ROOT, 'src', 'lib', 'practice', 'bank', 'data');
const READING_AUDIO_OUT = path.join(ROOT, 'public', 'audio', 'reading');
const BANK_AUDIO_OUT = path.join(ROOT, 'public', 'audio', 'bank');
const BANK_FILE_PATTERN = /^const items = ([\s\S]*);\r?\n\r?\nexport default items;\r?\n?$/;

function parseArgs(argv) {
  const args = { force: false, speakers: false };
  for (const raw of argv) {
    if (raw === '--force') { args.force = true; continue; }
    if (raw === '--speakers') { args.speakers = true; continue; }
    const m = raw.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const VOICEVOX_URL = (args['voicevox-url'] || 'http://127.0.0.1:50021').replace(/\/$/, '');
const SPEAKER = Number(args.speaker || 3);

async function checkEngine() {
  try {
    const res = await fetch(`${VOICEVOX_URL}/version`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error(
      `Couldn't reach VOICEVOX at ${VOICEVOX_URL} (${err.message}).\n` +
      'Make sure the VOICEVOX app/engine is running on this machine before running this script.'
    );
    process.exit(1);
  }
}

async function listSpeakers() {
  const res = await fetch(`${VOICEVOX_URL}/speakers`);
  if (!res.ok) throw new Error(`GET /speakers failed: HTTP ${res.status}`);
  const speakers = await res.json();
  for (const s of speakers) {
    for (const style of s.styles) {
      console.log(`${style.id}\t${s.name} - ${style.name}`);
    }
  }
}

// Synthesizes one line of text to a WAV buffer via VOICEVOX's two-step
// audio_query -> synthesis pipeline (see VOICEVOX engine API docs).
async function synthesize(text) {
  const queryRes = await fetch(
    `${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${SPEAKER}`,
    { method: 'POST' }
  );
  if (!queryRes.ok) throw new Error(`audio_query failed: HTTP ${queryRes.status}`);
  const query = await queryRes.json();

  const synthRes = await fetch(`${VOICEVOX_URL}/synthesis?speaker=${SPEAKER}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  });
  if (!synthRes.ok) throw new Error(`synthesis failed: HTTP ${synthRes.status}`);
  return Buffer.from(await synthRes.arrayBuffer());
}

// Strips the `漢字[かんじ]` furigana notation down to its plain kana
// reading when present (reusing the article annotation convention — see
// src/lib/reading/furigana.js), otherwise returns the text unchanged. Using
// the hand-curated reading avoids VOICEVOX guessing wrong on rare/ambiguous
// kanji.
const FURIGANA_RE = /([一-龯々]+)\[([^\]]+)\]/g;
function readingOf(raw) {
  return raw.replace(FURIGANA_RE, (_, __, reading) => reading);
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function generateReading(filename) {
  const filePath = path.join(READING_DATA_DIR, filename);
  const mod = await import(pathToFileURL(filePath).href);
  const articles = mod.default;
  if (!Array.isArray(articles)) {
    console.error(`${filename} doesn't default-export an array of articles.`);
    process.exit(1);
  }

  let made = 0, skipped = 0;
  for (const article of articles) {
    const outDir = path.join(READING_AUDIO_OUT, article.id);
    await fs.mkdir(outDir, { recursive: true });

    for (let i = 0; i < article.sentences.length; i++) {
      const outPath = path.join(outDir, `${i}.mp3`);
      if (!args.force && await fileExists(outPath)) { skipped++; continue; }

      const text = readingOf(article.sentences[i].jp);
      process.stdout.write(`  [${article.id}] sentence ${i + 1}/${article.sentences.length}...`);
      const audio = await synthesize(text);
      await fs.writeFile(outPath, audio);
      console.log(' done');
      made++;
    }
  }
  console.log(`\nReading: wrote ${made} file(s), skipped ${skipped} already present.`);
  console.log(`Output under: ${READING_AUDIO_OUT}`);
  console.log('Frontend note: audio for sentence i of article <id> is at /audio/reading/<id>/<i>.mp3 — no data-file change needed.');
}

async function loadBankFile(filename) {
  const filePath = path.join(BANK_DATA_DIR, filename);
  const content = await fs.readFile(filePath, 'utf8');
  const match = content.match(BANK_FILE_PATTERN);
  if (!match) {
    console.error(`${filename} isn't in the expected "const items = <JSON>; export default items;" shape.`);
    process.exit(1);
  }
  return JSON.parse(match[1]);
}

async function saveBankFile(filename, items) {
  const filePath = path.join(BANK_DATA_DIR, filename);
  const body = `const items = ${JSON.stringify(items, null, 2)};\n\nexport default items;\n`;
  await fs.writeFile(filePath, body, 'utf8');
}

async function generateBank(filename) {
  const items = await loadBankFile(filename);
  await fs.mkdir(BANK_AUDIO_OUT, { recursive: true });

  let made = 0, skipped = 0, noText = 0;
  for (const item of items) {
    if (item.audioUrl && !args.force) { skipped++; continue; }

    const text = item.script || item.jp;
    if (!text) { noText++; continue; }

    const outPath = path.join(BANK_AUDIO_OUT, `${item.id}.mp3`);
    process.stdout.write(`  [${item.id}]...`);
    const audio = await synthesize(readingOf(text));
    await fs.writeFile(outPath, audio);
    item.audioUrl = `/audio/bank/${item.id}.mp3`;
    console.log(' done');
    made++;
  }

  await saveBankFile(filename, items);
  console.log(`\nBank (${filename}): wrote ${made} file(s), skipped ${skipped} already voiced, ${noText} had neither script nor jp text.`);
  console.log(`Output under: ${BANK_AUDIO_OUT}`);
}

if (args.speakers) {
  await checkEngine();
  await listSpeakers();
  process.exit(0);
}

if (!args.target || !args.file) {
  console.error('Usage: node scripts/generate-audio.mjs --target=reading|bank --file=<filename> [--speaker=<id>] [--force]');
  console.error('       node scripts/generate-audio.mjs --speakers');
  process.exit(1);
}

await checkEngine();

if (args.target === 'reading') {
  await generateReading(args.file);
} else if (args.target === 'bank') {
  await generateBank(args.file);
} else {
  console.error(`Unknown --target "${args.target}" — must be "reading" or "bank".`);
  process.exit(1);
}
