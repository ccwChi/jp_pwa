'use client';

import { useMemo, useSyncExternalStore } from 'react';

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

function readRaw(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeRaw(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
  notify();
}

// A single JSON value backed by one localStorage key, with a hook that
// subscribes to it via useSyncExternalStore (see notes below for why this
// beats useState+useEffect for external, synchronous data sources).
function createStore(key, fallback) {
  function get() {
    return readRaw(key, fallback);
  }
  function set(value) {
    writeRaw(key, value);
  }
  function useValue() {
    const getSnapshot = useMemo(() => cached(get), []);
    return useSyncExternalStore(subscribe, getSnapshot, () => fallback);
  }
  return { get, set, useValue };
}

function newId() {
  return crypto.randomUUID();
}

// ── Notes ──────────────────────────────────────────────────────────────

const notesStore = createStore('nj_notes', []);

export function getNotes() {
  return notesStore.get().sort((a, b) => b.createdAt - a.createdAt);
}

export function getNote(id) {
  return notesStore.get().find(n => n.id === id) || null;
}

export function saveNote({ id, content }) {
  const notes = notesStore.get();
  const noteId = id || newId();
  const idx = notes.findIndex(n => n.id === noteId);
  const record = idx >= 0
    ? { ...notes[idx], content }
    : { id: noteId, content, createdAt: Date.now() };

  if (idx >= 0) notes[idx] = record;
  else notes.push(record);

  notesStore.set(notes);
  return record;
}

export function deleteNote(id) {
  notesStore.set(notesStore.get().filter(n => n.id !== id));
}

const emptyArray = [];

export function useNotes() {
  const getSnapshot = useMemo(() => cached(getNotes), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => emptyArray);
}

export function useNote(id) {
  const getSnapshot = useMemo(() => cached(() => getNote(id)), [id]);
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

// ── Reading progress: seriesId → last-read partId ────────────────────────

const progressStore = createStore('nj_progress', {});

export function getProgress(seriesId) {
  return progressStore.get()[seriesId] || null;
}

export function setProgress(seriesId, partId) {
  progressStore.set({ ...progressStore.get(), [seriesId]: { partId, updatedAt: Date.now() } });
}

export const useProgressMap = progressStore.useValue;

// ── Read markers: seriesIds the user has marked as learned ───────────────

const readStore = createStore('nj_read', []);

export function isRead(seriesId) {
  return readStore.get().includes(seriesId);
}

export function setRead(seriesId, value) {
  const current = readStore.get();
  const next = value
    ? (current.includes(seriesId) ? current : [...current, seriesId])
    : current.filter(id => id !== seriesId);
  readStore.set(next);
}

export function useReadSet() {
  const getSnapshot = useMemo(() => cached(() => new Set(readStore.get())), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => new Set());
}

// ── Font scale: user-chosen reading font size multiplier ─────────────────

const fontScaleStore = createStore('nj_font_scale', 1);

export function getFontScale() {
  return fontScaleStore.get();
}

export function setFontScale(value) {
  fontScaleStore.set(value);
}

export const useFontScale = fontScaleStore.useValue;
