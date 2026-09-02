// Each file in ./data default-exports an array of culture-note objects,
// grouped loosely by category (comedy conventions, generational slang,
// regional differences, social unspoken rules, festivals, ...). Drop a new
// file into ./data; it's picked up automatically — same convention as
// src/lib/reading/articles/index.js.
//
// Item shape: { id, category, title, body } — body is plain Traditional
// Chinese explainer text (paragraphs separated by a blank line), written to
// build the shared cultural/contextual knowledge that language ability
// alone doesn't cover — the gap that leaves you lost at a live show or
// unable to catch a joke even when every individual word was understood.
const modules = import.meta.glob('./data/*.js', { eager: true, import: 'default' });

export const notes = Object.keys(modules)
  .sort()
  .flatMap(path => modules[path]);

export function getNotes() {
  return notes;
}

export function getNote(id) {
  return notes.find(n => n.id === id) || null;
}

// Groups notes by category, preserving each category's first-seen order —
// so category ordering stays stable as ./data files are appended over time.
export function getCategories() {
  const byCategory = new Map();
  for (const note of notes) {
    if (!byCategory.has(note.category)) byCategory.set(note.category, []);
    byCategory.get(note.category).push(note);
  }
  return [...byCategory.entries()].map(([category, items]) => ({ category, items }));
}
