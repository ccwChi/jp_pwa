// Extracted from practice/data/n2-g02-inevitability-limitation.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n2-inevitability-limitation-ni-kimatteiru',
    grammarIds: ['ni-kimatteiru'],
    level: 'N2',
    section: 'grammar',
    jp: '無理[むり]なダイエットは体[からだ]に悪[わる]いに決[き]まっています。',
    zh: '不合理的減肥方式肯定對身體不好。',
    target: 'に決[き]まっています',
    meaning: {
      prompt: '句中的「に決まっています」在這裡的作用是什麼？',
      options: ['表示說話者主觀上非常確信，語氣比「に違いない」更口語直接', '表示強烈斷定就是這個原因，沒有別的可能', '表示幾乎等同於某個情況', '表示根本沒有餘裕做某事'],
      answerIndex: 0,
    },
    cloze: {
      options: ['に決[き]まっています', 'にほかなりません', 'も同然[どうぜん]です', 'どころではありません'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-inevitability-limitation-ni-hokanaranai',
    grammarIds: ['ni-hokanaranai'],
    level: 'N2',
    section: 'grammar',
    jp: '彼[かれ]が成功[せいこう]したのは、努力[どりょく]の結果[けっか]にほかなりません。',
    zh: '他之所以成功，正是努力的結果。',
    target: 'にほかなりません',
    meaning: {
      prompt: '句中的「にほかなりません」在這裡的作用是什麼？',
      options: ['表示強烈斷定就是這個原因、事物，沒有別的可能', '表示說話者主觀非常確信，語氣較口語', '表示幾乎等同於某個情況', '表示根本沒有餘裕做某事'],
      answerIndex: 0,
    },
    cloze: {
      options: ['にほかなりません', 'に決[き]まっています', 'も同然[どうぜん]です', 'どころではありません'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-inevitability-limitation-mo-douzen-da',
    grammarIds: ['mo-douzen-da'],
    level: 'N2',
    section: 'grammar',
    jp: '彼[かれ]とは幼[おさな]なじみで、家族[かぞく]も同然[どうぜん]です。',
    zh: '他是我的青梅竹馬，就跟家人沒兩樣。',
    target: 'も同然[どうぜん]です',
    meaning: {
      prompt: '句中的「も同然です」在這裡的作用是什麼？',
      options: ['表示狀態幾乎等同於某個情況，跟…沒兩樣', '表示強烈斷定，沒有別的可能', '表示說話者主觀非常確信', '表示根本沒有餘裕做某事'],
      answerIndex: 0,
    },
    cloze: {
      options: ['も同然[どうぜん]です', 'に決[き]まっています', 'にほかなりません', 'どころではありません'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-inevitability-limitation-dokorode-wa-nai',
    grammarIds: ['dokorode-wa-nai'],
    level: 'N2',
    section: 'grammar',
    jp: '仕事[しごと]が忙[いそが]しくて、旅行[りょこう]どころではありません。',
    zh: '工作忙得要命，哪裡還顧得上去旅行。',
    target: 'どころではありません',
    meaning: {
      prompt: '句中的「どころではありません」在這裡的作用是什麼？',
      options: ['表示因為情況緊急或忙碌，根本沒有餘裕做某事', '表示強烈斷定沒有別的可能', '表示幾乎等同於某個情況', '表示說話者非常確信'],
      answerIndex: 0,
    },
    cloze: {
      options: ['どころではありません', 'も同然[どうぜん]です', 'にほかなりません', 'に決[き]まっています'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-inevitability-limitation-ni-kagitte',
    grammarIds: ['ni-kagitte'],
    level: 'N2',
    section: 'grammar',
    jp: '傘[かさ]を忘[わす]れた日[ひ]に限[かぎ]って、雨[あめ]が降[ふ]ります。',
    zh: '偏偏忘記帶傘的那天就下雨。',
    target: 'に限[かぎ]って',
    meaning: {
      prompt: '句中的「に限って」在這裡的作用是什麼？',
      options: ['表示偏偏在這種情況、這個人身上發生和預期相反的事', '表示不僅限於前項範圍', '舉極端例子強調程度「連…都」', '表示雖然沒到某程度但至少做到後項'],
      answerIndex: 0,
    },
    cloze: {
      options: ['に限[かぎ]って', 'のみならず', 'すら', 'ないまでも'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-inevitability-limitation-nominarazu',
    grammarIds: ['nominarazu'],
    level: 'N2',
    section: 'grammar',
    jp: 'この問題[もんだい]は日本[にほん]のみならず、世界中[せかいじゅう]で起[お]きています。',
    zh: '這個問題不僅發生在日本，全世界都在發生。',
    target: 'のみならず',
    meaning: {
      prompt: '句中的「のみならず」在這裡的作用是什麼？',
      options: ['書面語的「不僅…而且…」，比「だけでなく」更正式', '表示偏偏在這個時候發生相反的事', '舉極端例子強調程度', '表示雖然沒到某程度但至少做到後項'],
      answerIndex: 0,
    },
    cloze: {
      options: ['のみならず', 'に限[かぎ]って', 'すら', 'ないまでも'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-inevitability-limitation-sura',
    grammarIds: ['sura'],
    level: 'N2',
    section: 'grammar',
    jp: '彼[かれ]は自分[じぶん]の名前[なまえ]すら書[か]けませんでした。',
    zh: '他連自己的名字都不會寫。',
    target: 'すら',
    meaning: {
      prompt: '句中的「すら」在這裡的作用是什麼？',
      options: ['舉一個極端的例子強調程度，語感比「さえ」更書面強烈', '表示偏偏發生相反的事', '書面語的不僅…而且…', '表示雖然沒到某程度但至少做到後項'],
      answerIndex: 0,
    },
    cloze: {
      options: ['すら', 'に限[かぎ]って', 'のみならず', 'ないまでも'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-inevitability-limitation-naimademo',
    grammarIds: ['naimademo'],
    level: 'N2',
    section: 'grammar',
    jp: '毎日[まいにち]とは言[い]わないまでも、週[しゅう]に三回[さんかい]は運動[うんどう]したいです。',
    zh: '雖然不到每天，但至少一週想運動三次。',
    target: 'ないまでも',
    meaning: {
      prompt: '句中的「ないまでも」在這裡的作用是什麼？',
      options: ['表示雖然沒有達到前項程度，但至少做到後項', '表示偏偏發生相反的事', '書面語的不僅…而且…', '舉極端例子強調程度'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ないまでも', 'に限[かぎ]って', 'のみならず', 'すら'],
      answerIndex: 0,
    },
  },
];

export default items;
