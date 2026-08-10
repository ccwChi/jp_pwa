// Extracted from lessons/data/n5-quantity-misc.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-counters-1',
    grammarIds: ['counters'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '要數「三本書」，該用哪個助數詞？',
      options: ['三枚', '三冊', '三匹', '三人'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-kurai-gurai-1',
    grammarIds: ['kurai-gurai'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '想問對方「大概要花多少時間？」，該怎麼問？',
      options: ['どのくらいかかりますか', 'いつかかりますか', 'なにがかかりますか', 'どこでかかりますか'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-sugiru-1',
    grammarIds: ['sugiru'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '「高い」接すぎます，該怎麼變化？',
      options: ['高すぎます', '高いすぎます', '高くすぎます', '高かすぎます'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-question-word-ka-1',
    grammarIds: ['question-word-ka'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '想問「要喝點什麼嗎？」（不確定具體是什麼），該用哪個詞？',
      options: ['何', '何か', '何が', '何を'],
      answerIndex: 1,
    },
  },
];

export default items;
