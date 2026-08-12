'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useNotes } from '@/lib/storage';
import { downloadBackup, restoreBackupFromFile } from '@/lib/backup';

function preview(content) {
  const firstLine = content.split('\n')[0];
  return firstLine.length > 24 ? `${firstLine.slice(0, 24)}…` : firstLine;
}

export default function NotesPage() {
  const notes = useNotes();
  const fileInputRef = useRef(null);

  async function handleImportFile(e) {
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
          <button type="button" className="icon-btn" onClick={downloadBackup}>匯出資料</button>
          <button type="button" className="icon-btn" onClick={() => fileInputRef.current?.click()}>匯入資料</button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={handleImportFile}
          />
          <Link href="/notes/new" className="btn btn-primary">+ 新增筆記</Link>
        </div>
      </div>

      <h1 className="page-title">個人筆記</h1>

      {notes.length === 0 ? (
        <p className="empty-hint">還沒有筆記，貼上你想記的日文段落開始第一則吧。</p>
      ) : (
        <div className="rows">
          {notes.map(note => (
            <Link href={`/notes/view?id=${note.id}`} key={note.id} className="row note-row">
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
