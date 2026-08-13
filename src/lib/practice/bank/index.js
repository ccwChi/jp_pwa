// A "bank item" is one practice question. This is the single question bank
// for the whole app — every lesson's inline quiz, every practice-set
// sentence's meaning/cloze quiz, and every transcribed JLPT past-exam
// question (vocabulary/kanji/listening/reading, not just grammar) lives here
// as a standalone item in ./data. Nothing is derived from lessons/practice-set
// content anymore; a lesson or practice set never embeds its own questions —
// it only lists which pointIds (and optionally which other tags) it wants
// questions for, and getBankItems/pickBankItem decide, from each item's own
// tags, whether it's eligible to be drawn for that request.
//
// File naming: `./data/{level}-{type}-{part}.js`, e.g. `N3-pattern-practice-01.js`.
// `part` is a zero-padded 2-digit counter that only advances past 01 once a
// given (level, type) pair holds more than ~100 items — it exists purely to
// keep individual files a manageable size for manual curation, and has no
// effect on querying (see the flattening loader below, which reads every
// file in the folder as one pool regardless of which file an item lives in).
// To add more variety, drop a new item into whichever file matches its
// (level, type), or start a new -02 file once the current one is full.
//
// Item shape — only id/level are required, everything else is optional and
// filled in as far as the source material actually supports:
//   {
//     id, level,                          // level is JLPT N5–N1
//     pointIds?: string[],                // which lesson/grammar point(s) this
//       // drills — optional, since vocabulary/kanji/listening items usually
//       // don't test a discrete grammar point. Matches when the queried
//       // pointId is included in this array.
//     type,        // one of the fixed TYPES below — required, drives which
//                   // file this item lives in
//     section?: 'vocabulary' | 'grammar' | 'reading' | 'listening',
//       // which JLPT section this drills. Defaults to 'grammar' in practice
//       // since that's the app's original domain; set explicitly for
//       // vocabulary/reading/listening items.
//     jp?, zh?, target?,
//     meaning?: { prompt, options, answerIndex },
//     cloze?:   { options, answerIndex },
//
//     // optional part-of-speech tags — only set the ones relevant to this item.
//     // Each is an array because a single item can straddle more than one
//     // value (e.g. a sentence exercising both て-form and た-form). Valid
//     // values live in ./pos-options.json (VERB_CATEGORIES etc. below), not
//     // hardcoded here, since the dev tagging tool can extend them.
//     verbCategory?: string[],
//     verbConjugation?: string[],
//     adjCategory?: string[],
//     adjConjugation?: string[],
//     otherCategory?: string[],  // for items testing a non-verb/non-adjective
//       // word (adverb, conjunction, particle, interjection, ...) — no
//       // matching "conjugation" field since these word classes don't conjugate
//     posReviewed?: boolean,  // set by the dev tagging tool once a human has
//       // looked at this item and decided its POS tags (even if the decision
//       // was "no verb/adjective here, nothing to tag") — see src/app/practice/tag.
//
//     // optional word/grammar-point annotations shown as clickable notes
//     // during practice (see lib/practice/bank/notes.js's renderAnnotatedText
//     // + NotePanel) — the same idea as a reading article's vocab list, but
//     // scoped to this one item's jp sentence. `surface` is matched against
//     // the rendered sentence exactly like vocabMatch.js already does for
//     // articles. Authored via the dev tagging tool: it generates an AI
//     // prompt asking for this breakdown as JSON, which gets pasted back in.
//     notes?: Array<{
//       surface: string, word?: string, reading?: string, meaning: string,
//       type?: 'vocab' | 'grammar',
//       sentence?: { jp: string, zh: string },  // optional extra example,
//         // same shape as a reading article's vocab entry.sentence
//     }>,
//
//     // free-form topic/scenario/source tags beyond the fixed fields above
//     // (e.g. ['animals', 'daily-life']) — matched via the `tags` filter
//     tags?: string[],
//
//     // listening/image assets — see resolveAssetUrl() below for the
//     // "missing asset tells the developer, doesn't crash" contract
//     imageUrl?: string,          // public/exam-images/{examId}/{itemId}.svg
//     imageDescription?: string,  // fallback text shown while the asset is missing
//     audioUrl?: string,          // public/exam-audio/{examId}/{itemId}.mp3
//     script?: string,            // fallback listening transcript shown while the asset is missing
//
//     // past-exam provenance
//     isPastExam?: boolean,
//     examMeta?: { examId, year, session?, level, section, sourcePdf, sourceNote, questionNumber },
//       // session is a two-digit sitting month ("07"/"12") set only for
//       // years with more than one JLPT sitting — see src/lib/past-exams
//       // for the source JSON this is migrated from.
//   }
//
// TYPES is a fixed, closed enum — don't invent new ones ad hoc, add to this
// list (and update the comment) so the file-naming convention stays legible:
//   - from real JLPT past exams: 'reading' (音読み) | 'kanji' (漢字書寫) |
//     'fill-in-blank-vocab' | 'paraphrase' | 'listening-with-image-options' |
//     'listening-text-only' | 'particle-fill-in-blank' |
//     'conjugation-fill-in-blank' | 'dialogue-response' | 'dialogue-cloze' |
//     'reading-comprehension'
//   - app-authored learning content (no direct past-exam equivalent):
//     'usage-choice' (scenario/production judgment, no jp/target — "『X』該怎麼說？")
//     'pattern-practice' (has jp+target; meaning explains the pattern's
//     function, cloze offers same-family alternatives — two renderings of
//     one grammar point, not two separate questions)
// Part-of-speech option lists live in ./pos-options.json (not hardcoded here)
// so the dev-only tagging tool (see src/app/practice/tag) can append a new
// value the moment someone needs one that doesn't exist yet, without editing
// this file. Treat these as the canonical enums for verbCategory/
// verbConjugation/adjCategory/adjConjugation — same "closed but extensible
// through the tool, not by hand-editing random items" contract as TYPES.
import posOptions from './pos-options.json';
export const VERB_CATEGORIES = posOptions.verbCategory;
export const VERB_CONJUGATIONS = posOptions.verbConjugation;
export const ADJ_CATEGORIES = posOptions.adjCategory;
export const ADJ_CONJUGATIONS = posOptions.adjConjugation;
export const OTHER_CATEGORIES = posOptions.otherCategory;

