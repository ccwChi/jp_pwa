// Extracted from practice/data/n3-g04-limitation-reason.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n3-limitation-reason-dake-de-naku',
    grammarIds: ['dake-de-naku'],
    level: 'N3',
    section: 'grammar',
    jp: '彼[かれ]は英語[えいご]だけでなく、フランス語[ご]も話[はな]せます。',
    zh: '他不僅會說英文，還會說法文。',
    target: 'だけでなく',
    meaning: {
      prompt: '句中的「だけでなく」在這裡的作用是什麼？',
      options: ['表示不僅止於前項，還包含後項「不僅…而且…」', '表示程度上完全相反、更誇張', '表示連…都（舉極端例子）', '表示不僅限於這個範圍'],
      answerIndex: 0,
    },
    cloze: {
      options: ['だけでなく', 'どころか', 'さえ', 'に限[かぎ]らず'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-limitation-reason-dokoro-ka',
    grammarIds: ['dokoro-ka'],
    level: 'N3',
    section: 'grammar',
    jp: '休[やす]みどころか、残業[ざんぎょう]ばかりです。',
    zh: '別說休假了，都在加班。',
    target: 'どころか',
    meaning: {
      prompt: '句中的「どころか」在這裡的作用是什麼？',
      options: ['表示程度上完全相反，甚至更誇張「別說…了，就連…」', '表示不僅止於前項', '表示只要滿足最低條件', '表示不限於這個範圍'],
      answerIndex: 0,
    },
    cloze: {
      options: ['どころか', 'だけでなく', 'さえ', 'に限[かぎ]らず'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-limitation-reason-sae',
    grammarIds: ['sae'],
    level: 'N3',
    section: 'grammar',
    jp: '時間[じかん]さえあれば、行[い]きたいです。',
    zh: '只要有時間，我就想去。',
    target: 'さえ',
    meaning: {
      prompt: '句中的「さえ」在這裡的作用是什麼？',
      options: ['「さえ〜ば」表示只要滿足最低限度的條件', '表示不僅止於前項', '表示程度上完全相反', '表示不限於這個範圍'],
      answerIndex: 0,
    },
    cloze: {
      options: ['さえ', 'だけ', 'しか', 'ばかり'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-limitation-reason-ni-kagirazu',
    grammarIds: ['ni-kagirazu'],
    level: 'N3',
    section: 'grammar',
    jp: '週末[しゅうまつ]に限[かぎ]らず、平日[へいじつ]も込[こ]んでいます。',
    zh: '不只週末，平日也很擁擠。',
    target: 'に限[かぎ]らず',
    meaning: {
      prompt: '句中的「に限らず」在這裡的作用是什麼？',
      options: ['表示不僅限於前項範圍，還包括更廣的範圍', '表示程度相反更誇張', '表示舉極端例子強調', '表示只要滿足最低條件'],
      answerIndex: 0,
    },
    cloze: {
      options: ['に限[かぎ]らず', 'だけでなく', 'どころか', 'さえ'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-limitation-reason-sei-de',
    grammarIds: ['sei-de'],
    level: 'N3',
    section: 'grammar',
    jp: '彼[かれ]のせいで、遅刻[ちこく]しました。',
    zh: '都怪他，害我遲到了。',
    target: 'せいで',
    meaning: {
      prompt: '句中的「せいで」在這裡的作用是什麼？',
      options: ['表示負面結果的原因，帶責怪語氣「都怪…」', '表示正面結果的原因，帶感謝語氣', '表示推斷的根據、由來', '表示程度過度導致的結果'],
      answerIndex: 0,
    },
    cloze: {
      options: ['せいで', 'おかげで', 'ことから', 'あまり'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-limitation-reason-okage-de',
    grammarIds: ['okage-de'],
    level: 'N3',
    section: 'grammar',
    jp: '先生[せんせい]のおかげで、試験[しけん]に合格[ごうかく]しました。',
    zh: '多虧老師，我考試通過了。',
    target: 'おかげで',
    meaning: {
      prompt: '句中的「おかげで」在這裡的作用是什麼？',
      options: ['表示正面結果的原因，帶感謝、慶幸語氣「多虧…」', '表示負面結果的原因，帶責怪語氣', '表示推斷的根據、由來', '表示程度過度導致的結果'],
      answerIndex: 0,
    },
    cloze: {
      options: ['おかげで', 'せいで', 'ことから', 'あまり'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-limitation-reason-koto-kara',
    grammarIds: ['koto-kara'],
    level: 'N3',
    section: 'grammar',
    jp: '雲[くも]が多[おお]いことから、明日[あした]は雨[あめ]かもしれません。',
    zh: '從雲很多這點來看，明天可能會下雨。',
    target: 'ことから',
    meaning: {
      prompt: '句中的「ことから」在這裡的作用是什麼？',
      options: ['表示從某個線索、事實推斷出結論或由來', '表示正面結果的原因', '表示負面結果的原因', '表示程度過度導致的結果'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ことから', 'せいで', 'おかげで', 'あまり'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-limitation-reason-amari-ni',
    grammarIds: ['amari-ni'],
    level: 'N3',
    section: 'grammar',
    jp: '驚[おどろ]きのあまり、声[こえ]が出[で]ませんでした。',
    zh: '因為太驚訝了，連聲音都發不出來。',
    target: 'あまり',
    meaning: {
      prompt: '句中的「あまり」在這裡的作用是什麼？',
      options: ['表示程度過度，因而導致（通常負面）結果「因為太過…以致於…」', '表示正面結果的原因', '表示負面結果的原因', '表示推斷的根據'],
      answerIndex: 0,
    },
    cloze: {
      options: ['あまり', 'せいで', 'おかげで', 'ことから'],
      answerIndex: 0,
    },
  },
];

export default items;
