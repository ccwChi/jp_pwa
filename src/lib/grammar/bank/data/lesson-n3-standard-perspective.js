// Extracted from lessons/data/n3-standard-perspective.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-ni-oite-1',
    grammarIds: ['ni-oite'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「において」後面直接接名詞時，該改成什麼形式？',
      options: ['においてだ', 'における', 'において的', 'においてます'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ni-taishite-1',
    grammarIds: ['ni-taishite'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「他對學生很嚴格」該怎麼說？',
      options: ['彼は学生にとって、厳しいです', '彼は学生に対して、厳しいです', '彼は学生において、厳しいです', '彼は学生に関して、厳しいです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ni-totte-1',
    grammarIds: ['ni-totte'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「對小孩來說，玩耍非常重要」該怎麼說？',
      options: ['子供に対して、遊びはとても大切です', '子供にとって、遊びはとても大切です', '子供において、遊びはとても大切です', '子供のせいで、遊びはとても大切です'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-to-shite-1',
    grammarIds: ['to-shite'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「他以老師的身分在這所學校工作」該怎麼說？',
      options: [
        '彼は先生にとって、この学校で働いています',
        '彼は先生として、この学校で働いています',
        '彼は先生に対して、この学校で働いています',
        '彼は先生において、この学校で働いています',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ni-motozuite-1',
    grammarIds: ['ni-motozuite'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「這部電影是根據真實事件拍攝的」該怎麼說？',
      options: [
        'この映画は実際の事件について作られました',
        'この映画は実際の事件に基づいて作られました',
        'この映画は実際の事件に対して作られました',
        'この映画は実際の事件にとって作られました',
      ],
      answerIndex: 1,
    },
  },
];

export default items;
