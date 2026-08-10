export default [
  {
    id: 'practice-obligation-ability',
    level: 'N5',
    title: '義務・可能・經驗（なければ・なくても・できる・ことがある・たりたり）',
    titleZh: '義務、可能與經驗表現',
    intro: '仕事と週末の過ごし方について。',
    grammarIds: ['nakereba-narimasen', 'nakutemo-ii', 'dekiru-potential', 'koto-ga-arimasu', 'tari-tari-suru'],
    sentences: [
      {
        grammarId: 'nakereba-narimasen',
        jp: '明日[あした]、九時[くじ]までに行[い]かなければなりません。',
        zh: '明天必須九點前到。',
        target: 'なければなりません',
        meaning: {
          prompt: '句中的「なければなりません」在這裡的作用是什麼？',
          options: ['表示義務「必須…」', '表示不需要「不…也可以」', '表示能力', '表示經驗'],
          answerIndex: 0,
        },
        cloze: { options: ['なければなりません', 'なくてもいいです', 'ることができます', 'たことがあります'], answerIndex: 0 },
      },
      {
        grammarId: 'nakutemo-ii',
        jp: '今日[きょう]は仕事[しごと]に行[い]かなくてもいいです。',
        zh: '今天不用去上班也沒關係。',
        target: 'なくてもいいです',
        meaning: {
          prompt: '句中的「なくてもいいです」在這裡的作用是什麼？',
          options: ['表示不需要做某事「不…也沒關係」', '表示義務「必須…」', '表示能力', '表示禁止'],
          answerIndex: 0,
        },
        cloze: { options: ['なくてもいいです', 'なければなりません', 'てはいけません', 'てもいいです'], answerIndex: 0 },
      },
      {
        grammarId: 'dekiru-potential',
        jp: '私[わたし]は日本語[にほんご]が話[はな]せます。',
        zh: '我會說日文。',
        target: '話[はな]せます',
        meaning: {
          prompt: '句中的「話せます」在這裡的作用是什麼？',
          options: ['表示能力「能夠、可以做到」', '表示義務', '表示經驗', '表示願望'],
          answerIndex: 0,
        },
        cloze: { options: ['話[はな]せます', '話[はな]します', '話[はな]しました', '話[はな]したいです'], answerIndex: 0 },
      },
      {
        grammarId: 'koto-ga-arimasu',
        jp: '富士山[ふじさん]に登[のぼ]ったことがあります。',
        zh: '曾經爬過富士山。',
        target: 'たことがあります',
        meaning: {
          prompt: '句中的「たことがあります」在這裡的作用是什麼？',
          options: ['表示過去的經驗「曾經做過…」', '表示能力', '表示義務', '表示兩個動作同時進行'],
          answerIndex: 0,
        },
        cloze: { options: ['たことがあります', 'ています', 'てもいいです', 'なければなりません'], answerIndex: 0 },
      },
      {
        grammarId: 'tari-tari-suru',
        jp: '週末[しゅうまつ]は本[ほん]を読[よ]んだり、映画[えいが]を見[み]たりします。',
        zh: '週末會看看書、看看電影之類的。',
        target: 'んだり',
        meaning: {
          prompt: '句中的「んだり」在這裡的作用是什麼？',
          options: ['列舉代表性動作「有時…有時…、又…又…」', '表示先後順序', '表示兩個動作同時進行', '表示原因'],
          answerIndex: 0,
        },
        cloze: { options: ['んだり', 'てから', 'ながら', 'ています'], answerIndex: 0 },
      },
    ],
  },
];
