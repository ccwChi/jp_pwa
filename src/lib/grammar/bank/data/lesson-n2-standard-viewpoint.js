// Extracted from lessons/data/n2-standard-viewpoint.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-karashite-1',
    grammarIds: ['karashite'],
    level: 'N2',
    meaning: {
      prompt: '「〜からして」的語感是？',
      options: ['舉一個代表性的例子，説明從這點就能推知整體', '表示完全沒有根據的猜測', '表示絕對不可能發生', '表示唯一的必要條件'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-kara-suruto-1',
    grammarIds: ['kara-suruto'],
    level: 'N2',
    meaning: {
      prompt: '「從專家的角度來看，這個計畫似乎有困難」該怎麼說？',
      options: [
        '専門家にとって、この計画には無理があるようです',
        '専門家からすると、この計画には無理があるようです',
        '専門家として、この計画には無理があるようです',
        '専門家に応じて、この計画には無理があるようです',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ni-sotte-1',
    grammarIds: ['ni-sotte'],
    level: 'N2',
    meaning: {
      prompt: '「依照公司的方針推進計畫」該怎麼說？',
      options: ['会社の方針をきっかけに、計画を進めます', '会社の方針に沿って、計画を進めます', '会社の方針に限って、計画を進めます', '会社の方針すら、計画を進めます'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-wo-towazu-1',
    grammarIds: ['wo-towazu'],
    level: 'N2',
    meaning: {
      prompt: '「這份工作不論有沒有經驗都可以應徵」該怎麼說？',
      options: [
        'この仕事は経験の有無に応じて、応募できます',
        'この仕事は経験の有無を問わず、応募できます',
        'この仕事は経験の有無からして、応募できます',
        'この仕事は経験の有無を通じて、応募できます',
      ],
      answerIndex: 1,
    },
  },
];

export default items;
