'use client';

import { getNotes, importNotes } from './storage';

// Separate from backup.js's whole-app export/import: this covers only the
// `nj_notes` store, so notes can be shared/moved between devices without
// touching reading progress, practice results, or other settings.
const VERSION = 1;

export function downloadNotesBackup() {
  const backup = { version: VERSION, exportedAt: new Date().toISOString(), notes: getNotes() };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nj-notes-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function restoreNotesFromFile(file) {
  const text = await file.text();
  const backup = JSON.parse(text);
  const notes = Array.isArray(backup) ? backup : backup?.notes;
  if (!Array.isArray(notes)) {
    throw new Error('筆記檔案格式不正確');
  }
  importNotes(notes);
  return notes.length;
}
