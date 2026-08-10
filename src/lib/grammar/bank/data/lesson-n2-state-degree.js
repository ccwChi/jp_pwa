// Extracted from lessons/data/n2-state-degree.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-kanenai-1',
    grammarIds: ['kanenai'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「かねない」通常用來表示哪種可能性？',
      options: ['正面、好的可能性', '負面、不好的可能性', '完全中性的可能性', '百分之百會發生的事'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-kaneru-1',
    grammarIds: ['kaneru'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「その質問にはお答えかねます」是什麼語氣？',
      options: ['很爽快地答應回答', '委婉地表示難以回答、拒絕', '表示這個問題有可能被誤解', '表示已經回答完畢'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-kkonai-1',
    grammarIds: ['kkonai'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「這麼難的問題，絕不可能做得出來」該怎麼說？',
      options: ['こんな難しい問題、できかねます', 'こんな難しい問題、できっこないです', 'こんな難しい問題、できかねません', 'こんな難しい問題、できないまでもです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ge-1',
    grammarIds: ['ge'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「她一副寂寞的樣子」該怎麼說？',
      options: ['彼女は寂しがる顔をしています', '彼女は寂しげな顔をしています', '彼女は寂しっぽい顔をしています', '彼女は寂し気味な顔をしています'],
      answerIndex: 1,
    },
  },
];

export default items;
