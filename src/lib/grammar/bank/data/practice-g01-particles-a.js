// Extracted from practice/data/g01-particles-a.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-particles-a-wa-topic',
    grammarIds: ['wa-topic'],
    level: 'N5',
    jp: '私[わたし]は田中[たなか]です。',
    zh: '我是田中。',
    target: 'は',
    meaning: {
      prompt: '句中的「は」在這裡的作用是什麼？',
      options: ['提示句子的主題', '標示動作的直接受詞', '表示動作發生的時間', '表示動作指向的對象'],
      answerIndex: 0,
    },
    cloze: {
      options: ['は', 'を', 'に', 'で'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-a-ga-subject',
    grammarIds: ['ga-subject'],
    level: 'N5',
    jp: '私[わたし]は日本語[にほんご]が好[す]きです。',
    zh: '我喜歡日文。',
    target: 'が',
    meaning: {
      prompt: '句中的「が」在這裡的作用是什麼？',
      options: ['標示喜好、能力等對象的主詞', '表示動作發生的地點', '表示比較的基準', '表示列舉的其中一項'],
      answerIndex: 0,
    },
    cloze: {
      options: ['が', 'を', 'の', 'と'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-a-wo-object',
    grammarIds: ['wo-object'],
    level: 'N5',
    jp: '毎朝[まいあさ]パンを食[た]べます。',
    zh: '每天早上吃麵包。',
    target: 'を',
    meaning: {
      prompt: '句中的「を」在這裡的作用是什麼？',
      options: ['標示他動詞的受詞', '標示存在的場所', '表示動作的到達點', '表示比較的對象'],
      answerIndex: 0,
    },
    cloze: {
      options: ['を', 'が', 'は', 'も'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-a-ni-time-target',
    grammarIds: ['ni-time-target'],
    level: 'N5',
    jp: '私[わたし]は七時[しちじ]に起[お]きます。',
    zh: '我七點起床。',
    target: 'に',
    meaning: {
      prompt: '句中的「に」在這裡的作用是什麼？',
      options: ['標示明確的時間點', '標示動作的受詞', '表示列舉', '表示轉折'],
      answerIndex: 0,
    },
    cloze: {
      options: ['に', 'で', 'を', 'は'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-a-de-location-method',
    grammarIds: ['de-location-method'],
    level: 'N5',
    jp: '図書館[としょかん]で勉強[べんきょう]します。',
    zh: '在圖書館讀書。',
    target: 'で',
    meaning: {
      prompt: '句中的「で」在這裡的作用是什麼？',
      options: ['標示動作進行的場所', '標示動作到達的地點', '標示動作的受詞', '表示希望'],
      answerIndex: 0,
    },
    cloze: {
      options: ['で', 'に', 'を', 'へ'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-a-to-and-with',
    grammarIds: ['to-and-with'],
    level: 'N5',
    jp: '田中[たなか]さんと一緒[いっしょ]に映画[えいが]を見[み]ます。',
    zh: '和田中先生一起看電影。',
    target: 'と',
    meaning: {
      prompt: '句中的「と」在這裡的作用是什麼？',
      options: ['表示「和・跟」，連接名詞或共同動作的對象', '表示動作的受詞', '表示存在的場所', '表示原因'],
      answerIndex: 0,
    },
    cloze: {
      options: ['と', 'や', 'に', 'で'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-a-mo-also',
    grammarIds: ['mo-also'],
    level: 'N5',
    jp: '田中[たなか]さんも学生[がくせい]です。',
    zh: '田中先生也是學生。',
    target: 'も',
    meaning: {
      prompt: '句中的「も」在這裡的作用是什麼？',
      options: ['表示「也」，取代は或が', '表示「只有」', '表示疑問', '表示比較基準'],
      answerIndex: 0,
    },
    cloze: {
      options: ['も', 'は', 'を', 'が'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-a-no-possessive-nominalizer',
    grammarIds: ['no-possessive-nominalizer'],
    level: 'N5',
    jp: 'これは私[わたし]の本[ほん]です。',
    zh: '這是我的書。',
    target: 'の',
    meaning: {
      prompt: '句中的「の」在這裡的作用是什麼？',
      options: ['連接兩個名詞，表示所屬「的」', '表示動作的對象', '表示比較', '表示原因'],
      answerIndex: 0,
    },
    cloze: {
      options: ['の', 'が', 'を', 'に'],
      answerIndex: 0,
    },
  },
];

export default items;
