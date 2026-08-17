'use client';

import { useState } from 'react';
import Link from 'next/link';
import { splitNoteContent } from '@/lib/noteCard';

// Anki-style flashcard: shows the original text (front) until clicked, then
// flips to reveal the meaning/notes (back). Used on both the notes list
// (quick review) and the note detail page (larger, with edit/delete below).
export default function NoteCard({ note, size = 'md' }) {
  const { front, back } = splitNoteContent(note.content);
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`note-card note-card-${size}${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped(f => !f);
        }
      }}
    >
      <Link
        href={`/notes/edit?id=${note.id}`}
        className="note-card-edit"
        onClick={e => e.stopPropagation()}
        aria-label="編輯筆記"
      >
        ✎
      </Link>
      <div className="note-card-inner">
        <div className="note-card-face note-card-front">
          <p>{front}</p>
        </div>
        <div className="note-card-face note-card-back">
          {back ? <p>{back}</p> : <p className="note-card-empty">尚未填寫意思，點擊 ✎ 編輯新增</p>}
        </div>
      </div>
    </div>
  );
}
