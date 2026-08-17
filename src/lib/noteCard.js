// User notes (`nj_notes`, see storage.js) are stored as one plain-text
// `content` string so old freeform notes keep working untouched. Flashcard
// rendering treats the first line as the front (原文/單字) and everything
// after it as the back (意思/註記) — this is also exactly the `${jp}\n${zh}`
// shape Sentence.js has always saved, so existing notes already flip cleanly.
export function splitNoteContent(content) {
  const idx = content.indexOf('\n');
  if (idx === -1) return { front: content, back: '' };
  return { front: content.slice(0, idx), back: content.slice(idx + 1).trim() };
}

export function joinNoteContent(front, back) {
  const trimmedFront = front.trim();
  const trimmedBack = back.trim();
  return trimmedBack ? `${trimmedFront}\n${trimmedBack}` : trimmedFront;
}
