// Extracted from practice/data/n2-g03-manner-purpose.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n2-manner-purpose-mai',
    grammarIds: ['mai'],
    level: 'N2',
    jp: 'もう二度[にど]と同[おな]じ失敗[しっぱい]はするまい。',
    zh: '絕不再犯同樣的錯誤了。',
    target: 'するまい',
    meaning: {
      prompt: '句中的「するまい」在這裡的作用是什麼？',
      options: ['強烈的否定意志或否定推測', '誇張的比喻，幾乎要做出某動作', '表示彷彿、宛如', '表示結果和條件不成比例'],
      answerIndex: 0,
    },
    cloze: {
      options: ['するまい', 'せんばかりに', 'するかのように', 'するわりに'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-manner-purpose-nbakari-ni',
    grammarIds: ['nbakari-ni'],
    level: 'N2',
    jp: '彼[かれ]は泣[な]き出[だ]さんばかりに悲[かな]しんでいました。',
    zh: '他難過得幾乎要哭出來似的。',
    target: '泣[な]き出[だ]さんばかりに',
    meaning: {
      prompt: '句中的「泣き出さんばかりに」在這裡的作用是什麼？',
      options: ['誇張的比喻，表示幾乎要做出某個動作、狀態的樣子', '強烈的否定意志或推測', '表示彷彿、宛如某個狀態', '表示結果和條件不成比例'],
      answerIndex: 0,
    },
    cloze: {
      options: ['泣[な]き出[だ]さんばかりに', '泣[な]き出[だ]すまいに', '泣[な]き出[だ]すかのように', '泣[な]き出[だ]すわりに'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-manner-purpose-kano-youni',
    grammarIds: ['kano-youni'],
    level: 'N2',
    jp: '彼[かれ]は何[なに]も知[し]らないかのように振[ふ]る舞[ま]っています。',
    zh: '他表現得彷彿什麼都不知道似的。',
    target: 'かのように',
    meaning: {
      prompt: '句中的「かのように」在這裡的作用是什麼？',
      options: ['表示實際上並非如此，但看起來、表現得就像是那樣', '強烈的否定意志', '誇張比喻幾乎要做出某動作', '表示結果和條件不成比例'],
      answerIndex: 0,
    },
    cloze: {
      options: ['かのように', 'んばかりに', 'まいに', 'わりに'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-manner-purpose-wari-niwa',
    grammarIds: ['wari-niwa'],
    level: 'N2',
    jp: 'この店[みせ]は値段[ねだん]が安[やす]いわりに、味[あじ]がいいです。',
    zh: '這間店雖然價格便宜，但味道卻出乎意料地好。',
    target: 'わりに',
    meaning: {
      prompt: '句中的「わりに」在這裡的作用是什麼？',
      options: ['表示結果和前面的條件不成比例，比預期更好或更差', '表示彷彿、宛如某個狀態', '強烈的否定意志或推測', '誇張比喻幾乎要做出某動作'],
      answerIndex: 0,
    },
    cloze: {
      options: ['わりに', 'かのように', 'まいに', 'んばかりに'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-manner-purpose-beku',
    grammarIds: ['beku'],
    level: 'N2',
    jp: '夢[ゆめ]を実現[じつげん]すべく、日々[ひび]努力[どりょく]しています。',
    zh: '為了實現夢想，每天努力著。',
    target: 'すべく',
    meaning: {
      prompt: '句中的「すべく」在這裡的作用是什麼？',
      options: ['表示帶著明確的目的、意志去做某事，語感書面鄭重', '表示以某件事為契機', '表示透過某個媒介', '表示依照狀況相應調整'],
      answerIndex: 0,
    },
    cloze: {
      options: ['すべく', 'をきっかけに', 'を通[つう]じて', 'に応[おう]じて'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-manner-purpose-wo-kikkake-ni',
    grammarIds: ['wo-kikkake-ni'],
    level: 'N2',
    jp: '友達[ともだち]に誘[さそ]われたのをきっかけに、テニスを始[はじ]めました。',
    zh: '因為被朋友邀請，藉這個機會開始打網球。',
    target: 'をきっかけに',
    meaning: {
      prompt: '句中的「をきっかけに」在這裡的作用是什麼？',
      options: ['表示以某件事為契機、開端', '表示帶著明確目的去做某事', '表示透過某個媒介', '表示依照狀況相應調整'],
      answerIndex: 0,
    },
    cloze: {
      options: ['をきっかけに', 'すべく', 'を通[つう]じて', 'に応[おう]じて'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-manner-purpose-wo-tsujite',
    grammarIds: ['wo-tsujite'],
    level: 'N2',
    jp: 'この地域[ちいき]は一年[いちねん]を通[とお]して温暖[おんだん]な気候[きこう]です。',
    zh: '這個地區一整年氣候都很溫暖。',
    target: 'を通[とお]して',
    meaning: {
      prompt: '句中的「を通して」在這裡的作用是什麼？',
      options: ['表示在某段期間內持續，或透過某個媒介', '表示以某件事為契機', '表示帶著明確目的去做某事', '表示依照狀況相應調整'],
      answerIndex: 0,
    },
    cloze: {
      options: ['を通[とお]して', 'をきっかけに', 'すべく', 'に応[おう]じて'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n2-manner-purpose-ni-oujite',
    grammarIds: ['ni-oujite'],
    level: 'N2',
    jp: '収入[しゅうにゅう]に応[おう]じて、税金[ぜいきん]の金額[きんがく]が変[か]わります。',
    zh: '依照收入的不同，稅金的金額也會改變。',
    target: 'に応[おう]じて',
    meaning: {
      prompt: '句中的「に応じて」在這裡的作用是什麼？',
      options: ['表示依照某個狀況、條件的變化而相應調整', '表示以某件事為契機', '表示帶著明確目的去做某事', '表示透過某個媒介'],
      answerIndex: 0,
    },
    cloze: {
      options: ['に応[おう]じて', 'をきっかけに', 'すべく', 'を通[つう]じて'],
      answerIndex: 0,
    },
  },
];

export default items;
