// Extracted from lessons/data/n3-limitation-extent.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-dake-de-naku-1',
    grammarIds: ['dake-de-naku'],
    level: 'N3',
    meaning: {
      prompt: '「他不僅會說英文，還會說法文」該怎麼說？',
      options: ['彼は英語も話せます', '彼は英語だけでなく、フランス語も話せます', '彼は英語より、フランス語のほうが話せます', '彼は英語について、フランス語も話せます'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-dokoro-ka-1',
    grammarIds: ['dokoro-ka'],
    level: 'N3',
    meaning: {
      prompt: '「別說休假了，都在加班」該怎麼說？',
      options: ['休みだけでなく、残業ばかりです', '休みどころか、残業ばかりです', '休みに対して、残業ばかりです', '休みのわりに、残業ばかりです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-sae-1',
    grammarIds: ['sae'],
    level: 'N3',
    meaning: {
      prompt: '「只要有時間，我就想去」（強調最低限度的條件），該用哪個句型？',
      options: ['時間があれば、行きたいです', '時間さえあれば、行きたいです', '時間としたら、行きたいです', '時間のわりに、行きたいです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ni-kagirazu-1',
    grammarIds: ['ni-kagirazu'],
    level: 'N3',
    meaning: {
      prompt: '「不只週末，平日也很擁擠」該怎麼說？',
      options: ['週末にとって、平日も込んでいます', '週末に限らず、平日も込んでいます', '週末において、平日も込んでいます', '週末のせいで、平日も込んでいます'],
      answerIndex: 1,
    },
  },
];

export default items;
