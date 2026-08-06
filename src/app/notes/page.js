'use client';

import Link from 'next/link';
import { useNotes } from '@/lib/storage';

function preview(content) {
  const firstLine = content.split('\n')[0];
  return firstLine.length > 24 ? `${firstLine.slice(0, 24)}…` : firstLine;
}

export default function NotesPage() {
  const notes = useNotes();

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
        <Link href="/notes/new" className="btn">+ 新增筆記</Link>
      </div>

      <h1 className="page-title">個人筆記</h1>

      {notes.length === 0 ? (
        <p className="empty-hint">還沒有筆記，貼上你想記的日文段落開始第一則吧。</p>
      ) : (
        <div className="rows">
          {notes.map(note => (
            <Link href={`/notes/${note.id}`} key={note.id} className="row note-row">
              <div>
                <div className="name">{preview(note.content)}</div>
                <div className="desc">{note.content.slice(0, 60)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
