// Extracted from practice/data/g09-desire-adjectives.js's inline sentences field — one
// bank item per original sentence, tagged with its grammarId so it stays in
// that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'practice-desire-adjectives-tai-desu',
    grammarIds: ['tai-desu'],
    level: 'N5',
    section: 'grammar',
    jp: '日本[にほん]へ旅行[りょこう]に行[い]きたいです。',
    zh: '想去日本旅行。',
    target: 'たいです',
    meaning: {
      prompt: '句中的「たいです」在這裡的作用是什麼？',
      options: ['表示說話者自己想做某事的願望「想…」', '表示邀請對方一起做', '表示委婉詢問對方意願', '表示打算、計畫'],
      answerIndex: 0,
    },
    cloze: {
      options: ['たいです', 'ましょう', 'ませんか', 'つもりです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-desire-adjectives-mashou',
    grammarIds: ['mashou'],
    level: 'N5',
    section: 'grammar',
    jp: '一緒[いっしょ]に昼[ひる]ごはんを食[た]べましょう。',
    zh: '一起吃午飯吧。',
    target: 'ましょう',
    meaning: {
      prompt: '句中的「ましょう」在這裡的作用是什麼？',
      options: ['邀請對方一起做某事「一起…吧」', '表示自己的願望', '表示委婉詢問對方意願', '表示打算'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ましょう', 'たいです', 'ませんか', 'つもりです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-desire-adjectives-masenka',
    grammarIds: ['masenka'],
    level: 'N5',
    section: 'grammar',
    jp: '今度[こんど]の週末[しゅうまつ]、映画[えいが]を見[み]に行[い]きませんか。',
    zh: '這個週末要不要一起去看電影？',
    target: 'ませんか',
    meaning: {
      prompt: '句中的「ませんか」在這裡的作用是什麼？',
      options: ['委婉地詢問對方意願「要不要一起…」', '表示自己的願望', '表示主動邀請並提議', '表示打算'],
      answerIndex: 0,
    },
    cloze: {
      options: ['ませんか', 'ましょう', 'たいです', 'つもりです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-desire-adjectives-tsumori',
    grammarIds: ['tsumori'],
    level: 'N5',
    section: 'grammar',
    jp: '来年[らいねん]、日本[にほん]へ留学[りゅうがく]するつもりです。',
    zh: '打算明年去日本留學。',
    target: 'つもりです',
    meaning: {
      prompt: '句中的「つもりです」在這裡的作用是什麼？',
      options: ['表示說話者事先已有的打算「打算…」', '表示願望', '表示邀約', '表示委婉詢問'],
      answerIndex: 0,
    },
    cloze: {
      options: ['つもりです', 'たいです', 'ましょう', 'ませんか'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-desire-adjectives-i-adjective-conjugation',
    grammarIds: ['i-adjective-conjugation'],
    level: 'N5',
    section: 'grammar',
    jp: 'この店[みせ]のラーメンは高[たか]くないです。',
    zh: '這家店的拉麵不貴。',
    target: '高[たか]くないです',
    meaning: {
      prompt: '句中的「高くないです」是い形容詞的哪一種變化？',
      options: ['否定形「不…」', '過去形', '過去否定形', '（な形容詞的否定形，非い形容詞）'],
      answerIndex: 0,
    },
    cloze: {
      options: ['高[たか]くないです', '高[たか]かったです', '高[たか]くなかったです', '高[たか]いでした'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-desire-adjectives-na-adjective-conjugation',
    grammarIds: ['na-adjective-conjugation'],
    level: 'N5',
    section: 'grammar',
    jp: 'この町[まち]は静[しず]かです。',
    zh: '這個城鎮很安靜。',
    target: '静[しず]かです',
    meaning: {
      prompt: '句中的「静かです」是な形容詞的哪一種變化？',
      options: ['現在肯定形', '否定形', '過去形', '（い形容詞的現在肯定形，非な形容詞）'],
      answerIndex: 0,
    },
    cloze: {
      options: ['静[しず]かです', '静[しず]かでした', '静[しず]かじゃないです', '静[しず]いです'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-desire-adjectives-adjective-te-connection',
    grammarIds: ['adjective-te-connection'],
    level: 'N5',
    section: 'grammar',
    jp: 'この部屋[へや]は広[ひろ]くて明[あか]るいです。',
    zh: '這個房間又寬敞又明亮。',
    target: '広[ひろ]くて',
    meaning: {
      prompt: '句中的「広くて」在這裡的作用是什麼？',
      options: ['い形容詞的て形連接，「又…又…」', 'い形容詞的否定形', 'な形容詞的て形連接', 'い形容詞的過去形'],
      answerIndex: 0,
    },
    cloze: {
      options: ['広[ひろ]くて', '広[ひろ]いで', '広[ひろ]くない', '広[ひろ]かった'],
      answerIndex: 0,
    },
  },
  {
    id: 'practice-desire-adjectives-adjective-adverbial-change',
    grammarIds: ['adjective-adverbial-change'],
    level: 'N5',
    section: 'grammar',
    jp: '最近[さいきん]、寒[さむ]くなりました。',
    zh: '最近變冷了。',
    target: '寒[さむ]くなりました',
    meaning: {
      prompt: '句中的「寒くなりました」在這裡的作用是什麼？',
      options: ['い形容詞副詞化＋なります，表示自然發生的變化', 'な形容詞副詞化＋なります', 'い形容詞的て形連接', 'い形容詞的過去形'],
      answerIndex: 0,
    },
    cloze: {
      options: ['寒[さむ]くなりました', '寒[さむ]いでした', '寒[さむ]くて', '寒[さむ]かったです'],
      answerIndex: 0,
    },
  },
];

export default items;
