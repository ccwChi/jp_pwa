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

const emptyReadSet = new Set();

export function useReadSet() {
  const getSnapshot = useMemo(() => cached(() => new Set(readStore.get())), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => emptyReadSet);
}

// ── Grammar: lesson ids the user has marked as learned ───────────────────

const grammarReadStore = createStore('nj_grammar_read', []);

export function isGrammarRead(lessonId) {
  return grammarReadStore.get().includes(lessonId);
}

export function setGrammarRead(lessonId, value) {
  const current = grammarReadStore.get();
  const next = value
    ? (current.includes(lessonId) ? current : [...current, lessonId])
    : current.filter(id => id !== lessonId);
  grammarReadStore.set(next);
}

const emptyGrammarReadSet = new Set();

export function useGrammarReadSet() {
  const getSnapshot = useMemo(() => cached(() => new Set(grammarReadStore.get())), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => emptyGrammarReadSet);
}

// ── Grammar practice: completed practice-set ids, one store per exercise
// mode (文章問答 / 克漏字). A practice set groups several grammar lessons,
// so "done" is tracked per set, not per lesson — the grammar list page
// derives each lesson's per-mode checkmark by looking up which set
// contains it (see getGrammarPracticeStatus in lib/grammar/practice). ────

const practiceArticleDoneStore = createStore('nj_grammar_practice_article_done', []);
const practiceClozeDoneStore = createStore('nj_grammar_practice_cloze_done', []);

export function isPracticeSetDone(mode, setId) {
  const store = mode === 'cloze' ? practiceClozeDoneStore : practiceArticleDoneStore;
  return store.get().includes(setId);
}

export function setPracticeSetDone(mode, setId, value) {
  const store = mode === 'cloze' ? practiceClozeDoneStore : practiceArticleDoneStore;
  const current = store.get();
  const next = value
    ? (current.includes(setId) ? current : [...current, setId])
    : current.filter(id => id !== setId);
  store.set(next);
}

const emptyPracticeDoneSet = new Set();

export function usePracticeArticleDoneSet() {
  const getSnapshot = useMemo(() => cached(() => new Set(practiceArticleDoneStore.get())), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => emptyPracticeDoneSet);
}

export function usePracticeClozeDoneSet() {
  const getSnapshot = useMemo(() => cached(() => new Set(practiceClozeDoneStore.get())), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => emptyPracticeDoneSet);
}

// ── Grammar: last-selected level tab on the /grammar list page ───────────

const grammarLevelStore = createStore('nj_grammar_level', null);

export function getGrammarLevel() {
  return grammarLevelStore.get();
}

export function setGrammarLevel(value) {
  grammarLevelStore.set(value);
}

export const useGrammarLevel = grammarLevelStore.useValue;

// ── Grammar: last-selected level tab on the /grammar/practice page ───────

const grammarPracticeLevelStore = createStore('nj_grammar_practice_level', null);

export function getGrammarPracticeLevel() {
  return grammarPracticeLevelStore.get();
}

export function setGrammarPracticeLevel(value) {
  grammarPracticeLevelStore.set(value);
}

export const useGrammarPracticeLevel = grammarPracticeLevelStore.useValue;

// ── Reading: favorited seriesIds, shown pinned to the top of the list ────

const readingFavoritesStore = createStore('nj_reading_favorites', []);

export function isReadingFavorite(seriesId) {
  return readingFavoritesStore.get().includes(seriesId);
}

export function setReadingFavorite(seriesId, value) {
  const current = readingFavoritesStore.get();
  const next = value
    ? (current.includes(seriesId) ? current : [...current, seriesId])
    : current.filter(id => id !== seriesId);
  readingFavoritesStore.set(next);
}

const emptyReadingFavoriteSet = new Set();

export function useReadingFavoriteSet() {
  const getSnapshot = useMemo(() => cached(() => new Set(readingFavoritesStore.get())), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => emptyReadingFavoriteSet);
}

// ── Reading: selected level tags on the /reading list page (multi-select;
// empty array means no filter, i.e. show every level) ────────────────────

const readingLevelTagsStore = createStore('nj_reading_level_tags', []);

export function getReadingLevelTags() {
  return readingLevelTagsStore.get();
}

export function setReadingLevelTags(value) {
  readingLevelTagsStore.set(value);
}

export const useReadingLevelTags = readingLevelTagsStore.useValue;

// ── Practice: last-selected level on the /practice/exam picker page ──────

const practiceExamLevelStore = createStore('nj_practice_exam_level', null);

export function getPracticeExamLevel() {
  return practiceExamLevelStore.get();
}

