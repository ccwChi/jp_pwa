'use client';

import { useState } from 'react';
import { splitNoteContent, joinNoteContent } from '@/lib/noteCard';

export default function NoteForm({ initialContent = '', onSave }) {
  const initial = splitNoteContent(initialContent);
  const [front, setFront] = useState(initial.front);
  const [back, setBack] = useState(initial.back);

  function handleSubmit(e) {
    e.preventDefault();
    if (!front.trim()) return;
    onSave(joinNoteContent(front, back));
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <label className="note-form-label" htmlFor="note-front">原文 / 單字</label>
      <textarea
        id="note-front"
        className="paste-box"
        rows={4}
        value={front}
        onChange={e => setFront(e.target.value)}
        placeholder="貼上或輸入不會的日文詞句"
        autoFocus
      />
      <label className="note-form-label" htmlFor="note-back">意思 / 註記（選填，卡片翻面才會顯示）</label>
      <textarea
        id="note-back"
        className="paste-box"
        rows={8}
        value={back}
        onChange={e => setBack(e.target.value)}
        placeholder="意思、用法、例句…"
      />
      <button type="submit" className="btn btn-submit">儲存</button>
    </form>
  );
}
