export default [
  {
    id: 'practice-demonstratives-giving',
    level: 'N5',
    title: 'こそあど＋授受動詞（あげる・もらう・くれる）',
    titleZh: '指示詞與授受動詞',
    intro: '買い物と誕生日プレゼントの話。',
    grammarIds: [
      'kore-sore-are-dore', 'kono-sono-ano-dono', 'koko-soko-asoko-doko', 'konna-sonna-anna-donna',
      'agemasu', 'moraimasu', 'kuremasu',
    ],
    sentences: [
      {
        grammarId: 'kore-sore-are-dore',
        jp: 'これは私[わたし]の傘[かさ]です。',
        zh: '這是我的傘。',
        target: 'これ',
        meaning: {
          prompt: '句中的「これ」在這裡的作用是什麼？',
          options: ['指示離說話者近的事物「這個」', '指示離聽話者近的事物', '指示離兩人都遠的事物', '疑問「哪個」'],
          answerIndex: 0,
        },
        cloze: { options: ['これ', 'それ', 'あれ', 'どれ'], answerIndex: 0 },
      },
      {
        grammarId: 'kono-sono-ano-dono',
        jp: 'あの人[ひと]は先生[せんせい]です。',
        zh: '那個人是老師。',
        target: 'あの',
        meaning: {
          prompt: '句中的「あの」在這裡的作用是什麼？',
          options: ['指離兩人都遠的「那個～」，後面須接名詞', '指離說話者近的「這個～」', '指離聽話者近的「那個～」', '疑問「哪個～」'],
          answerIndex: 0,
        },
        cloze: { options: ['あの', 'この', 'その', 'どの'], answerIndex: 0 },
      },
      {
        grammarId: 'koko-soko-asoko-doko',
        jp: 'すみません、駅[えき]はどこですか。',
        zh: '不好意思，請問車站在哪裡？',
        target: 'どこ',
        meaning: {
          prompt: '句中的「どこ」在這裡的作用是什麼？',
          options: ['場所疑問詞「哪裡」', '這裡（近說話者）', '那裡（近聽話者）', '那裡（離兩人都遠）'],
          answerIndex: 0,
        },
        cloze: { options: ['どこ', 'ここ', 'そこ', 'あそこ'], answerIndex: 0 },
      },
      {
        grammarId: 'konna-sonna-anna-donna',
        jp: 'どんな音楽[おんがく]が好[す]きですか。',
        zh: '喜歡哪種音樂？',
        target: 'どんな',
        meaning: {
          prompt: '句中的「どんな」在這裡的作用是什麼？',
          options: ['詢問性質、種類「哪樣的」', '指離說話者近的「這樣的」', '指離聽話者近的「那樣的」', '指離兩人都遠的「那樣的」'],
          answerIndex: 0,
        },
        cloze: { options: ['どんな', 'こんな', 'そんな', 'あんな'], answerIndex: 0 },
      },
      {
        grammarId: 'agemasu',
        jp: '私[わたし]は友達[ともだち]に誕生日[たんじょうび]のプレゼントをあげました。',
        zh: '我送了生日禮物給朋友。',
        target: 'あげました',
        meaning: {
          prompt: '句中的「あげました」在這裡的作用是什麼？',
          options: ['視角站在給予者這邊，「我（或他人）給別人」', '視角站在接收者這邊，「我從別人那裡得到」', '視角站在接收者這邊，「別人給我」', '表示存在'],
          answerIndex: 0,
        },
        cloze: { options: ['あげました', 'もらいました', 'くれました', 'ありました'], answerIndex: 0 },
      },
      {
        grammarId: 'moraimasu',
        jp: '私[わたし]は誕生日[たんじょうび]に友達[ともだち]からプレゼントをもらいました。',
        zh: '我生日時從朋友那裡收到了禮物。',
        target: 'もらいました',
        meaning: {
          prompt: '句中的「もらいました」在這裡的作用是什麼？',
          options: ['視角站在接收者這邊，「我從別人那裡得到」', '視角站在給予者這邊，「我給別人」', '視角站在接收者這邊，「別人給我」', '表示存在'],
          answerIndex: 0,
        },
        cloze: { options: ['もらいました', 'あげました', 'くれました', 'いました'], answerIndex: 0 },
      },
      {
        grammarId: 'kuremasu',
        jp: '田中[たなか]さんは私[わたし]に本[ほん]をくれました。',
        zh: '田中先生給了我一本書。',
        target: 'くれました',
        meaning: {
          prompt: '句中的「くれました」在這裡的作用是什麼？',
          options: ['視角站在接收者這邊，「別人給我（或我方）」', '視角站在給予者這邊，「我給別人」', '視角站在接收者這邊，「我從別人那裡得到」', '表示存在'],
          answerIndex: 0,
        },
        cloze: { options: ['くれました', 'あげました', 'もらいました', 'いました'], answerIndex: 0 },
      },
    ],
  },
];
