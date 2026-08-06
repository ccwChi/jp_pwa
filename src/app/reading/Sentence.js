'use client';

import { parseFurigana, readingOf, toRomaji } from '@/lib/furigana';

export default function Sentence({ jp, zh, showRomaji }) {
  const parts = parseFurigana(jp);

  return (
    <div className="sentence">
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
      {showRomaji && <p className="sentence-romaji">{toRomaji(readingOf(jp))}</p>}
      <p className="sentence-zh">{zh}</p>
    </div>
  );
}
