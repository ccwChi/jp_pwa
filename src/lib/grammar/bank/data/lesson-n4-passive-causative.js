// Extracted from lessons/data/n4-passive-causative.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-passive-basic-1',
    grammarIds: ['passive-basic'],
    level: 'N4',
    section: 'grammar',
    meaning: {
      prompt: '「読む」的受身形是？',
      options: ['読まれる', '読られる', '読ませる', '読める'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-passive-suffering-1',
    grammarIds: ['passive-suffering'],
    level: 'N4',
    section: 'grammar',
    meaning: {
      prompt: '「雨に降られました」最貼近的意思是？',
      options: ['雨停了', '因為下雨感到困擾', '我讓雨停下來', '我喜歡下雨'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-causative-1',
    grammarIds: ['causative'],
    level: 'N4',
    section: 'grammar',
    meaning: {
      prompt: '「食べる」的使役形是？',
      options: ['食べさせる', '食べられる', '食べれる', '食べらせる'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-causative-passive-1',
    grammarIds: ['causative-passive'],
    level: 'N4',
    section: 'grammar',
    meaning: {
      prompt: '「小時候每天被迫練習鋼琴」用的是哪種形態？',
      options: ['受身形', '使役形', '使役受身形', '可能形'],
      answerIndex: 2,
    },
  },
];

export default items;
