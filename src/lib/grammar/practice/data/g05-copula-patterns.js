export default [
  {
    id: 'practice-copula-patterns',
    level: 'N5',
    title: '判斷句型（です・だ・と思います・でしょう・んです）',
    intro: '自己紹介と明日の天気の話。',
    grammarIds: ['desu-da', 'ja-nai-dewa-arimasen', 'deshita', 'to-omoimasu', 'deshou', 'n-desu'],
    sentences: [
      {
        grammarId: 'desu-da',
        jp: '私[わたし]は台湾人[たいわんじん]です。',
        zh: '我是台灣人。',
        target: 'です',
        meaning: {
          prompt: '句中的「です」在這裡的作用是什麼？',
          options: ['禮貌體斷定句「是～」', '禮貌體斷定句的否定「不是～」', '過去式「（過去）是～」', '推測「大概～吧」'],
          answerIndex: 0,
        },
        cloze: { options: ['です', 'でした', 'でしょう', 'ですか'], answerIndex: 0 },
      },
      {
        grammarId: 'ja-nai-dewa-arimasen',
        jp: 'これは日本[にほん]の商品[しょうひん]ではありません。',
        zh: '這不是日本的商品。',
        target: 'ではありません',
        meaning: {
          prompt: '句中的「ではありません」在這裡的作用是什麼？',
          options: ['「です」的否定形「不是～」', '「です」的過去形', '表推測', '表列舉'],
          answerIndex: 0,
        },
        cloze: { options: ['ではありません', 'でした', 'でしょう', 'です'], answerIndex: 0 },
      },
      {
        grammarId: 'deshita',
        jp: '昨日[きのう]は休[やす]みでした。',
        zh: '昨天是放假日。',
        target: 'でした',
        meaning: {
          prompt: '句中的「でした」在這裡的作用是什麼？',
          options: ['「です」的過去肯定形「（過去）是～」', '「です」的過去否定形', '現在肯定形', '推測形'],
          answerIndex: 0,
        },
        cloze: { options: ['でした', 'です', 'でしょう', 'ではありません'], answerIndex: 0 },
      },
      {
        grammarId: 'to-omoimasu',
        jp: '明日[あした]は雨[あめ]が降[ふ]ると思[おも]います。',
        zh: '我覺得明天會下雨。',
        target: 'と思[おも]います',
        meaning: {
          prompt: '句中的「と思います」在這裡的作用是什麼？',
          options: ['表達說話者的意見或推測「我覺得…」', '表示徵求對方同意', '表示禁止', '表示邀約'],
          answerIndex: 0,
        },
        cloze: { options: ['と思[おも]います', 'でしょう', 'んです', 'ながら'], answerIndex: 0 },
      },
      {
        grammarId: 'deshou',
        jp: '明日[あした]は晴[は]れるでしょう。',
        zh: '明天大概會放晴吧。',
        target: 'でしょう',
        meaning: {
          prompt: '句中的「でしょう」在這裡的作用是什麼？',
          options: ['表示推測「大概…吧」', '表示禁止', '表示邀約', '表示願望'],
          answerIndex: 0,
        },
        cloze: { options: ['でしょう', 'ましょう', 'てください', 'たいです'], answerIndex: 0 },
      },
      {
        grammarId: 'n-desu',
        jp: 'すみません、電車[でんしゃ]が遅[おく]れたんです。',
        zh: '不好意思，因為電車誤點了。',
        target: 'んです',
        meaning: {
          prompt: '句中的「んです」在這裡的作用是什麼？',
          options: ['對聽者強調背景說明、理由', '表示推測', '表示邀約', '表示禁止'],
          answerIndex: 0,
        },
        cloze: { options: ['んです', 'でしょう', 'ながら', 'たら'], answerIndex: 0 },
      },
    ],
  },
];
