import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const load = source => import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const { shuffle, prepareQuestion, isPlayable } = await load(fs.readFileSync('src/lib/practice/session.js', 'utf8'));
const { journeys } = await load(fs.readFileSync('src/lib/journeys.js', 'utf8'));
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
console.log('PASS: shuffled answers/explanations, malformed question rejection, journey content/links, six reading quizzes, persisted resume state, independent journeys and retry history.');
