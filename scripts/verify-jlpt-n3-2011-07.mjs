// Consistency check for the jlpt-n3-2011-07 bank items across every file they were
// appended into:
// - optionExplanations.length matches meaning.options.length
// - the "正解" marker in optionExplanations lands on the same index as answerIndex
// - notes[].surface appears verbatim in the item's prompt/script
// Run: node scripts/verify-jlpt-n3-2011-07.mjs
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

const EXAM_ID = 'jlpt-n3-2011-07';
const items = allFiles.flat().filter((it) => it.examMeta?.examId === EXAM_ID);
console.log(`Found ${items.length} items for examId ${EXAM_ID}`);

let errors = 0;

for (const item of items) {
  const label = `${item.id} (${item.examMeta.questionNumber})`;

  if (item.meaning) {
    const { options, answerIndex } = item.meaning;
    if (typeof answerIndex !== 'number' || answerIndex < 0 || answerIndex >= options.length) {
      console.error(`[BAD answerIndex] ${label}: answerIndex=${answerIndex} options=${options.length}`);
      errors++;
    }
    if (item.optionExplanations) {
      if (item.optionExplanations.length !== options.length) {
        console.error(`[LEN MISMATCH] ${label}: options=${options.length} explanations=${item.optionExplanations.length}`);
        errors++;
      }
      const markerIdx = item.optionExplanations.findIndex((e) => e.startsWith('正解'));
      if (markerIdx === -1) {
        console.error(`[NO MARKER] ${label}: no explanation starts with "正解"`);
        errors++;
      } else if (markerIdx !== answerIndex) {
        console.error(`[MARKER MISMATCH] ${label}: "正解" at index ${markerIdx} but answerIndex is ${answerIndex}`);
        errors++;
      }
    } else {
      console.error(`[MISSING EXPLANATIONS] ${label}: has meaning but no optionExplanations`);
      errors++;
    }
    const uniqueOptions = new Set(options);
    if (uniqueOptions.size !== options.length) {
      console.error(`[DUP OPTIONS] ${label}: duplicate option text found`);
      errors++;
    }
  }

  if (item.notes) {
    const haystack = (item.meaning ? item.meaning.prompt : '') + (item.script || '');
    for (const note of item.notes) {
      if (!haystack.includes(note.surface)) {
        console.error(`[NOTE SURFACE MISSING] ${label}: "${note.surface}" not found in prompt/script`);
        errors++;
      }
    }
  }
}

if (errors === 0) {
  console.log('All checks passed: option counts, "正解" marker alignment, answerIndex ranges, and note surfaces are consistent.');
} else {
  console.error(`${errors} problem(s) found.`);
  process.exitCode = 1;
}
