'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getBankItems, TYPES } from '@/lib/practice/bank';
import { labelForType } from '@/lib/practice/bank/typeLabels';
import { parseFurigana } from '@/lib/reading/furigana';
import { isLevelUnlocked } from '@/lib/entitlements';
import {
  setPracticeGeneralLevel,
  usePracticeGeneralLevel,
  setPracticeGeneralTypes,
  usePracticeGeneralTypes,
} from '@/lib/storage';

const SESSION_SIZE = 10;
const allLevels = [...new Set(getBankItems().map(i => i.level))].sort();

function renderRuby(text, keyPrefix) {
  return parseFurigana(text).map((p, i) =>
    p.reading ? (
      <ruby key={`${keyPrefix}-${i}`}>{p.text}<rt>{p.reading}</rt></ruby>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{p.text}</span>
    )
  );
}

function drawSession(level, types) {
  const pool = getBankItems({ level, types: types.length > 0 ? types : undefined })
    .filter(item => item.meaning);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, SESSION_SIZE);
}

function QuizSession({ level, types, onExit }) {
  const [slots, setSlots] = useState(() => drawSession(level, types));
  const [answers, setAnswers] = useState({});

  const total = slots.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;
  const correctCount = slots.filter((item, i) => answers[i] === item.meaning.answerIndex).length;

  function choose(index, optionIndex) {
    if (answers[index] !== undefined) return;
    setAnswers(prev => ({ ...prev, [index]: optionIndex }));
  }

  function redraw() {
    setSlots(drawSession(level, types));
    setAnswers({});
  }

  if (total === 0) {
    return <p className="empty-hint">這個程度／題型組合目前沒有可用的題目，換個選項試試。</p>;
  }

  return (
    <>
      <div className="practice-progress">
        <span className="practice-progress-count">第 {Math.min(answeredCount + 1, total)} ／ 共 {total} 題</span>
        <div className="series-progress-track">
          <div className="series-progress-fill" style={{ width: `${(answeredCount / total) * 100}%` }} />
        </div>
      </div>

      <div className="quiz-list">
        {slots.map((item, i) => {
          const chosen = answers[i];
          const answered = chosen !== undefined;
          return (
            <div className="quiz-item" key={`${item.id}-${i}`}>
              {item.jp && (
                <>
                  <p className="practice-sentence-jp">{renderRuby(item.jp, `${i}-jp`)}</p>
                  {item.zh && <p className="grammar-example-zh">{item.zh}</p>}
                </>
              )}
              <p className="quiz-question">{item.meaning.prompt}</p>
              <div className={`quiz-options${item.meaning.options.every(o => o.length <= 6) ? ' short' : ''}`}>
                {item.meaning.options.map((opt, oi) => {
                  let state = '';
                  if (answered) {
                    if (oi === item.meaning.answerIndex) state = 'correct';
                    else if (oi === chosen) state = 'wrong';
                  }
                  return (
                    <button
                      key={oi}
                      className={`quiz-option${state ? ` ${state}` : ''}`}
                      onClick={() => choose(i, oi)}
                      disabled={answered}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {allAnswered && (
        <div className="practice-complete">
          <p className="practice-complete-score">完成！答對 {correctCount} / {total} 題。</p>
          <div className="practice-complete-actions">
            <button type="button" className="btn" onClick={redraw}>換一組 →</button>
            <button type="button" className="btn" onClick={onExit}>← 重新選擇程度／題型</button>
          </div>
        </div>
      )}
    </>
  );
}

export default function PracticeGeneralPage() {
  const storedLevel = usePracticeGeneralLevel();
  const defaultLevel = allLevels.includes('N5') ? 'N5' : (allLevels[0] || 'N5');
  const activeLevel = storedLevel && allLevels.includes(storedLevel) && isLevelUnlocked(storedLevel)
    ? storedLevel
    : defaultLevel;
  const selectedTypes = usePracticeGeneralTypes();
  const [started, setStarted] = useState(false);

  const availableTypes = TYPES.filter(type =>
    getBankItems({ level: activeLevel, type }).some(item => item.meaning)
  );

  function toggleType(type) {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setPracticeGeneralTypes(next);
  }

  function changeLevel(level) {
    setPracticeGeneralLevel(level);
    setStarted(false);
  }

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/practice" className="back-link">← 分級測驗</Link>
      </div>

      <h1 className="page-title">一般練習</h1>
      <p className="row-meta">選程度與題型（可複選，不選代表不限題型），隨機抽 {SESSION_SIZE} 題練習。</p>

      {!started && (
        <>
          <div className="tag-filter">
            {allLevels.map(level => {
              const unlocked = isLevelUnlocked(level);
              return (
                <button
                  key={level}
                  className={`chip${activeLevel === level ? ' active' : ''}${unlocked ? '' : ' locked'}`}
                  onClick={() => unlocked && changeLevel(level)}
                  disabled={!unlocked}
                >
                  {level}{!unlocked && ' 🔒'}
                </button>
              );
            })}
          </div>

          <div className="tag-filter">
            {availableTypes.map(type => (
              <button
                key={type}
                className={`chip${selectedTypes.includes(type) ? ' active' : ''}`}
                onClick={() => toggleType(type)}
              >
                {labelForType(type)}
              </button>
            ))}
            {availableTypes.length === 0 && <p className="empty-hint">這個等級目前還沒有可用的題目。</p>}
          </div>

          {availableTypes.length > 0 && (
            <button type="button" className="btn btn-submit" onClick={() => setStarted(true)}>
              開始練習
            </button>
          )}
        </>
      )}

      {started && (
        <QuizSession level={activeLevel} types={selectedTypes} onExit={() => setStarted(false)} />
      )}
    </main>
  );
}
