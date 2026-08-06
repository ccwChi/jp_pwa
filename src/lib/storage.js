'use client';

import { useMemo, useSyncExternalStore } from 'react';

const NOTES_KEY = 'nj_notes';

// Bumped on every write so hook snapshots below know to recompute instead of
// re-reading (and re-allocating) localStorage on every render.
let version = 0;
const listeners = new Set();

function notify() {
  version += 1;
  listeners.forEach(cb => cb());
}

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function readAll() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(NOTES_KEY)) || [];
  } catch {
    return [];
  }
}

function writeAll(items) {
  window.localStorage.setItem(NOTES_KEY, JSON.stringify(items));
  notify();
}

function newId() {
  return crypto.randomUUID();
}

// Memoizes a derived read so repeated calls (e.g. from useSyncExternalStore,
// which calls getSnapshot on every render) return the same reference until
// the underlying data actually changes.
function cached(compute) {
  let value;
  let computedAt = -1;
  return () => {
    if (computedAt !== version) {
      value = compute();
      computedAt = version;
    }
    return value;
  };
}

export function getNotes() {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function getNote(id) {
  return readAll().find(n => n.id === id) || null;
}

export function saveNote({ id, content }) {
  const notes = readAll();
  const noteId = id || newId();
  const idx = notes.findIndex(n => n.id === noteId);
  const record = idx >= 0
    ? { ...notes[idx], content }
    : { id: noteId, content, createdAt: Date.now() };

  if (idx >= 0) notes[idx] = record;
  else notes.push(record);

  writeAll(notes);
  return record;
}

export function deleteNote(id) {
  writeAll(readAll().filter(n => n.id !== id));
}

// ── React hooks: read from localStorage without duplicating it into
// component state (see useSyncExternalStore docs for why this beats
// useState+useEffect for external, synchronous data sources). ──

const emptyArray = [];

export function useNotes() {
  const getSnapshot = useMemo(() => cached(getNotes), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => emptyArray);
}

export function useNote(id) {
  const getSnapshot = useMemo(() => cached(() => getNote(id)), [id]);
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
