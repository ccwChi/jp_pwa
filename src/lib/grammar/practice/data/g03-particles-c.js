export default [
  {
    id: 'practice-particles-c',
    level: 'N5',
    title: '助詞（けど・し・など・より・だけ・しか）',
    titleZh: '助詞總複習（複合用法）',
    intro: '新しいラーメン屋についての感想。',
    grammarIds: ['kedo-ga-contrast', 'shi-listing-reasons', 'nado-etc', 'yori-comparison-particle', 'dake-only', 'shika-nai'],
    sentences: [
      {
        grammarId: 'kedo-ga-contrast',
        jp: 'このラーメンは辛[から]いけど、おいしいです。',
        zh: '這碗拉麵雖然辣，但是很好吃。',
        target: 'けど',
        meaning: {
          prompt: '句中的「けど」在這裡的作用是什麼？',
          options: ['連接前後轉折的兩句話，相當於「雖然…但是…」', '表示列舉理由', '表示限定範圍', '表示比較基準'],
          answerIndex: 0,
        },
        cloze: { options: ['けど', 'から', 'ので', 'まで'], answerIndex: 0 },
      },
      {
        grammarId: 'shi-listing-reasons',
        jp: 'このレストランは安[やす]いし、便利[べんり]です。',
        zh: '這家餐廳既便宜又方便。',
        target: 'し',
        meaning: {
          prompt: '句中的「し」在這裡的作用是什麼？',
          options: ['列舉多個理由或性質，暗示不只這些', '表示限定範圍', '表示轉折', '表示動作的對象'],
          answerIndex: 0,
        },
        cloze: { options: ['し', 'と', 'が', 'の'], answerIndex: 0 },
      },
      {
        grammarId: 'nado-etc',
        jp: 'メニューにラーメンやうどんなどがあります。',
        zh: '菜單上有拉麵、烏龍麵等等。',
        target: 'など',
        meaning: {
          prompt: '句中的「など」在這裡的作用是什麼？',
          options: ['列舉時表示「等等、之類的」', '表示強調', '表示疑問', '表示原因'],
          answerIndex: 0,
        },
        cloze: { options: ['など', 'だけ', 'しか', 'より'], answerIndex: 0 },
      },
      {
        grammarId: 'yori-comparison-particle',
        jp: 'このラーメンはあのラーメンより辛[から]いです。',
        zh: '這碗拉麵比那碗辣。',
        target: 'より',
        meaning: {
          prompt: '句中的「より」在這裡的作用是什麼？',
          options: ['表示比較的基準，相當於「比…」', '表示限定範圍', '表示列舉', '表示原因'],
          answerIndex: 0,
        },
        cloze: { options: ['より', 'から', 'まで', 'ほど'], answerIndex: 0 },
      },
      {
        grammarId: 'dake-only',
        jp: '今日[きょう]は水[みず]だけ飲[の]みました。',
        zh: '今天只喝了水。',
        target: 'だけ',
        meaning: {
          prompt: '句中的「だけ」在這裡的作用是什麼？',
          options: ['表示限定範圍「只有、僅僅」，語感中性', '表示程度過頭', '表示轉折', '表示比較'],
          answerIndex: 0,
        },
        cloze: { options: ['だけ', 'しか', 'など', 'まで'], answerIndex: 0 },
      },
      {
        grammarId: 'shika-nai',
        jp: 'お金[かね]が千円[せんえん]しかありません。',
        zh: '錢只有一千日圓而已。',
        target: 'しか',
        meaning: {
          prompt: '句中的「しか」在這裡的作用是什麼？',
          options: ['限定範圍且帶有「太少、不夠」的語感，須搭配否定形', '表示限定，語感中性，可用於肯定句', '表示列舉', '表示疑問'],
          answerIndex: 0,
        },
        cloze: { options: ['しか', 'だけ', 'など', 'より'], answerIndex: 0 },
      },
    ],
  },
];
