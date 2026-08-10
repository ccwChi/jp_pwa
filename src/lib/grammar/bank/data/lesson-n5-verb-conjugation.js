// Extracted from lessons/data/n5-verb-conjugation.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-masu-form-1',
    grammarIds: ['masu-form'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '「飲む」的ます形是？',
      options: ['飲みます', '飲むます', '飲きます', '飲します'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-dictionary-form-1',
    grammarIds: ['dictionary-form'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '「食べます」的辞書形是？',
      options: ['食べる', '食べます', '食べた', '食べて'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-te-form-1',
    grammarIds: ['te-form'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '「飲む」的て形是？',
      options: ['飲んで', '飲みて', '飲って', '飲いて'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-ta-form-1',
    grammarIds: ['ta-form'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '「話す」的て形是「話して」，那た形是？',
      options: ['話した', '話しだ', '話して', '話す'],
      answerIndex: 0,
    },
  },
  {
    id: 'lesson-quiz-nai-form-1',
    grammarIds: ['nai-form'],
    level: 'N5',
    section: 'grammar',
    meaning: {
      prompt: '「買う」的ない形是？',
      options: ['買わない', '買あない', '買いない', '買らない'],
      answerIndex: 0,
    },
  },
];

export default items;