export const TYPES = [
  'reading',
  'kanji',
  'fill-in-blank-vocab',
  'paraphrase',
  'listening-with-image-options',
  'listening-text-only',
  'particle-fill-in-blank',
  'conjugation-fill-in-blank',
  'dialogue-response',
  'dialogue-cloze',
  'reading-comprehension',
  'usage-choice',
  'pattern-practice',
];

const modules = import.meta.glob('./data/*.js', { eager: true, import: 'default' });
const bankItems = Object.keys(modules)
  .sort()
  .flatMap(path => modules[path]);

// Single filters object — pointId is the only filter that looks inside an
// array (an item matches if its `pointIds` includes it); everything else is
// an equality check. Omitting a filter means "don't narrow by this."
// `type` narrows to one exact type; `types` (array) narrows to any of
// several — pass whichever fits the caller, they can be combined though
// normally only one is used. `examId` matches item.examMeta.examId, for
// pulling every question belonging to one past-exam paper in bulk (see
// src/lib/past-exams for listing which papers exist).
export function getBankItems({ pointId, level, type, types, section, examId, tags, verbCategory, verbConjugation, adjCategory, adjConjugation, otherCategory } = {}) {
  return bankItems.filter(item => {
    if (pointId && !item.pointIds?.includes(pointId)) return false;
    if (level && item.level !== level) return false;
    if (type && item.type !== type) return false;
    if (types && !types.includes(item.type)) return false;
    if (section && item.section !== section) return false;
    if (examId && item.examMeta?.examId !== examId) return false;
    if (verbCategory && !item.verbCategory?.includes(verbCategory)) return false;
    if (verbConjugation && !item.verbConjugation?.includes(verbConjugation)) return false;
    if (adjCategory && !item.adjCategory?.includes(adjCategory)) return false;
    if (adjConjugation && !item.adjConjugation?.includes(adjConjugation)) return false;
    if (otherCategory && !item.otherCategory?.includes(otherCategory)) return false;
    if (tags && !tags.every(t => item.tags?.includes(t))) return false;
    return true;
  });
}

// Picks one random item matching filters (see getBankItems), plus
// requireJp/requireCloze for callers that need a particular shape (article
// mode needs jp+target to render the highlighted sentence; cloze mode needs
// the cloze field). Returns null if nothing in the pool meets the
// requirement — callers should treat that as "skip this," not crash.
export function pickBankItem({ requireJp = false, requireCloze = false, ...filters } = {}) {
  const pool = getBankItems(filters).filter(item => {
    if (requireJp && !item.jp) return false;
    if (requireCloze && !item.cloze) return false;
    if (!requireCloze && !item.meaning) return false;
    return true;
  });
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Whether pointId has at least one meaning-quiz question in the bank — used
// to decide whether a lesson's detail page shows a "小測驗" section at all.
export function hasQuizFor(pointId) {
  return bankItems.some(item => item.pointIds?.includes(pointId) && item.meaning);
}

// Resolves a listening/image asset, telling the developer (not the end
// user) when it's missing instead of throwing. `kind` picks which pair of
// fields to check; the caller renders `fallbackText` in place of the asset
// when `url` comes back null.
export function resolveAssetUrl(item, kind) {
  const url = kind === 'image' ? item.imageUrl : item.audioUrl;
  const fallbackText = kind === 'image' ? item.imageDescription : item.script;
  if (!url && process.env.NODE_ENV !== 'production') {
    console.warn(`[practice/bank] missing ${kind} asset for "${item.id}" — add it at the path referenced by ${kind}Url, or leave unset to keep showing the text fallback.`);
  }
  return { url: url || null, fallbackText: fallbackText || null };
}
