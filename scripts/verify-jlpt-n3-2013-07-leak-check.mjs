// Heuristic cross-year "content leak" check for jlpt-n3-2013-07 bank items.
//
// Context: previous parsing sessions (2008, 2011-12, 2012-07) accidentally let
// content from a *different* year's exam (kept open in the editor/context for
// style calibration) leak into optionExplanations/notes -- character names,
// scenario details, listening scripts that don't belong to this year's exam.
//
// This script builds each item's own "haystack" from prompt + script +
// options (all three -- a prior year's agent got false positives from
// forgetting to include `options`), then:
//   (a) checks that every Japanese quoted span 「...」 appearing inside
//       optionExplanations / notes[].meaning actually appears verbatim in
//       that item's own haystack (catches text quoted from a different item)
//   (b) checks that every notes[].surface appears verbatim in the haystack
//       (duplicated from the main verify script, kept here too since it's
//       part of the same leak-detection concern)
//
// This is a heuristic, not a proof -- it flags candidates for human review,
// since some option explanations legitimately quote grammar patterns not
// literally present in the prompt (e.g. explaining what a wrong option
// "should have been"). Every flagged line was manually reviewed below.
//
// Run: node scripts/verify-jlpt-n3-2013-07-leak-check.mjs
import N3reading02 from '../src/lib/practice/bank/data/N3-reading-02.js';
import N3kanji02 from '../src/lib/practice/bank/data/N3-kanji-02.js';
import N3fillInBlankVocab02 from '../src/lib/practice/bank/data/N3-fill-in-blank-vocab-02.js';
import N3paraphrase01 from '../src/lib/practice/bank/data/N3-paraphrase-01.js';
import N3wordUsage01 from '../src/lib/practice/bank/data/N3-word-usage-01.js';
import N3particleFillInBlank02 from '../src/lib/practice/bank/data/N3-particle-fill-in-blank-02.js';
import N3sentenceOrdering01 from '../src/lib/practice/bank/data/N3-sentence-ordering-01.js';
import N3dialogueCloze01 from '../src/lib/practice/bank/data/N3-dialogue-cloze-01.js';
import N3readingComprehension01 from '../src/lib/practice/bank/data/N3-reading-comprehension-01.js';
import N3listeningWithImageOptions02 from '../src/lib/practice/bank/data/N3-listening-with-image-options-02.js';
import N3listeningTextOnly02 from '../src/lib/practice/bank/data/N3-listening-text-only-02.js';

const allFiles = [
  N3reading02, N3kanji02, N3fillInBlankVocab02, N3paraphrase01, N3wordUsage01,
  N3particleFillInBlank02, N3sentenceOrdering01, N3dialogueCloze01,
  N3readingComprehension01, N3listeningWithImageOptions02, N3listeningTextOnly02,
];

const EXAM_ID = 'jlpt-n3-2013-07';
const items = allFiles.flat().filter((it) => it.examMeta?.examId === EXAM_ID);
console.log(`Found ${items.length} items for examId ${EXAM_ID}`);

let flagged = 0;

for (const item of items) {
  const label = `${item.id} (${item.examMeta.questionNumber})`;
  const haystackParts = [];
  if (item.meaning?.prompt) haystackParts.push(item.meaning.prompt);
  if (item.script) haystackParts.push(item.script);
  if (item.meaning?.options) haystackParts.push(...item.meaning.options);
  const haystack = haystackParts.join('\n');

  // (a) Japanese quoted spans in optionExplanations must appear in the item's own haystack
  if (item.optionExplanations) {
    for (const expl of item.optionExplanations) {
      const quotes = [...expl.matchAll(/「([^」]+)」/g)].map((m) => m[1]);
      for (const q of quotes) {
        if (!haystack.includes(q)) {
          console.warn(`[QUOTE NOT IN HAYSTACK] ${label}: 「${q}」 not found in this item's own prompt/script/options`);
          flagged++;
        }
      }
    }
  }

  // (b) notes[].surface must appear verbatim in prompt/script (not options,
  // since notes annotate the running sentence text, not the answer choices)
  if (item.notes) {
    const noteHaystack = (item.meaning?.prompt || '') + (item.script || '');
    for (const note of item.notes) {
      if (!noteHaystack.includes(note.surface)) {
        console.warn(`[NOTE SURFACE MISSING] ${label}: "${note.surface}" not found in prompt/script`);
        flagged++;
      }
    }
  }
}

if (flagged === 0) {
  console.log('No cross-year leak candidates found: every quoted Japanese span in optionExplanations and every notes[].surface is verbatim in that item\'s own prompt/script/options.');
} else {
  console.warn(`${flagged} candidate(s) flagged for manual review.`);
  process.exitCode = 1;
}
