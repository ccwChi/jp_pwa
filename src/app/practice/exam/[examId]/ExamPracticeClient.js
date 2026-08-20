'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getPastExam, getPastExamStructure } from '@/lib/past-exams';
import { getBankItems, resolveAssetUrl } from '@/lib/practice/bank';
import { renderAnnotatedText, NotePanel, OptionExplanations } from '@/lib/practice/bank/notes';
import ExplainEditor from './ExplainEditor';
import {
  setPracticeExamResult,
  useSpeechRate,
  usePracticeExamInstantFeedback,
  setPracticeExamInstantFeedback,
} from '@/lib/storage';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Editing bank items on disk needs a real Node server behind
// /api/practice-explain, which `deploy.yml` deletes wholesale before the
// static-export build — so this must stay false on the deployed site, never
// just fail quietly if clicked.
const CAN_EDIT_EXPLANATIONS = process.env.NEXT_PUBLIC_STATIC_EXPORT !== 'true';

function assetSrc(url) {
  return url ? `${basePath}${url}` : null;
}

function formatClock(totalSeconds) {
  const sign = totalSeconds < 0 ? '-' : '';
  const abs = Math.abs(totalSeconds);
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  return `${sign}${m}:${String(s).padStart(2, '0')}`;
}

// Real JLPT listening tracks aren't cut per question — one continuous
// recording covers every problem in the section in original order. Playback
// is intentionally one-shot to mimic exam conditions: no seek/replay
// controls are exposed once started — only the shared exam-wide `paused`
// flag can stop it, mirroring the countdown pausing at the same moment
// (see `paused` in ExamPracticeClient), for genuine bathroom-break use, not
// as a way to re-listen to a missed line.
function ExamListeningPlayer({ audioUrl, paused }) {
  const audioRef = useRef(null);
  const [state, setState] = useState('idle'); // idle | playing | ended

  useEffect(() => {
    if (state !== 'playing') return;
    if (paused) audioRef.current?.pause();
    else audioRef.current?.play();
  }, [paused, state]);

  function start() {
    if (state !== 'idle' || paused) return;
    setState('playing');
    audioRef.current?.play();
  }

  return (
    <div className="exam-listening-player">
      <audio ref={audioRef} src={assetSrc(audioUrl)} onEnded={() => setState('ended')} />
      {state === 'idle' && (
        <button type="button" className="btn exam-listening-start" onClick={start} disabled={paused}>
          🔊 開始播放聽力（僅能播放一次，過程無法拖曳或重播）
        </button>
      )}
      {state === 'playing' && (
        <p className="exam-listening-status">{paused ? '⏸ 已暫停' : '🔊 播放中…請依序作答'}</p>
      )}
      {state === 'ended' && <p className="exam-listening-status ended">✅ 已播放完畢（無法重播）</p>}
    </div>
  );
}

