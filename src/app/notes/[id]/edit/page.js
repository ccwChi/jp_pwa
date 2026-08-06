'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNote, saveNote } from '@/lib/storage';
import NoteForm from '../../NoteForm';

export default function EditNotePage() {
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

  function handleSave(content) {
    saveNote({ id: note.id, content });
    router.push(`/notes/${note.id}`);
  }

  return (
    <main className="container">
      <div className="page-head">
        <Link href={`/notes/${note.id}`} className="back-link">← 返回筆記</Link>
      </div>

      <h1 className="page-title">編輯筆記</h1>

      <NoteForm initialContent={note.content} onSave={handleSave} />
    </main>
  );
}
