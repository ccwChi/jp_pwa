// Japanese display labels for the TYPES enum in ./index.js — same
// "English identifier for storage, Chinese label for UI" split as
// ./posLabels.js. labelForType() falls back to the raw value for anything
// not listed here so a future TYPES addition never crashes the UI, just
// shows the English id until a label gets added.
const LABELS = {
  reading: '漢字讀音',
  kanji: '漢字書寫',
  'fill-in-blank-vocab': '詞彙填空',
  paraphrase: '同義句判斷',
  'word-usage': '詞彙用法判斷',
  'sentence-ordering': '句子排序',
  'listening-with-image-options': '聽力（圖片選項）',
  'listening-text-only': '聽力（文字選項）',
  'particle-fill-in-blank': '助詞填空',
  'conjugation-fill-in-blank': '動詞變化填空',
  'dialogue-response': '對話應答',
  'dialogue-cloze': '對話克漏字',
  'reading-comprehension': '閱讀理解',
  'usage-choice': '情境用法判斷',
  'pattern-practice': '文法句型練習',
};

export function labelForType(type) {
  return LABELS[type] || type;
}
