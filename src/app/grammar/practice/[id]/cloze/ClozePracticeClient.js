'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPracticeSet } from '@/lib/grammar/practice';
import { splitOnTarget } from '@/lib/grammar/practice/sentenceParts';
import { parseFurigana } from '@/lib/reading/furigana';
import { setPracticeSetDone } from '@/lib/storage';

function renderRuby(text, keyPrefix) {
  return parseFurigana(text).map((p, i) =>
    p.reading ? (
      <ruby key={`${keyPrefix}-${i}`}>{p.text}<rt>{p.reading}</rt></ruby>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{p.text}</span>
    )
  );
}

export default function ClozePracticeClient({ id }) {
  const set = getPracticeSet(id);
  const [answers, setAnswers] = useState({});

  const total = set?.sentences.length || 0;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;
  const correctCount = Object.entries(answers).filter(
    ([i, choice]) => set.sentences[i].cloze.answerIndex === choice
  ).length;

  useEffect(() => {
    if (set && allAnswered) setPracticeSetDone('cloze', set.id, true);
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

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/grammar/practice" className="back-link">← 文法學習題</Link>
      </div>

      <h1 className="page-title">{set.titleZh || set.title}</h1>
      {set.titleZh && <p className="practice-title-jp">{set.title}</p>}
      <p className="row-meta">克漏字：先讀中文句子，再從選項中選出日文句子空格處該填入的文法。</p>
      {set.intro && <p className="row-meta practice-intro">{set.intro}</p>}

      {allAnswered && (
        <div className="practice-result-banner">
          完成！答對 {correctCount} / {total} 題。
        </div>
      )}

      <div className="practice-article">
        {set.sentences.map((s, i) => {
          const { before, after } = splitOnTarget(s.jp, s.target);
          const chosen = answers[i];
          const answered = chosen !== undefined;
          const chosenOption = answered ? s.cloze.options[chosen] : null;

          return (
            <div className="practice-sentence-block" key={i}>
              <p className="grammar-example-zh practice-cloze-zh">{s.zh}</p>
              <p className="practice-sentence-jp">
                {renderRuby(before, `${i}-b`)}
                {answered ? (
                  <mark className={`practice-target${chosen === s.cloze.answerIndex ? ' correct' : ' wrong'}`}>
                    {renderRuby(chosenOption, `${i}-c`)}
                  </mark>
                ) : (
                  <span className="practice-blank">＿＿＿</span>
                )}
                {renderRuby(after, `${i}-a`)}
              </p>

              <div className="quiz-options">
                {s.cloze.options.map((opt, oi) => {
                  let state = '';
                  if (answered) {
                    if (oi === s.cloze.answerIndex) state = 'correct';
                    else if (oi === chosen) state = 'wrong';
                  }
                  return (
                    <button
                      key={oi}
                      className={`quiz-option${state ? ` ${state}` : ''}`}
                      onClick={() => choose(i, oi)}
                      disabled={answered}
                    >
                      {renderRuby(opt, `${i}-opt-${oi}`)}
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
