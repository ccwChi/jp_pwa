// Extracted from lessons/data/n2-purpose-means.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-beku-1',
    grammarIds: ['beku'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「べく」和「べきだ」意思上有什麼不同？',
      options: ['完全一樣', 'べく表示目的（為了…），べきだ表示義務（應該…）', 'べく表示義務，べきだ表示目的', '兩者都表示禁止'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-wo-kikkake-ni-1',
    grammarIds: ['wo-kikkake-ni'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「因為被朋友邀請，藉這個機會開始打網球」該用哪個句型？',
      options: [
        '友達に誘われたのを通じて、テニスを始めました',
        '友達に誘われたのをきっかけに、テニスを始めました',
        '友達に誘われたのに応じて、テニスを始めました',
        '友達に誘われたのに沿って、テニスを始めました',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-wo-tsujite-1',
    grammarIds: ['wo-tsujite'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「這個地區一整年氣候都很溫暖」（強調整段期間），該用哪個句型？',
      options: [
        'この地域は一年をきっかけに温暖な気候です',
        'この地域は一年を通して温暖な気候です',
        'この地域は一年に応じて温暖な気候です',
        'この地域は一年のみならず温暖な気候です',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ni-oujite-1',
    grammarIds: ['ni-oujite'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「依照收入的不同，稅金的金額也會改變」該怎麼說？',
      options: [
        '収入をきっかけに、税金の金額が変わります',
        '収入に応じて、税金の金額が変わります',
        '収入を通じて、税金の金額が変わります',
        '収入のみならず、税金の金額が変わります',
      ],
      answerIndex: 1,
    },
  },
];

export default items;
