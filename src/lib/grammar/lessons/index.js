// Each file in ./data default-exports an array of grammar-point objects,
// grouped loosely by topic (particles, verb forms, ...). Just drop a new
// file into ./data; it's picked up automatically — same convention as
// src/lib/reading/articles/index.js.
const modules = import.meta.glob('./data/*.js', { eager: true, import: 'default' });

export const lessons = Object.keys(modules)
  .sort()
  .flatMap(path => modules[path]);

export function getLessons() {
  return lessons;
}

export function getLesson(id) {
  return lessons.find(l => l.id === id) || null;
}

export function getLevels() {
  return [...new Set(lessons.map(l => l.level))].sort();
}

// Groups lessons by category, preserving each lesson's `order` within its
// category, and sorts categories by the lowest `order` they contain — so
// the list page can render "助詞" before "動詞變化" etc. without a
// separately maintained category-order list.
export function getCategories(level) {
  const inLevel = level ? lessons.filter(l => l.level === level) : lessons;
  const byCategory = new Map();

  for (const lesson of inLevel) {
    if (!byCategory.has(lesson.category)) byCategory.set(lesson.category, []);
    byCategory.get(lesson.category).push(lesson);
  }

  return [...byCategory.entries()]
    .map(([category, items]) => ({
      category,
      items: items.sort((a, b) => (a.order || 0) - (b.order || 0)),
    }))
    .sort((a, b) => (a.items[0]?.order || 0) - (b.items[0]?.order || 0));
}

// Adjacent lessons in the same flat ordering used by getCategories, for
// prev/next navigation on the detail page.
export function getAdjacentLessons(lesson) {
  const ordered = getCategories(lesson.level).flatMap(c => c.items);
  const index = ordered.findIndex(l => l.id === lesson.id);
  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
