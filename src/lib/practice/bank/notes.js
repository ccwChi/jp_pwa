'use client';

import { useEffect, useRef, useState } from 'react';
import { parseFurigana, readingOf } from '@/lib/reading/furigana';
import { buildVocabSegments } from '@/lib/reading/vocabMatch';

// Splits `text` into ruby/plain React nodes, wrapping any substring matching
// a bank item's `notes[].surface` in a clickable span — same matching logic
// reading articles already use for their vocab list (see vocabMatch.js),
// reused as-is since both just need entries shaped `{ surface, ... }`.
export function renderAnnotatedText(text, notes, keyPrefix, { onClick } = {}) {
  const parts = parseFurigana(text);
  const segments = buildVocabSegments(parts, notes);
  return segments.map((seg, si) => {
    const inner = seg.subParts.map((p, i) =>
      p.reading ? (
        <ruby key={`${keyPrefix}-${si}-${i}`}>{p.text}<rt>{p.reading}</rt></ruby>
      ) : (
        <span key={`${keyPrefix}-${si}-${i}`}>{p.text}</span>
      )
    );
    if (!seg.vocab) return <span key={`${keyPrefix}-${si}`}>{inner}</span>;
    const note = seg.vocab;
    return (
      <span
        key={`${keyPrefix}-${si}`}
        className={`note-hit${note.type === 'grammar' ? ' note-hit-grammar' : ''}`}
        onClick={e => { e.stopPropagation(); onClick?.(note); }}
      >
        {inner}
      </span>
    );
  });
}

// Per-option answer breakdown (why each choice is right/wrong), shown once
// an answer is revealed (instant-feedback lock, or the post-submit review
// screen). `explanations` is optional and sparse — an item can annotate
// only the options worth explaining, leaving the rest unset — so anything
// falsy at an index is skipped rather than rendered as an empty row.
const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function OptionExplanations({ options, explanations, answerIndex }) {
  if (!explanations || !explanations.some(Boolean)) return null;
  return (
    <div className="exam-option-explanations">
      {options.map((opt, i) => {
        if (!explanations[i]) return null;
        return (
          <div key={i} className={`exam-option-explanation${i === answerIndex ? ' correct' : ''}`}>
            <span className="exam-option-explanation-label">{OPTION_LABELS[i] || i + 1}</span>
            <div className="exam-option-explanation-text">
              <strong>{opt}</strong>
              <span>{explanations[i]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Pinned-to-bottom popover showing one note's detail, styled to match the
// reading article's vocab-panel (see globals.css) since it's the same idea:
// tap a highlighted word, read a short explanation, tap elsewhere to close.
// `note.sentence` (optional `{ jp, zh }`) mirrors a reading vocab entry's
// example sentence and reuses the exact same markup/playback.
export function NotePanel({ note, onClose, rate }) {
  const panelRef = useRef(null);
  const [isExamplePlaying, setIsExamplePlaying] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    function onDocClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    }
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    };
  }, [onClose]);

  function speakExample() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(readingOf(note.sentence.jp));
    utterance.lang = 'ja-JP';
    utterance.rate = rate || 1;
    utterance.onstart = () => setIsExamplePlaying(true);
    utterance.onend = () => setIsExamplePlaying(false);
    utterance.onerror = () => setIsExamplePlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  const exampleParts = note.sentence?.jp ? parseFurigana(note.sentence.jp) : null;

  return (
    <div ref={panelRef} className="vocab-panel">
      <div className="vocab-panel-actions">
        <button type="button" className="vocab-panel-close" onClick={onClose} aria-label="關閉">✕</button>
      </div>
      <div className="vocab-panel-word-row">
        <span className="vocab-panel-word">{note.word || note.surface}</span>
        {note.type === 'grammar' && <span className="note-type-badge">文法</span>}
      </div>
      {note.reading && <div className="vocab-panel-reading">{note.reading}</div>}
      <div className="vocab-panel-meaning">{note.meaning}</div>

      {exampleParts && (
        <div className="vocab-panel-example">
          <div className="vocab-panel-word-row">
            <p className="vocab-panel-example-jp">
              {exampleParts.map((p, i) =>
                p.reading ? (
                  <ruby key={i}>{p.text}<rt>{p.reading}</rt></ruby>
                ) : (
                  <span key={i}>{p.text}</span>
                )
              )}
            </p>
            <button
              type="button"
              className={`vocab-panel-play${isExamplePlaying ? ' playing' : ''}`}
              onClick={speakExample}
              aria-label="播放例句發音"
            >
              {isExamplePlaying ? '❚❚' : '▶'}
            </button>
          </div>
          {note.sentence.zh && <p className="vocab-panel-example-zh">{note.sentence.zh}</p>}
        </div>
      )}
    </div>
  );
}
