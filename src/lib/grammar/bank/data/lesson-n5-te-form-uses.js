// Extracted from lessons/data/n5-te-form-uses.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-te-iru-1',
    grammarIds: ['te-iru'],
    level: 'N5',
    meaning: {
      prompt: '「田中さんは結婚しています」的意思是？',
      options: ['田中先生正在結婚典禮中', '田中先生已婚', '田中先生想結婚', '田中先生離婚了'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-kudasai-1',
    grammarIds: ['te-kudasai'],
    level: 'N5',
    meaning: {
      prompt: '想禮貌地說「請稍等一下」，該用哪個句型？',
      options: ['〜ています', '〜てください', '〜てもいいです', '〜てはいけません'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-mo-ii-1',
    grammarIds: ['te-mo-ii'],
    level: 'N5',
    meaning: {
      prompt: '想問「可以坐這裡嗎？」該用哪個句型？',
      options: ['〜てください', '〜てもいいですか', '〜てはいけません', '〜ています'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-wa-ikenai-1',
    grammarIds: ['te-wa-ikenai'],
    level: 'N5',
    meaning: {
      prompt: '想表達「這裡不可以抽菸」（禁止），該用哪個句型？',
      options: ['〜てもいいです', '〜てはいけません', '〜てください', '〜たいです'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-kara-1',
    grammarIds: ['te-kara'],
    level: 'N5',
    meaning: {
      prompt: '想強調「先洗手，再吃飯」的順序，該用哪個句型？',
      options: ['〜まえに', '〜てから', '〜ながら', '〜とき'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-miru-1',
    grammarIds: ['te-miru'],
    level: 'N5',
    meaning: {
      prompt: '想表達「請吃吃看這道菜」，該用哪個句型？',
      options: ['〜てください', '〜てみてください', '〜てはいけません', '〜てもいい'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-nagara-1',
    grammarIds: ['nagara'],
    level: 'N5',
    meaning: {
      prompt: '「音楽を聞く」的ます形去掉ます是「聞き」，加上ながら是？',
      options: ['聞きながら', '聞くながら', '聞いてながら', '聞ながら'],
      answerIndex: 0,
    },
  },
];

export default items;
