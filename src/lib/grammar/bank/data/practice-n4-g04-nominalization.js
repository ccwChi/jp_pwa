// Extracted from practice/data/n4-g04-nominalization.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n4-nominalization-koto-ni-suru',
    grammarIds: ['koto-ni-suru'],
    level: 'N4',
    section: 'grammar',
    jp: '今年[ことし]から、毎日[まいにち]運動[うんどう]することにしました。',
    zh: '決定從今年開始每天運動。',
    target: 'することにしました',
    meaning: {
      prompt: '句中的「することにしました」在這裡的作用是什麼？',
      options: ['表示說話者自己做出的決定', '表示非自己決定的安排、結果', '表示推測', '表示願望'],
      answerIndex: 0,
    },
    cloze: {
      options: ['することにしました', 'することになりました', 'するはずです', 'するようです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-nominalization-koto-ni-naru',
    grammarIds: ['koto-ni-naru'],
    level: 'N4',
    section: 'grammar',
    jp: '来月[らいげつ]、大阪[おおさか]に転勤[てんきん]することになりました。',
    zh: '下個月要調職到大阪了。',
    target: '転勤[てんきん]することになりました',
    meaning: {
      prompt: '句中的「転勤することになりました」在這裡的作用是什麼？',
      options: ['表示非說話者自己決定的安排、結果', '表示自己主動的決定', '表示推測', '表示願望'],
      answerIndex: 0,
    },
    cloze: {
      options: ['転勤[てんきん]することになりました', '転勤[てんきん]することにしました', '転勤[てんきん]するつもりです', '転勤[てんきん]したいです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-nominalization-sou-da-tte',
    grammarIds: ['sou-da-tte'],
    level: 'N4',
    section: 'grammar',
    jp: '田中[たなか]さんは来月[らいげつ]結婚[けっこん]するって。',
    zh: '聽說田中先生下個月要結婚。',
    target: 'するって',
    meaning: {
      prompt: '句中的「するって」在這裡的作用是什麼？',
      options: ['口語轉述聽來的資訊，語感輕鬆隨意', '正式書面轉述資訊', '表示自己的決定', '表示邀約'],
      answerIndex: 0,
    },
    cloze: {
      options: ['するって', 'ということだ', 'そうです', 'らしいです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-nominalization-to-iu-noun',
    grammarIds: ['to-iu-noun'],
    level: 'N4',
    section: 'grammar',
    jp: '村上春樹[むらかみはるき]という作家[さっか]を知[し]っていますか。',
    zh: '你知道一位叫做村上春樹的作家嗎？',
    target: 'という作家[さっか]',
    meaning: {
      prompt: '句中的「という作家」在這裡的作用是什麼？',
      options: ['用來解釋、介紹一個對方可能不知道的名稱「叫做…的…」', '表示比較', '表示原因', '表示轉折'],
      answerIndex: 0,
    },
    cloze: {
      options: ['という作家[さっか]', 'との作家[さっか]', 'ような作家[さっか]', 'そうな作家[さっか]'],
      answerIndex: 0,
    },
  },
];

export default items;
