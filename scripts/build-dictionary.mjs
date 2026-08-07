#!/usr/bin/env node
// One-off, manual data-prep step — NOT part of `npm run build`. JMdict data
// barely changes, so there's no reason to re-run this on every build.
//
// Usage:
//   node scripts/build-dictionary.mjs <path-to-jmdict-simplified-eng.json>
//
// Get the source file yourself from the jmdict-simplified project's GitHub
// releases (search "jmdict-simplified releases"), pick the English-only JSON
// build, and pass its path here. This script does not download anything.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '../public/dict/jmdict.json');

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: node scripts/build-dictionary.mjs <path-to-jmdict-simplified-eng.json>');
  process.exit(1);
}

let raw;
try {
  raw = readFileSync(resolve(inputPath), 'utf8');
} catch (err) {
  console.error(`Couldn't read ${inputPath}: ${err.message}`);
  process.exit(1);
}

if (raw.trimStart().startsWith('<')) {
  console.error(
    'This looks like XML, not JSON. Use the JSON build of jmdict-simplified instead ' +
    '(the raw JMdict_e.xml format is not supported by this script).'
  );
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`Input isn't valid JSON: ${err.message}`);
  process.exit(1);
}

const words = Array.isArray(parsed) ? parsed : parsed.words;
if (!Array.isArray(words)) {
  console.error(
    "Couldn't find a word list in this file. Expected either a top-level array, " +
    'or an object with a "words" array (the jmdict-simplified shape).'
  );
  process.exit(1);
}

function englishGlosses(sense) {
  return (sense.gloss || [])
    .filter(g => !g.lang || g.lang === 'eng')
    .map(g => g.text)
    .filter(Boolean);
}

const entries = [];
for (const word of words) {
  const k = (word.kanji || []).map(x => x.text).filter(Boolean);
  const r = (word.kana || []).map(x => x.text).filter(Boolean);
  if (r.length === 0) continue; // need at least a reading to be look-up-able

  const s = (word.sense || [])
    .map(sense => ({ pos: sense.partOfSpeech || [], g: englishGlosses(sense) }))
    .filter(sense => sense.g.length > 0);
  if (s.length === 0) continue;

  entries.push({ k, r, s });
}

if (entries.length === 0) {
  console.error('Parsed the file but found zero usable entries — check the input format.');
  process.exit(1);
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
const json = JSON.stringify(entries);
writeFileSync(OUT_PATH, json);

const sizeMb = (Buffer.byteLength(json) / (1024 * 1024)).toFixed(1);
console.log(`Wrote ${entries.length} entries to ${OUT_PATH} (${sizeMb} MB)`);
