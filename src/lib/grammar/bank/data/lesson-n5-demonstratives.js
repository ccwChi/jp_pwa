// Extracted from lessons/data/n5-demonstratives.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-kore-sore-are-dore-1',
    grammarIds: ['kore-sore-are-dore'],
    level: 'N5',
    meaning: {
      prompt: '你手上拿著的東西要介紹給對方，應該用哪個指示詞？',
      options: ['これ', 'それ', 'あれ', 'どれ'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-kono-sono-ano-dono-1',
    grammarIds: ['kono-sono-ano-dono'],
    level: 'N5',
    meaning: {
      prompt: '要說「那本書」（離兩人都有點遠），該怎麼填？「（　）本はおもしろいです。」',
      options: ['この', 'その', 'あの', 'どの'],
      answerIndex: 2,
    },
  },
  {
    id: 'lesson-quiz-koko-soko-asoko-doko-1',
    grammarIds: ['koko-soko-asoko-doko'],
    level: 'N5',
    meaning: {
      prompt: '要問路「請問車站在哪裡？」該用哪個詞？',
      options: ['ここ', 'そこ', 'あそこ', 'どこ'],
      answerIndex: 3,
    },
  },
  {
    id: 'lesson-quiz-konna-sonna-anna-donna-1',
    grammarIds: ['konna-sonna-anna-donna'],
    level: 'N5',
    meaning: {
      prompt: '想問對方「你喜歡哪一種音樂？」該用哪個詞？「（　）音楽が好きですか。」',
      options: ['この', 'どの', 'どんな', 'あんな'],
      answerIndex: 2,
    },
  },
];

export default items;
