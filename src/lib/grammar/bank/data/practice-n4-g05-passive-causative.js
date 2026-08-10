// Extracted from practice/data/n4-g05-passive-causative.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n4-passive-causative-passive-basic',
    grammarIds: ['passive-basic'],
    level: 'N4',
    section: 'grammar',
    jp: '私[わたし]は先生[せんせい]に褒[ほ]められました。',
    zh: '我被老師稱讚了。',
    target: '褒[ほ]められました',
    meaning: {
      prompt: '句中的「褒められました」是動詞的哪一種形態？',
      options: ['受身形，表示「被…」，動作的接受者變成主詞', '使役形，表示「讓…做…」', '使役受身形，表示「被迫…」', '可能形，表示「能夠…」'],
      answerIndex: 0,
    },
    cloze: {
      options: ['褒[ほ]められました', '褒[ほ]めさせました', '褒[ほ]めさせられました', '褒[ほ]めました'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-passive-causative-passive-suffering',
    grammarIds: ['passive-suffering'],
    level: 'N4',
    section: 'grammar',
    jp: '雨[あめ]に降[ふ]られて、服[ふく]がぬれました。',
    zh: '被雨淋了，衣服濕了。',
    target: '降[ふ]られて',
    meaning: {
      prompt: '句中的「降られて」在這裡的作用是什麼？',
      options: ['迷惑の受身，表示因為別人（或天氣等）的動作而感到困擾', '單純描述天氣現象，沒有困擾語感', '表示使役', '表示希望'],
      answerIndex: 0,
    },
    cloze: {
      options: ['降[ふ]られて', '降[ふ]って', '降[ふ]らせて', '降[ふ]りそうで'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-passive-causative-causative',
    grammarIds: ['causative'],
    level: 'N4',
    section: 'grammar',
    jp: '母[はは]は子供[こども]に野菜[やさい]を食[た]べさせました。',
    zh: '媽媽讓小孩吃了蔬菜。',
    target: '食[た]べさせました',
    meaning: {
      prompt: '句中的「食べさせました」是動詞的哪一種形態？',
      options: ['使役形，表示「讓／叫…做…」', '受身形，表示「被…」', '使役受身形，表示「被迫…」', '可能形'],
      answerIndex: 0,
    },
    cloze: {
      options: ['食[た]べさせました', '食[た]べられました', '食[た]べさせられました', '食[た]べてあげました'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-passive-causative-causative-passive',
    grammarIds: ['causative-passive'],
    level: 'N4',
    section: 'grammar',
    jp: '子供[こども]のとき、毎日[まいにち]ピアノを練習[れんしゅう]させられました。',
    zh: '小時候每天被迫練習鋼琴。',
    target: '練習[れんしゅう]させられました',
    meaning: {
      prompt: '句中的「練習させられました」是動詞的哪一種形態？',
      options: ['使役受身形，表示「被迫…」，帶有不情願的語感', '單純的使役形，表示自己主動讓別人做', '單純的受身形', '表示能力'],
      answerIndex: 0,
    },
    cloze: {
      options: ['練習[れんしゅう]させられました', '練習[れんしゅう]させました', '練習[れんしゅう]しました', '練習[れんしゅう]されました'],
      answerIndex: 0,
    },
  },
];

export default items;
