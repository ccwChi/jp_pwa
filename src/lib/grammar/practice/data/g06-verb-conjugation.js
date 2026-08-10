export default [
  {
    id: 'practice-verb-conjugation',
    level: 'N5',
    title: '動詞變化（ます形・辞書形・て形・た形・ない形）',
    intro: '毎日の生活と週末の予定について。',
    grammarIds: ['masu-form', 'dictionary-form', 'te-form', 'ta-form', 'nai-form'],
    sentences: [
      {
        grammarId: 'masu-form',
        jp: '毎日[まいにち]コーヒーを飲[の]みます。',
        zh: '每天喝咖啡。',
        target: '飲[の]みます',
        meaning: {
          prompt: '句中的「飲みます」是動詞的哪一種形態？',
          options: ['禮貌體「ます形」', '辭書形（原形）', 'て形', '否定形（ない形）'],
          answerIndex: 0,
        },
        cloze: { options: ['飲[の]みます', '飲[の]む', '飲[の]んで', '飲[の]まない'], answerIndex: 0 },
      },
      {
        grammarId: 'dictionary-form',
        jp: '週末[しゅうまつ]、映画[えいが]を見[み]る。',
        zh: '（普通體）週末看電影。',
        target: '見[み]る',
        meaning: {
          prompt: '句中的「見る」是動詞的哪一種形態？',
          options: ['辭書形（原形／普通體現在肯定）', '禮貌體ます形', 'て形', 'た形'],
          answerIndex: 0,
        },
        cloze: { options: ['見[み]る', '見[み]ます', '見[み]て', '見[み]た'], answerIndex: 0 },
      },
      {
        grammarId: 'te-form',
        jp: '窓[まど]を開[あ]けて、部屋[へや]を掃除[そうじ]します。',
        zh: '打開窗戶，打掃房間。',
        target: '開[あ]けて',
        meaning: {
          prompt: '句中的「開けて」是動詞的哪一種形態？',
          options: ['て形，用來連接兩個動作或接續其他句型', '辭書形', 'た形', 'ない形'],
          answerIndex: 0,
        },
        cloze: { options: ['開[あ]けて', '開[あ]ける', '開[あ]けた', '開[あ]けない'], answerIndex: 0 },
      },
      {
        grammarId: 'ta-form',
        jp: '先週[せんしゅう]、京都[きょうと]へ行[い]った。',
        zh: '（普通體）上禮拜去了京都。',
        target: '行[い]った',
        meaning: {
          prompt: '句中的「行った」是動詞的哪一種形態？',
          options: ['普通體過去肯定形「た形」', '辭書形', 'て形', 'ない形'],
          answerIndex: 0,
        },
        cloze: { options: ['行[い]った', '行[い]く', '行[い]って', '行[い]かない'], answerIndex: 0 },
      },
      {
        grammarId: 'nai-form',
        jp: '今日[きょう]は学校[がっこう]へ行[い]かない。',
        zh: '（普通體）今天不去學校。',
        target: '行[い]かない',
        meaning: {
          prompt: '句中的「行かない」是動詞的哪一種形態？',
          options: ['普通體現在否定形「ない形」', '辭書形', 'た形', 'て形'],
          answerIndex: 0,
        },
        cloze: { options: ['行[い]かない', '行[い]く', '行[い]った', '行[い]って'], answerIndex: 0 },
      },
    ],
  },
];
