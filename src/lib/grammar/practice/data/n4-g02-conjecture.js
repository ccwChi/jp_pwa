export default [
  {
    id: 'practice-n4-conjecture',
    level: 'N4',
    title: '推量・様態・伝聞（そうです・ようです・みたいです・らしいです）',
    intro: '天気予報とうわさ話。',
    grammarIds: ['sou-desu-appearance', 'sou-desu-hearsay', 'you-da', 'mitai-da', 'rashii'],
    sentences: [
      {
        grammarId: 'sou-desu-appearance',
        jp: '空[そら]が暗[くら]いです。雨[あめ]が降[ふ]りそうです。',
        zh: '天空很暗，看起來快下雨了。',
        target: '降[ふ]りそうです',
        meaning: {
          prompt: '句中的「降りそうです」在這裡的作用是什麼？',
          options: ['根據眼前所見的樣子推測「看起來好像…」', '轉述從別人聽來的消息', '表示比喻「像…一樣」', '表示客觀依據的推測'],
          answerIndex: 0,
        },
        cloze: { options: ['降[ふ]りそうです', '降[ふ]るそうです', '降[ふ]るようです', '降[ふ]るらしいです'], answerIndex: 0 },
      },
      {
        grammarId: 'sou-desu-hearsay',
        jp: '天気予報[てんきよほう]によると、明日[あした]は雨[あめ]だそうです。',
        zh: '根據天氣預報，聽說明天會下雨。',
        target: 'だそうです',
        meaning: {
          prompt: '句中的「だそうです」在這裡的作用是什麼？',
          options: ['轉述從別人或媒體得到的資訊「聽說…」', '根據眼前所見推測', '表示比喻', '表示自己的意見'],
          answerIndex: 0,
        },
        cloze: { options: ['だそうです', 'そうです', 'らしいです', 'のようです'], answerIndex: 0 },
      },
      {
        grammarId: 'you-da',
        jp: '隣[となり]の部屋[へや]に誰[だれ]かいるようです。',
        zh: '隔壁房間好像有人在。',
        target: 'いるようです',
        meaning: {
          prompt: '句中的「いるようです」在這裡的作用是什麼？',
          options: ['根據觀察、感覺做出的推測，或表示比喻', '轉述聽來的消息', '表示程度過頭', '表示義務'],
          answerIndex: 0,
        },
        cloze: { options: ['いるようです', 'いそうです', 'いるらしいです', 'いたいです'], answerIndex: 0 },
      },
      {
        grammarId: 'mitai-da',
        jp: '外[そと]は寒[さむ]いみたいです。',
        zh: '外面好像很冷。',
        target: '寒[さむ]いみたいです',
        meaning: {
          prompt: '句中的「寒いみたいです」在這裡的作用是什麼？',
          options: ['「ようです」的口語說法，意思相同但更隨意', '正式書面用語', '表示轉述客觀依據', '表示比喻'],
          answerIndex: 0,
        },
        cloze: { options: ['寒[さむ]いみたいです', '寒[さむ]いようです', '寒[さむ]そうです', '寒[さむ]いらしいです'], answerIndex: 0 },
      },
      {
        grammarId: 'rashii',
        jp: '天気予報[てんきよほう]によると、明日[あした]は台風[たいふう]が来[く]るらしいです。',
        zh: '根據天氣預報，明天颱風好像要來了。',
        target: '来[く]るらしいです',
        meaning: {
          prompt: '句中的「来るらしいです」在這裡的作用是什麼？',
          options: ['根據客觀依據（傳聞、報導等）做出的推測', '純粹主觀的猜測，沒有依據', '表示比喻', '表示義務'],
          answerIndex: 0,
        },
        cloze: { options: ['来[く]るらしいです', '来[き]そうです', '来[く]るようです', '来[く]るみたいです'], answerIndex: 0 },
      },
    ],
  },
];
