'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { extractSentences } from '@/lib/reading/parseSentences';
import { loadImportDraft, saveImportDraft, clearImportDraft } from '@/lib/storage';
import { computeChapters, slugify } from '@/lib/reading/articles/chapters';

// Owns the multi-step (paste → split → name → confirm → review → done) state
// machine for the long-article import flow: draft autosave/restore, chapter
// computation, and the final submit call. ImportTool.js only renders JSX per
// step and reads/calls what this hook returns — see codebase-design's
// "deepen a shallow cluster" write-up for why this split exists.
export function useImportWizard({ existingSeriesIds }) {
  const [step, setStep] = useState('paste');
  const [rawInput, setRawInput] = useState('');
  const [parseError, setParseError] = useState('');
  const [sentences, setSentences] = useState([]);
  const [splitAfter, setSplitAfter] = useState([]); // array of indices
  const [chapterTitles, setChapterTitles] = useState([]);
  const [seriesTitle, setSeriesTitle] = useState('');
  const [level, setLevel] = useState('N3');
  const [excerpt, setExcerpt] = useState('');
  const [seriesId, setSeriesIdRaw] = useState('');
  const [seriesIdTouched, setSeriesIdTouched] = useState(false);
  const [overwriteAck, setOverwriteAck] = useState(false);
  const [submitState, setSubmitState] = useState('idle'); // idle | submitting | done | error
  const [submitError, setSubmitError] = useState('');
  const [resultHref, setResultHref] = useState('');

  const restoredDraft = useRef(false);

  // Restore an in-progress session once on mount. This needs an imperative
  // confirm() dialog before hydrating state, so it can't be modeled as an
  // external-store snapshot the way the localStorage-backed hooks elsewhere
  // in the app are — it's a genuine one-time bootstrap effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (restoredDraft.current) return;
    restoredDraft.current = true;
    const draft = loadImportDraft();
    if (!draft) return;
    if (!confirm('偵測到上次未完成的匯入進度，要繼續嗎？（取消會清掉舊進度，重新開始）')) {
      clearImportDraft();
      return;
    }
    setStep(draft.step || 'paste');
    setRawInput(draft.rawInput || '');
    setSentences(draft.sentences || []);
    setSplitAfter(draft.splitAfter || []);
    setChapterTitles(draft.chapterTitles || []);
    setSeriesTitle(draft.seriesTitle || '');
    setLevel(draft.level || 'N3');
    setExcerpt(draft.excerpt || '');
    setSeriesIdRaw(draft.seriesId || '');
    setSeriesIdTouched(Boolean(draft.seriesId));
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Autosave whenever meaningful state changes.
  useEffect(() => {
    if (!restoredDraft.current) return;
    if (step === 'done') return;
    if (step === 'paste' && sentences.length === 0) return;
    saveImportDraft({
      step, rawInput, sentences, splitAfter, chapterTitles,
      seriesTitle, level, excerpt, seriesId,
    });
  }, [step, rawInput, sentences, splitAfter, chapterTitles, seriesTitle, level, excerpt, seriesId]);

  const splitSet = useMemo(() => new Set(splitAfter), [splitAfter]);
  const chapters = useMemo(() => computeChapters(sentences, splitSet), [sentences, splitSet]);
  const idCollision = existingSeriesIds.includes(seriesId);

  function handleParse() {
    setParseError('');
    try {
      const parsed = extractSentences(rawInput);
      setSentences(parsed);
      setSplitAfter([]);
      setStep('split');
    } catch (err) {
      setParseError(err.message);
    }
  }

  function toggleSplit(index) {
    setSplitAfter(prev => {
      const set = new Set(prev);
      if (set.has(index)) set.delete(index);
      else set.add(index);
      return [...set].sort((a, b) => a - b);
    });
  }

  function setChapterTitle(index, value) {
    setChapterTitles(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function setSeriesId(value) {
    setSeriesIdRaw(slugify(value));
    setSeriesIdTouched(true);
  }

  function goToSplitStep() {
    setStep('split');
  }

  function goToNameStep() {
    setChapterTitles(prev => (prev.length === chapters.length ? prev : chapters.map((_, i) => String(i + 1))));
    setStep('name');
  }

  function goToConfirmStep() {
    setSeriesIdRaw(prev => (seriesIdTouched ? prev : slugify(seriesTitle)));
    setStep('confirm');
  }

  function goToReviewStep() {
    setStep('review');
  }

  function backToConfirmStep() {
    setStep('confirm');
  }

  async function handleSubmit() {
    setSubmitState('submitting');
    setSubmitError('');
    try {
      const res = await fetch('/api/articles/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seriesId,
          seriesTitle,
          level,
          excerpt,
          chapters: chapters.map((c, i) => ({ partTitle: chapterTitles[i], sentences: c.sentences })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '寫入失敗');
      clearImportDraft();
      setResultHref(`/reading/${data.firstArticleId}`);
      setSubmitState('done');
      setStep('done');
    } catch (err) {
      setSubmitError(err.message);
      setSubmitState('error');
    }
  }

  function restart() {
    if (!confirm('確定要放棄目前進度、重新開始嗎？')) return;
    clearImportDraft();
    setStep('paste');
    setRawInput('');
    setSentences([]);
    setSplitAfter([]);
    setChapterTitles([]);
    setSeriesTitle('');
    setExcerpt('');
    setSeriesIdRaw('');
    setSeriesIdTouched(false);
    setSubmitState('idle');
  }

  return {
    step,
    rawInput, setRawInput,
    parseError,
    sentences,
    chapters,
    splitSet,
    chapterTitles, setChapterTitle,
    seriesTitle, setSeriesTitle,
    level, setLevel,
    excerpt, setExcerpt,
    seriesId, setSeriesId,
    idCollision,
    overwriteAck, setOverwriteAck,
    submitState, submitError, resultHref,
    actions: {
      handleParse,
      toggleSplit,
      goToSplitStep,
      goToNameStep,
      goToConfirmStep,
      goToReviewStep,
      backToConfirmStep,
      handleSubmit,
      restart,
    },
  };
}
