// Extracted from lessons/data/n3-conditional-advanced.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-ba-hodo-1',
    grammarIds: ['ba-hodo'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「越讀書就越懂」該怎麼說？',
      options: ['勉強すればするほど、わかるようになります', '勉強するとわかるようになります', '勉強するなら、わかるようになります', '勉強したら、わかるようになります'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-to-shitara-1',
    grammarIds: ['to-shitara'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「假如中了樂透的話，你要買什麼？」該用哪個句型？',
      options: [
        '宝くじが当たったので、何を買いますか',
        '宝くじが当たったとしたら、何を買いますか',
        '宝くじが当たったのに、何を買いますか',
        '宝くじが当たったばかりで、何を買いますか',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ta-totan-1',
    grammarIds: ['ta-totan'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「他一坐上椅子就睡著了」該怎麼說？',
      options: [
        '椅子に座ったら、眠ってしまいました',
        '椅子に座ったとたん、眠ってしまいました',
        '椅子に座ったばかりで、眠ってしまいました',
        '椅子に座ったとおりに、眠ってしまいました',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-shidai-1',
    grammarIds: ['shidai'],
    level: 'N3',
    section: 'grammar',
    meaning: {
      prompt: '「一到機場就立刻打電話」該用哪個句型？',
      options: ['空港に着いたら、電話します', '空港に着くと、電話します', '空港に着き次第、電話します', '空港に着くところで、電話します'],
      answerIndex: 2,
    },
  },
];

export default items;
