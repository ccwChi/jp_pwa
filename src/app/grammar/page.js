'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getCategories, getLevels } from '@/lib/grammar/lessons';
import { useGrammarReadSet } from '@/lib/storage';

export default function GrammarPage() {
  const levels = getLevels();
  const [activeLevel, setActiveLevel] = useState(levels[0] || '全部');
  const readSet = useGrammarReadSet();
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
      </div>

      <h1 className="page-title">文法學習</h1>
      <p className="row-meta">已學習 {readCount} / {total}</p>

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
              return (
                <Link href={`/grammar/${lesson.id}`} key={lesson.id} className="row note-row">
                  <div>
                    <div className={`name grammar-row-pattern${read ? ' read' : ''}`}>{lesson.title}</div>
                    <div className="desc">{lesson.meaning}</div>
                  </div>
                  {read && <span className="grammar-row-check">✓ 已學習</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
