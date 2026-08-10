// Splits a raw furigana-annotated sentence (see lib/reading/furigana) on the
// exact `target` substring it contains, so practice pages can render the
// target segment specially (highlighted in article mode, blanked out in
// cloze mode) while the rest of the sentence renders normally as ruby text.
export function splitOnTarget(jp, target) {
  const index = jp.indexOf(target);
  if (index === -1) {
    return { before: jp, target: '', after: '' };
  }
  return {
    before: jp.slice(0, index),
    target,
    after: jp.slice(index + target.length),
  };
}
