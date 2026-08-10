// Extracted from lessons/data/n5-giving-receiving.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-agemasu-1',
    grammarIds: ['agemasu'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '「我送禮物給朋友」，視角站在給予者這邊，該用哪個動詞？',
      options: ['あげます', 'もらいます', 'くれます', 'あります'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-moraimasu-1',
    grammarIds: ['moraimasu'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '想強調「我從朋友那裡收到了禮物」（視角站在接收者），該用哪個動詞？',
      options: ['あげます', 'もらいます', 'くれます', 'います'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-kuremasu-1',
    grammarIds: ['kuremasu'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '「田中先生給了我一本書」，接收者是「我」，該用哪個動詞？',
      options: ['あげます', 'もらいます', 'くれます', 'します'],
      answerIndex: 2,
    },
  },
];

export default items;
