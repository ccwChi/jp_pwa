// Extracted from lessons/data/n3-tendency-appearance.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-gachi-1',
    grammarIds: ['gachi'],
    level: 'N3',
    meaning: {
      prompt: '「がち」通常用來描述哪一種傾向？',
      options: ['正面、好的傾向', '負面、不太好的傾向', '完全中性的傾向', '只能用在天氣'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ppoi-1',
    grammarIds: ['ppoi'],
    level: 'N3',
    meaning: {
      prompt: '「他都三十歲了，卻還是很孩子氣」該怎麼說？',
      options: ['彼は子供がちです', '彼は子供っぽいです', '彼は子供さえです', '彼は子供次第です'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-kimi-1',
    grammarIds: ['kimi'],
    level: 'N3',
    meaning: {
      prompt: '「最近感覺有點累」該怎麼說？',
      options: ['最近、疲れがちです', '最近、疲れ気味です', '最近、疲れっぽいです', '最近、疲れ次第です'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-tagaru-1',
    grammarIds: ['tagaru'],
    level: 'N3',
    meaning: {
      prompt: '要描述「弟弟想要玩遊戲」（第三人稱的願望），該怎麼說？',
      options: ['弟はゲームをやりたいです', '弟はゲームをやりたがっています', '弟はゲームをやりがちです', '弟はゲームをやりっぽいです'],
      answerIndex: 1,
    },
  },
];

export default items;
