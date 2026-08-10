// Extracted from lessons/data/n2-concession-advanced.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-mono-wo-1',
    grammarIds: ['mono-wo'],
    level: 'N2',
    meaning: {
      prompt: '「〜ものを」和「〜のに」相比，語氣上有什麼特色？',
      options: ['完全一樣，沒有差別', '帶有更強烈的悔恨、責備情緒', 'ものを比較口語、隨意', 'ものを只能用在肯定句'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-nishitemo-niseyo-nishiro-1',
    grammarIds: ['nishitemo-niseyo-nishiro'],
    level: 'N2',
    meaning: {
      prompt: '「就算再忙，至少也該回個訊息吧」該用哪個句型？',
      options: [
        '忙しいばかりに、返事ぐらいはするべきです',
        '忙しいにしても、返事ぐらいはするべきです',
        '忙しいことから、返事ぐらいはするべきです',
        '忙しいものを、返事ぐらいはするべきです',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-nagara-mo-1',
    grammarIds: ['nagara-mo'],
    level: 'N2',
    meaning: {
      prompt: '「雖然小，但是個很舒適的房間」該怎麼說？',
      options: ['狭いのに、居心地のいい部屋です', '狭いながらも、居心地のいい部屋です', '狭いくせに、居心地のいい部屋です', '狭いものを、居心地のいい部屋です'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-toiitemo-1',
    grammarIds: ['toiitemo'],
    level: 'N2',
    meaning: {
      prompt: '「雖說會日文，但也只是會一些簡單的招呼而已」該怎麼說？',
      options: [
        '日本語ができるとはいえ、簡単な挨拶ぐらいです',
        '日本語ができるといっても、簡単な挨拶ぐらいです',
        '日本語ができるにしても、簡単な挨拶ぐらいです',
        '日本語ができるものを、簡単な挨拶ぐらいです',
      ],
      answerIndex: 1,
    },
  },
];

export default items;
