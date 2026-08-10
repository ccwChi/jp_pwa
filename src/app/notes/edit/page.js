'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNote, saveNote } from '@/lib/storage';
import NoteForm from '../NoteForm';

function EditNoteContent() {
  const id = useSearchParams().get('id');
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

  function handleSave(content) {
    saveNote({ id: note.id, content });
    router.push(`/notes/view?id=${note.id}`);
  }

  return (
    <main className="container">
      <div className="page-head">
        <Link href={`/notes/view?id=${note.id}`} className="back-link">← 返回筆記</Link>
      </div>

      <h1 className="page-title">編輯筆記</h1>

      <NoteForm initialContent={note.content} onSave={handleSave} />
    </main>
  );
}

export default function EditNotePage() {
  return (
    <Suspense fallback={null}>
      <EditNoteContent />
    </Suspense>
  );
}
