// Extracted from lessons/data/n2-condition-advanced.js's inline quiz field — one bank
// item per original quiz question, tagged with its lesson's id so it stays
// in that grammar point's practice pool (see src/lib/grammar/bank/index.js).
const items = [
  {
    id: 'lesson-quiz-nai-koto-niwa-1',
    grammarIds: ['nai-koto-niwa'],
    level: 'N2',
    meaning: {
      prompt: '「不實際做做看的話，就不會知道」該用哪個句型？',
      options: ['やってみればわかりません', 'やってみないことには、わかりません', 'やってみるとしたら、わかりません', 'やってみるものを、わかりません'],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-te-hajimete-1',
    grammarIds: ['te-hajimete'],
    level: 'N2',
    meaning: {
      prompt: '「直到自己當了父母，才明白父母的辛勞有多可貴」該怎麼說？',
      options: [
        '親になるとはじめて、親のありがたさがわかりました',
        '親になってはじめて、親のありがたさがわかりました',
        '親になるながらも、親のありがたさがわかりました',
        '親になるものを、親のありがたさがわかりました',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-ba-koso-1',
    grammarIds: ['ba-koso'],
    level: 'N2',
    meaning: {
      prompt: '「正因為有家人的支持，才能一路努力到現在」，這種強調唯一原因的說法該用哪個句型？',
      options: [
        '家族の支えがあるからには、ここまで頑張ってこられました',
        '家族の支えがあればこそ、ここまで頑張ってこられました',
        '家族の支えがあるにしても、ここまで頑張ってこられました',
        '家族の支えがあるものを、ここまで頑張ってこられました',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lesson-quiz-nukini-nukide-1',
    grammarIds: ['nukini-nukide'],
    level: 'N2',
    meaning: {
      prompt: '「沒有他的協助，這個專案就不會成功」該用哪個句型？',
      options: [
        '彼の協力抜きにして、このプロジェクトは成功しませんでした',
        '彼の協力抜きでは、このプロジェクトは成功しませんでした',
        '彼の協力に応じて、このプロジェクトは成功しませんでした',
        '彼の協力にしても、このプロジェクトは成功しませんでした',
      ],
      answerIndex: 1,
    },
  },
];

export default items;
