'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getPastExam, getPastExamStructure } from '@/lib/past-exams';
import { getBankItems, resolveAssetUrl } from '@/lib/practice/bank';
import { setPracticeExamResult } from '@/lib/storage';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function assetSrc(url) {
  return url ? `${basePath}${url}` : null;
}

function ListeningAssets({ item }) {
  const image = resolveAssetUrl(item, 'image');
  const audio = resolveAssetUrl(item, 'audio');
  return (
    <div className="exam-listening-assets">
      {audio.url ? (
        <audio controls src={assetSrc(audio.url)} />
      ) : (
        audio.fallbackText && <p className="exam-listening-script">{audio.fallbackText}</p>
      )}
      {image.url ? (
        <img className="exam-listening-image" src={assetSrc(image.url)} alt="" />
      ) : (
        image.fallbackText && <p className="exam-listening-script">（圖片說明）{image.fallbackText}</p>
      )}
    </div>
  );
}

export default function ExamPracticeClient({ examId }) {
  const exam = getPastExam(examId);
  const structure = getPastExamStructure(examId);

  // Joins the source JSON's original paper order (structure) with the
  // actual answerable question content (bank items, matched by
  // examMeta.questionNumber). Items without a `meaning` — currently a
  // handful of image-only listening questions with no options/answerIndex
  // authored yet — are skipped; they'll appear automatically once that
  // data is filled in. Drawn once per mount since the order is fixed
  // (unlike pickBankItem elsewhere, there's no randomness here).
  const [slots] = useState(() => {
    if (!structure) return [];
    const byQuestionNumber = new Map(
      getBankItems({ examId }).map(item => [item.examMeta?.questionNumber, item])
    );
    return structure
      .map(s => ({ structure: s, item: byQuestionNumber.get(s.id) }))
      .filter(slot => slot.item?.meaning);
  });

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = slots.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;

  if (!exam || !structure) {
    return (
      <main className="container">
        <div className="page-head">
          <Link href="/practice/exam" className="back-link">← 考古題練習</Link>
        </div>
        <p className="empty-hint">找不到這份考古題。</p>
      </main>
    );
  }

  function choose(index, optionIndex) {
    if (answers[index] !== undefined) return;
    setAnswers(prev => ({ ...prev, [index]: optionIndex }));
  }

  function finish() {
    const correctCount = slots.filter((slot, i) => answers[i] === slot.item.meaning.answerIndex).length;
    setPracticeExamResult(examId, { correctCount, total });
    setSubmitted(true);
  }

  const sectionBreakdown = [];
  if (submitted) {
    const bySection = new Map();
    slots.forEach((slot, i) => {
      const key = slot.structure.sectionId;
      const entry = bySection.get(key) || { sectionTitle: slot.structure.sectionTitle, correct: 0, total: 0 };
      entry.total += 1;
      if (answers[i] === slot.item.meaning.answerIndex) entry.correct += 1;
      bySection.set(key, entry);
    });
    sectionBreakdown.push(...bySection.values());
  }
  const totalCorrect = sectionBreakdown.reduce((sum, s) => sum + s.correct, 0);

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/practice/exam" className="back-link">← 考古題練習</Link>
      </div>

      <h1 className="page-title">{exam.year}年{exam.session ? `${Number(exam.session)}月` : ''} {exam.level} 考古題</h1>
      {exam.sourceNote && <p className="row-meta practice-intro">{exam.sourceNote}</p>}

      {total > 0 && (
        <div className="practice-progress">
          <span className="practice-progress-count">第 {Math.min(answeredCount + 1, total)} ／ 共 {total} 題</span>
          <div className="series-progress-track">
            <div className="series-progress-fill" style={{ width: `${(answeredCount / total) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="practice-article">
        {slots.map(({ structure: s, item }, i) => {
          const prevStructure = slots[i - 1]?.structure;
          const showHeader = !prevStructure || prevStructure.sectionId !== s.sectionId || prevStructure.problemId !== s.problemId;
          const chosen = answers[i];
          const answered = chosen !== undefined;
          const isListening = s.type === 'listening-text-only' || s.type === 'listening-with-image-options';

          return (
            <div key={item.id}>
              {showHeader && (
                <div className="exam-section-header">
                  <div className="exam-section-title">{s.sectionTitle}・問題{s.problemId}</div>
                  <div className="row-meta">{s.instruction}</div>
                </div>
              )}
              <div className="practice-sentence-block">
                {isListening && <ListeningAssets item={item} />}
                <p className="practice-question exam-question-prompt">{item.meaning.prompt}</p>
                <div className={`quiz-options${item.meaning.options.every(o => o.length <= 6) ? ' short' : ''}`}>
                  {item.meaning.options.map((opt, oi) => {
                    let state = '';
                    if (answered) {
                      if (oi === item.meaning.answerIndex) state = 'correct';
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
            </div>
          );
        })}

        {total === 0 && <p className="empty-hint">這份考古題目前還沒有可作答的題目。</p>}
      </div>

      {allAnswered && !submitted && (
        <button type="button" className="btn btn-submit" onClick={finish}>交卷看成績</button>
      )}

      {submitted && (
        <div className="practice-complete">
          <p className="practice-complete-score">完成！答對 {totalCorrect} / {total} 題。</p>
          <div className="practice-complete-review-label">各大題小計</div>
          <div className="practice-complete-chips">
            {sectionBreakdown.map(s => (
              <span key={s.sectionTitle} className="practice-complete-chip">
                {s.sectionTitle}　{s.correct} / {s.total}
              </span>
            ))}
          </div>
          <div className="practice-complete-actions">
            <Link href="/practice/exam" className="btn">← 返回考古題練習</Link>
          </div>
        </div>
      )}
    </main>
  );
}
