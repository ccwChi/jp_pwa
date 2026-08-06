'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNote, deleteNote } from '@/lib/storage';

export default function NoteDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const note = useNote(id);

  if (note === null) {
    return (
      <main className="container">
        <div className="page-head">
          <Link href="/notes" className="back-link">← 筆記列表</Link>
        </div>
        <p className="empty-hint">找不到這則筆記。</p>
      </main>
    );
  }

  function handleDelete() {
    if (!confirm('確定要刪除這則筆記嗎？')) return;
    deleteNote(note.id);
    router.push('/notes');
  }

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/notes" className="back-link">← 筆記列表</Link>
        <div className="head-actions">
          <Link href={`/notes/${note.id}/edit`} className="icon-btn">編輯</Link>
          <button className="icon-btn" onClick={handleDelete} aria-label="刪除筆記">刪除</button>
        </div>
      </div>

      <p className="source-text">{note.content}</p>
    </main>
  );
}
