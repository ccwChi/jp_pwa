// Extracted from lessons/data/n2-result-outcome.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-sue-ni-1',
    grammarIds: ['sue-ni'],
    level: 'N2',
    meaning: {
      prompt: '「經過長時間的討論，最後得出了結論」該怎麼說？',
      options: ['長い議論のあまりに、結論が出ました', '長い議論の末に、結論が出ました', '長い議論のせいで、結論が出ました', '長い議論のわりに、結論が出ました'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ageku-1',
    grammarIds: ['ageku'],
    level: 'N2',
    meaning: {
      prompt: '「あげく」和「末に」相比，最大的差別是什麼？',
      options: ['完全一樣沒有差別', 'あげく後面接的結果幾乎一定是負面的', '末に後面接的結果幾乎一定是負面的', 'あげく只能用在現在式'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ta-tokorode-1',
    grammarIds: ['ta-tokorode'],
    level: 'N2',
    meaning: {
      prompt: '「現在才趕，也來不及了吧」，這種帶消極、放棄語感的句型該用哪個？',
      options: [
        '今から急ぐと、間に合わないでしょう',
        '今から急いだところで、間に合わないでしょう',
        '今から急ぐことから、間に合わないでしょう',
        '今から急ぐとしたら、間に合わないでしょう',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-mono-da-1',
    grammarIds: ['mono-da'],
    level: 'N2',
    meaning: {
      prompt: '「小時候常常在這條河游泳」（懷念過去的習慣），該用哪個句型？',
      options: ['よくこの川で泳ぐことだった', 'よくこの川で泳いだものです', 'よくこの川で泳ぐわけです', 'よくこの川で泳いだかねません'],
      answerIndex: 1,
    },
  },
];

export default items;
