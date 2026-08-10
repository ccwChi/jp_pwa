// Extracted from lessons/data/n2-limitation-emphasis.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-ni-kagitte-1',
    grammarIds: ['ni-kagitte'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「偏偏在趕時間的時候，電車就誤點」，這種「偏偏…」的語感該用哪個句型？',
      options: [
        '急いでいるときにかけて、電車が遅れます',
        '急いでいるときに限って、電車が遅れます',
        '急いでいるときに応じて、電車が遅れます',
        '急いでいるときに沿って、電車が遅れます',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-nominarazu-1',
    grammarIds: ['nominarazu'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「のみならず」和「だけでなく」相比，語感上有什麼不同？',
      options: ['完全一樣沒有差別', 'のみならず更書面、正式', 'だけでなく更書面、正式', 'のみならず只能用於否定句'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-sura-1',
    grammarIds: ['sura'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「他連自己的名字都不會寫」該怎麼說？',
      options: [
        '彼は自分の名前だけ書けませんでした',
        '彼は自分の名前すら書けませんでした',
        '彼は自分の名前に限って書けませんでした',
        '彼は自分の名前のみならず書けませんでした',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-naimademo-1',
    grammarIds: ['naimademo'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「雖然不到每天，但至少一週想運動三次」該用哪個句型？',
      options: [
        '毎日とは言うまでも、週に三回は運動したいです',
        '毎日とは言わないまでも、週に三回は運動したいです',
        '毎日とは言わないことには、週に三回は運動したいです',
        '毎日とは言わないばかりに、週に三回は運動したいです',
      ],
      answerIndex: 1,
    },
  },
];

export default items;
