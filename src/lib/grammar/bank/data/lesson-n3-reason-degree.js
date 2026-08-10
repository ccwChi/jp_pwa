// Extracted from lessons/data/n3-reason-degree.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-sei-de-1',
    grammarIds: ['sei-de'],
    level: 'N3',
    meaning: {
      prompt: '「せいで」用在哪種結果？',
      options: ['只能用在好的結果', '只能用在不好的結果', '好壞結果都可以用', '只能用在中性的結果'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-okage-de-1',
    grammarIds: ['okage-de'],
    level: 'N3',
    meaning: {
      prompt: '「多虧老師，我考試通過了」該用哪個句型？',
      options: ['先生のせいで、試験に合格しました', '先生のおかげで、試験に合格しました', '先生のとおりに、試験に合格しました', '先生にもかかわらず、試験に合格しました'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-koto-kara-1',
    grammarIds: ['koto-kara'],
    level: 'N3',
    meaning: {
      prompt: '「因為這兩個詞的發音很像，容易搞混」，這裡的「ことから」表示什麼？',
      options: ['目的', '命令', '推斷的根據、由來', '願望'],
      answerIndex: 2,
    },
  },
  {
    id: 'lesson-quiz-amari-ni-1',
    grammarIds: ['amari-ni'],
    level: 'N3',
    meaning: {
      prompt: '「因為太驚訝了，連聲音都發不出來」該怎麼說？',
      options: ['驚きのために、声が出ませんでした', '驚きのあまり、声が出ませんでした', '驚きのせいで、声が出ませんでした', '驚きのおかげで、声が出ませんでした'],
      answerIndex: 1,
    },
  },
];

export default items;
