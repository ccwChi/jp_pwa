// Extracted from practice/data/n4-g01-compound-verbs.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n4-compound-verbs-dasu-sudden',
    grammarIds: ['dasu-sudden'],
    level: 'N4',
    jp: '急[きゅう]に雨[あめ]が降[ふ]り出[だ]しました。',
    zh: '突然下起雨來了。',
    target: '降[ふ]り出[だ]しました',
    meaning: {
      prompt: '句中的「降り出しました」在這裡的作用是什麼？',
      options: ['表示動作、狀態突然開始「突然…起來」', '表示動作持續進行', '表示動作剛結束', '表示動作有計畫地開始'],
      answerIndex: 0,
    },
    cloze: {
      options: ['降[ふ]り出[だ]しました', '降[ふ]り始[はじ]めました', '降[ふ]り続[つづ]けました', '降[ふ]り終[お]わりました'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-compound-verbs-hajimeru-tsuzukeru-owaru',
    grammarIds: ['hajimeru-tsuzukeru-owaru'],
    level: 'N4',
    jp: 'レポートを書[か]き終[お]わりました。',
    zh: '報告寫完了。',
    target: '書[か]き終[お]わりました',
    meaning: {
      prompt: '句中的「書き終わりました」在這裡的作用是什麼？',
      options: ['表示動作已經結束', '表示動作剛開始', '表示動作持續進行中', '表示動作突然發生'],
      answerIndex: 0,
    },
    cloze: {
      options: ['書[か]き終[お]わりました', '書[か]き出[だ]しました', '書[か]き続[つづ]けました', '書[か]き始[はじ]めました'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-compound-verbs-yasui-nikui',
    grammarIds: ['yasui-nikui'],
    level: 'N4',
    jp: 'この漢字[かんじ]は読[よ]みにくいです。',
    zh: '這個漢字很難唸。',
    target: '読[よ]みにくいです',
    meaning: {
      prompt: '句中的「読みにくいです」在這裡的作用是什麼？',
      options: ['表示這個動作做起來困難「難以…」', '表示這個動作做起來容易', '表示動作正在進行', '表示動作即將開始'],
      answerIndex: 0,
    },
    cloze: {
      options: ['読[よ]みにくいです', '読[よ]みやすいです', '読[よ]みそうです', '読[よ]まれています'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-compound-verbs-garu',
    grammarIds: ['garu'],
    level: 'N4',
    jp: '妹[いもうと]は新[あたら]しいゲームをほしがっています。',
    zh: '妹妹想要新的遊戲。',
    target: 'ほしがっています',
    meaning: {
      prompt: '句中的「ほしがっています」在這裡的作用是什麼？',
      options: ['描述第三人稱表現出來的感受、願望', '描述說話者自己的感受', '表示邀請對方', '表示禁止'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ほしがっています', 'ほしいです', 'ほしくないです', 'ほしいがります'],
      answerIndex: 0,
    },
  },
];

export default items;
