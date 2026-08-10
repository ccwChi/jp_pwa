'use client';

import Link from 'next/link';
import { getLesson } from '@/lib/grammar/lessons';

// Shown once every slot drawn for a practice set has been answered, in both
// 文章問答 (mode="article") and 克漏字 (mode="cloze"). Reviewing which
// grammar points were missed and jumping straight to their lesson page was
// previously a dead end — this closes that loop using the grammarId each
// slot was drawn for (slots come from the question bank, see
// ArticlePracticeClient/ClozePracticeClient).
export default function PracticeResultPanel({ set, slots, answers, mode }) {
  const total = slots.length;
  const otherMode = mode === 'cloze' ? 'article' : 'cloze';
  const otherModeLabel = mode === 'cloze' ? '文章問答' : '克漏字';

  const results = slots.map(({ grammarId, item }, i) => {
    const answerIndex = mode === 'cloze' ? item.cloze.answerIndex : item.meaning.answerIndex;
    return { grammarId, correct: answers[i] === answerIndex };
  });
  const correctCount = results.filter(r => r.correct).length;

  return (
    <div className="practice-complete">
      <p className="practice-complete-score">完成！答對 {correctCount} / {total} 題。</p>

      <div className="practice-complete-review-label">回顧本組文法（點擊回到該文法點）</div>
      <div className="practice-complete-chips">
        {results.map(r => {
          const lesson = getLesson(r.grammarId);
          return (
            <Link
              key={r.grammarId}
              href={`/grammar/${r.grammarId}`}
              className={`practice-complete-chip${r.correct ? ' correct' : ' wrong'}`}
            >
              {lesson?.title || r.grammarId}
            </Link>
          );
        })}
      </div>

      <div className="practice-complete-actions">
        <Link href="/grammar/practice" className="btn">← 返回文法學習題</Link>
        <Link href={`/grammar/practice/${set.id}/${otherMode}`} className="btn">
          換{otherModeLabel}練習 →
        </Link>
      </div>
    </div>
  );
}
