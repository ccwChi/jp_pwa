'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { pickBankItem } from '@/lib/grammar/bank';
import { getPracticeSet } from '@/lib/grammar/practice';
import { splitOnTarget } from '@/lib/grammar/practice/sentenceParts';
import { parseFurigana } from '@/lib/reading/furigana';
import { setPracticeSetDone } from '@/lib/storage';
import PracticeResultPanel from '../../PracticeResultPanel';

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

  // See ArticlePracticeClient for why drawing here (client-only mount) is
  // hydration-safe.
  const [slots] = useState(() =>
    set
      ? set.grammarIds
          .map(grammarId => ({ grammarId, item: pickBankItem(grammarId, { requireJp: true, requireCloze: true }) }))
          .filter(slot => slot.item)
      : []
  );

  const total = slots.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;

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

      <div className="practice-article">
        {slots.map(({ item: s }, i) => {
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

      {allAnswered && <PracticeResultPanel set={set} slots={slots} answers={answers} mode="cloze" />}
    </main>
  );
}
