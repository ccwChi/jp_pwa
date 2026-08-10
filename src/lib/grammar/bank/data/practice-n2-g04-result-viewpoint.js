// Extracted from practice/data/n2-g04-result-viewpoint.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n2-result-viewpoint-sue-ni',
    grammarIds: ['sue-ni'],
    level: 'N2',
    jp: '長[なが]い議論[ぎろん]の末[すえ]に、結論[けつろん]が出[で]ました。',
    zh: '經過長時間的討論，最後得出了結論。',
    target: '末[すえ]に',
    meaning: {
      prompt: '句中的「末に」在這裡的作用是什麼？',
      options: ['表示經過長時間的努力、掙扎最後得到結果，語感中性', '表示經過一番過程卻得到負面結果', '表示即使做了也沒用，消極放棄語感', '表示回憶過去經常發生的事'],
      answerIndex: 0,
    },
    cloze: {
      options: ['末[すえ]に', 'あげく', 'たところで', 'ものだ'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-result-viewpoint-ageku',
    grammarIds: ['ageku'],
    level: 'N2',
    jp: 'さんざん悩[なや]んだあげく、結局[けっきょく]何[なに]も変[か]わりませんでした。',
    zh: '煩惱了老半天，結果什麼都沒改變。',
    target: 'あげく',
    meaning: {
      prompt: '句中的「あげく」在這裡的作用是什麼？',
      options: ['表示經過一番過程之後卻得到不好的結果，帶負面語感', '表示經過努力最後得到結果，語感中性', '表示即使做了也沒用', '表示回憶過去經常發生的事'],
      answerIndex: 0,
    },
    cloze: {
      options: ['あげく', '末[すえ]に', 'たところで', 'ものだ'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-result-viewpoint-ta-tokorode',
    grammarIds: ['ta-tokorode'],
    level: 'N2',
    jp: '今[いま]から急[いそ]いだところで、間[ま]に合[あ]わないでしょう。',
    zh: '現在才趕，也來不及了吧。',
    target: '急[いそ]いだところで',
    meaning: {
      prompt: '句中的「急いだところで」在這裡的作用是什麼？',
      options: ['表示即使做了前項也不會有用，帶消極放棄語感', '表示經過長時間努力最後得到結果', '表示經過一番過程卻得到負面結果', '表示回憶過去經常發生的事'],
      answerIndex: 0,
    },
    cloze: {
      options: ['急[いそ]いだところで', '急[いそ]いだ末[すえ]に', '急[いそ]いだあげく', '急[いそ]ぐものだ'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-result-viewpoint-mono-da',
    grammarIds: ['mono-da'],
    level: 'N2',
    jp: '子供[こども]のころ、よくこの川[かわ]で泳[およ]いだものです。',
    zh: '小時候常常在這條河游泳。',
    target: '泳[およ]いだものです',
    meaning: {
      prompt: '句中的「泳いだものです」在這裡的作用是什麼？',
      options: ['回憶過去經常發生的事，帶懷念感慨語氣', '表示經過努力得到結果', '表示即使做了也沒用', '表示經過一番過程卻得到負面結果'],
      answerIndex: 0,
    },
    cloze: {
      options: ['泳[およ]いだものです', '泳[およ]いだ末[すえ]です', '泳[およ]いだあげくです', '泳[およ]いだところでです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-result-viewpoint-karashite',
    grammarIds: ['karashite'],
    level: 'N2',
    jp: 'あの態度[たいど]からして、彼[かれ]はやる気[やるき]がなさそうです。',
    zh: '從那個態度來看，他似乎完全沒有幹勁。',
    target: 'からして',
    meaning: {
      prompt: '句中的「からして」在這裡的作用是什麼？',
      options: ['舉一個代表性例子，說明從這點就能推知整體', '表示從某個立場角度出發判斷', '表示依照既定方針不偏離', '表示不分某個條件一律適用'],
      answerIndex: 0,
    },
    cloze: {
      options: ['からして', 'からすると', 'に沿[そ]って', 'を問[と]わず'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-result-viewpoint-kara-suruto',
    grammarIds: ['kara-suruto'],
    level: 'N2',
    jp: '専門家[せんもんか]からすると、この計画[けいかく]には無理[むり]があるようです。',
    zh: '從專家的角度來看，這個計畫似乎有困難。',
    target: 'からすると',
    meaning: {
      prompt: '句中的「からすると」在這裡的作用是什麼？',
      options: ['表示從某個立場、角度出發來看、來判斷', '舉代表性例子說明能推知整體', '表示依照既定方針不偏離', '表示不分某個條件一律適用'],
      answerIndex: 0,
    },
    cloze: {
      options: ['からすると', 'からして', 'に沿[そ]って', 'を問[と]わず'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-result-viewpoint-ni-sotte',
    grammarIds: ['ni-sotte'],
    level: 'N2',
    jp: '会社[かいしゃ]の方針[ほうしん]に沿[そ]って、計画[けいかく]を進[すす]めます。',
    zh: '依照公司的方針推進計畫。',
    target: 'に沿[そ]って',
    meaning: {
      prompt: '句中的「に沿って」在這裡的作用是什麼？',
      options: ['表示依照既定的方針、路線、期望去做，不偏離', '表示從某個立場判斷', '舉代表性例子說明能推知整體', '表示不分某個條件一律適用'],
      answerIndex: 0,
    },
    cloze: {
      options: ['に沿[そ]って', 'からすると', 'からして', 'を問[と]わず'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-result-viewpoint-wo-towazu',
    grammarIds: ['wo-towazu'],
    level: 'N2',
    jp: 'この仕事[しごと]は経験[けいけん]の有無[うむ]を問[と]わず、応募[おうぼ]できます。',
    zh: '這份工作不論有沒有經驗都可以應徵。',
    target: 'を問[と]わず',
    meaning: {
      prompt: '句中的「を問わず」在這裡的作用是什麼？',
      options: ['表示不論、不分某個條件、屬性的差異，一律適用', '表示從某個立場判斷', '表示依照既定方針不偏離', '舉代表性例子說明能推知整體'],
      answerIndex: 0,
    },
    cloze: {
      options: ['を問[と]わず', 'に沿[そ]って', 'からすると', 'からして'],
      answerIndex: 0,
    },
  },
];

export default items;
