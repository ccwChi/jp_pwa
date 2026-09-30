export function shuffle(values, random = Math.random) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function isPlayable(item) {
  const q = item?.meaning;
  return !!q && Array.isArray(q.options) && q.options.length > 1
    && Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < q.options.length;
}

// Preserve the source index for recording answers and explanation lookup.
export function prepareQuestion(item, random = Math.random) {
  if (!isPlayable(item)) return null;
  const order = shuffle(item.meaning.options.map((_, i) => i), random);
  return {
    ...item,
    optionOrder: order,
    meaning: { ...item.meaning, options: order.map(i => item.meaning.options[i]), answerIndex: order.indexOf(item.meaning.answerIndex) },
    optionExplanations: order.map(i => item.optionExplanations?.[i] || ''),
  };
}
