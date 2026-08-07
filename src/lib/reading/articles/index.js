// Each file in ./data default-exports an array of article objects — one
// file can hold a single standalone article, or every chapter of a long
// work (see data/ごん狐.js). Just drop a new file into ./data; it's picked
// up automatically.
const modules = import.meta.glob('./data/*.js', { eager: true, import: 'default' });

export const articles = Object.keys(modules)
  .sort()
  .flatMap(path => modules[path]);

export function getArticles() {
  return articles;
}

export function getArticle(id) {
  return articles.find(a => a.id === id) || null;
}

export function getLevels() {
  return [...new Set(articles.map(a => a.level))].sort();
}

// Groups standalone articles as single-entry "series" so the list page can
// treat both shapes the same way: one row per work, linking to its first part.
export function getSeriesList() {
  const bySeriesId = new Map();

  for (const article of articles) {
    const seriesId = article.seriesId || article.id;
    if (!bySeriesId.has(seriesId)) bySeriesId.set(seriesId, []);
    bySeriesId.get(seriesId).push(article);
  }

  return [...bySeriesId.values()].map(parts => {
    const sorted = [...parts].sort((a, b) => (a.partIndex || 0) - (b.partIndex || 0));
    const first = sorted[0];
    return {
      seriesId: first.seriesId || first.id,
      title: first.seriesTitle || first.title,
      level: first.level,
      excerpt: first.excerpt,
      firstId: first.id,
      partsCount: sorted.length,
    };
  });
}

export function getSeriesParts(seriesId) {
  return articles
    .filter(a => (a.seriesId || a.id) === seriesId)
    .sort((a, b) => (a.partIndex || 0) - (b.partIndex || 0));
}

export function getAdjacentParts(article) {
  if (!article.seriesId) return { prev: null, next: null };
  const parts = getSeriesParts(article.seriesId);
  const index = parts.findIndex(p => p.id === article.id);
  return {
    prev: index > 0 ? parts[index - 1] : null,
    next: index < parts.length - 1 ? parts[index + 1] : null,
  };
}
