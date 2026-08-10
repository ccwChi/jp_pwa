export default [
  {
    id: 'practice-n3-standard-perspective',
    level: 'N3',
    title: '基準・観点表現（において・に対して・にとって・として・に基づいて）',
    titleZh: '基準與觀點表現',
    intro: 'ビジネスと専門分野での立場について。',
    grammarIds: ['ni-oite', 'ni-taishite', 'ni-totte', 'to-shite', 'ni-motozuite'],
    sentences: [
      {
        grammarId: 'ni-oite',
        jp: 'この分野[ぶんや]において、彼[かれ]は第一人者[だいいちにんしゃ]です。',
        zh: '在這個領域，他是第一把交椅。',
        target: 'において',
        meaning: {
          prompt: '句中的「において」在這裡的作用是什麼？',
          options: ['表示動作發生的場合、領域、時間點，語感比「で」更書面', '表示動作指向的對象', '表示從某個立場評價', '表示以某種身分'],
          answerIndex: 0,
        },
        cloze: { options: ['において', 'に対[たい]して', 'にとって', 'として'], answerIndex: 0 },
      },
      {
        grammarId: 'ni-taishite',
        jp: '彼[かれ]は学生[がくせい]に対[たい]して、厳[きび]しいです。',
        zh: '他對學生很嚴格。',
        target: 'に対[たい]して',
        meaning: {
          prompt: '句中的「に対して」在這裡的作用是什麼？',
          options: ['表示動作、態度指向的對象，或表示對比', '表示動作發生的場合、領域', '表示從某個立場評價', '表示以某種身分'],
          answerIndex: 0,
        },
        cloze: { options: ['に対[たい]して', 'において', 'にとって', 'に基[もと]づいて'], answerIndex: 0 },
      },
      {
        grammarId: 'ni-totte',
        jp: '子供[こども]にとって、遊[あそ]びはとても大切[たいせつ]です。',
        zh: '對小孩來說，玩耍非常重要。',
        target: 'にとって',
        meaning: {
          prompt: '句中的「にとって」在這裡的作用是什麼？',
          options: ['表示從某個立場、角度來看「對…來說」', '表示動作指向的對象', '表示動作發生的場合', '表示以某種身分'],
          answerIndex: 0,
        },
        cloze: { options: ['にとって', 'に対[たい]して', 'において', 'として'], answerIndex: 0 },
      },
      {
        grammarId: 'to-shite',
        jp: '彼[かれ]は先生[せんせい]として、この学校[がっこう]で働[はたら]いています。',
        zh: '他以老師的身分在這所學校工作。',
        target: 'として',
        meaning: {
          prompt: '句中的「として」在這裡的作用是什麼？',
          options: ['表示身分、立場、資格「作為…、以…的身分」', '表示從某個立場評價', '表示動作發生的場合', '表示以某個依據為基礎'],
          answerIndex: 0,
        },
        cloze: { options: ['として', 'にとって', 'において', 'に基[もと]づいて'], answerIndex: 0 },
      },
      {
        grammarId: 'ni-motozuite',
        jp: 'この映画[えいが]は実際[じっさい]の事件[じけん]に基[もと]づいて作[つく]られました。',
        zh: '這部電影是根據真實事件拍攝的。',
        target: 'に基[もと]づいて',
        meaning: {
          prompt: '句中的「に基づいて」在這裡的作用是什麼？',
          options: ['表示以某個事實、資料、規則作為依據「根據…、基於…」', '表示身分立場', '表示對象或對比', '表示從某個角度評價'],
          answerIndex: 0,
        },
        cloze: { options: ['に基[もと]づいて', 'として', 'にとって', 'に対[たい]して'], answerIndex: 0 },
      },
    ],
  },
];
