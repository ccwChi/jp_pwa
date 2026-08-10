// Extracted from practice/data/g02-particles-b.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-particles-b-ya-partial-and',
    grammarIds: ['ya-partial-and'],
    level: 'N5',
    section: 'grammar',
    jp: '机[つくえ]の上[うえ]に本[ほん]やノートがあります。',
    zh: '桌上有書、筆記本等東西。',
    target: 'や',
    meaning: {
      prompt: '句中的「や」在這裡的作用是什麼？',
      options: ['列舉部分項目，暗示還有其他沒說出來的', '列舉全部項目，沒有遺漏', '表示比較', '表示原因'],
      answerIndex: 0,
    },
    cloze: {
      options: ['や', 'と', 'に', 'の'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-b-e-direction',
    grammarIds: ['e-direction'],
    level: 'N5',
    section: 'grammar',
    jp: '来週[らいしゅう]、日本[にほん]へ行[い]きます。',
    zh: '下週要去日本。',
    target: 'へ',
    meaning: {
      prompt: '句中的「へ」在這裡的作用是什麼？',
      options: ['標示移動的方向', '標示動作發生的場所', '表示比較基準', '表示列舉'],
      answerIndex: 0,
    },
    cloze: {
      options: ['へ', 'で', 'を', 'と'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-b-kara-from',
    grammarIds: ['kara-from'],
    level: 'N5',
    section: 'grammar',
    jp: '学校[がっこう]は九時[くじ]から始[はじ]まります。',
    zh: '學校從九點開始。',
    target: 'から',
    meaning: {
      prompt: '句中的「から」在這裡的作用是什麼？',
      options: ['表示時間或空間的起點', '表示時間或空間的終點', '表示原因', '表示疑問'],
      answerIndex: 0,
    },
    cloze: {
      options: ['から', 'まで', 'に', 'で'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-b-made-until',
    grammarIds: ['made-until'],
    level: 'N5',
    section: 'grammar',
    jp: '夜[よる]十時[じゅうじ]まで勉強[べんきょう]します。',
    zh: '讀書讀到晚上十點。',
    target: 'まで',
    meaning: {
      prompt: '句中的「まで」在這裡的作用是什麼？',
      options: ['表示時間或空間的終點', '表示時間或空間的起點', '表示列舉', '表示轉折'],
      answerIndex: 0,
    },
    cloze: {
      options: ['まで', 'から', 'に', 'と'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-b-ka-question',
    grammarIds: ['ka-question'],
    level: 'N5',
    section: 'grammar',
    jp: '明日[あした]、一緒[いっしょ]に行[い]きますか。',
    zh: '明天要不要一起去？',
    target: 'か',
    meaning: {
      prompt: '句中的「か」在這裡的作用是什麼？',
      options: ['句尾表示疑問', '表示「和・跟」', '表示強調告知', '表示尋求確認同意'],
      answerIndex: 0,
    },
    cloze: {
      options: ['か', 'ね', 'よ', 'の'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-b-ne-confirmation',
    grammarIds: ['ne-confirmation'],
    level: 'N5',
    section: 'grammar',
    jp: '楽[たの]しみですね。',
    zh: '好期待呢。',
    target: 'ね',
    meaning: {
      prompt: '句中的「ね」在這裡的作用是什麼？',
      options: ['尋求對方同意或確認，接近「對吧、呢」', '單方面告知對方新資訊', '表示疑問', '表示轉折'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ね', 'よ', 'か', 'を'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-particles-b-yo-emphasis',
    grammarIds: ['yo-emphasis'],
    level: 'N5',
    section: 'grammar',
    jp: 'このホテルはきれいですよ。',
    zh: '這間飯店很乾淨喔。',
    target: 'よ',
    meaning: {
      prompt: '句中的「よ」在這裡的作用是什麼？',
      options: ['告訴對方可能不知道的資訊，語感較強', '尋求對方同意', '表示疑問', '表示比較'],
      answerIndex: 0,
    },
    cloze: {
      options: ['よ', 'ね', 'か', 'も'],
      answerIndex: 0,
    },
  },
];

export default items;
