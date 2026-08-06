'use client';

import { useState } from 'react';
import { parseFurigana, readingOf, toRomaji } from '@/lib/furigana';
import { saveNote } from '@/lib/storage';

export default function Sentence({ jp, zh, showRomaji }) {
  const parts = parseFurigana(jp);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  function handlePlay() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(readingOf(jp));
    utterance.lang = 'ja-JP';
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  function handleSaveNote() {
    saveNote({ content: `${jp}\n${zh}` });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  }

  return (
    <div className="sentence">
      <div className="sentence-jp-row">
        <button
          type="button"
          className={`play-btn${isPlaying ? ' playing' : ''}`}
          onClick={handlePlay}
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
          {isSaved ? '已存入' : '＋筆記'}
        </button>
        <p className="sentence-jp">
          {parts.map((p, i) =>
            p.reading ? (
              <ruby key={i}>
                {p.text}
                <rt>{p.reading}</rt>
              </ruby>
            ) : (
              <span key={i}>{p.text}</span>
            )
          )}
        </p>
      </div>
      {showRomaji && <p className="sentence-romaji">{toRomaji(readingOf(jp))}</p>}
      <p className="sentence-zh">{zh}</p>
    </div>
  );
}
