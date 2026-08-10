// Each file in ./data default-exports an array containing exactly one
// practice-set object (same "array of things, one array-flattening loader"
// convention as reading/articles and grammar/lessons — just drop a new file
// in ./data and it's picked up automatically).
//
// A practice set is pure metadata: it groups a handful of grammar lessons
// (grammarIds) under one title/intro, but doesn't carry any question content
// itself. The actual sentences + "meaning" quiz (文章問答 mode) and "cloze"
// quiz (克漏字模式) come from the question bank (src/lib/grammar/bank) —
// at practice time, each grammarId in the set draws one bank item tagged
// with that id (see ArticlePracticeClient/ClozePracticeClient).
const modules = import.meta.glob('./data/*.js', { eager: true, import: 'default' });

export const practiceSets = Object.keys(modules)
  .sort()
  .flatMap(path => modules[path]);

export function getPracticeSets() {
  return practiceSets;
}

export function getPracticeSet(id) {
  return practiceSets.find(p => p.id === id) || null;
}

export function getPracticeLevels() {
  return [...new Set(practiceSets.map(p => p.level))].sort();
}

// grammarId → the one practice set that drills it (each grammar point
// belongs to exactly one set by construction).
const setByGrammarId = new Map();
for (const set of practiceSets) {
  for (const grammarId of set.grammarIds) {
    setByGrammarId.set(grammarId, set);
  }
}

export function getPracticeSetForGrammar(grammarId) {
  return setByGrammarId.get(grammarId) || null;
}

// { article: bool, cloze: bool } — whether the practice set covering this
// grammar point has been completed in each mode.
export function getGrammarPracticeStatus(grammarId, articleDoneSet, clozeDoneSet) {
  const set = setByGrammarId.get(grammarId);
  if (!set) return { article: false, cloze: false };
  return {
    article: articleDoneSet.has(set.id),
    cloze: clozeDoneSet.has(set.id),
  };
}
