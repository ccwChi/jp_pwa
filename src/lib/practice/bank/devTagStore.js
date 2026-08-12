// Node-only (fs) helpers backing the dev-only POS-tagging tool
// (src/app/practice/tag + src/app/api/practice-tag/route.js). Never import
// this from client code or from src/lib/practice/bank/index.js itself — it's
// only safe inside API route handlers, which always run server-side.
//
// Reads/writes the raw `const items = <JSON>;\n\nexport default items;`
// shape every file in ./data currently has (all migration-generated) by
// regex-extracting and JSON.parse-ing the array literal directly — NOT via
// dynamic import(), which Turbopack refuses to bundle for a fully
// runtime-computed path (`Can't resolve <dynamic>`). This is fine as long as
// every file keeps that exact JSON shape; it will throw a clear error rather
// than silently misparse a file someone hand-edited into non-JSON JS syntax
// (single quotes, comments, unquoted keys).
import fs from 'node:fs/promises';
import path from 'node:path';

const BANK_DIR = path.join(process.cwd(), 'src', 'lib', 'practice', 'bank', 'data');
const POS_OPTIONS_PATH = path.join(process.cwd(), 'src', 'lib', 'practice', 'bank', 'pos-options.json');
const FILE_PATTERN = /^const items = ([\s\S]*);\n\nexport default items;\n?$/;

async function listDataFiles() {
  const files = await fs.readdir(BANK_DIR);
  return files.filter(f => f.endsWith('.js')).sort();
}

async function loadFile(filename) {
  const filePath = path.join(BANK_DIR, filename);
  const content = await fs.readFile(filePath, 'utf8');
  const match = content.match(FILE_PATTERN);
  if (!match) throw new Error(`${filename} isn't in the expected JSON-array shape — can't be read by the tagging tool`);
  return JSON.parse(match[1]);
}

async function saveFile(filename, items) {
  const filePath = path.join(BANK_DIR, filename);
  const body = `const items = ${JSON.stringify(items, null, 2)};\n\nexport default items;\n`;
  await fs.writeFile(filePath, body, 'utf8');
}

// An item is "done" once a human has looked at it, whether or not any POS
// field actually applies (posReviewed is set either way).
function isUntagged(item) {
  return !item.posReviewed;
}

export async function findNextUntagged() {
  const files = await listDataFiles();
  let remaining = 0;
  let next = null;
  for (const filename of files) {
    const items = await loadFile(filename);
    for (const item of items) {
      if (isUntagged(item)) {
        remaining++;
        if (!next) next = { item, filename };
      }
    }
  }
  return { item: next?.item ?? null, filename: next?.filename ?? null, remaining };
}

export async function saveItemTags(id, tags) {
  const files = await listDataFiles();
  for (const filename of files) {
    const items = await loadFile(filename);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) continue;

    const item = { ...items[index] };
    for (const field of ['verbCategory', 'verbConjugation', 'adjCategory', 'adjConjugation', 'otherCategory']) {
      const values = tags[field];
      if (values && values.length > 0) item[field] = values;
      else delete item[field];
    }
    item.posReviewed = true;
    items[index] = item;

    await saveFile(filename, items);
    return item;
  }
  throw new Error(`No bank item found with id "${id}"`);
}

export async function loadPosOptions() {
  const raw = await fs.readFile(POS_OPTIONS_PATH, 'utf8');
  return JSON.parse(raw);
}

export async function addPosOption(field, value) {
  const options = await loadPosOptions();
  if (!options[field]) throw new Error(`Unknown POS option field "${field}"`);
  if (!options[field].includes(value)) {
    options[field].push(value);
    await fs.writeFile(POS_OPTIONS_PATH, JSON.stringify(options, null, 2) + '\n', 'utf8');
  }
  return options[field];
}
