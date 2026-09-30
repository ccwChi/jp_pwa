import { journeys } from '../../../journeys.js';

const story = journeys.find(journey => journey.id === 'rain-letter');
const articles = story.stages.map((stage, index) => ({
  id: `rain-letter-${index + 1}`,
  seriesId: 'rain-letter', seriesTitle: story.title,
  title: stage.title, partIndex: index + 1, partTitle: String(index + 1),
  level: 'N4', excerpt: '原創初階短篇，附逐句翻譯；也可從首頁進入引導關卡。',
  sentences: stage.lines, vocab: [],
  grammar: stage.tips.map(tip => ({ point: tip.split('：')[0], explanation: tip })),
  quiz: stage.questions.map(q => ({ question: q.prompt, options: q.options, answerIndex: q.answerIndex, explanation: q.explanation })),
}));
export default articles;
