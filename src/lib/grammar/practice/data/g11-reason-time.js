export default [
  {
    id: 'practice-reason-time',
    level: 'N5',
    title: '理由・時間表現（から・ので・とき・まえに・あとで）',
    titleZh: '理由與時間表現',
    intro: '体調不良で会社を休んだ日のこと。',
    grammarIds: ['kara-reason', 'node-reason', 'toki', 'mae-ni', 'ato-de'],
    sentences: [
      {
        grammarId: 'kara-reason',
        jp: '今日[きょう]は熱[ねつ]があるから、休[やす]みます。',
        zh: '今天因為發燒所以請假。',
        target: 'から',
        meaning: {
          prompt: '句中的「から」在這裡的作用是什麼？',
          options: ['表示主觀、直接的原因「因為…」', '表示較客觀、委婉的原因', '表示時間點', '表示先後順序'],
          answerIndex: 0,
        },
        cloze: { options: ['から', 'ので', 'とき', 'まえに'], answerIndex: 0 },
      },
      {
        grammarId: 'node-reason',
        jp: '雨[あめ]が降[ふ]っているので、傘[かさ]を持[も]っていきます。',
        zh: '因為在下雨，所以帶傘出門。',
        target: 'ので',
        meaning: {
          prompt: '句中的「ので」在這裡的作用是什麼？',
          options: ['表示較客觀、委婉的原因「因為…」', '表示主觀、直接的原因', '表示時間點', '表示先後順序'],
          answerIndex: 0,
        },
        cloze: { options: ['ので', 'から', 'とき', 'あとで'], answerIndex: 0 },
      },
      {
        grammarId: 'toki',
        jp: '子供[こども]のとき、よく公園[こうえん]で遊[あそ]びました。',
        zh: '小時候常常在公園玩。',
        target: 'とき',
        meaning: {
          prompt: '句中的「とき」在這裡的作用是什麼？',
          options: ['表示「…的時候」，標示某個時間點或狀態發生時', '表示原因', '表示先後順序（之前）', '表示先後順序（之後）'],
          answerIndex: 0,
        },
        cloze: { options: ['とき', 'まえに', 'あとで', 'ながら'], answerIndex: 0 },
      },
      {
        grammarId: 'mae-ni',
        jp: '寝[ね]るまえに、歯[は]を磨[みが]きます。',
        zh: '睡覺前刷牙。',
        target: 'まえに',
        meaning: {
          prompt: '句中的「まえに」在這裡的作用是什麼？',
          options: ['表示「在…之前」，前面動詞用辭書形', '表示「在…之後」，前面動詞用た形', '表示原因', '表示「…的時候」'],
          answerIndex: 0,
        },
        cloze: { options: ['まえに', 'あとで', 'とき', 'ので'], answerIndex: 0 },
      },
      {
        grammarId: 'ato-de',
        jp: 'ご飯[はん]を食[た]べたあとで、薬[くすり]を飲[の]みます。',
        zh: '吃完飯之後吃藥。',
        target: 'あとで',
        meaning: {
          prompt: '句中的「あとで」在這裡的作用是什麼？',
          options: ['表示「在…之後」，前面動詞用た形', '表示「在…之前」，前面動詞用辭書形', '表示原因', '表示「…的時候」'],
          answerIndex: 0,
        },
        cloze: { options: ['あとで', 'まえに', 'とき', 'から'], answerIndex: 0 },
      },
    ],
  },
];
