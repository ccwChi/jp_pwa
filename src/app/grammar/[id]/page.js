'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getLesson, getAdjacentLessons } from '@/lib/grammar/lessons';
import { parseFurigana, readingOf } from '@/lib/reading/furigana';
import { setGrammarRead, useGrammarReadSet, useSpeechRate, setSpeechRate } from '@/lib/storage';

export default function GrammarDetailPage() {
  const { id: rawId } = useParams();
  const id = decodeURIComponent(rawId);
  const lesson = getLesson(id);
  const readSet = useGrammarReadSet();
  const speechRate = useSpeechRate();

  if (!lesson) {
    return (
      <main className="container">
        <div className="page-head">
          <Link href="/grammar" className="back-link">← 文法列表</Link>
        </div>
        <p className="empty-hint">找不到這個文法點。</p>
      </main>
    );
  }

  const read = readSet.has(lesson.id);
  const { prev, next } = getAdjacentLessons(lesson);

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/grammar" className="back-link">← 文法列表</Link>
        <label className="read-toggle">
          <input
            type="checkbox"
            checked={read}
            onChange={e => setGrammarRead(lesson.id, e.target.checked)}
          />
          標記已學習
        </label>
      </div>

      <div className="article-title-row">
        <span className="desc">{lesson.category}</span>
        <span className="tag">{lesson.level}</span>
      </div>

      <div className="grammar-hero">
        <h1 className="grammar-hero-pattern">{lesson.title}</h1>
        <p className="grammar-hero-meaning">{lesson.meaning}</p>
      </div>

      <div className="grammar-structure-box">
        <span className="grammar-structure-label">句型結構</span>
        {lesson.structure}
      </div>

      <p className="grammar-explanation-body">{lesson.explanation}</p>

      {lesson.notes && <p className="grammar-note">{lesson.notes}</p>}

      {lesson.examples?.length > 0 && (
        <>
          <div className="grammar-section-label">例句</div>
          <div className="grammar-examples">
            {lesson.examples.map((ex, i) => (
              <ExampleRow key={i} ex={ex} rate={speechRate} />
            ))}
          </div>
        </>
      )}

      {lesson.quiz?.length > 0 && (
        <>
          <div className="grammar-section-label">練習</div>
          <QuizTab quiz={lesson.quiz} />
        </>
      )}

      {(prev || next) && (
        <div className="grammar-nav">
          {prev ? (
            <Link href={`/grammar/${prev.id}`} className="grammar-nav-link">← {prev.title}</Link>
          ) : <span />}
          {next ? (
            <Link href={`/grammar/${next.id}`} className="grammar-nav-link">{next.title} →</Link>
          ) : <span />}
        </div>
      )}
    </main>
  );
}

function ExampleRow({ ex, rate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const parts = parseFurigana(ex.jp);

  function speak() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(readingOf(ex.jp));
    utterance.lang = 'ja-JP';
    utterance.rate = rate || 1;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="grammar-example">
      <div className="grammar-example-row">
        <p className="grammar-example-jp">
          {parts.map((p, i) =>
            p.reading ? (
              <ruby key={i}>{p.text}<rt>{p.reading}</rt></ruby>
            ) : (
              <span key={i}>{p.text}</span>
            )
          )}
        </p>
        <button
          type="button"
          className={`vocab-panel-play${isPlaying ? ' playing' : ''}`}
          onClick={speak}
          aria-label="播放例句發音"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>
      <p className="grammar-example-zh">{ex.zh}</p>
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
