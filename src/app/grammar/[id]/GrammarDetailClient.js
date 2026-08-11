'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { hasQuizFor, pickBankItem } from '@/lib/practice/bank';
import { getLesson, getAdjacentLessons } from '@/lib/grammar/lessons';
import { getPracticeSetForGrammar } from '@/lib/grammar/practice';
import { parseFurigana, readingOf } from '@/lib/reading/furigana';
import {
  setGrammarRead,
  useGrammarReadSet,
  usePracticeArticleDoneSet,
  usePracticeClozeDoneSet,
  useSpeechRate,
} from '@/lib/storage';

export default function GrammarDetailClient({ id }) {
  const lesson = getLesson(id);
  const readSet = useGrammarReadSet();
  const articleDoneSet = usePracticeArticleDoneSet();
  const clozeDoneSet = usePracticeClozeDoneSet();
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
          <QuizTab lessonId={lesson.id} />
        </>
      )}

      <LearningPath lesson={lesson} read={read} articleDoneSet={articleDoneSet} clozeDoneSet={clozeDoneSet} />

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

// Shows where this lesson sits inside its practice set (if any) and links
// straight to whichever mode (文章問答／克漏字) isn't done yet, so finishing
// a lesson's quiz always has one obvious next step instead of leaving the
// user to find the covering practice set on their own.
function LearningPath({ lesson, read, articleDoneSet, clozeDoneSet }) {
  const set = getPracticeSetForGrammar(lesson.id);
  if (!set) return null;

  const quizDone = hasQuizFor(lesson.id) ? read : true;
  const articleDone = articleDoneSet.has(set.id);
  const clozeDone = clozeDoneSet.has(set.id);
  const position = set.grammarIds.indexOf(lesson.id) + 1;
  const doneCount = (articleDone ? 1 : 0) + (clozeDone ? 1 : 0);

  const steps = [
    { label: '讀規則', done: true },
    { label: '小測驗', done: quizDone },
    { label: '文章問答', done: articleDone },
    { label: '克漏字', done: clozeDone },
  ];
  const currentIndex = steps.findIndex(s => !s.done);

  const nextMode = !articleDone ? 'article' : 'cloze';
  const nextModeLabel = !articleDone ? '文章問答' : '克漏字';
  const allDone = articleDone && clozeDone;

  return (
    <div className="grammar-path">
      <div className="grammar-path-label">學習路徑 · {set.titleZh || set.title}</div>
      <div className="grammar-path-steps">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className={`grammar-path-step${step.done ? ' done' : ''}${i === currentIndex ? ' current' : ''}`}
          >
            {step.label}
          </div>
        ))}
      </div>
      <div className="grammar-path-cta">
        <div>
          <div className="grammar-path-set-name">{set.titleZh || set.title}（{set.grammarIds.length} 點）</div>
          <div className="grammar-path-set-sub">
            {lesson.title} 是這組的第 {position} 點・已完成 {doneCount}/2 練習
          </div>
        </div>
        <Link href={`/grammar/practice/${set.id}/${nextMode}`} className="btn grammar-path-btn">
          {allDone ? '重新練習' : `開始${nextModeLabel}`} →
        </Link>
      </div>
    </div>
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
  const [item] = useState(() => pickBankItem({ pointId: lessonId, requireJp: false }));
  const [answers, setAnswers] = useState({});

  if (!item?.meaning) return null;
  const quiz = [item.meaning];

  function choose(qIndex, optIndex) {
    if (answers[qIndex] !== undefined) return;
    const next = { ...answers, [qIndex]: optIndex };
    setAnswers(next);
    if (Object.keys(next).length === quiz.length) setGrammarRead(lessonId, true);
  }

  return (
    <div className="quiz-list">
      {quiz.map((q, qi) => {
        const chosen = answers[qi];
        const answered = chosen !== undefined;

        return (
          <div className="quiz-item" key={qi}>
            <p className="quiz-question">{q.prompt}</p>
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

const QuizTab = dynamic(() => Promise.resolve(QuizTabInner), {
  ssr: false,
  loading: () => <p className="empty-hint">載入題目中…</p>,
});
