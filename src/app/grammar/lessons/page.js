'use client';

import Link from 'next/link';
import { getCategories, getLevels } from '@/lib/grammar/lessons';
import { isLevelUnlocked } from '@/lib/entitlements';
import { setGrammarLevel, useGrammarLevel, useGrammarReadSet } from '@/lib/storage';

export default function GrammarLessonsPage() {
  const levels = getLevels();
  const storedLevel = useGrammarLevel();
  const defaultLevel = levels.includes('N5') ? 'N5' : (levels[0] || '全部');
  const activeLevel = storedLevel && levels.includes(storedLevel) && isLevelUnlocked(storedLevel)
    ? storedLevel
    : defaultLevel;
  const readSet = useGrammarReadSet();
  const categories = getCategories(activeLevel);
  const total = categories.reduce((sum, c) => sum + c.items.length, 0);
  const readCount = categories.reduce(
    (sum, c) => sum + c.items.filter(l => readSet.has(l.id)).length,
    0
  );

  return (
    <main className="container grammar-list-page">
      <div className="page-head">
        <Link href="/grammar" className="back-link">← 文法</Link>
      </div>

      <h1 className="page-title">文法學習</h1>
      <p className="row-meta">已學習 {readCount} / {total}</p>

      <div className="grammar-list-sticky">
        <div className="article-tabs">
          {levels.map(level => {
            const unlocked = isLevelUnlocked(level);
            return (
              <button
                key={level}
                className={`article-tab${activeLevel === level ? ' active' : ''}${unlocked ? '' : ' locked'}`}
                onClick={() => unlocked && setGrammarLevel(level)}
                disabled={!unlocked}
              >
                {level}{!unlocked && ' 🔒'}
              </button>
            );
          })}
        </div>

        {categories.length > 1 && (
          <div className="jump-strip">
            {categories.map(({ category }, i) => (
              <a key={category} className="jump-chip" href={`#grammar-cat-${i}`}>{category}</a>
            ))}
          </div>
        )}
      </div>

      {categories.map(({ category, items }, i) => {
        const catReadCount = items.filter(l => readSet.has(l.id)).length;
        // First not-yet-learned lesson is where "start studying" should land;
        // once the whole category is read, fall back to the first lesson so
        // the button still goes somewhere useful (a quick review entry point).
        const studyTarget = items.find(l => !readSet.has(l.id)) || items[0];
        return (
          <details
            key={category}
            id={`grammar-cat-${i}`}
            className="grammar-category-acc"
          >
            {/* Interactive descendants of <summary> (a[href], button, ...) are
                excluded from the browser's built-in toggle-on-click behavior,
                so this link can sit inside the clickable summary row without
                also collapsing/expanding it. */}
            <summary className="grammar-category-summary">
              <span className="grammar-category-summary-left">
                <span className="grammar-category-chevron" aria-hidden="true">▸</span>
                <span className="grammar-category-heading">{category}</span>
                <span className="grammar-category-count">{items.length} 點・已學 {catReadCount}</span>
              </span>
              <span className="grammar-category-summary-right">
                <span className="grammar-category-bar">
                  <span
                    className="grammar-category-bar-fill"
                    style={{ width: `${items.length ? (catReadCount / items.length) * 100 : 0}%` }}
                  />
                </span>
                {studyTarget && (
                  <Link
                    href={`/grammar/${studyTarget.id}`}
                    className="grammar-category-study-btn"
                    aria-label={`開始學習：${category}`}
                    title="開始學習"
                  >
                    →
                  </Link>
                )}
              </span>
            </summary>

            <div className="rows">
              {items.map(lesson => {
                const read = readSet.has(lesson.id);
                return (
                  <Link href={`/grammar/${lesson.id}`} key={lesson.id} className="row note-row">
                    <div>
                      <div className={`name grammar-row-pattern${read ? ' read' : ''}`}>{lesson.title}</div>
                      <div className="desc">{lesson.meaning}</div>
                    </div>
                    <div className="grammar-check-badges">
                      <span className={`grammar-check-badge${read ? ' done' : ''}`} title="已學習">讀</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </details>
        );
      })}
    </main>
  );
}
