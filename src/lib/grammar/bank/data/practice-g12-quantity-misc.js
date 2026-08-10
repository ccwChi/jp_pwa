// Extracted from practice/data/g12-quantity-misc.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-quantity-misc-counters',
    grammarIds: ['counters'],
    level: 'N5',
    jp: '本[ほん]を三冊[さんさつ]買[か]いました。',
    zh: '買了三本書。',
    target: '三冊[さんさつ]',
    meaning: {
      prompt: '句中的「三冊」在這裡的作用是什麼？',
      options: ['依物品種類搭配的量詞，這裡是數書本', '數細長物', '數薄平物', '數人數'],
      answerIndex: 0,
    },
    cloze: {
      options: ['三冊[さんさつ]', '三枚[さんまい]', '三本[さんぼん]', '三匹[さんびき]'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-quantity-misc-kurai-gurai',
    grammarIds: ['kurai-gurai'],
    level: 'N5',
    jp: '駅[えき]まで十分[じゅっぷん]くらいかかります。',
    zh: '到車站大約要花十分鐘。',
    target: 'くらい',
    meaning: {
      prompt: '句中的「くらい」在這裡的作用是什麼？',
      options: ['表示大概的數量或時間「大約…」', '表示限定範圍', '表示程度過頭', '表示疑問'],
      answerIndex: 0,
    },
    cloze: {
      options: ['くらい', 'だけ', 'しか', 'すぎ'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-quantity-misc-sugiru',
    grammarIds: ['sugiru'],
    level: 'N5',
    jp: '昨日[きのう]、お酒[さけ]を飲[の]みすぎました。',
    zh: '昨天酒喝太多了。',
    target: 'すぎました',
    meaning: {
      prompt: '句中的「すぎました」在這裡的作用是什麼？',
      options: ['表示程度超過合理範圍「太…了」', '表示大約的估計', '表示限定範圍', '表示疑問'],
      answerIndex: 0,
    },
    cloze: {
      options: ['すぎました', 'くらいでした', 'だけでした', 'ながらでした'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-quantity-misc-question-word-ka',
    grammarIds: ['question-word-ka'],
    level: 'N5',
    jp: '何[なに]か飲[の]みますか。',
    zh: '要喝點什麼嗎？',
    target: '何[なに]か',
    meaning: {
      prompt: '句中的「何か」在這裡的作用是什麼？',
      options: ['疑問詞＋か表示不特定的對象「什麼（東西）」', '疑問詞本身，問具體是什麼', '表示大約', '表示限定'],
      answerIndex: 0,
    },
    cloze: {
      options: ['何[なに]か', '何[なに]が', '何[なに]を', '何[なに]は'],
      answerIndex: 0,
    },
  },
];

export default items;
