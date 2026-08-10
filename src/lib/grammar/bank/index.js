// A "bank item" is one practice question tagged with the grammar point(s)
// it drills. Every question in the app — every lesson's inline quiz, every
// practice-set sentence's meaning/cloze quiz, and any future JLPT past-exam
// transcription — is authored directly as a bank item in ./data; nothing is
// derived from lessons/practice-set content anymore. A lesson or practice
// set never embeds its own questions — it only lists which grammarIds (and
// optionally which other tags) it wants questions for, and getBankItems /
// pickBankItem decide, from each item's own tags, whether it's eligible to
// be drawn for that request.
//
// To add more variety (or a question that spans several grammar points at
// once — a single sentence commonly drills more than one pattern), drop a
// new file into ./data — same "array of things, one array-flattening
// loader" convention as lessons/index.js and practice/index.js. Each item
// there can list more than one id in `grammarIds`; it will automatically
// show up in the pool for every id it lists. Nothing else needs to change —
// getBankItems/pickBankItem always look at every source together.
//
// This is also where real JLPT past-exam questions (考古題) belong once
// they're transcribed — set `isPastExam: true` and fill `examMeta` so they
// stay traceable to their source, and tag `grammarIds` with whichever
// existing grammar point(s) the question tests so it joins that point's
// normal practice pool.
//
// Item shape — only id/grammarIds/level are required, everything else is
// optional and filled in as far as the source material actually supports
// (a lesson-quiz item has no jp/target/cloze; an old exam's vocabulary
// question may have no verb/adjective tags at all):
//   {
//     id, grammarIds: [...], level,       // level is JLPT N5–N1; also stands in as
//                                          // "how hard is this word/pattern" — the
//                                          // old exam grading (4級≈N4 ... 1級≈N1)
//                                          // already encodes vocab difficulty this way,
//                                          // so there's no separate difficulty field.
//     section?: 'vocabulary' | 'grammar' | 'reading' | 'listening',
//       // which JLPT section this drills. Defaults to 'grammar' in practice
//       // since that's the app's whole domain today; only needs to be set
//       // explicitly once vocabulary/reading/listening items show up. This is
//       // the normalized, filterable tag — distinct from examMeta.section
//       // below, which (for past-exam items) preserves the section label as
//       // printed on the original exam paper.
//     jp?, zh?, target?,
//     meaning?: { prompt, options, answerIndex },
//     cloze?:   { options, answerIndex },
//
//     // optional part-of-speech tags — only set the ones relevant to this item
//     verbCategory?: 'godan' | 'ichidan' | 'suru' | 'kuru',
//     verbConjugation?: 'dictionary' | 'masu' | 'nai' | 'te' | 'ta' | 'volitional'
//       | 'passive' | 'causative' | 'potential' | 'imperative' | 'conditional-ba' | 'conditional-tara',
//     adjCategory?: 'i-adjective' | 'na-adjective',
//     adjConjugation?: 'negative' | 'te' | 'ta' | 'adverbial' | 'conditional',
//
//     // free-form topic/scenario/source tags beyond the fixed fields above
//     // (e.g. ['animals', 'daily-life']) — matched via the `tags` filter
//     tags?: string[],
//
//     // past-exam provenance
//     isPastExam?: boolean,
//     examMeta?: { year, section, questionNumber },  // e.g. { year: 2000, section: '文法', questionNumber: 3 }
//   }
//
// Worked example of a transcribed past-exam item (illustrative — not live
// data, just what a real ./data file entry looks like):
//   {
//     id: 'exam-2000-4kyuu-bunpou-q3',
//     grammarIds: ['te-iru'],
//     level: 'N4',
//     section: 'grammar',
//     jp: '窓[まど]が開[あ]いています。',
//     zh: '窗戶開著。',
//     target: 'ています',
//     meaning: { prompt: '「開いています」的用法是？', options: [...], answerIndex: 0 },
//     verbCategory: 'ichidan',
//     verbConjugation: 'te',
//     isPastExam: true,
//     examMeta: { year: 2000, section: '文法', questionNumber: 3 },
//   }
const modules = import.meta.glob('./data/*.js', { eager: true, import: 'default' });
const bankItems = Object.keys(modules)
  .sort()
  .flatMap(path => modules[path]);

// grammarId is the primary, always-required tag (an item must list it in
// `grammarIds` to be eligible at all); the rest are optional extra filters
// for narrowing that pool further by level/part-of-speech/topic. `tags`
// matches when the item's own `tags` array contains every tag requested.
export function getBankItems(grammarId, { level, section, tags, verbCategory, verbConjugation, adjCategory, adjConjugation } = {}) {
  return bankItems.filter(item => {
    if (!item.grammarIds.includes(grammarId)) return false;
    if (level && item.level !== level) return false;
    if (section && item.section !== section) return false;
    if (verbCategory && item.verbCategory !== verbCategory) return false;
    if (verbConjugation && item.verbConjugation !== verbConjugation) return false;
    if (adjCategory && item.adjCategory !== adjCategory) return false;
    if (adjConjugation && item.adjConjugation !== adjConjugation) return false;
    if (tags && !tags.every(t => item.tags?.includes(t))) return false;
    return true;
  });
}

// Picks one random item for grammarId, filtered to whatever the calling
// practice mode actually needs (article mode needs jp+target to render the
// highlighted sentence; cloze mode needs the cloze field) plus whichever
// extra tag filters (level/tags/verbCategory/...) it wants to narrow by.
// Returns null if nothing in the pool meets the requirement — callers
// should treat that as "skip this grammar point," not crash.
export function pickBankItem(grammarId, { requireJp = false, requireCloze = false, ...tagFilters } = {}) {
  const pool = getBankItems(grammarId, tagFilters).filter(item => {
    if (requireJp && !item.jp) return false;
    if (requireCloze && !item.cloze) return false;
    if (!requireCloze && !item.meaning) return false;
    return true;
  });
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Whether lessonId has at least one meaning-quiz question in the bank — used
// to decide whether a lesson's detail page shows a "小測驗" section at all,
// now that lessons no longer carry their own embedded `quiz` field.
export function hasQuizFor(grammarId) {
  return bankItems.some(item => item.grammarIds.includes(grammarId) && item.meaning);
}
