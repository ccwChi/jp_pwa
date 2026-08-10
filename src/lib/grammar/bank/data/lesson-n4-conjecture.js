// Extracted from lessons/data/n4-conjecture.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-sou-desu-appearance-1',
    grammarIds: ['sou-desu-appearance'],
    level: 'N4',
    meaning: {
      prompt: '看到天空烏雲密布，想說「看起來快下雨了」，該怎麼說？',
      options: ['雨が降るそうです', '雨が降りそうです', '雨がそうです', '雨みたいそうです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-sou-desu-hearsay-1',
    grammarIds: ['sou-desu-hearsay'],
    level: 'N4',
    meaning: {
      prompt: '「聽說田中先生下個月要結婚」，該怎麼說？',
      options: ['結婚しそうです', '結婚するそうです', '結婚だそうです', '結婚みたいです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-you-da-1',
    grammarIds: ['you-da'],
    level: 'N4',
    meaning: {
      prompt: '想表達「隔壁房間好像有人在」（根據聲音判斷），該用哪個句型？',
      options: ['誰かいそうです', '誰かいるようです', '誰かいるらしいです', '誰かいたいです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-mitai-da-1',
    grammarIds: ['mitai-da'],
    level: 'N4',
    meaning: {
      prompt: '「他好像是學生」用みたいです該怎麼說？',
      options: ['学生のみたいです', '学生なみたいです', '学生みたいです', '学生だみたいです'],
      answerIndex: 2,
    },
  },
  {
    id: 'lesson-quiz-rashii-1',
    grammarIds: ['rashii'],
    level: 'N4',
    meaning: {
      prompt: '「らしい」推測的資訊來源通常是？',
      options: ['自己的直接感受', '聽說或看到的客觀依據', '純粹的想像', '一定會發生的事實'],
      answerIndex: 1,
    },
  },
];

export default items;
