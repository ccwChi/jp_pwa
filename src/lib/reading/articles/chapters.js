// Pure helpers for the long-article import flow (src/app/reading/import):
// turning a flat sentence list + user-picked split points into chapters,
// and deriving a URL-safe id from a title.

export function computeChapters(sentences, splitAfterSet) {
  const chapters = [];
  let current = [];
  let startIndex = 0;

  sentences.forEach((s, i) => {
    current.push(s);
    if (splitAfterSet.has(i) || i === sentences.length - 1) {
      chapters.push({ startIndex, endIndex: i, sentences: current });
      current = [];
      startIndex = i + 1;
    }
  });

  return chapters;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
