'use client';

// Every store in storage.js keeps its localStorage key under this prefix,
// so a full backup/restore just means scanning for that prefix — new
// stores are picked up automatically with no changes here.
const KEY_PREFIX = 'nj_';
const BACKUP_VERSION = 1;

export function exportData() {
  const data = {};
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (!key || !key.startsWith(KEY_PREFIX)) continue;
    try {
      data[key] = JSON.parse(window.localStorage.getItem(key));
    } catch {
      // skip entries that aren't valid JSON
    }
  }
  return { version: BACKUP_VERSION, exportedAt: new Date().toISOString(), data };
}

export function downloadBackup() {
  const backup = exportData();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nj-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function restoreBackupFromFile(file) {
  const text = await file.text();
  const backup = JSON.parse(text);
  if (!backup || typeof backup.data !== 'object') {
    throw new Error('備份檔格式不正確');
  }

  for (const [key, value] of Object.entries(backup.data)) {
    if (!key.startsWith(KEY_PREFIX)) continue;
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
