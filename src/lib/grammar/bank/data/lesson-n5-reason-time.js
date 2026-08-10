// Extracted from lessons/data/n5-reason-time.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-kara-reason-1',
    grammarIds: ['kara-reason'],
    level: 'N5',
    meaning: {
      prompt: '想強調自己主觀的理由「因為發燒了，所以請假」，該用哪個句型比較自然？',
      options: ['ので', 'から', 'たら', 'ながら'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-node-reason-1',
    grammarIds: ['node-reason'],
    level: 'N5',
    meaning: {
      prompt: '對主管解釋請假原因，想語氣更委婉客氣，該用哪個句型比較適合？',
      options: ['から', 'ので', 'し', 'ながら'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-toki-1',
    grammarIds: ['toki'],
    level: 'N5',
    meaning: {
      prompt: '「已經到了日本之後才做的事」該接哪種時態的動詞＋とき？',
      options: ['辞書形', 'た形', 'ます形', 'ている形'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-mae-ni-1',
    grammarIds: ['mae-ni'],
    level: 'N5',
    meaning: {
      prompt: '「寝る」接まえに，該用哪個形態？',
      options: ['寝るまえに', '寝たまえに', '寝ていまえに', '寝ながらまえに'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-ato-de-1',
    grammarIds: ['ato-de'],
    level: 'N5',
    meaning: {
      prompt: '「食べる」接あとで，該用哪個形態？',
      options: ['食べるあとで', '食べたあとで', '食べているあとで', '食べようあとで'],
      answerIndex: 1,
    },
  },
];

export default items;
