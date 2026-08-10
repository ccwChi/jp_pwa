// Extracted from lessons/data/n4-connectors.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-noni-1',
    grammarIds: ['noni'],
    level: 'N4',
    meaning: {
      prompt: '「明明拼命讀書了，卻沒考過」這種帶懊惱語感的逆接，該用哪個句型？',
      options: ['〜から', '〜ので', '〜のに', '〜たら'],
      answerIndex: 2,
    },
  },
  {
    id: 'lesson-quiz-tame-ni-1',
    grammarIds: ['tame-ni'],
    level: 'N4',
    meaning: {
      prompt: '「因為大雨，電車停駛中」（書面、正式的原因表達），該用哪個句型比較自然？',
      options: ['大雨から、電車が止まっています', '大雨のため、電車が止まっています', '大雨のに、電車が止まっています', '大雨ば、電車が止まっています'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-you-ni-purpose-1',
    grammarIds: ['you-ni-purpose'],
    level: 'N4',
    meaning: {
      prompt: '「為了能說日文，每天練習」，因為「話せる」是可能形（非意志動詞），該用哪個句型？',
      options: ['話せるために、練習しています', '話せるように、練習しています', '話せるのに、練習しています', '話せるとおりに、練習しています'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-you-ni-naru-suru-1',
    grammarIds: ['you-ni-naru-suru'],
    level: 'N4',
    meaning: {
      prompt: '「練習之後，變得會唸漢字了」（強調從不會到會的變化），該用哪個句型？',
      options: ['漢字が読めるようにしました', '漢字が読めるようになりました', '漢字が読めるためになりました', '漢字が読めるのにしました'],
      answerIndex: 1,
    },
  },
];

export default items;
