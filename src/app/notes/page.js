'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useNotes } from '@/lib/storage';
import { downloadBackup, restoreBackupFromFile } from '@/lib/backup';
import { downloadNotesBackup, restoreNotesFromFile } from '@/lib/notesBackup';
import NoteCard from './NoteCard';

export default function NotesPage() {
  const notes = useNotes();
  const notesFileInputRef = useRef(null);
  const fullFileInputRef = useRef(null);

  async function handleImportNotesFile(e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;

    try {
      const count = await restoreNotesFromFile(file);
      alert(`已匯入 ${count} 則筆記。`);
    } catch {
      alert('匯入失敗，請確認選擇的是本站匯出的筆記檔。');
    }
  }

  async function handleImportFullFile(e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;

    if (!confirm('匯入將覆蓋目前裝置上同名的資料（筆記、進度、已讀、字級設定），確定要繼續嗎？')) return;

    try {
      await restoreBackupFromFile(file);
      alert('匯入完成，頁面即將重新整理。');
      window.location.reload();
    } catch {
      alert('匯入失敗，請確認選擇的是本站匯出的備份檔。');
    }
  }

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
        <div className="head-actions">
          <button type="button" className="icon-btn" onClick={downloadNotesBackup}>匯出筆記</button>
          <button type="button" className="icon-btn" onClick={() => notesFileInputRef.current?.click()}>匯入筆記</button>
          <input
            ref={notesFileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={handleImportNotesFile}
          />
          <button type="button" className="icon-btn" onClick={downloadBackup}>匯出全部資料</button>
          <button type="button" className="icon-btn" onClick={() => fullFileInputRef.current?.click()}>匯入全部資料</button>
          <input
            ref={fullFileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={handleImportFullFile}
          />
          <Link href="/notes/new" className="btn btn-primary">+ 新增筆記</Link>
        </div>
      </div>

      <h1 className="page-title">個人筆記</h1>

      {notes.length === 0 ? (
        <p className="empty-hint">還沒有筆記，練習題目時選取文字按右鍵即可加入，或手動貼上想記的日文段落。</p>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </main>
  );
}
