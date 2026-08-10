// Extracted from lessons/data/n2-conjecture-inevitability.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-ni-kimatteiru-1',
    grammarIds: ['ni-kimatteiru'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「に決まっている」和「に違いない」相比，語感上有什麼特色？',
      options: ['完全一樣', '更口語、語氣更直接斷定', '更書面、正式', '只能用在疑問句'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ni-hokanaranai-1',
    grammarIds: ['ni-hokanaranai'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「にほかならない」強調的語感是？',
      options: ['帶有不確定的猜測', '強烈斷定就是這個，沒有別的可能', '表示禁止', '表示願望'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-mo-douzen-da-1',
    grammarIds: ['mo-douzen-da'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「他是我的青梅竹馬，就跟家人沒兩樣」該用哪個句型？',
      options: [
        '彼とは幼なじみで、家族に決まっています',
        '彼とは幼なじみで、家族も同然です',
        '彼とは幼なじみで、家族にほかなりません',
        '彼とは幼なじみで、家族どころではありません',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-dokorode-wa-nai-1',
    grammarIds: ['dokorode-wa-nai'],
    level: 'N2',
    section: 'grammar',
    meaning: {
      prompt: '「工作忙得要命，哪裡還顧得上去旅行」該怎麼說？',
      options: [
        '仕事が忙しくて、旅行どころか行きたいです',
        '仕事が忙しくて、旅行どころではありません',
        '仕事が忙しくて、旅行も同然です',
        '仕事が忙しくて、旅行にほかなりません',
      ],
      answerIndex: 1,
    },
  },
];

export default items;
