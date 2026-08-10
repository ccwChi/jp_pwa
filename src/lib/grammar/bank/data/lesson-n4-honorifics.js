// Extracted from lessons/data/n4-honorifics.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-sonkeigo-verbs-1',
    grammarIds: ['sonkeigo-verbs'],
    level: 'N4',
    meaning: {
      prompt: '要禮貌地問客人「請問您要吃點什麼？」，該用哪個動詞？',
      options: ['食べます', '召し上がります', 'いただきます', 'もらいます'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-kenjougo-verbs-1',
    grammarIds: ['kenjougo-verbs'],
    level: 'N4',
    meaning: {
      prompt: '自我介紹時說「敝姓田中」，該用哪個謙譲語動詞？',
      options: ['田中といいます', '田中とおっしゃいます', '田中と申します', '田中となさいます'],
      answerIndex: 2,
    },
  },
  {
    id: 'lesson-quiz-o-ni-naru-o-suru-1',
    grammarIds: ['o-ni-naru-o-suru'],
    level: 'N4',
    meaning: {
      prompt: '想禮貌地說「讓我來幫您拿行李」（謙譲語），該用哪個句型？',
      options: ['お荷物を持ちになります', 'お荷物をお持ちします', 'お荷物を持たせます', 'お荷物をいただきます'],
      answerIndex: 1,
    },
  },
];

export default items;
