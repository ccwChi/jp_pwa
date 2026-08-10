import { getLessons } from '@/lib/grammar/lessons';
import { getPracticeSets } from '@/lib/grammar/practice';

// A "bank item" is one practice question tagged with the grammar point(s)
// it drills. This module is a read-only adapter, not a new content store:
// it derives its starting pool from content that already exists — every
// practice-set sentence and every lesson's inline quiz — so every grammar
// point that already had a sentence or a quiz gets a pool of size >= 1 for
// free, and any point that had both now has 2 different questions to draw
// from, with zero content rewritten.
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
//     jp: '窓[まど]が開[あ]いています。',
//     zh: '窗戶開著。',
//     target: 'ています',
//     meaning: { prompt: '「開いています」的用法是？', options: [...], answerIndex: 0 },
//     verbCategory: 'ichidan',
//     verbConjugation: 'te',
//     isPastExam: true,
//     examMeta: { year: 2000, section: '文法', questionNumber: 3 },
//   }
const extraModules = import.meta.glob('./data/*.js', { eager: true, import: 'default' });
const extraItems = Object.keys(extraModules)
  .sort()
  .flatMap(path => extraModules[path]);

const fromPracticeSets = getPracticeSets().flatMap(set =>
  set.sentences.map(s => ({
    id: `practice-${set.id}-${s.grammarId}`,
    grammarIds: [s.grammarId],
    level: set.level,
    jp: s.jp,
    zh: s.zh,
    target: s.target,
    meaning: s.meaning,
    cloze: s.cloze,
  }))
);

const fromLessonQuizzes = getLessons()
  .filter(lesson => lesson.quiz?.length > 0)
  .map(lesson => ({
    id: `lesson-quiz-${lesson.id}`,
    grammarIds: [lesson.id],
    level: lesson.level,
    meaning: {
      prompt: lesson.quiz[0].question,
      options: lesson.quiz[0].options,
      answerIndex: lesson.quiz[0].answerIndex,
    },
  }));

const bankItems = [...fromPracticeSets, ...fromLessonQuizzes, ...extraItems];

export function getBankItems(grammarId) {
  return bankItems.filter(item => item.grammarIds.includes(grammarId));
}

// Picks one random item for grammarId, filtered to whatever the calling
// practice mode actually needs (article mode needs jp+target to render the
// highlighted sentence; cloze mode needs the cloze field). Returns null if
// nothing in the pool meets the requirement — callers should treat that as
// "skip this grammar point," not crash.
export function pickBankItem(grammarId, { requireJp = false, requireCloze = false } = {}) {
  const pool = getBankItems(grammarId).filter(item => {
    if (requireJp && !item.jp) return false;
    if (requireCloze && !item.cloze) return false;
    if (!requireCloze && !item.meaning) return false;
    return true;
  });
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
