// Japanese display labels for the English/hyphenated values in
// ./pos-options.json (those values are what's actually stored on bank items
// and used for filtering — kept in English so they're stable identifiers).
// labelForPosValue() falls back to the raw value itself for anything not
// listed here, which covers custom values added on the fly via the tagging
// tool (src/app/practice/tag) before anyone's had a chance to add a label.
const LABELS = {
  verbCategory: {
    godan: '五段動詞',
    ichidan: '一段動詞',
    suru: 'サ変動詞（する）',
    kuru: 'カ変動詞（来る）',
  },
  verbConjugation: {
    dictionary: '辞書形',
    masu: 'ます形',
    nai: 'ない形',
    te: 'て形',
    ta: 'た形',
    tari: 'たり形',
    stem: '連用形（ます語幹）',
    volitional: '意向形',
    potential: '可能形',
    passive: '受身形',
    causative: '使役形',
    'causative-passive': '使役受身形',
    imperative: '命令形',
    prohibitive: '禁止形',
    'conditional-ba': '条件形（ば形）',
    'conditional-tara': '条件形（たら形）',
    'conditional-to': '条件形（と形）',
    'conditional-nara': '条件形（なら形）',
  },
  adjCategory: {
    'i-adjective': 'い形容詞',
    'na-adjective': 'な形容詞',
  },
  adjConjugation: {
    dictionary: '辞書形',
    negative: '否定形',
    te: 'て形',
    ta: 'た形',
    adverbial: '副詞形',
    'noun-modifying': '連体形',
    'conditional-ba': '条件形（ば形）',
    'conditional-tara': '条件形（たら形）',
    'conditional-nara': '条件形（なら形）',
    presumptive: '推量形',
  },
  otherCategory: {
    adverb: '副詞',
    conjunction: '接続詞',
    particle: '助詞',
    interjection: '感動詞',
    prefix: '接頭辞',
    suffix: '接尾辞',
    counter: '助数詞',
    expression: '慣用表現',
  },
};

export function labelForPosValue(field, value) {
  return LABELS[field]?.[value] || value;
}
