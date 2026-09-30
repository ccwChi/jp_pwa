'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getBankItems, TYPES } from '@/lib/practice/bank';
import { labelForType } from '@/lib/practice/bank/typeLabels';
import { isPlayable, prepareQuestion, shuffle } from '@/lib/practice/session';
import PracticeQuestion from '../PracticeQuestion';
import { isLevelUnlocked } from '@/lib/entitlements';
import {
  useQuestionAttempts,
  setPracticeGeneralLevel,
  usePracticeGeneralLevel,
  setPracticeGeneralTypes,
  usePracticeGeneralTypes,
} from '@/lib/storage';

const SESSION_SIZE = 10;
const allLevels = [...new Set(getBankItems().map(i => i.level))].sort();

function drawSession(level, types, attempts, reviewOnly) {
  const pool = getBankItems({ level, types: types.length > 0 ? types : undefined })
    .filter(isPlayable).filter(item => !reviewOnly || attempts[item.id]?.needsPractice);
  return shuffle(pool).slice(0, SESSION_SIZE).map(item => prepareQuestion(item));
}

function QuizSession({ level, types, onExit, attempts, reviewOnly }) {
  const [slots, setSlots] = useState(() => drawSession(level, types, attempts, reviewOnly));
  const [answers, setAnswers] = useState({});
  const [round, setRound] = useState(0);

  const total = slots.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;
  const correctCount = slots.filter((item, i) => answers[i] === true).length;

  function choose(index, optionIndex) {
    setAnswers(prev => {
      const next = { ...prev };
      if (optionIndex === null) delete next[index];
      else next[index] = optionIndex;
      return next;
    });
  }

  function redraw() {
    setSlots(drawSession(level, types, attempts, reviewOnly));
    setAnswers({});
    setRound(value => value + 1);
  }

  if (total === 0) {
    return <><p className="empty-hint">這個範圍目前沒有可練習的題目。</p><button className="btn" onClick={onExit}>← 重新選擇</button></>;
  }

  return (
    <>
      <div className="practice-progress">
        <span className="practice-progress-count">第 {Math.min(answeredCount + 1, total)} ／ 共 {total} 題</span>
        <div className="series-progress-track">
          <div className="series-progress-fill" style={{ width: `${(answeredCount / total) * 100}%` }} />
        </div>
      </div>

      <div className="quiz-list">{slots.map((item, i) => <PracticeQuestion key={`${round}-${item.id}`} item={item} onAnswer={correct => choose(i, correct)} />)}</div>

      {allAnswered && (
        <div className="practice-complete">
          <p className="practice-complete-score">完成！目前答對 {correctCount} / {total} 題（含重試）。</p>
          <div className="practice-complete-actions">
            <button type="button" className="btn" onClick={redraw}>換一組 →</button>
            <button type="button" className="btn" onClick={onExit}>← 重新選擇程度／題型</button>
          </div>
        </div>
      )}
      {!allAnswered && <button type="button" className="btn" onClick={onExit}>← 回到選題（作答紀錄已保存）</button>}
    </>
  );
}

export default function PracticeGeneralPage() {
  const attempts = useQuestionAttempts();
  const [reviewOnly, setReviewOnly] = useState(false);
  const storedLevel = usePracticeGeneralLevel();
  const defaultLevel = allLevels.includes('N5') ? 'N5' : (allLevels[0] || 'N5');
  const activeLevel = storedLevel && allLevels.includes(storedLevel) && isLevelUnlocked(storedLevel)
    ? storedLevel
    : defaultLevel;
  const selectedTypes = usePracticeGeneralTypes();
  const [started, setStarted] = useState(false);

  const availableTypes = TYPES.filter(type =>
    getBankItems({ level: activeLevel, type }).some(isPlayable)
  );

  function toggleType(type) {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setPracticeGeneralTypes(next);
  }

  function changeLevel(level) {
    setPracticeGeneralTypes([]);
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

      {!started && <label className="read-toggle"><input type="checkbox" checked={reviewOnly} onChange={e => setReviewOnly(e.target.checked)} />再試一次：只練習之前答錯的題目</label>}
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
        <QuizSession attempts={attempts} reviewOnly={reviewOnly} level={activeLevel} types={selectedTypes} onExit={() => setStarted(false)} />
      )}
    </main>
  );
}
