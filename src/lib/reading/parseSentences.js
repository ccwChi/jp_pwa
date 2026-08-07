// Pulls a { jp, zh } array out of whatever the AI pasted back — usually
// wrapped in explanation text and a ```js fence. Finds the first balanced
// [...] substring and evaluates just that (not the surrounding text), so
// stray prose or code-fence markers around it don't matter.
export function extractSentences(rawText) {
  const start = rawText.indexOf('[');
  if (start === -1) {
    throw new Error('找不到陣列開頭的 [，請確認貼上的內容有包含 AI 回傳的陣列。');
  }

  let depth = 0;
  let end = -1;
  for (let i = start; i < rawText.length; i++) {
    if (rawText[i] === '[') depth++;
    else if (rawText[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) {
    throw new Error('陣列的 [ 和 ] 沒有配對成功，請確認貼上的內容完整。');
  }

  const arraySource = rawText.slice(start, end + 1);

  let parsed;
  try {
    parsed = new Function(`return (${arraySource});`)();
  } catch {
    throw new Error('陣列格式有誤，無法解析，請確認是合法的 JS 陣列。');
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('解析出來的不是陣列，或陣列是空的。');
  }
  const invalid = parsed.find(s => typeof s?.jp !== 'string' || typeof s?.zh !== 'string');
  if (invalid) {
    throw new Error('陣列裡有項目缺少 jp 或 zh 欄位，請檢查格式。');
  }

  return parsed;
}
