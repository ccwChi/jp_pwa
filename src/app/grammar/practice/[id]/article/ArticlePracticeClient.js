'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPracticeSet } from '@/lib/grammar/practice';
import { splitOnTarget } from '@/lib/grammar/practice/sentenceParts';
import { parseFurigana, readingOf } from '@/lib/reading/furigana';
import { setPracticeSetDone, useSpeechRate } from '@/lib/storage';

function renderRuby(text, keyPrefix) {
  return parseFurigana(text).map((p, i) =>
    p.reading ? (
      <ruby key={`${keyPrefix}-${i}`}>{p.text}<rt>{p.reading}</rt></ruby>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{p.text}</span>
    )
  );
}

export default function ArticlePracticeClient({ id }) {
  const set = getPracticeSet(id);
  const speechRate = useSpeechRate();
  const [answers, setAnswers] = useState({});

  const total = set?.sentences.length || 0;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;
  const correctCount = Object.entries(answers).filter(
    ([i, choice]) => set.sentences[i].meaning.answerIndex === choice
  ).length;

  useEffect(() => {
    if (set && allAnswered) setPracticeSetDone('article', set.id, true);
  }, [allAnswered, set]);

  if (!set) {
    return (
      <main className="container">
        <div className="page-head">
          <Link href="/grammar/practice" className="back-link">← 文法學習題</Link>
        </div>
        <p className="empty-hint">找不到這組練習。</p>
      </main>
    );
  }

  function choose(index, optionIndex) {
    if (answers[index] !== undefined) return;
    setAnswers(prev => ({ ...prev, [index]: optionIndex }));
  }

  function speak(jp) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(readingOf(jp));
    utterance.lang = 'ja-JP';
    utterance.rate = speechRate || 1;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/grammar/practice" className="back-link">← 文法學習題</Link>
      </div>

      <h1 className="page-title">{set.titleZh || set.title}</h1>
      {set.titleZh && <p className="practice-title-jp">{set.title}</p>}
      <p className="row-meta">文章問答：讀完每句話，選出標記文字在句中的意思或用法。</p>
      {set.intro && <p className="row-meta practice-intro">{set.intro}</p>}

      {allAnswered && (
        <div className="practice-result-banner">
          完成！答對 {correctCount} / {total} 題。
        </div>
      )}

      <div className="practice-article">
        {set.sentences.map((s, i) => {
          const { before, target, after } = splitOnTarget(s.jp, s.target);
          const chosen = answers[i];
          const answered = chosen !== undefined;

          return (
            <div className="practice-sentence-block" key={i}>
              <div className="grammar-example-row">
                <p className="practice-sentence-jp">
                  {renderRuby(before, `${i}-b`)}
                  <mark className="practice-target">{renderRuby(target, `${i}-t`)}</mark>
                  {renderRuby(after, `${i}-a`)}
                </p>
                <button
                  type="button"
                  className="vocab-panel-play"
                  onClick={() => speak(s.jp)}
                  aria-label="播放例句發音"
                >
                  ▶
                </button>
              </div>
              <p className="grammar-example-zh">{s.zh}</p>

              <p className="practice-question">{s.meaning.prompt}</p>
              <div className="quiz-options">
                {s.meaning.options.map((opt, oi) => {
                  let state = '';
                  if (answered) {
                    if (oi === s.meaning.answerIndex) state = 'correct';
                    else if (oi === chosen) state = 'wrong';
                  }
                  return (
                    <button
                      key={oi}
                      className={`quiz-option${state ? ` ${state}` : ''}`}
                      onClick={() => choose(i, oi)}
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
    </main>
  );
}
