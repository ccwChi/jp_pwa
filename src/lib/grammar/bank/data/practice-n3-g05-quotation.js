// Extracted from practice/data/n3-g05-quotation.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-n3-quotation-to-iwarete-iru',
    grammarIds: ['to-iwarete-iru'],
    level: 'N3',
    jp: '納豆[なっとう]は体[からだ]にいいと言[い]われています。',
    zh: '大家都說納豆對身體好。',
    target: 'と言[い]われています',
    meaning: {
      prompt: '句中的「と言われています」在這裡的作用是什麼？',
      options: ['轉述一般社會普遍的說法、看法「據說…、大家都說…」', '表示被正式認定、規定的內容', '表示自始至終沒有做某事', '表示關於某個話題'],
      answerIndex: 0,
    },
    cloze: {
      options: ['と言[い]われています', 'とされています', 'ことなく', 'に関[かん]して'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-quotation-to-sarete-iru',
    grammarIds: ['to-sarete-iru'],
    level: 'N3',
    jp: '一般[いっぱん]に、成人[せいじん]は十八歳[じゅうはっさい]以上[いじょう]とされています。',
    zh: '一般認定成年人是十八歲以上。',
    target: 'とされています',
    meaning: {
      prompt: '句中的「とされています」在這裡的作用是什麼？',
      options: ['表示被普遍認定、視為某種看法，語感較正式書面', '表示口語轉述聽來的說法', '表示自始至終沒有做某事', '表示關於某話題'],
      answerIndex: 0,
    },
    cloze: {
      options: ['とされています', 'と言[い]われています', 'ことなく', 'に関[かん]して'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-quotation-koto-naku',
    grammarIds: ['koto-naku'],
    level: 'N3',
    jp: '彼[かれ]は諦[あきら]めることなく、最後[さいご]まで頑張[がんば]りました。',
    zh: '他沒有放棄，堅持到最後。',
    target: '諦[あきら]めることなく',
    meaning: {
      prompt: '句中的「諦めることなく」在這裡的作用是什麼？',
      options: ['表示自始至終沒有做某件事，語感比「ないで」更書面', '表示轉述普遍的看法', '表示被正式認定', '表示關於某話題'],
      answerIndex: 0,
    },
    cloze: {
      options: ['諦[あきら]めることなく', '諦[あきら]めないで', '諦[あきら]めるとされて', '諦[あきら]めると言[い]われて'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-n3-quotation-ni-kanshite',
    grammarIds: ['ni-kanshite'],
    level: 'N3',
    jp: 'この件[けん]に関[かん]して、詳[くわ]しく説明[せつめい]します。',
    zh: '關於這件事，我會詳細說明。',
    target: 'に関[かん]して',
    meaning: {
      prompt: '句中的「に関して」在這裡的作用是什麼？',
      options: ['表示話題、內容涉及的範圍「關於…」', '表示轉述普遍的看法', '表示被正式認定', '表示自始至終沒有做某事'],
      answerIndex: 0,
    },
    cloze: {
      options: ['に関[かん]して', 'とされて', 'と言[い]われて', 'ことなく'],
      answerIndex: 0,
    },
  },
];

export default items;
