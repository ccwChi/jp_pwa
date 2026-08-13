'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { pickBankItem } from '@/lib/practice/bank';
import { renderAnnotatedText, NotePanel } from '@/lib/practice/bank/notes';
import { getPracticeSet } from '@/lib/grammar/practice';
import { splitOnTarget } from '@/lib/grammar/practice/sentenceParts';
import { readingOf } from '@/lib/reading/furigana';
import { setPracticeSetDone, useSpeechRate } from '@/lib/storage';
import PracticeResultPanel from '../../PracticeResultPanel';

export default function ArticlePracticeClient({ id }) {
  const set = getPracticeSet(id);
  const speechRate = useSpeechRate();
  const [answers, setAnswers] = useState({});
  const [activeNote, setActiveNote] = useState(null);

  // Drawn once per mount from the grammar question bank — this component is
  // only ever rendered client-side (see page.js's ssr:false dynamic import),
  // so picking a fresh random question per visit never causes a
  // server/client hydration mismatch. Slots without a usable bank item
  // (shouldn't happen given every practice-set sentence seeds its own
  // grammarId's pool, but defensive) are simply skipped.
  const [slots] = useState(() =>
    set
      ? set.grammarIds
          .map(grammarId => ({ grammarId, item: pickBankItem({ pointId: grammarId, requireJp: true }) }))
          .filter(slot => slot.item)
      : []
  );

  const total = slots.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;

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

      {total > 0 && (
        <div className="practice-progress">
          <span className="practice-progress-count">第 {Math.min(answeredCount + 1, total)} ／ 共 {total} 題</span>
          <div className="series-progress-track">
            <div className="series-progress-fill" style={{ width: `${(answeredCount / total) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="practice-article">
        {slots.map(({ item: s }, i) => {
          const { before, target, after } = splitOnTarget(s.jp, s.target);
          const chosen = answers[i];
          const answered = chosen !== undefined;

          return (
            <div className="practice-sentence-block" key={i}>
              <div className="grammar-example-row">
                <p className="practice-sentence-jp">
                  {renderAnnotatedText(before, s.notes, `${i}-b`, { onClick: setActiveNote })}
                  <mark className="practice-target">
                    {renderAnnotatedText(target, s.notes, `${i}-t`, { onClick: setActiveNote })}
                  </mark>
                  {renderAnnotatedText(after, s.notes, `${i}-a`, { onClick: setActiveNote })}
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
              <div className={`quiz-options${s.meaning.options.every(o => o.length <= 6) ? ' short' : ''}`}>
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

      {allAnswered && <PracticeResultPanel set={set} slots={slots} answers={answers} mode="article" />}

      {activeNote && <NotePanel note={activeNote} onClose={() => setActiveNote(null)} rate={speechRate} />}
    </main>
  );
}
