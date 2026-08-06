'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getArticles, getLevels } from '@/lib/articles';

export default function ReadingPage() {
  const articles = getArticles();
  const levels = getLevels();
  const [activeLevel, setActiveLevel] = useState('全部');

  const visible = activeLevel === '全部'
    ? articles
    : articles.filter(a => a.level === activeLevel);

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
      </div>

      <h1 className="page-title">文章閱讀</h1>

      <div className="tag-filter">
        {['全部', ...levels].map(level => (
          <button
            key={level}
            className={`chip${activeLevel === level ? ' active' : ''}`}
            onClick={() => setActiveLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="rows">
        {visible.map(article => (
          <Link href={`/reading/${article.id}`} key={article.id} className="row note-row">
            <div>
              <div className="name">{article.title}</div>
              <div className="desc">{article.excerpt}</div>
            </div>
            <span className="tag">{article.level}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
