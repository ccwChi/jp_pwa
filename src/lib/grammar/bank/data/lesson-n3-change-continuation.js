// Extracted from lessons/data/n3-change-continuation.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-tsutsu-aru-1',
    grammarIds: ['tsutsu-aru'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「地球的氣溫正在逐漸上升」該怎麼說？',
      options: ['気温は上昇しています', '気温は上昇しつつあります', '気温は上昇しがちです', '気温は上昇し気味です'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ippou-da-1',
    grammarIds: ['ippou-da'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「物價一直在上漲」該怎麼說？',
      options: ['物価は上がりつつあります', '物価は上がる一方です', '物価は上がりがちです', '物価は上がる気味です'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-bakari-da-1',
    grammarIds: ['bakari-da'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「準備はもうできているので、あとは出発するばかりです」裡的「ばかり」表示什麼？',
      options: ['只有、僅有（限定數量）', '只剩下…（這件事還沒做）', '剛剛才做完', '大概、差不多'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-tsutsu-1',
    grammarIds: ['tsutsu'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「雖然知道對身體不好，卻戒不了菸」，這裡的「つつ」表示什麼？',
      options: ['兩個動作同時進行', '逆接（雖然…卻…）', '目的', '原因'],
      answerIndex: 1,
    },
  },
];

export default items;
