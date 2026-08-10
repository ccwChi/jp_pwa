// Extracted from lessons/data/n4-nominalization-quotation.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-koto-ni-suru-1',
    grammarIds: ['koto-ni-suru'],
    level: 'N4',
    meaning: {
      prompt: '「決定從今年開始每天運動」，強調這是自己的決定，該用哪個句型？',
      options: ['運動することになりました', '運動することにしました', '運動するはずです', '運動するようです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-koto-ni-naru-1',
    grammarIds: ['koto-ni-naru'],
    level: 'N4',
    meaning: {
      prompt: '「下個月要調職到大阪了」（公司安排，非自己主動決定），該用哪個句型？',
      options: ['転勤することにしました', '転勤することになりました', '転勤するつもりです', '転勤したいです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-sou-da-tte-1',
    grammarIds: ['sou-da-tte'],
    level: 'N4',
    meaning: {
      prompt: '朋友間輕鬆地轉述「聽說田中先生下個月要結婚」，用哪個字最口語自然？',
      options: ['ということだ', 'って', 'はずだ', 'つもりだ'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-to-iu-noun-1',
    grammarIds: ['to-iu-noun'],
    level: 'N4',
    meaning: {
      prompt: '想介紹一位對方可能不認識的作家「村上春樹」，該用哪個句型最自然？',
      options: ['村上春樹の作家', '村上春樹という作家', '村上春樹的作家', '村上春樹そうな作家'],
      answerIndex: 1,
    },
  },
];

export default items;
