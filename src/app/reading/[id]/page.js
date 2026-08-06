'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getArticle, getAdjacentParts } from '@/lib/articles';
import { setProgress, setRead, useReadSet, useFontScale, setFontScale } from '@/lib/storage';
import Sentence from '../Sentence';

const TABS = ['文章', '閱讀測驗', '重點單字', '文法'];
const FONT_SCALE_MIN = 0.8;
const FONT_SCALE_MAX = 1.6;
const FONT_SCALE_STEP = 0.1;

function clampFontScale(value) {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, Math.round(value * 10) / 10));
}

export default function ArticleDetailPage() {
  const { id } = useParams();
  const article = getArticle(id);
  const [tab, setTab] = useState('文章');
  const [showRomaji, setShowRomaji] = useState(false);
  const readSet = useReadSet();
  const fontScale = useFontScale();

  useEffect(() => {
    if (article?.seriesId) setProgress(article.seriesId, article.id);
  }, [article?.seriesId, article?.id]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
  }, [fontScale]);

  if (!article) {
    return (
      <main className="container">
        <div className="page-head">
          <Link href="/reading" className="back-link">← 文章列表</Link>
        </div>
        <p className="empty-hint">找不到這篇文章。</p>
      </main>
    );
  }

  const readKey = article.seriesId || article.id;
  const read = readSet.has(readKey);

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/reading" className="back-link">← 文章列表</Link>
        <label className="read-toggle">
          <input
            type="checkbox"
            checked={read}
            onChange={e => setRead(readKey, e.target.checked)}
          />
          標記已學習
        </label>
      </div>

      {article.seriesId && <div className="series-title">{article.seriesTitle}</div>}
      <h1 className="page-title">{article.partTitle ? `第${article.partTitle}章` : article.title}</h1>
      <span className="tag">{article.level}</span>

      <div className="article-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`article-tab${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === '文章' && (
        <section>
          <div className="reading-controls">
            <label className="romaji-toggle">
              <input
                type="checkbox"
                checked={showRomaji}
                onChange={e => setShowRomaji(e.target.checked)}
              />
              羅馬拼音
            </label>

            <div className="font-scale-control">
              <button
                type="button"
                className="font-scale-btn"
                onClick={() => setFontScale(clampFontScale(fontScale - FONT_SCALE_STEP))}
                aria-label="縮小字級"
              >
                A−
              </button>
              <button
                type="button"
                className="font-scale-btn"
                onClick={() => setFontScale(clampFontScale(fontScale + FONT_SCALE_STEP))}
                aria-label="放大字級"
              >
                A+
              </button>
            </div>
          </div>

          <div className="sentence-list">
            {article.sentences.map((s, i) => (
              <Sentence key={i} jp={s.jp} zh={s.zh} showRomaji={showRomaji} />
            ))}
          </div>
        </section>
      )}

      {tab === '閱讀測驗' && <QuizTab quiz={article.quiz} />}

      {tab === '重點單字' && (
        <div className="vocab-list">
          {article.vocab.map(v => (
            <div className="vocab-item" key={v.word}>
              <span className="vocab-item-word">{v.word}</span>
              <span className="vocab-item-reading">{v.reading}</span>
              <span className="vocab-item-meaning">{v.meaning}</span>
            </div>
          ))}
        </div>
      )}

      {tab === '文法' && (
        <div className="grammar-list">
          {article.grammar.map(g => (
            <div className="grammar-item" key={g.point}>
              <span className="grammar-point">{g.point}</span>
              <span className="grammar-explanation">{g.explanation}</span>
            </div>
          ))}
        </div>
      )}

      {article.seriesId && <PartNav article={article} />}
    </main>
  );
}

function PartNav({ article }) {
  const { prev, next } = getAdjacentParts(article);
  if (!prev && !next) return null;

  return (
    <div className="part-nav">
      {prev ? (
        <Link href={`/reading/${prev.id}`} className="part-nav-link">← 第{prev.partTitle}章</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/reading/${next.id}`} className="part-nav-link">第{next.partTitle}章 →</Link>
      ) : (
        <span />
      )}
    </div>
  );
}

function QuizTab({ quiz }) {
  const [answers, setAnswers] = useState({});

  function choose(qIndex, optIndex) {
    if (answers[qIndex] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  }

  return (
    <div className="quiz-list">
      {quiz.map((q, qi) => {
        const chosen = answers[qi];
        const answered = chosen !== undefined;

        return (
          <div className="quiz-item" key={qi}>
            <p className="quiz-question">{q.question}</p>
            <div className="quiz-options">
              {q.options.map((opt, oi) => {
                let state = '';
                if (answered) {
                  if (oi === q.answerIndex) state = 'correct';
                  else if (oi === chosen) state = 'wrong';
                }
                return (
                  <button
                    key={oi}
                    className={`quiz-option${state ? ` ${state}` : ''}`}
                    onClick={() => choose(qi, oi)}
                    disabled={answered}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
