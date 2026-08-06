'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getArticle, getAdjacentParts } from '@/lib/articles';
import Sentence from '../Sentence';

const TABS = ['文章', '閱讀測驗', '重點單字', '文法'];

export default function ArticleDetailPage() {
  const { id } = useParams();
  const article = getArticle(id);
  const [tab, setTab] = useState('文章');
  const [showRomaji, setShowRomaji] = useState(false);

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

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/reading" className="back-link">← 文章列表</Link>
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
          <label className="romaji-toggle">
            <input
              type="checkbox"
              checked={showRomaji}
              onChange={e => setShowRomaji(e.target.checked)}
            />
            羅馬拼音
          </label>

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
