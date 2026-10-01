import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const load = source => import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const { shuffle, prepareQuestion, isPlayable } = await load(fs.readFileSync('src/lib/practice/session.js', 'utf8'));
// Resolve our plain content modules without Next's alias/glob transforms.
function moduleUrl(file) {
  const source = fs.readFileSync(file, 'utf8');
  const code = file.endsWith('.json') ? `export default ${source};` : source.replace(/from ['"](\.[^'"]+)['"]/g, (_, relative) => `from '${moduleUrl(path.resolve(path.dirname(file), relative))}'`);
  return `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
}
const { journeys } = await import(moduleUrl(path.resolve('src/lib/journeys.js')));
const { buildStory, journeyStatus } = await import(moduleUrl(path.resolve('src/lib/story-curriculum.js')));
const item = { meaning: { options: ['wrong', 'right', 'also wrong'], answerIndex: 1 }, optionExplanations: ['no', 'yes', 'no again'] };
for (let i = 0; i < 100; i++) {
  const result = prepareQuestion(item);
  assert.equal(result.meaning.options[result.meaning.answerIndex], 'right');
  assert.equal(result.optionExplanations[result.meaning.answerIndex], 'yes');
  assert.deepEqual([...result.meaning.options].sort(), [...item.meaning.options].sort());
}
assert.deepEqual(item.meaning.options, ['wrong', 'right', 'also wrong']);
assert.equal(prepareQuestion(null), null);
assert.equal(isPlayable({ meaning: { options: ['one', 'two'], answerIndex: 2 } }), false);
assert.deepEqual(shuffle([], () => 0), []);

const lessonIds = new Set();
for (const file of fs.readdirSync('src/lib/grammar/lessons/data')) {
  const context = {};
  vm.runInNewContext(fs.readFileSync(`src/lib/grammar/lessons/data/${file}`, 'utf8').replace('export default ', 'globalThis.lessons = '), context);
  for (const lesson of context.lessons) lessonIds.add(lesson.id);
}
assert.equal(new Set(journeys.map(j => j.id)).size, journeys.length);
for (const journey of journeys) {
  assert.equal(new Set(journey.stages.map(s => s.id)).size, journey.stages.length);
  for (const stage of journey.stages) {
    assert.ok(stage.lines.length && stage.questions.length && stage.model);
    for (const id of stage.grammarIds) assert.ok(lessonIds.has(id), `Broken grammar link: ${id}`);
    for (const question of stage.questions) {
      assert.ok(isPlayable({ meaning: question }));
      assert.ok(question.explanation);
    }
  }
}
const articlesContext = {};
vm.runInNewContext(fs.readFileSync('src/lib/reading/articles/data/ごん狐.js', 'utf8').replace('export default ', 'globalThis.result = '), articlesContext);
assert.equal(articlesContext.result.length, 6);
assert.ok(articlesContext.result[0].sentences.some(s => s.jp.includes('二[に]、三日[さんにち]')));
for (const article of articlesContext.result) assert.ok(article.quiz.length && article.quiz[0].explanation);

const gon = journeys.find(j => j.id === 'gon');
const kumo = journeys.find(j => j.id === 'kumo');
assert.equal(gon.stages.length, 14);
assert.equal(kumo.stages.length, 10);
assert.equal(JSON.stringify(gon.stages.flatMap(s => s.lines)), JSON.stringify(articlesContext.result.flatMap(a => a.sentences)), 'Gon must retain every sentence in order');
assert.deepEqual(kumo.stages.flatMap(s => s.lines.map(l => l.jp)), JSON.parse(fs.readFileSync('src/lib/reading/articles/data/kumo-text.json', 'utf8')), 'Kumo must retain every paragraph in order');
function sourceText(file) {
  return fs.readFileSync(file, 'utf8').split('<div class="main_text">')[1].split('<div class="bibliographical_information">')[0]
    .replace(/<div[^>]*>[\s\S]*?<\/div>/g, '')
    .replace(/<img[^>]*class="gaiji"[^>]*\/>/g, '犍')
    .replace(/<r[tp]>[\s\S]*?<\/r[tp]>/g, '')
    .replace(/<[^>]*>|\s/g, '');
}
for (const story of [gon, kumo]) {
  const plain = story.stages.flatMap(s => s.lines.map(l => l.jp)).join('').replace(/\[[^\]]*\]|\s/g, '');
  assert.equal(plain, sourceText(`resources/${story.id}-source.html`), `${story.title}: the full body must match the archived Aozora source`);
}
for (const story of [gon, kumo]) {
  assert.ok(story.sequential && story.source.url.startsWith('https://www.aozora.gr.jp/'));
  assert.deepEqual(journeyStatus(story), { completed: 0, nextIndex: 0, finished: false });
  const completed = [];
  for (let index = 0; index < story.stages.length; index++) {
    assert.equal(journeyStatus(story, { completed }).nextIndex, index);
    const stage = story.stages[index];
    assert.ok(stage.goal && stage.tips.length >= 2 && stage.questions.length >= 2);
    for (const line of stage.lines) assert.ok(line.jp && line.zh);
    completed.push(stage.id);
  }
  assert.deepEqual(journeyStatus(story, { completed }), { completed: story.stages.length, nextIndex: -1, finished: true });
  assert.equal(journeyStatus(story, { completed: [completed[1], 'deleted-stage'] }).nextIndex, 0, 'A later completion must not skip unread content');
}
assert.throws(() => buildStory({ id: 'incomplete', chapters: [{ sentences: [{ jp: 'a' }, { jp: 'b' }] }], lessons: [{ id: 'one', chapter: 0, end: 1 }] }), /Incomplete story/);
assert.throws(() => buildStory({ id: 'overshoot', chapters: [{ sentences: [{ jp: 'a' }] }], lessons: [{ id: 'one', chapter: 0, end: 2 }] }), /Invalid story range/);

const memory = new Map();
globalThis.window = { localStorage: {
  getItem: key => memory.get(key) ?? null,
  setItem: (key, value) => memory.set(key, value),
} };
const storageSource = fs.readFileSync('src/lib/storage.js', 'utf8').replace("import { useMemo, useSyncExternalStore } from 'react';", '');
const storage = await load(storageSource);
storage.saveJourneyProgress('konbini', { stage: 1, step: 'challenge', answers: { 0: 1 }, orders: [[1, 0, 2]], completed: ['find'] });
storage.saveJourneyProgress('konbini', { revealed: true });
storage.saveJourneyProgress('rain-letter', { stage: 2 });
const saved = JSON.parse(memory.get('nj_journeys'));
assert.equal(saved.konbini.stage, 1);
assert.equal(saved.konbini.step, 'challenge');
assert.deepEqual(saved.konbini.answers, { 0: 1 });
assert.deepEqual(saved.konbini.orders, [[1, 0, 2]]);
assert.deepEqual(saved.konbini.completed, ['find']);
assert.equal(saved['rain-letter'].stage, 2);
storage.recordQuestionAttempt('q1', false);
assert.equal(JSON.parse(memory.get('nj_question_attempts')).q1.needsPractice, true);
storage.recordQuestionAttempt('q1', true);
const attempt = JSON.parse(memory.get('nj_question_attempts')).q1;
assert.equal(attempt.needsPractice, false);
assert.equal(attempt.mistakes, 1);
assert.equal(attempt.attempts, 2);
assert.ok(!memory.has('nj_grammar_read'), 'Answering must not mark a grammar lesson read');
delete globalThis.window;
console.log('PASS: shuffled answers/explanations, content/links, 24 novel lessons, complete source coverage, sequential progress, invalid ranges, persisted resume state, independent journeys and retry history.');
