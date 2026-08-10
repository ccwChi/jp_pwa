// Extracted from lessons/data/n3-concession.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-kuse-ni-1',
    grammarIds: ['kuse-ni'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「くせに」和「のに」相比，語氣上有什麼不同？',
      options: ['完全一樣沒有差別', 'くせに更帶有輕蔑、責備的負面語氣', 'くせに比較禮貌客氣', 'くせに只能用在自己身上'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-mono-no-1',
    grammarIds: ['mono-no'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '想在正式文章中表達「雖然…但是…」較客觀書面的語感，該用哪個句型？',
      options: ['〜くせに', '〜ものの', '〜たら', '〜ながら'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-towa-ie-1',
    grammarIds: ['towa-ie'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「雖說已經是春天，但早上還是很冷」，該用哪個句型？',
      options: ['春だからこそ、まだ朝は寒いです', '春とはいえ、まだ朝は寒いです', '春について、まだ朝は寒いです', '春に対して、まだ朝は寒いです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-nimo-kakawarazu-1',
    grammarIds: ['nimo-kakawarazu'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「儘管下大雨，還是聚集了很多人」，該用哪個句型？',
      options: [
        '大雨によって、たくさんの人が集まりました',
        '大雨にもかかわらず、たくさんの人が集まりました',
        '大雨において、たくさんの人が集まりました',
        '大雨に対して、たくさんの人が集まりました',
      ],
      answerIndex: 1,
    },
  },
];

export default items;
