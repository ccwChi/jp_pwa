// Extracted from practice/data/g10-comparison-conditional.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-comparison-conditional-yori-hoga',
    grammarIds: ['yori-hoga'],
    level: 'N5',
    section: 'grammar',
    jp: '夏[なつ]より冬[ふゆ]のほうが好[す]きです。',
    zh: '比起夏天，我比較喜歡冬天。',
    target: 'のほうが',
    meaning: {
      prompt: '句中的「のほうが」在這裡的作用是什麼？',
      options: ['兩者比較，標示比較結果較優的一方', '三者以上比較最高程度', '表示存在', '表示條件'],
      answerIndex: 0,
    },
    cloze: {
      options: ['のほうが', 'が一番', 'があります', 'なら'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-comparison-conditional-ichiban',
    grammarIds: ['ichiban'],
    level: 'N5',
    section: 'grammar',
    jp: '果物[くだもの]の中[なか]でりんごが一番[いちばん]好[す]きです。',
    zh: '水果之中我最喜歡蘋果。',
    target: '一番[いちばん]',
    meaning: {
      prompt: '句中的「一番」在這裡的作用是什麼？',
      options: ['三者以上比較，「最…」', '兩者比較', '表示存在', '表示條件'],
      answerIndex: 0,
    },
    cloze: {
      options: ['一番[いちばん]', 'のほうが', 'だけ', 'しか'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-comparison-conditional-arimasu-imasu',
    grammarIds: ['arimasu-imasu'],
    level: 'N5',
    section: 'grammar',
    jp: '公園[こうえん]に子供[こども]がいます。',
    zh: '公園裡有小孩。',
    target: 'います',
    meaning: {
      prompt: '句中的「います」在這裡的作用是什麼？',
      options: ['表示有生命的人、動物存在', '表示無生命的物品存在', '表示比較', '表示條件'],
      answerIndex: 0,
    },
    cloze: {
      options: ['います', 'あります', 'です', 'ました'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-comparison-conditional-position-words',
    grammarIds: ['position-words'],
    level: 'N5',
    section: 'grammar',
    jp: '銀行[ぎんこう]は郵便局[ゆうびんきょく]の隣[となり]にあります。',
    zh: '銀行在郵局隔壁。',
    target: 'の隣[となり]',
    meaning: {
      prompt: '句中的「の隣」在這裡的作用是什麼？',
      options: ['搭配「の」描述物品相對於基準物的位置「隔壁」', '表示所有格「的」', '表示原因', '表示條件'],
      answerIndex: 0,
    },
    cloze: {
      options: ['の隣[となり]', 'の中[なか]', 'の上[うえ]', 'の前[まえ]'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-comparison-conditional-to-conditional',
    grammarIds: ['to-conditional'],
    level: 'N5',
    section: 'grammar',
    jp: 'このボタンを押[お]すと、ドアが開[あ]きます。',
    zh: '一按這個按鈕，門就會打開。',
    target: 'と',
    meaning: {
      prompt: '句中的「と」在這裡的作用是什麼？',
      options: ['表示「一…就…」的必然結果，常用於機械操作、自然法則', '表示假設，後面可接命令、邀請', '表示針對話題給建議', '表示書面語氣的假設'],
      answerIndex: 0,
    },
    cloze: {
      options: ['と', 'たら', 'ば', 'なら'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-comparison-conditional-tara-conditional',
    grammarIds: ['tara-conditional'],
    level: 'N5',
    section: 'grammar',
    jp: 'もし雨[あめ]が降[ふ]ったら、試合[しあい]は中止[ちゅうし]です。',
    zh: '如果下雨的話，比賽就取消。',
    target: 'たら',
    meaning: {
      prompt: '句中的「たら」在這裡的作用是什麼？',
      options: ['最泛用的條件表現，後面可接命令、邀請等主觀句', '僅用於必然的機械反應', '僅用於書面語', '針對話題給建議'],
      answerIndex: 0,
    },
    cloze: {
      options: ['たら', 'と', 'ば', 'なら'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-comparison-conditional-ba-conditional',
    grammarIds: ['ba-conditional'],
    level: 'N5',
    section: 'grammar',
    jp: '時間[じかん]があれば、映画[えいが]を見[み]に行[い]きます。',
    zh: '有時間的話，會去看電影。',
    target: 'あれば',
    meaning: {
      prompt: '句中的「あれば」在這裡的作用是什麼？',
      options: ['較書面、正式的假設條件表現', '口語隨性的假設', '針對話題給建議', '表示必然結果'],
      answerIndex: 0,
    },
    cloze: {
      options: ['あれば', 'あったら', 'あると', 'あるなら'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-comparison-conditional-nara-conditional',
    grammarIds: ['nara-conditional'],
    level: 'N5',
    section: 'grammar',
    jp: '京都[きょうと]へ行[い]くなら、新幹線[しんかんせん]が便利[べんり]です。',
    zh: '如果要去京都的話，搭新幹線比較方便。',
    target: 'なら',
    meaning: {
      prompt: '句中的「なら」在這裡的作用是什麼？',
      options: ['針對對方提到的話題給予建議「如果是…的話」', '表示必然結果', '表示書面正式假設', '表示先做完才做下一動作'],
      answerIndex: 0,
    },
    cloze: {
      options: ['なら', 'と', 'たら', 'ば'],
      answerIndex: 0,
    },
  },
];

export default items;
