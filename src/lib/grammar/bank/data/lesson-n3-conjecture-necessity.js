// Extracted from lessons/data/n3-conjecture-necessity.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-wake-da-1',
    grammarIds: ['wake-da'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「他在日本住了十年，難怪日文這麼好」，這種「原來如此」的語感該用哪個句型？',
      options: ['日本語が上手なはずがないです', '日本語が上手なわけです', '日本語が上手なわけではないです', '日本語が上手にちがいないです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-wake-de-wa-nai-1',
    grammarIds: ['wake-de-wa-nai'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「並不是討厭，只是不太吃而已」，這種委婉的部分否定該用哪個句型？',
      options: ['嫌いではないです', '嫌いなわけではないです', '嫌いなはずがないです', '嫌いにちがいないです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-wake-ni-wa-ikanai-1',
    grammarIds: ['wake-ni-wa-ikanai'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「因為約好了，不能不去」（雙重否定表示必須做），該用哪個句型？',
      options: ['行くわけにはいきません', '行かないわけにはいきません', '行くわけではないです', '行かないわけではないです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-beki-da-1',
    grammarIds: ['beki-da'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「應該遵守約定」該怎麼說？',
      options: ['約束は守るはずです', '約束は守るべきです', '約束は守るわけです', '約束は守るがちです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ni-chigai-nai-1',
    grammarIds: ['ni-chigai-nai'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「に違いない」和「かもしれない」相比，把握程度上有什麼差別？',
      options: ['完全一樣', 'に違いない把握程度更高、更肯定', 'かもしれない把握程度更高、更肯定', '兩者都不是推測'],
      answerIndex: 1,
    },
  },
];

export default items;
