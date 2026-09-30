'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { hasQuizFor, pickBankItem } from '@/lib/practice/bank';
import PracticeQuestion from '../../practice/PracticeQuestion';
import { prepareQuestion } from '@/lib/practice/session';
import { getLesson, getAdjacentLessons } from '@/lib/grammar/lessons';
import { parseFurigana, readingOf } from '@/lib/reading/furigana';
import { setGrammarRead, useGrammarReadSet, useSpeechRate } from '@/lib/storage';

export default function GrammarDetailClient({ id }) {
  const lesson = getLesson(id);
  const readSet = useGrammarReadSet();
  const speechRate = useSpeechRate();

  if (!lesson) {
    return (
      <main className="container">
        <div className="page-head">
          <Link href="/grammar/lessons" className="back-link">← 文法列表</Link>
        </div>
        <p className="empty-hint">找不到這個文法點。</p>
      </main>
    );
  }

  const read = readSet.has(lesson.id);
  const { prev, next } = getAdjacentLessons(lesson);

  return (
    <main className="container grammar-detail-page">
      <div className="page-head">
        <Link href="/grammar/lessons" className="back-link">← 文法列表</Link>
        <label className="read-toggle">
          <input
            type="checkbox"
            checked={read}
            onChange={e => setGrammarRead(lesson.id, e.target.checked)}
          />
          標記已看過
        </label>
      </div>

      <div className="article-title-row">
        <span className="desc">{lesson.category}</span>
        <span className="tag" data-level={lesson.level}>{lesson.level}</span>
      </div>

      <div className="grammar-hero">
        <h1 className="grammar-hero-pattern">{lesson.title}</h1>
        <p className="grammar-hero-meaning">「{lesson.meaning}」</p>
      </div>

      <div className="grammar-structure-box">
        <span className="grammar-structure-label">句型結構</span>
        {renderStructure(lesson.structure)}
      </div>

      <p className="grammar-explanation-body">{renderTerms(lesson.explanation)}</p>

      {lesson.notes && (
        <div className="grammar-note-box">
          <span className="grammar-note-icon" aria-hidden="true">💡</span>
          <p className="grammar-note-text">{renderTerms(lesson.notes)}</p>
        </div>
      )}

      {lesson.examples?.length > 0 && (
        <>
          <div className="grammar-section-label">例句</div>
          <div className="grammar-examples">
            {lesson.examples.map((ex, i) => (
              <ExampleRow key={i} index={i + 1} ex={ex} rate={speechRate} />
            ))}
          </div>
        </>
      )}

      {hasQuizFor(lesson.id) && (
        <>
          <div className="grammar-section-label">練習</div>
          <QuizTab key={lesson.id} lessonId={lesson.id} />
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

function ExampleRow({ ex, rate, index }) {
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
      <span className="grammar-example-num" aria-hidden="true">{index}</span>
      <div className="grammar-example-body">
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
    </div>
  );
}

// Wraps 「…」-quoted terms (the convention this dataset already uses to call
// out the grammar point being discussed) in a highlighted span, so the eye
// can scan straight to the terms without changing any of the underlying text.
function renderTerms(text) {
  if (!text) return text;
  const parts = text.split(/(「[^」]*」)/g);
  return parts.map((part, i) =>
    part.startsWith('「') && part.endsWith('」') ? (
      <span key={i} className="grammar-term">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// Highlights the "+" / "｜" delimiters in a structure formula so the pattern
// reads as a sequence of parts at a glance.
function renderStructure(text) {
  if (!text) return text;
  const parts = text.split(/([+｜])/g);
  return parts.map((part, i) => {
    if (part === '+') return <span key={i} className="grammar-plus">+</span>;
    if (part === '｜') return <span key={i} className="grammar-pipe">｜</span>;
    return <span key={i}>{part}</span>;
  });
}

// Draws one question at random from lessonId's question-bank pool (see
// lib/practice/bank) instead of a single fixed quiz item, so revisiting a
// lesson has a chance of showing a different question each time. Wrapped in
// next/dynamic(ssr:false) below because this component is only safe to
// render client-side: the random draw would otherwise get baked into the
// static export's HTML at build time and every visitor would see the same
// "random" pick.
function QuizTabInner({ lessonId }) {
  const [item] = useState(() => prepareQuestion(pickBankItem({ pointId: lessonId, requireJp: false })));
  return item ? <PracticeQuestion item={item} /> : null;
}

const QuizTab = dynamic(() => Promise.resolve(QuizTabInner), {
  ssr: false,
  loading: () => <p className="empty-hint">載入題目中…</p>,
});
