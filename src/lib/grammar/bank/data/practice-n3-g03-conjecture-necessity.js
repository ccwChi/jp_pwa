// Extracted from practice/data/n3-g03-conjecture-necessity.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n3-conjecture-necessity-wake-da',
    grammarIds: ['wake-da'],
    level: 'N3',
    section: 'grammar',
    jp: '彼[かれ]は十年間[じゅうねんかん]日本[にほん]に住[す]んでいました。だから日本語[にほんご]が上手[じょうず]なわけです。',
    zh: '他在日本住了十年，難怪日文這麼好。',
    target: '上手[じょうず]なわけです',
    meaning: {
      prompt: '句中的「上手なわけです」在這裡的作用是什麼？',
      options: ['表示根據前面的資訊，合理推導出的結論「難怪…」', '表示部分否定', '表示不能不做某事', '表示應該做某事'],
      answerIndex: 0,
    },
    cloze: {
      options: ['上手[じょうず]なわけです', '上手[じょうず]なわけではないです', '上手[じょうず]なはずがないです', '上手[じょうず]に違[ちが]いないです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-conjecture-necessity-wake-de-wa-nai',
    grammarIds: ['wake-de-wa-nai'],
    level: 'N3',
    section: 'grammar',
    jp: '嫌[きら]いなわけではないですが、あまり食[た]べません。',
    zh: '並不是討厭，只是不太吃而已。',
    target: '嫌[きら]いなわけではないです',
    meaning: {
      prompt: '句中的「嫌いなわけではないです」在這裡的作用是什麼？',
      options: ['表示部分否定「並不是說…（全部）」，語感委婉', '表示合理推導出的結論', '表示強烈的必須義務', '表示極高把握的推測'],
      answerIndex: 0,
    },
    cloze: {
      options: ['嫌[きら]いなわけではないです', '嫌[きら]いなわけです', '嫌[きら]いなはずです', '嫌[きら]いに違[ちが]いないです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-conjecture-necessity-wake-ni-wa-ikanai',
    grammarIds: ['wake-ni-wa-ikanai'],
    level: 'N3',
    section: 'grammar',
    jp: '約束[やくそく]したので、行[い]かないわけにはいきません。',
    zh: '因為約好了，不能不去。',
    target: '行[い]かないわけにはいきません',
    meaning: {
      prompt: '句中的「行かないわけにはいきません」在這裡的作用是什麼？',
      options: ['雙重否定，表示「不能不做、必須做」', '表示部分否定', '表示合理推導的結論', '表示極高把握的推測'],
      answerIndex: 0,
    },
    cloze: {
      options: ['行[い]かないわけにはいきません', '行[い]くわけではないです', '行[い]くべきです', '行[い]くに違[ちが]いないです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-conjecture-necessity-beki-da',
    grammarIds: ['beki-da'],
    level: 'N3',
    section: 'grammar',
    jp: '約束[やくそく]は守[まも]るべきです。',
    zh: '應該遵守約定。',
    target: '守[まも]るべきです',
    meaning: {
      prompt: '句中的「守るべきです」在這裡的作用是什麼？',
      options: ['表示從道德、常識判斷「應該做…」，語氣較強', '表示合理推導出的結論', '表示部分否定', '表示極高把握的推測'],
      answerIndex: 0,
    },
    cloze: {
      options: ['守[まも]るべきです', '守[まも]るわけです', '守[まも]るわけにはいきません', '守[まも]るに違[ちが]いないです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-conjecture-necessity-ni-chigai-nai',
    grammarIds: ['ni-chigai-nai'],
    level: 'N3',
    section: 'grammar',
    jp: 'あの人[ひと]の話[はな]し方[かた]から見[み]て、日本人[にほんじん]に違[ちが]いありません。',
    zh: '從那個人的說話方式看來，一定是日本人。',
    target: '日本人[にほんじん]に違[ちが]いありません',
    meaning: {
      prompt: '句中的「日本人に違いありません」在這裡的作用是什麼？',
      options: ['表示根據依據做出非常有把握的推測「肯定是…」', '表示應該做的義務', '表示部分否定', '表示不能不做'],
      answerIndex: 0,
    },
    cloze: {
      options: [
        '日本人[にほんじん]に違[ちが]いありません',
        '日本人[にほんじん]なわけです',
        '日本人[にほんじん]なわけではないです',
        '日本人[にほんじん]であるべきです',
      ],
      answerIndex: 0,
    },
  },
];

export default items;
