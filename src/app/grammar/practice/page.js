'use client';

import Link from 'next/link';
import { getPracticeSets, getPracticeLevels } from '@/lib/grammar/practice';
import { getLesson } from '@/lib/grammar/lessons';
import {
  setGrammarPracticeLevel,
  useGrammarPracticeLevel,
  useGrammarReadSet,
  usePracticeArticleDoneSet,
  usePracticeClozeDoneSet,
} from '@/lib/storage';

export default function GrammarPracticePage() {
  const levels = getPracticeLevels();
  const storedLevel = useGrammarPracticeLevel();
  const defaultLevel = levels.includes('N5') ? 'N5' : (levels[0] || 'N5');
  const activeLevel = storedLevel && levels.includes(storedLevel) ? storedLevel : defaultLevel;
  const sets = getPracticeSets().filter(set => set.level === activeLevel);
  const readSet = useGrammarReadSet();
  const articleDoneSet = usePracticeArticleDoneSet();
  const clozeDoneSet = usePracticeClozeDoneSet();

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/grammar/lessons" className="back-link">← 文法列表</Link>
        {process.env.NEXT_PUBLIC_STATIC_EXPORT !== 'true' && (
          <Link href="/practice/tag" className="btn">POS 標記工具 →</Link>
        )}
      </div>

      <h1 className="page-title">文法學習題</h1>
      <p className="row-meta">
        每組涵蓋 6～8 個文法點：「文章問答」用一篇日文短文逐句考文法意思，「克漏字」用中文短文＋日文填空考文法選擇。
      </p>

      <div className="tag-filter">
        {levels.map(level => (
          <button
            key={level}
            className={`chip${activeLevel === level ? ' active' : ''}`}
            onClick={() => setGrammarPracticeLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="practice-set-list">
        {sets.map(set => {
          const articleDone = articleDoneSet.has(set.id);
          const clozeDone = clozeDoneSet.has(set.id);
          return (
            <div className="practice-set-card" key={set.id}>
              <div className="practice-set-title">{set.titleZh || set.title}</div>
              {set.titleZh && <div className="practice-set-title-jp">{set.title}</div>}
              <div className="practice-set-tags">
                {set.grammarIds.map(gid => (
                  <span
                    className={`tag practice-set-tag${readSet.has(gid) ? ' done' : ''}`}
                    key={gid}
                  >
                    {getLesson(gid)?.title || gid}
                  </span>
                ))}
              </div>
              <div className="practice-set-actions">
                <Link href={`/grammar/practice/${set.id}/article`} className={`btn practice-mode-btn${articleDone ? ' done' : ''}`}>
                  {articleDone ? '✓ ' : ''}文章問答
                </Link>
                <Link href={`/grammar/practice/${set.id}/cloze`} className={`btn practice-mode-btn${clozeDone ? ' done' : ''}`}>
                  {clozeDone ? '✓ ' : ''}克漏字
                </Link>
              </div>
            </div>
          );
        })}

        {sets.length === 0 && <p className="empty-hint">這個等級還沒有學習題，敬請期待。</p>}
      </div>
    </main>
  );
}
