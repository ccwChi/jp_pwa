'use client';

import { useState } from 'react';
import { parseFurigana, readingOf, toRomaji } from '@/lib/reading/furigana';
import { buildVocabSegments } from '@/lib/reading/vocabMatch';
import { saveNote } from '@/lib/storage';

export default function Sentence({ jp, zh, showRomaji, blurZh, vocab, rate, onVocabEnter, onVocabLeave, onVocabClick }) {
  const parts = parseFurigana(jp);
  const segments = buildVocabSegments(parts, vocab);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [revealed, setRevealed] = useState(false);

  function speak() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(readingOf(jp));
    utterance.lang = 'ja-JP';
    utterance.rate = rate || 1;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  function handleSaveNote() {
    const plainJp = parts.map(p => p.text).join('');
    saveNote({ content: `${plainJp}\n${zh}` });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  }

  const zhHidden = blurZh && !revealed;

  return (
    <div className="sentence">
      <div className="sentence-actions">
        <button
          type="button"
          className={`play-btn${isPlaying ? ' playing' : ''}`}
          onClick={speak}
          aria-label="播放這句發音"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button
          type="button"
          className={`save-note-btn${isSaved ? ' saved' : ''}`}
          onClick={handleSaveNote}
          aria-label="存入筆記"
        >
          {isSaved ? '✓' : '＋'}
        </button>
      </div>

      <div className="sentence-content">
        <p className="sentence-jp">
          {segments.map((seg, si) => {
            const inner = seg.subParts.map((p, i) =>
              p.reading ? (
                <ruby key={i}>
                  {p.text}
                  <rt>{p.reading}</rt>
                </ruby>
              ) : (
                <span key={i}>{p.text}</span>
              )
            );
            if (!seg.vocab) return <span key={si}>{inner}</span>;
            return (
              <span
                key={si}
                className="vocab-hit"
                onMouseEnter={() => onVocabEnter?.(seg.vocab)}
                onMouseLeave={() => onVocabLeave?.(seg.vocab)}
                onClick={e => { e.stopPropagation(); onVocabClick?.(seg.vocab); }}
              >
                {inner}
              </span>
            );
          })}
        </p>
        {showRomaji && <p className="sentence-romaji">{toRomaji(readingOf(jp))}</p>}
        <p
          className={`sentence-zh${zhHidden ? ' zh-hidden' : ''}`}
          onClick={() => blurZh && setRevealed(r => !r)}
          title={zhHidden ? '點擊顯示翻譯' : undefined}
        >
          {zh}
        </p>
      </div>
    </div>
  );
}
