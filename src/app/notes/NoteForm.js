'use client';

import { useState } from 'react';

export default function NoteForm({ initialContent = '', onSave }) {
  const [content, setContent] = useState(initialContent);

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    onSave(content.trim());
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <textarea
        className="paste-box"
        rows={16}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="貼上日文原文、翻譯、解析…全部貼在這裡就好"
        autoFocus
      />
      <button type="submit" className="btn btn-submit">儲存</button>
    </form>
  );
}
