import story from '../../../stories/kumo.js';

export default story.stages.map((stage, index) => ({
  id: `kumo-${index + 1}`, seriesId: 'kumo', seriesTitle: story.title,
  title: stage.title, partIndex: index + 1, partTitle: stage.title,
  level: 'N3', excerpt: `${story.author} · 原文全文分為 10 個教學段落，也可從首頁逐關學習。`,
  sentences: stage.lines, vocab: [],
  grammar: stage.tips.map(tip => ({ point: tip.split('：')[0], explanation: tip })),
  quiz: stage.questions.map(q => ({ question: q.prompt, ...q })),
}));
