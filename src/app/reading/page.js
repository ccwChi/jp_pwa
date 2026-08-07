'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSeriesList, getLevels, getArticle } from '@/lib/reading/articles';
import { useProgressMap } from '@/lib/storage';

export default function ReadingPage() {
  const series = getSeriesList();
  const levels = getLevels();
  const [activeLevel, setActiveLevel] = useState('全部');
  const progressMap = useProgressMap();

  const visible = activeLevel === '全部'
    ? series
    : series.filter(s => s.level === activeLevel);

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
        <Link href="/reading/import" className="btn">+ 匯入長篇文章</Link>
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
        {visible.map(s => {
          const progress = progressMap[s.seriesId];
          const resumeArticle = progress && getArticle(progress.partId);
          const href = resumeArticle ? `/reading/${resumeArticle.id}` : `/reading/${s.firstId}`;

          return (
            <Link href={href} key={s.seriesId} className="row note-row">
              <div>
                <div className="name">{s.title}</div>
                <div className="desc">{s.excerpt}</div>
                {s.partsCount > 1 && (
                  <div className="row-meta">
                    {resumeArticle ? `讀到第${resumeArticle.partTitle}章` : `共 ${s.partsCount} 章`}
                  </div>
                )}
              </div>
              <span className="tag">{s.level}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
