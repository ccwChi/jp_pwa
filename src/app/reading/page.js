'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSeriesList, getLevels, getArticle, getSeriesParts } from '@/lib/reading/articles';
import {
  setReadingFavorite,
  setReadingLevelTags,
  useProgressMap,
  useReadingFavoriteSet,
  useReadingLevelTags,
} from '@/lib/storage';

const PAGE_SIZE = 10;

export default function ReadingPage() {
  const series = getSeriesList();
  const levels = getLevels();
  const selectedTags = useReadingLevelTags();
  const favoriteSet = useReadingFavoriteSet();
  const progressMap = useProgressMap();
  const [page, setPage] = useState(1);

  const filtered = selectedTags.length === 0
    ? series
    : series.filter(s => selectedTags.includes(s.level));

  const sorted = [...filtered].sort((a, b) => {
    const aFav = favoriteSet.has(a.seriesId) ? 1 : 0;
    const bFav = favoriteSet.has(b.seriesId) ? 1 : 0;
    return bFav - aFav;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const visible = sorted.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  function toggleTag(level) {
    const next = selectedTags.includes(level)
      ? selectedTags.filter(l => l !== level)
      : [...selectedTags, level];
    setReadingLevelTags(next);
    setPage(1);
  }

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
        {process.env.NEXT_PUBLIC_STATIC_EXPORT !== 'true' && (
          <Link href="/reading/import" className="btn">+ 匯入長篇文章</Link>
        )}
      </div>

      <h1 className="page-title">文章閱讀</h1>

      <div className="tag-filter">
        <button
          className={`chip${selectedTags.length === 0 ? ' active' : ''}`}
          onClick={() => { setReadingLevelTags([]); setPage(1); }}
        >
          全部
        </button>
        {levels.map(level => (
          <button
            key={level}
            className={`chip${selectedTags.includes(level) ? ' active' : ''}`}
            data-level={level}
            onClick={() => toggleTag(level)}
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
          const partIndex = resumeArticle
            ? getSeriesParts(s.seriesId).findIndex(p => p.id === resumeArticle.id)
            : -1;
          const isFavorite = favoriteSet.has(s.seriesId);

          return (
            <div className="reading-row" key={s.seriesId}>
              <Link href={href} className="reading-row-main">
                <div>
                  <div className="name">{s.title}</div>
                  <div className="desc">{s.excerpt}</div>
                  {s.partsCount > 1 && (
                    <div className="row-meta">
                      {resumeArticle ? `讀到第${resumeArticle.partTitle}章 · 共${s.partsCount}章` : `共 ${s.partsCount} 章`}
                      {partIndex >= 0 && (
                        <div className="series-progress-track">
                          <div
                            className="series-progress-fill"
                            style={{ width: `${((partIndex + 1) / s.partsCount) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="tag" data-level={s.level}>{s.level}</span>
              </Link>
              <button
                type="button"
                className={`reading-fav-btn${isFavorite ? ' active' : ''}`}
                onClick={() => setReadingFavorite(s.seriesId, !isFavorite)}
                aria-label={isFavorite ? '取消最愛' : '加入最愛'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            </div>
          );
        })}

        {visible.length === 0 && <p className="empty-hint">沒有符合篩選條件的文章。</p>}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination-btn"
            disabled={clampedPage <= 1}
            onClick={() => setPage(clampedPage - 1)}
          >
            ← 上一頁
          </button>
          <span className="pagination-info">{clampedPage} / {totalPages}</span>
          <button
            type="button"
            className="pagination-btn"
            disabled={clampedPage >= totalPages}
            onClick={() => setPage(clampedPage + 1)}
          >
            下一頁 →
          </button>
        </div>
      )}
    </main>
  );
}
