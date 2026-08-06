const articles = [
  {
    id: 'jikoshoukai',
    title: '自己紹介',
    level: 'N5',
    excerpt: '名前と趣味を紹介する、簡単な自己紹介の文章。',
    sentences: [
      {
        jp: 'こんにちは。私[わたし]の名前[なまえ]は田中[たなか]です。',
        zh: '你好，我的名字是田中。',
      },
      {
        jp: '日本語[にほんご]を勉強[べんきょう]しています。',
        zh: '我正在學習日文。',
      },
      {
        jp: '趣味[しゅみ]は音楽[おんがく]を聞[き]くことです。',
        zh: '我的興趣是聽音樂。',
      },
      {
        jp: 'よろしくお願[ねが]いします。',
        zh: '請多多指教。',
      },
    ],
    vocab: [
      { word: '名前', reading: 'なまえ', meaning: '名字' },
      { word: '勉強', reading: 'べんきょう', meaning: '學習' },
      { word: '趣味', reading: 'しゅみ', meaning: '興趣' },
      { word: '音楽', reading: 'おんがく', meaning: '音樂' },
    ],
    grammar: [
      {
        point: '〜は〜です',
        explanation: 'N5 最基本的句型，「主詞は名詞/形容詞です」，表示「…是…」。',
      },
      {
        point: '〜ています',
        explanation: '表示正在進行的動作，或習慣性、持續性的狀態。',
      },
    ],
    quiz: [
      {
        question: '田中さんの趣味は何ですか。',
        options: ['音楽を聞くこと', '映画を見ること', '本を読むこと', '料理をすること'],
        answerIndex: 0,
      },
    ],
  },
];

export default articles;
