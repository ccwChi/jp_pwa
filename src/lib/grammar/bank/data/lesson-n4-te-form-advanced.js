// Extracted from lessons/data/n4-te-form-advanced.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-te-shimau-1',
    grammarIds: ['te-shimau'],
    level: 'N4',
    meaning: {
      prompt: '「不小心把錢包忘在電車上了」用的是哪個句型？',
      options: ['〜ておく', '〜てしまう', '〜てある', '〜てみる'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-oku-1',
    grammarIds: ['te-oku'],
    level: 'N4',
    meaning: {
      prompt: '「為了明天的會議，事先準備好資料」該用哪個句型？',
      options: ['準備してみます', '準備しておきます', '準備してしまいます', '準備してあります'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-aru-1',
    grammarIds: ['te-aru'],
    level: 'N4',
    meaning: {
      prompt: '「窓が開けてあります」和「窓が開いています」的差別是？',
      options: ['意思完全一樣', '前者暗示有人特意打開、後者單純描述狀態', '前者是過去式、後者是現在式', '沒有差別，只是用字不同'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-hoshii-1',
    grammarIds: ['te-hoshii'],
    level: 'N4',
    meaning: {
      prompt: '「媽媽希望我成為醫生」，該用哪個句型？',
      options: ['私は医者になりたいです', '母は私に医者になってほしいです', '母は医者になります', '私は母に医者にしてもらいます'],
      answerIndex: 1,
    },
  },
];

export default items;