function ExamReviewItem({ structure: s, item, index, chosenIndex, showHeader, onNoteClick, speechRate, onItemUpdated }) {
  const isListening = s.type === 'listening-text-only' || s.type === 'listening-with-image-options';
  const answered = chosenIndex !== undefined;
  const isCorrect = answered && chosenIndex === item.meaning.answerIndex;
  const chosenText = answered ? item.meaning.options[chosenIndex] : '（未作答）';
  const correctText = item.meaning.options[item.meaning.answerIndex];
  const [editing, setEditing] = useState(false);

  function speakScript() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(item.script);
    utterance.lang = 'ja-JP';
    utterance.rate = speechRate || 1;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div>
      {showHeader && (
        <div className="exam-section-header">
          <div className="exam-section-title">{s.sectionTitle}・問題{s.problemId}</div>
          <div className="row-meta">{s.instruction}</div>
        </div>
      )}
      <div className="practice-sentence-block">
        <span className="exam-question-number">第 {index + 1} 題</span>
        <p className="practice-question exam-question-prompt">
          {renderAnnotatedText(item.meaning.prompt, item.notes, item.id, { onClick: onNoteClick })}
        </p>
        {isListening && item.script && (
          <div className="exam-script-block">
            <button type="button" className="btn exam-script-play-btn" onClick={speakScript}>
              🔊 朗讀原文（瀏覽器語音，非原始錄音，僅供檢討參考）
            </button>
            <p className="exam-listening-script">{item.script}</p>
          </div>
        )}
        <p className={`exam-review-answer${isCorrect ? ' correct' : ' wrong'}`}>
          你的答案：{chosenText}{isCorrect ? '（✓ 正確）' : '（✗ 錯誤）'}
        </p>
        {!isCorrect && <p className="exam-review-answer correct">正確答案：{correctText}</p>}
        <OptionExplanations
          options={item.meaning.options}
          explanations={item.optionExplanations}
          answerIndex={item.meaning.answerIndex}
        />
        {CAN_EDIT_EXPLANATIONS && !editing && (
          <button type="button" className="btn exam-edit-explain-btn" onClick={() => setEditing(true)}>
            ✏️ 新增／修改生字與解析
          </button>
        )}
        {CAN_EDIT_EXPLANATIONS && editing && (
          <ExplainEditor
            item={item}
            onClose={() => setEditing(false)}
            onSaved={updated => {
              onItemUpdated(updated);
              setEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function ListeningAssets({ item }) {
  const image = resolveAssetUrl(item, 'image');
  return (
    <div className="exam-listening-assets">
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
  const [slots, setSlots] = useState(() => {
    if (!structure) return [];
    const byQuestionNumber = new Map(
      getBankItems({ examId }).map(item => [item.examMeta?.questionNumber, item])
    );
    return structure
      .map(s => ({ structure: s, item: byQuestionNumber.get(s.id) }))
      .filter(slot => slot.item?.meaning);
  });

  // Reflects a saved edit from ExplainEditor (dev-only) back into this
  // page's own item copies, so the new notes/optionExplanations render
  // immediately without needing a reload.
  function updateSlotItem(updatedItem) {
    setSlots(prev => prev.map(slot => (slot.item.id === updatedItem.id ? { ...slot, item: updatedItem } : slot)));
  }

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const speechRate = useSpeechRate();
  const instantFeedback = usePracticeExamInstantFeedback();

  // A single pause covers both the clock and any in-progress listening
  // playback (see ExamListeningPlayer) — this is self-practice, not a
  // proctored sitting, so a genuine break (bathroom, interruption) shouldn't
  // burn exam time or lose part of the recording.
  const [paused, setPaused] = useState(false);

  // Single stopwatch for the whole paper (real JLPT times each section
  // separately, but this page renders the entire exam as one scroll, so one
  // running clock stands in for all of it). Counts past the allotted time
  // instead of stopping/auto-submitting — the negative "剩餘" becomes an
  // "超時" readout, and whatever the elapsed count is when the user submits
  // is what gets recorded.
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  useEffect(() => {
    if (submitted || paused) return;
    const id = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [submitted, paused]);

  const total = slots.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;
  const totalSeconds = (exam?.sections || []).reduce((sum, s) => sum + (s.minutes || 0) * 60, 0);
  const remainingSeconds = totalSeconds - elapsedSeconds;
  const listeningAudioUrl = exam?.sections?.find(s => s.sectionId === 'listening')?.audioUrl;

  // One chip per section in original paper order, first-question index it
  // jumps to — lets the user skip straight to 聴解 instead of scrolling
  // past every 文字語彙 question to find it.
  const sectionNav = [];
  const seenSections = new Set();
  slots.forEach(({ structure: s }) => {
    if (seenSections.has(s.sectionId)) return;
    seenSections.add(s.sectionId);
    sectionNav.push({ sectionId: s.sectionId, title: s.sectionTitle });
  });

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
    if (paused) return;
    // Instant-feedback mode locks a question the moment it's answered (same
    // as every other quiz in the app); exam mode leaves it changeable up
    // until submission, since there's no colored feedback to lock in place.
    if (instantFeedback && answers[index] !== undefined) return;
    setAnswers(prev => ({ ...prev, [index]: optionIndex }));
  }

  function finish() {
    const correctCount = slots.filter((slot, i) => answers[i] === slot.item.meaning.answerIndex).length;
    setPracticeExamResult(examId, { correctCount, total, elapsedSeconds });
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

      {sectionNav.length > 1 && !submitted && (
        <div className="exam-quick-nav">
          {sectionNav.map(sec => (
            <a key={sec.sectionId} href={`#exam-sec-${sec.sectionId}`} className="chip">{sec.title}</a>
          ))}
        </div>
      )}

      {!submitted && (
        <div className="exam-mode-toggle">
          <span className="row-meta">作答模式：</span>
          <button
            type="button"
            className={`chip${instantFeedback ? ' active' : ''}`}
            onClick={() => setPracticeExamInstantFeedback(true)}
          >
            練習模式（即時看對錯）
          </button>
          <button
            type="button"
            className={`chip${!instantFeedback ? ' active' : ''}`}
            onClick={() => setPracticeExamInstantFeedback(false)}
          >
            考試模式（交卷後才看結果）
          </button>
        </div>
      )}

      {total > 0 && (
        <div className="practice-progress">
          <span className="practice-progress-count">第 {Math.min(answeredCount + 1, total)} ／ 共 {total} 題</span>
          <div className="series-progress-track">
            <div className="series-progress-fill" style={{ width: `${(answeredCount / total) * 100}%` }} />
          </div>
          {!submitted && totalSeconds > 0 && (
            <span className={`exam-timer${remainingSeconds < 0 ? ' overtime' : ''}`}>
              {remainingSeconds >= 0 ? `剩餘 ${formatClock(remainingSeconds)}` : `超時 ${formatClock(remainingSeconds)}`}
            </span>
          )}
          {!submitted && (
            <button type="button" className="btn-pause" onClick={() => setPaused(p => !p)}>
              {paused ? '▶️ 繼續' : '⏸ 暫停'}
            </button>
          )}
        </div>
      )}

      {paused && !submitted && (
        <div className="exam-paused-banner">⏸ 已暫停，計時與聽力播放皆已停止，準備好後按「繼續」再作答。</div>
      )}

      {!(submitted && reviewing) && (
        <div className="practice-article">
        {slots.map(({ structure: s, item }, i) => {
          const prevStructure = slots[i - 1]?.structure;
          const enteringNewSection = !prevStructure || prevStructure.sectionId !== s.sectionId;
          const showHeader = enteringNewSection || prevStructure.problemId !== s.problemId;
          const chosen = answers[i];
          const answered = chosen !== undefined;
          const isListening = s.type === 'listening-text-only' || s.type === 'listening-with-image-options';
          const enteringListeningSection = isListening && (!prevStructure || prevStructure.sectionId !== 'listening');
          const locked = instantFeedback && answered;

          return (
            <div key={item.id}>
              {enteringListeningSection && listeningAudioUrl && (
                <ExamListeningPlayer audioUrl={listeningAudioUrl} paused={paused} />
              )}
              {showHeader && (
                <div className="exam-section-header" id={enteringNewSection ? `exam-sec-${s.sectionId}` : undefined}>
                  <div className="exam-section-title">{s.sectionTitle}・問題{s.problemId}</div>
                  <div className="row-meta">{s.instruction}</div>
                </div>
              )}
              <div className="practice-sentence-block">
                {s.type === 'listening-with-image-options' && <ListeningAssets item={item} />}
                <span className="exam-question-number">第 {i + 1} 題</span>
                <p className="practice-question exam-question-prompt">
                  {renderAnnotatedText(item.meaning.prompt, item.notes, item.id, { onClick: setActiveNote })}
                </p>
                <div className={`quiz-options${item.meaning.options.every(o => o.length <= 6) ? ' short' : ''}`}>
                  {item.meaning.options.map((opt, oi) => {
                    let state = '';
                    if (locked) {
                      if (oi === item.meaning.answerIndex) state = 'correct';
                      else if (oi === chosen) state = 'wrong';
                    } else if (oi === chosen) {
                      state = 'selected';
                    }
                    return (
                      <button
                        key={oi}
                        className={`quiz-option${state ? ` ${state}` : ''}`}
                        onClick={() => choose(i, oi)}
                        disabled={locked || paused}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {locked && (
                  <OptionExplanations
                    options={item.meaning.options}
                    explanations={item.optionExplanations}
                    answerIndex={item.meaning.answerIndex}
                  />
                )}
              </div>
            </div>
          );
        })}

          {total === 0 && <p className="empty-hint">這份考古題目前還沒有可作答的題目。</p>}
        </div>
      )}

      {submitted && reviewing && (
        <div className="exam-review">
          {slots.map(({ structure: s, item }, i) => {
            const prevStructure = slots[i - 1]?.structure;
            const showHeader = !prevStructure || prevStructure.sectionId !== s.sectionId || prevStructure.problemId !== s.problemId;
            return (
              <ExamReviewItem
                key={item.id}
                structure={s}
                item={item}
                index={i}
                chosenIndex={answers[i]}
                showHeader={showHeader}
                onNoteClick={setActiveNote}
                speechRate={speechRate}
                onItemUpdated={updateSlotItem}
              />
            );
          })}
        </div>
      )}

      {total > 0 && !submitted && (
        <div className="exam-submit-row">
          <button type="button" className="btn btn-submit" onClick={finish} disabled={paused}>交卷看成績</button>
          {!allAnswered && (
            <span className="row-meta">還有 {total - answeredCount} 題未作答，未作答視為錯誤</span>
          )}
        </div>
      )}

      {submitted && !reviewing && (
        <div className="practice-complete">
          <p className="practice-complete-score">
            完成！答對 {totalCorrect} / {total} 題。耗時 {formatClock(elapsedSeconds)}
            {totalSeconds > 0 && elapsedSeconds > totalSeconds && `（超時 ${formatClock(elapsedSeconds - totalSeconds)}）`}
          </p>
          <div className="practice-complete-review-label">各大題小計</div>
          <div className="practice-complete-chips">
            {sectionBreakdown.map(s => (
              <span key={s.sectionTitle} className="practice-complete-chip">
                {s.sectionTitle}　{s.correct} / {s.total}
              </span>
            ))}
          </div>
          <div className="practice-complete-actions">
            <button type="button" className="btn" onClick={() => setReviewing(true)}>📋 查看考卷檢討</button>
            <Link href="/practice/exam" className="btn">← 返回考古題練習</Link>
          </div>
        </div>
      )}

      {submitted && reviewing && (
        <div className="practice-complete-actions">
          <button type="button" className="btn" onClick={() => setReviewing(false)}>← 返回成績</button>
          <Link href="/practice/exam" className="btn">← 返回考古題練習</Link>
        </div>
      )}

      {activeNote && <NotePanel note={activeNote} onClose={() => setActiveNote(null)} rate={speechRate} />}
    </main>
  );
}
