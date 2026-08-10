// Extracted from practice/data/g07-te-form-uses.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-te-form-uses-te-iru',
    grammarIds: ['te-iru'],
    level: 'N5',
    jp: '今[いま]、テレビを見[み]ています。',
    zh: '現在正在看電視。',
    target: 'ています',
    meaning: {
      prompt: '句中的「ています」在這裡的作用是什麼？',
      options: ['表示動作正在進行，或狀態持續', '表示請求對方做動作', '表示允許', '表示禁止'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ています', 'てください', 'てもいいです', 'てはいけません'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-te-form-uses-te-kudasai',
    grammarIds: ['te-kudasai'],
    level: 'N5',
    jp: '少[すこ]し待[ま]ってください。',
    zh: '請稍等一下。',
    target: 'てください',
    meaning: {
      prompt: '句中的「てください」在這裡的作用是什麼？',
      options: ['禮貌地請求對方做某事「請…」', '表示允許', '表示禁止', '表示動作正在進行'],
      answerIndex: 0,
    },
    cloze: {
      options: ['てください', 'てもいいです', 'てはいけません', 'ています'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-te-form-uses-te-mo-ii',
    grammarIds: ['te-mo-ii'],
    level: 'N5',
    jp: 'ここに座[すわ]ってもいいですか。',
    zh: '可以坐這裡嗎？',
    target: 'てもいいですか',
    meaning: {
      prompt: '句中的「てもいいですか」在這裡的作用是什麼？',
      options: ['徵求對方許可「可以…嗎」', '表示禁止', '表示請求對方做某事', '表示嘗試'],
      answerIndex: 0,
    },
    cloze: {
      options: ['てもいいですか', 'てはいけませんか', 'てください', 'てみますか'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-te-form-uses-te-wa-ikenai',
    grammarIds: ['te-wa-ikenai'],
    level: 'N5',
    jp: 'ここでたばこを吸[す]ってはいけません。',
    zh: '這裡不可以抽菸。',
    target: 'てはいけません',
    meaning: {
      prompt: '句中的「てはいけません」在這裡的作用是什麼？',
      options: ['表示禁止「不可以…」', '表示允許', '表示請求', '表示嘗試'],
      answerIndex: 0,
    },
    cloze: {
      options: ['てはいけません', 'てもいいです', 'てください', 'てみます'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-te-form-uses-te-kara',
    grammarIds: ['te-kara'],
    level: 'N5',
    jp: '手[て]を洗[あら]ってから、ご飯[はん]を食[た]べます。',
    zh: '洗完手之後才吃飯。',
    target: 'てから',
    meaning: {
      prompt: '句中的「てから」在這裡的作用是什麼？',
      options: ['強調先做完某動作，才做下一個動作', '表示允許', '表示禁止', '表示兩個動作同時進行'],
      answerIndex: 0,
    },
    cloze: {
      options: ['てから', 'ながら', 'てもいい', 'てはいけない'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-te-form-uses-te-miru',
    grammarIds: ['te-miru'],
    level: 'N5',
    jp: 'この料理[りょうり]を食[た]べてみてください。',
    zh: '請吃吃看這道菜。',
    target: 'てみて',
    meaning: {
      prompt: '句中的「てみて」在這裡的作用是什麼？',
      options: ['表示嘗試「做…看看」', '表示禁止', '表示先後順序', '表示同時進行'],
      answerIndex: 0,
    },
    cloze: {
      options: ['てみて', 'てから', 'ながら', 'てはいけない'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-te-form-uses-nagara',
    grammarIds: ['nagara'],
    level: 'N5',
    jp: '音楽[おんがく]を聞[き]きながら、勉強[べんきょう]します。',
    zh: '一邊聽音樂一邊讀書。',
    target: 'ながら',
    meaning: {
      prompt: '句中的「ながら」在這裡的作用是什麼？',
      options: ['表示兩個動作同時進行「一邊…一邊…」', '表示先後順序', '表示允許', '表示禁止'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ながら', 'てから', 'ても', 'ては'],
      answerIndex: 0,
    },
  },
];

export default items;