export function setPracticeExamLevel(value) {
  practiceExamLevelStore.set(value);
}

export const usePracticeExamLevel = practiceExamLevelStore.useValue;

// ── Practice: most recent score per past-exam paper, examId → result ─────

const practiceExamResultsStore = createStore('nj_practice_exam_results', {});

export function getPracticeExamResult(examId) {
  return practiceExamResultsStore.get()[examId] || null;
}

export function setPracticeExamResult(examId, { correctCount, total }) {
  practiceExamResultsStore.set({
    ...practiceExamResultsStore.get(),
    [examId]: { correctCount, total, updatedAt: Date.now() },
  });
}

export const usePracticeExamResults = practiceExamResultsStore.useValue;

// ── Practice: last-selected level + multi-selected types on the
// /practice/general picker page (empty types array means "any type") ─────

const practiceGeneralLevelStore = createStore('nj_practice_general_level', null);

export function getPracticeGeneralLevel() {
  return practiceGeneralLevelStore.get();
}

export function setPracticeGeneralLevel(value) {
  practiceGeneralLevelStore.set(value);
}

export const usePracticeGeneralLevel = practiceGeneralLevelStore.useValue;

const practiceGeneralTypesStore = createStore('nj_practice_general_types', []);

export function getPracticeGeneralTypes() {
  return practiceGeneralTypesStore.get();
}

export function setPracticeGeneralTypes(value) {
  practiceGeneralTypesStore.set(value);
}

export const usePracticeGeneralTypes = practiceGeneralTypesStore.useValue;

// ── Font scale: user-chosen reading font size multiplier ─────────────────

const fontScaleStore = createStore('nj_font_scale', 1);

export function getFontScale() {
  return fontScaleStore.get();
}

export function setFontScale(value) {
  fontScaleStore.set(value);
}

export const useFontScale = fontScaleStore.useValue;

// ── Speech rate: playback speed multiplier for both single-sentence and
// whole-article TTS ────────────────────────────────────────────────────

const speechRateStore = createStore('nj_speech_rate', 1);

export function getSpeechRate() {
  return speechRateStore.get();
}

export function setSpeechRate(value) {
  speechRateStore.set(value);
}

export const useSpeechRate = speechRateStore.useValue;

// ── Listen mode: hands-free, eyes-free playback prefs ─────────────────────

const listenZhStore = createStore('nj_listen_zh', false);

export function getListenZh() {
  return listenZhStore.get();
}

export function setListenZh(value) {
  listenZhStore.set(value);
}

export const useListenZh = listenZhStore.useValue;

const listenBlackoutStore = createStore('nj_listen_blackout', true);

export function getListenBlackout() {
  return listenBlackoutStore.get();
}

export function setListenBlackout(value) {
  listenBlackoutStore.set(value);
}

export const useListenBlackout = listenBlackoutStore.useValue;

const listenGapStore = createStore('nj_listen_gap', 1200);

export function getListenGap() {
  return listenGapStore.get();
}

export function setListenGap(value) {
  listenGapStore.set(value);
}

export const useListenGap = listenGapStore.useValue;

// ── Chinese translation blur: hide zh text behind a click-to-reveal blur ──

const zhBlurStore = createStore('nj_zh_blur', false);

export function getZhBlur() {
  return zhBlurStore.get();
}

export function setZhBlur(value) {
  zhBlurStore.set(value);
}

export const useZhBlur = zhBlurStore.useValue;

// ── Theme: 'light' | 'dark' | 'system' (default) — applied to <html data-theme>
// by ThemeToggle; a blocking inline script in layout.js mirrors this same key
// before hydration so the page never flashes the wrong theme. ─────────────

const themeStore = createStore('nj_theme', 'system');

export function getTheme() {
  return themeStore.get();
}

export function setTheme(value) {
  themeStore.set(value);
}

export const useTheme = themeStore.useValue;

// ── Import draft: autosaved in-progress state for the long-article import
// tool (src/app/reading/import). Single slot, no subscribers — the import
// tool reads it once on mount, so this skips the createStore/useSyncExternalStore
// machinery and just reuses the read/write primitives directly. ─────────────

const IMPORT_DRAFT_KEY = 'nj_import_draft';

export function loadImportDraft() {
  return readRaw(IMPORT_DRAFT_KEY, null);
}

export function saveImportDraft(draft) {
  writeRaw(IMPORT_DRAFT_KEY, draft);
}

export function clearImportDraft() {
  window.localStorage.removeItem(IMPORT_DRAFT_KEY);
  notify();
}
