// One-off consistency check for the 2010-12 N3 exam bank items:
// verifies optionExplanations length matches meaning.options length, and that
// the "正解" (correct-answer) marker line lands on the same index as answerIndex.
// Run: node scripts/verify-jlpt-n3-2010-12.mjs
import items from '../src/lib/practice/bank/data/N3-listening-text-only-02.js';

let errors = 0;
let checked = 0;

for (const item of items) {
  if (!item.meaning) continue;
  checked++;
  const { options, answerIndex } = item.meaning;
  const exp = item.optionExplanations;
  if (!exp) {
    console.error(`[MISSING] ${item.id}: has meaning but no optionExplanations`);
    errors++;
    continue;
  }
  if (exp.length !== options.length) {
    console.error(`[LENGTH] ${item.id}: optionExplanations(${exp.length}) != options(${options.length})`);
    errors++;
  }
  const markerIdx = exp.findIndex((e) => e.includes('正解'));
  if (markerIdx === -1) {
    console.error(`[NO MARKER] ${item.id}: no explanation contains "正解"`);
    errors++;
  } else if (markerIdx + 1 !== answerIndex) {
    console.error(
      `[MISMATCH] ${item.id}: "正解" marker at index ${markerIdx + 1} but answerIndex is ${answerIndex}`
    );
    errors++;
  }
  // Sanity: the option text mentioned isn't literally reproduced in Chinese explanations
  // (explanations are translated/paraphrased), so we just check option array itself
  // isn't empty/duplicated garbage.
  const uniqueOptions = new Set(options);
  if (uniqueOptions.size !== options.length) {
    console.error(`[DUP OPTIONS] ${item.id}: duplicate option text found`);
    errors++;
  }
}

console.log(`Checked ${checked} items with meaning.`);
if (errors === 0) {
  console.log('All optionExplanations/answerIndex checks passed.');
  process.exit(0);
} else {
  console.error(`${errors} problem(s) found.`);
  process.exit(1);
}
