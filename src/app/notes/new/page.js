'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveNote } from '@/lib/storage';
import NoteForm from '../NoteForm';

export default function NewNotePage() {
  const router = useRouter();

  function handleSave(content) {
    const note = saveNote({ content });
    router.push(`/notes/${note.id}`);
  }

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/notes" className="back-link">← 筆記列表</Link>
      </div>

      <h1 className="page-title">新增筆記</h1>

      <NoteForm onSave={handleSave} />
    </main>
  );
}
