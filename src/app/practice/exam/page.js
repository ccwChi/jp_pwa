'use client';

import Link from 'next/link';
import { getPastExamsList } from '@/lib/past-exams';
import { isLevelUnlocked } from '@/lib/entitlements';
import {
  setPracticeExamLevel,
  usePracticeExamLevel,
  usePracticeExamResults,
} from '@/lib/storage';

const exams = getPastExamsList();
const levels = [...new Set(exams.map(e => e.level))].sort();

function formatClock(totalSeconds) {
  const sign = totalSeconds < 0 ? '-' : '';
  const abs = Math.abs(totalSeconds);
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  return `${sign}${m}:${String(s).padStart(2, '0')}`;
}

function examLabel(exam) {
  if (!exam.session) return `${exam.year}年`;
  const month = Number(exam.session);
  return `${exam.year}年${month}月`;
}

export default function PracticeExamPage() {
  const storedLevel = usePracticeExamLevel();
  const defaultLevel = levels.includes('N5') ? 'N5' : (levels[0] || 'N5');
  const activeLevel = storedLevel && levels.includes(storedLevel) && isLevelUnlocked(storedLevel)
    ? storedLevel
    : defaultLevel;
  const results = usePracticeExamResults();
  const examsForLevel = exams.filter(e => e.level === activeLevel);

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/practice" className="back-link">← 分級測驗</Link>
      </div>

      <h1 className="page-title">考古題練習</h1>
      <p className="row-meta">選一份考古題，依原始試卷章節順序整份作答。</p>

      <div className="tag-filter">
        {levels.map(level => {
          const unlocked = isLevelUnlocked(level);
          return (
            <button
              key={level}
              className={`chip${activeLevel === level ? ' active' : ''}${unlocked ? '' : ' locked'}`}
              onClick={() => unlocked && setPracticeExamLevel(level)}
              disabled={!unlocked}
            >
              {level}{!unlocked && ' 🔒'}
            </button>
          );
        })}
      </div>

      <div className="practice-set-list">
        {examsForLevel.map(exam => {
          const result = results[exam.examId];
          return (
            <Link href={`/practice/exam/${exam.examId}`} className="practice-set-card" key={exam.examId}>
              <div className="practice-set-title">{examLabel(exam)} {exam.level} 考古題</div>
              <div className="row-meta">共 {exam.questionCount} 題</div>
              {result && (
                <div className="row-meta">
                  上次 {result.correctCount} / {result.total}
                  {typeof result.elapsedSeconds === 'number' && `，耗時 ${formatClock(result.elapsedSeconds)}`}
                </div>
              )}
            </Link>
          );
        })}

        {examsForLevel.length === 0 && <p className="empty-hint">這個等級還沒有考古題，敬請期待。</p>}
      </div>
    </main>
  );
}
