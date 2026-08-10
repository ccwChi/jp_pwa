// Extracted from practice/data/n4-g08-time-state.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n4-time-state-tokoro',
    grammarIds: ['tokoro'],
    level: 'N4',
    jp: 'ちょうど今[いま]から出[で]かけるところです。',
    zh: '現在正要出門。',
    target: '出[で]かけるところです',
    meaning: {
      prompt: '句中的「出かけるところです」在這裡的作用是什麼？',
      options: ['表示動作正要開始（還沒開始）', '表示動作正在進行中', '表示動作剛做完', '表示動作已經結束很久'],
      answerIndex: 0,
    },
    cloze: {
      options: ['出[で]かけるところです', '出[で]かけているところです', '出[で]かけたところです', '出[で]かけておくところです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-time-state-ta-bakari',
    grammarIds: ['ta-bakari'],
    level: 'N4',
    jp: '日本[にほん]に来[き]たばかりです。',
    zh: '才剛來日本不久。',
    target: '来[き]たばかりです',
    meaning: {
      prompt: '句中的「来たばかりです」在這裡的作用是什麼？',
      options: ['表示動作剛完成不久，強調主觀「才剛…」的語感', '表示動作正要開始', '表示動作正在進行中', '表示動作已經結束很久'],
      answerIndex: 0,
    },
    cloze: {
      options: ['来[き]たばかりです', '来[く]るところです', '来[き]ているところです', '来[こ]ようとします'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-time-state-mama',
    grammarIds: ['mama'],
    level: 'N4',
    jp: '電気[でんき]をつけたまま、寝[ね]てしまいました。',
    zh: '開著燈就這樣睡著了。',
    target: 'つけたまま',
    meaning: {
      prompt: '句中的「つけたまま」在這裡的作用是什麼？',
      options: ['表示某狀態維持不變，在此狀態下進行了另一個動作', '表示動作正要開始', '表示動作剛做完', '表示按照某個範例做'],
      answerIndex: 0,
    },
    cloze: {
      options: ['つけたまま', 'つけるところで', 'つけたばかりで', 'つけながら'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-time-state-toori-ni',
    grammarIds: ['toori-ni'],
    level: 'N4',
    jp: 'このレシピのとおりに、料理[りょうり]を作[つく]りました。',
    zh: '照著這份食譜做了菜。',
    target: 'とおりに',
    meaning: {
      prompt: '句中的「とおりに」在這裡的作用是什麼？',
      options: ['表示依照某個方法、範例做「照著…」', '表示原因', '表示目的', '表示維持不變的狀態'],
      answerIndex: 0,
    },
    cloze: {
      options: ['とおりに', 'ために', 'ように', 'まま'],
      answerIndex: 0,
    },
  },
];

export default items;
