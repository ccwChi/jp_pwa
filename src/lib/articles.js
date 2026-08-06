// Hand-authored articles. Kanji use inline furigana: 漢字[かんじ].
// Kept as plain JS/data (not a huge bundled asset) — add more entries here
// as you write them; split into multiple files later if this grows large.

export const articles = [
  {
    id: 'eki-announcement',
    title: '駅のアナウンス',
    level: 'N3',
    excerpt: '強風で電車が遅れているときの、駅のアナウンス。',
    sentences: [
      {
        jp: 'お客様[きゃくさま]にお知[し]らせいたします。',
        zh: '各位旅客請注意。',
      },
      {
        jp: 'ただいま、強風[きょうふう]の影響[えいきょう]により、東京[とうきょう]方面[ほうめん]行[ゆ]きの列車[れっしゃ]に遅[おく]れが出[で]ております。',
        zh: '現在，由於強風的影響，開往東京方向的列車發生了延誤。',
      },
      {
        jp: 'お急[いそ]ぎのところ、大変[たいへん]ご迷惑[めいわく]をおかけいたします。',
        zh: '在您趕時間的時候，造成您極大的困擾，我們深感抱歉。',
      },
      {
        jp: '今後[こんご]の運行[うんこう]状況[じょうきょう]につきましては、駅[えき]の案内板[あんないばん]をご確認[かくにん]ください。',
        zh: '關於今後的行駛狀況，請確認車站的電子告示牌。',
      },
    ],
    vocab: [
      { word: '影響', reading: 'えいきょう', meaning: '影響' },
      { word: '遅れ', reading: 'おくれ', meaning: '延遲、誤點' },
      { word: '迷惑', reading: 'めいわく', meaning: '困擾、麻煩' },
      { word: '運行状況', reading: 'うんこうじょうきょう', meaning: '行駛狀況' },
      { word: '案内板', reading: 'あんないばん', meaning: '告示牌、電子看板' },
    ],
    grammar: [
      {
        point: '〜により',
        explanation: '表示原因「由於…、因為…」，比「ので」更生硬、更正式，常見於新聞、廣播、官方公告。',
      },
      {
        point: 'お〜のところ',
        explanation: '客套的敬語表現，「ところ」不是指地方，而是「狀態、時候」。「お急ぎのところ」＝「在您正急著趕路的狀態下」。',
      },
      {
        point: '〜につきましては',
        explanation: '「〜について（關於…）」的敬語升級版，常見於廣播或商業書信中。',
      },
    ],
    quiz: [
      {
        question: '列車が遅れている原因は何ですか。',
        options: ['強風', '事故', '停電', '雪'],
        answerIndex: 0,
      },
      {
        question: '「〜により」の意味に一番近いのはどれですか。',
        options: ['ので', 'けど', 'によって', 'たら'],
        answerIndex: 2,
      },
      {
        question: '今後の運行状況はどこで確認できますか。',
        options: ['駅員に聞く', '駅の案内板', 'インターネット', '電話'],
        answerIndex: 1,
      },
    ],
  },
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

export function getArticles() {
  return articles;
}

export function getArticle(id) {
  return articles.find(a => a.id === id) || null;
}

export function getLevels() {
  return [...new Set(articles.map(a => a.level))].sort();
}
