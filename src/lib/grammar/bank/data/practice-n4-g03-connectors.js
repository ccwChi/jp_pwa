// Extracted from practice/data/n4-g03-connectors.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n4-connectors-noni',
    grammarIds: ['noni'],
    level: 'N4',
    section: 'grammar',
    jp: '一生懸命[いっしょうけんめい]勉強[べんきょう]したのに、試験[しけん]に落[お]ちました。',
    zh: '明明拼命讀書了，卻沒考過。',
    target: 'したのに',
    meaning: {
      prompt: '句中的「したのに」在這裡的作用是什麼？',
      options: ['表示逆接，帶有意外、不滿、可惜的語氣', '表示中性客觀的對比', '表示原因', '表示目的'],
      answerIndex: 0,
    },
    cloze: {
      options: ['したのに', 'したから', 'したので', 'したら'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-connectors-tame-ni',
    grammarIds: ['tame-ni'],
    level: 'N4',
    section: 'grammar',
    jp: '日本語[にほんご]が上手[じょうず]になるために、毎日[まいにち]練習[れんしゅう]します。',
    zh: '為了讓日文變好，每天練習。',
    target: 'ために',
    meaning: {
      prompt: '句中的「ために」在這裡的作用是什麼？',
      options: ['表示目的「為了…」，前面接意志性動詞', '表示原因', '表示逆接', '表示比喻'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ために', 'ように', 'のに', 'から'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-connectors-you-ni-purpose',
    grammarIds: ['you-ni-purpose'],
    level: 'N4',
    section: 'grammar',
    jp: '日本語[にほんご]が話[はな]せるように、毎日[まいにち]練習[れんしゅう]しています。',
    zh: '為了能說日文，每天練習著。',
    target: 'ように',
    meaning: {
      prompt: '句中的「ように」在這裡的作用是什麼？',
      options: ['表示目的，前面接非意志性動詞（如可能形）', '表示目的，前面接意志性動詞', '表示原因', '表示逆接'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ように', 'ために', 'のに', 'から'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n4-connectors-you-ni-naru-suru',
    grammarIds: ['you-ni-naru-suru'],
    level: 'N4',
    section: 'grammar',
    jp: '練習[れんしゅう]して、漢字[かんじ]が読[よ]めるようになりました。',
    zh: '練習之後，變得會唸漢字了。',
    target: '読[よ]めるようになりました',
    meaning: {
      prompt: '句中的「読めるようになりました」在這裡的作用是什麼？',
      options: ['表示能力或狀態自然產生的變化', '表示自己刻意努力去做到某件事', '表示原因', '表示逆接'],
      answerIndex: 0,
    },
    cloze: {
      options: ['読[よ]めるようになりました', '読[よ]めるようにしました', '読[よ]めるためになりました', '読[よ]めるのにしました'],
      answerIndex: 0,
    },
  },
];

export default items;
