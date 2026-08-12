#!/usr/bin/env node
// One-off, manual data-prep step — NOT part of `npm run build`. Regenerates
// src/app/jp-serif.css and the woff2 files under src/app/fonts/: a
// self-hosted, subset build of Noto Serif JP covering exactly the CJK
// characters used across reading articles, grammar lessons, and the
// practice bank. Re-run this whenever new content introduces kanji/kana
// outside the current subset (characters it can't find fall back to
// whatever serif the OS has, so this only needs to run periodically, not on
// every content change).
//
// Usage:
//   node scripts/build-jp-font.mjs
//
// Talks to fonts.googleapis.com — needs network access. Google's CSS2 API
// rejects overly long `text=` query strings, so the character set is split
// into ~450-char chunks; each chunk becomes its own @font-face rule with an
// accurate unicode-range, so the browser only ever fetches the chunks a
// given page actually needs.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FONTS_DIR = resolve(ROOT, 'src/app/fonts');
const CSS_OUT = resolve(ROOT, 'src/app/jp-serif.css');
const CHUNK_SIZE = 450; // stays comfortably under the CSS2 API's URL length limit

const CONTENT_DIRS = [
  'src/lib/reading/articles/data',
  'src/lib/grammar/lessons/data',
  'src/lib/grammar/practice/data',
  'src/lib/practice/bank/data',
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

function isCjk(ch) {
  const cp = ch.codePointAt(0);
  return (
    (cp >= 0x3040 && cp <= 0x30ff) || // hiragana + katakana
    (cp >= 0x3400 && cp <= 0x4dbf) || // CJK ext A
    (cp >= 0x4e00 && cp <= 0x9fff) || // CJK unified
    (cp >= 0x3000 && cp <= 0x303f) || // CJK punctuation
    (cp >= 0xff00 && cp <= 0xffef) || // fullwidth forms
    (cp >= 0x31f0 && cp <= 0x31ff)    // katakana phonetic ext
  );
}

function walk(dir, out) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name.endsWith('.js')) out.push(p);
  }
}

function collectChars() {
  const files = [];
  for (const d of CONTENT_DIRS) {
    const full = resolve(ROOT, d);
    try {
      if (statSync(full).isDirectory()) walk(full, files);
    } catch {
      // content dir doesn't exist yet — skip
    }
  }
  const chars = new Set();
  for (const f of files) {
    for (const ch of readFileSync(f, 'utf8')) {
      if (isCjk(ch)) chars.add(ch);
    }
  }
  console.log(`scanned ${files.length} content files, ${chars.size} unique CJK characters`);
  return [...chars].sort();
}

async function fetchChunkCss(text) {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400&text=${encodeURIComponent(text)}&display=swap`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Google Fonts CSS2 API returned ${res.status} for a ${text.length}-char chunk`);
  return res.text();
}

async function main() {
  const chars = collectChars();
  if (chars.length === 0) {
    console.error('No CJK characters found in content dirs — nothing to do.');
    process.exit(1);
  }

  mkdirSync(FONTS_DIR, { recursive: true });

  const chunks = [];
  for (let i = 0; i < chars.length; i += CHUNK_SIZE) {
    chunks.push(chars.slice(i, i + CHUNK_SIZE).join(''));
  }

  let css = `/* Self-hosted Noto Serif JP, weight 400 — subset to exactly the CJK glyphs used across\n`
    + `   reading articles, grammar lessons, and the practice bank. Regenerate with\n`
    + `   scripts/build-jp-font.mjs whenever new content introduces characters outside this set;\n`
    + `   glyphs outside the unicode-range chunks below fall back to the OS serif. */\n\n`;

  for (let i = 0; i < chunks.length; i++) {
    console.log(`fetching chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)...`);
    const chunkCss = await fetchChunkCss(chunks[i]);
    const woff2Url = chunkCss.match(/url\(([^)]+)\)/)?.[1];
    const range = chunkCss.match(/unicode-range:\s*([^;]*);/)?.[1]?.trim();
    if (!woff2Url || !range) throw new Error(`Couldn't parse Google's CSS response for chunk ${i}`);

    const res = await fetch(woff2Url);
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = `notoserifjp-400-${i}.woff2`;
    writeFileSync(join(FONTS_DIR, filename), buf);
    console.log(`  -> ${filename} (${(buf.length / 1024).toFixed(0)} KB)`);

    css += `@font-face {\n`
      + `  font-family: 'Noto Serif JP';\n`
      + `  font-style: normal;\n`
      + `  font-weight: 400;\n`
      + `  font-display: swap;\n`
      + `  src: url('./fonts/${filename}') format('woff2');\n`
      + `  unicode-range: ${range};\n`
      + `}\n`;
  }

  writeFileSync(CSS_OUT, css);
  console.log(`\nwrote ${CSS_OUT.replace(ROOT + '\\', '').replace(ROOT + '/', '')} with ${chunks.length} @font-face rules`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
