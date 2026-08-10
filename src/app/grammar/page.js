'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getCategories, getLevels } from '@/lib/grammar/lessons';
import { getGrammarPracticeStatus } from '@/lib/grammar/practice';
import { useGrammarReadSet, usePracticeArticleDoneSet, usePracticeClozeDoneSet } from '@/lib/storage';

export default function GrammarPage() {
  const levels = getLevels();
  const [activeLevel, setActiveLevel] = useState(levels[0] || '全部');
  const readSet = useGrammarReadSet();
  const articleDoneSet = usePracticeArticleDoneSet();
  const clozeDoneSet = usePracticeClozeDoneSet();
  const categories = getCategories(activeLevel);
  const total = categories.reduce((sum, c) => sum + c.items.length, 0);
  const readCount = categories.reduce(
    (sum, c) => sum + c.items.filter(l => readSet.has(l.id)).length,
    0
  );

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
        <Link href="/grammar/practice" className="btn">文法學習題 →</Link>
      </div>

      <h1 className="page-title">文法學習</h1>
      <p className="row-meta">已學習 {readCount} / {total}</p>
      <p className="row-meta grammar-legend">文 = 文章問答　填 = 克漏字　讀 = 詳解＋練習題</p>

      <div className="tag-filter">
        {levels.map(level => (
          <button
            key={level}
            className={`chip${activeLevel === level ? ' active' : ''}`}
            onClick={() => setActiveLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {categories.map(({ category, items }) => (
        <div className="grammar-category" key={category}>
          <div className="grammar-category-heading">{category}</div>
          <div className="rows">
            {items.map(lesson => {
              const read = readSet.has(lesson.id);
              const status = getGrammarPracticeStatus(lesson.id, articleDoneSet, clozeDoneSet);
              return (
                <Link href={`/grammar/${lesson.id}`} key={lesson.id} className="row note-row">
                  <div>
                    <div className={`name grammar-row-pattern${read ? ' read' : ''}`}>{lesson.title}</div>
                    <div className="desc">{lesson.meaning}</div>
                  </div>
                  <div className="grammar-check-badges">
                    <span className={`grammar-check-badge${status.article ? ' done' : ''}`} title="文章問答">文</span>
                    <span className={`grammar-check-badge${status.cloze ? ' done' : ''}`} title="克漏字">填</span>
                    <span className={`grammar-check-badge${read ? ' done' : ''}`} title="詳解＋練習題">讀</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
