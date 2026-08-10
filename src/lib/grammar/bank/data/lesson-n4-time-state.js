// Extracted from lessons/data/n4-time-state.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-tokoro-1',
    grammarIds: ['tokoro'],
    level: 'N4',
    section: 'grammar',
    meaning: {
      prompt: '「現在正要出門」（還沒出發），該用哪個句型？',
      options: ['出かけているところです', '出かけたところです', '出かけるところです', '出かけておくところです'],
      answerIndex: 2,
    },
  },
  {
    id: 'lesson-quiz-ta-bakari-1',
    grammarIds: ['ta-bakari'],
    level: 'N4',
    section: 'grammar',
    meaning: {
      prompt: '「才剛來日本不久」（強調主觀感受時間很短），該用哪個句型比較自然？',
      options: ['日本に来るところです', '日本に来ているところです', '日本に来たばかりです', '日本に来ようとします'],
      answerIndex: 2,
    },
  },
  {
    id: 'lesson-quiz-mama-1',
    grammarIds: ['mama'],
    level: 'N4',
    section: 'grammar',
    meaning: {
      prompt: '「開著燈就這樣睡著了」該怎麼說？',
      options: ['電気をつけるところで寝てしまいました', '電気をつけたばかりで寝てしまいました', '電気をつけたまま寝てしまいました', '電気をつけながら寝てしまいました'],
      answerIndex: 2,
    },
  },
  {
    id: 'lesson-quiz-toori-ni-1',
    grammarIds: ['toori-ni'],
    level: 'N4',
    section: 'grammar',
    meaning: {
      prompt: '「照著這份食譜做了菜」該怎麼說？',
      options: ['レシピのために料理を作りました', 'レシピのとおりに料理を作りました', 'レシピのように料理をしました', 'レシピのまま料理を作りました'],
      answerIndex: 1,
    },
  },
];

export default items;
