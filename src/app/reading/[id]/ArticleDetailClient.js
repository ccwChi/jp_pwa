'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getArticle, getAdjacentParts, getSeriesParts } from '@/lib/reading/articles';
import { parseFurigana, readingOf } from '@/lib/reading/furigana';
import {
  setProgress,
  setRead,
  useReadSet,
  useFontScale,
  setFontScale,
  useZhBlur,
  setZhBlur,
  useSpeechRate,
  setSpeechRate,
  useListenZh,
  setListenZh,
  useListenGap,
  setListenGap,
  useListenBlackout,
  setListenBlackout,
} from '@/lib/storage';
import Sentence from '../Sentence';

const SPEECH_RATE_MIN = 0.7;
const SPEECH_RATE_MAX = 1.5;
const SPEECH_RATE_STEP = 0.1;

function clampSpeechRate(value) {
  return Math.min(SPEECH_RATE_MAX, Math.max(SPEECH_RATE_MIN, Math.round(value * 10) / 10));
}
const LISTEN_GAPS = [
  { value: 700, label: '短' },
  { value: 1200, label: '中' },
  { value: 2000, label: '長' },
];

const TABS = ['文章', '閱讀測驗', '重點單字', '文法'];
const FONT_SCALE_MIN = 0.8;
const FONT_SCALE_MAX = 1.6;
const FONT_SCALE_STEP = 0.1;

function clampFontScale(value) {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, Math.round(value * 10) / 10));
}

// Walks the live DOM touched by the range (not a clone — cloneContents()
// drops the <rt> reading whenever the selection lands entirely inside the
// ruby's kanji text node, which is the common case for a single-character
// selection) and substitutes each intersected ruby's furigana reading for
// its kanji, so partial selections speak the same way full-sentence
// playback does. Any intersection with a ruby counts as "read the whole
// token" — a sub-character selection has no well-defined partial reading.
function getSelectionReadingText(range) {
  const ancestor = range.commonAncestorContainer;
  const root = ancestor.nodeType === Node.TEXT_NODE ? ancestor.parentElement : ancestor;
  let result = '';

  function visit(node) {
    if (!range.intersectsNode(node)) return;
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'RUBY') {
      result += node.querySelector('rt')?.textContent || node.textContent;
      return;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      const start = node === range.startContainer ? range.startOffset : 0;
      const end = node === range.endContainer ? range.endOffset : node.textContent.length;
      result += node.textContent.slice(start, end);
      return;
    }
    node.childNodes.forEach(visit);
  }

  visit(root);
  return result;
}

export default function ArticleDetailClient({ id }) {
  const article = getArticle(id);
  const [tab, setTab] = useState('文章');
  const [showRomaji, setShowRomaji] = useState(false);
  const [activeVocab, setActiveVocab] = useState(null);
  const [vocabPinned, setVocabPinned] = useState(false);
  const [listenMode, setListenMode] = useState(false);
  const [selectionSpeaker, setSelectionSpeaker] = useState(null);
  const readSet = useReadSet();
  const fontScale = useFontScale();
  const zhBlur = useZhBlur();
  const speechRate = useSpeechRate();
  const listenZh = useListenZh();
  const listenGap = useListenGap();
  const listenBlackout = useListenBlackout();
  const speechRateSliderRef = useRef(null);
  const sentenceListRef = useRef(null);

  useEffect(() => {
    function onSelectionEnd() {
      const selection = typeof window !== 'undefined' ? window.getSelection() : null;
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        setSelectionSpeaker(null);
        return;
      }
      const range = selection.getRangeAt(0);
      if (!sentenceListRef.current || !sentenceListRef.current.contains(range.commonAncestorContainer)) {
        setSelectionSpeaker(null);
        return;
      }
      if (!selection.toString().trim()) {
        setSelectionSpeaker(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setSelectionSpeaker({ x: rect.left + rect.width / 2, y: rect.top, text: getSelectionReadingText(range) });
    }
    function clearSelectionSpeaker() {
      setSelectionSpeaker(null);
    }
    document.addEventListener('mouseup', onSelectionEnd);
    document.addEventListener('touchend', onSelectionEnd);
    window.addEventListener('scroll', clearSelectionSpeaker, true);
    return () => {
      document.removeEventListener('mouseup', onSelectionEnd);
      document.removeEventListener('touchend', onSelectionEnd);
      window.removeEventListener('scroll', clearSelectionSpeaker, true);
    };
  }, []);

  function speakSelection() {
    if (!selectionSpeaker || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectionSpeaker.text);
    utterance.lang = 'ja-JP';
    utterance.rate = speechRate;
    window.speechSynthesis.speak(utterance);
    setSelectionSpeaker(null);
    window.getSelection()?.removeAllRanges();
  }

  useEffect(() => {
    const el = speechRateSliderRef.current;
    if (!el) return;
    function onWheel(e) {
      e.preventDefault();
      setSpeechRate(clampSpeechRate(speechRate + (e.deltaY > 0 ? -SPEECH_RATE_STEP : SPEECH_RATE_STEP)));
    }
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [speechRate]);

  function hoverCapable() {
    return typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches;
  }

  function handleVocabEnter(entry) {
    if (hoverCapable()) setActiveVocab(entry);
  }

  function handleVocabLeave() {
    if (vocabPinned) return;
    if (hoverCapable()) setActiveVocab(null);
  }

  function handleVocabClick(entry) {
    setActiveVocab(entry);
    setVocabPinned(true);
  }

  function closeVocabPanel() {
    setVocabPinned(false);
    setActiveVocab(null);
  }

  useEffect(() => {
    if (article?.seriesId) setProgress(article.seriesId, article.id);
  }, [article?.seriesId, article?.id]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
  }, [fontScale]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article?.id]);

  if (!article) {
    return (
      <main className="container">
        <div className="page-head">
          <Link href="/reading" className="back-link">← 文章列表</Link>
        </div>
        <p className="empty-hint">找不到這篇文章。</p>
      </main>
    );
  }

  const readKey = article.seriesId || article.id;
  const read = readSet.has(readKey);

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/reading" className="back-link">← 文章列表</Link>
        <label className="read-toggle">
          <input
            type="checkbox"
            checked={read}
            onChange={e => setRead(readKey, e.target.checked)}
          />
          標記已學習
        </label>
      </div>

      {article.seriesId ? (
        <>
          <div className="article-title-row">
            <h1 className="series-heading">{article.seriesTitle}</h1>
            <span className="tag">{article.level}</span>
          </div>
          {article.partTitle && <div className="part-title">第{article.partTitle}章</div>}
          <PartTabs article={article} />
        </>
      ) : (
        <div className="article-title-row">
          <h1 className="page-title">{article.title}</h1>
          <span className="tag">{article.level}</span>
        </div>
      )}

      <div className="article-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`article-tab${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === '文章' && (
        <section>
          <div className="reading-controls">
            <button
              type="button"
              className="listen-mode-btn"
              onClick={() => setListenMode(true)}
            >
              🚗 聆聽模式
            </button>

            <div className="speech-rate-control">
              <span className="speech-rate-icon" aria-hidden="true">🔊</span>
              <input
                ref={speechRateSliderRef}
                type="range"
                className="speech-rate-slider"
                min={SPEECH_RATE_MIN}
                max={SPEECH_RATE_MAX}
                step={SPEECH_RATE_STEP}
                value={speechRate}
                onChange={e => setSpeechRate(clampSpeechRate(parseFloat(e.target.value)))}
                aria-label="朗讀速度"
              />
              <span className="speech-rate-value">{speechRate.toFixed(1)}x</span>
            </div>

            <label className="romaji-toggle">
              <input
                type="checkbox"
                checked={showRomaji}
                onChange={e => setShowRomaji(e.target.checked)}
              />
              羅馬拼音
            </label>

            <label className="zh-blur-toggle">
              <span className="switch">
                <input
                  type="checkbox"
                  checked={zhBlur}
                  onChange={e => setZhBlur(e.target.checked)}
                />
                <span className="switch-track" />
              </span>
              中文翻譯
            </label>

            <div className="font-scale-control">
              <button
                type="button"
                className="font-scale-btn"
                onClick={() => setFontScale(clampFontScale(fontScale - FONT_SCALE_STEP))}
                aria-label="縮小字級"
              >
                A−
              </button>
              <button
                type="button"
                className="font-scale-btn"
                onClick={() => setFontScale(clampFontScale(fontScale + FONT_SCALE_STEP))}
                aria-label="放大字級"
              >
                A+
              </button>
            </div>
          </div>

          <div className="sentence-list" ref={sentenceListRef}>
            {article.sentences.map((s, i) => (
              <Sentence
                key={i}
                jp={s.jp}
                zh={s.zh}
                showRomaji={showRomaji}
                blurZh={zhBlur}
                vocab={article.vocab}
                rate={speechRate}
                onVocabEnter={handleVocabEnter}
                onVocabLeave={handleVocabLeave}
                onVocabClick={handleVocabClick}
              />
            ))}
          </div>
        </section>
      )}

      {tab === '閱讀測驗' && <QuizTab quiz={article.quiz} />}

      {tab === '重點單字' && (
        <div className="vocab-list">
          {article.vocab.map(v => (
            <VocabListItem key={v.word} v={v} rate={speechRate} />
          ))}
        </div>
      )}

      {tab === '文法' && (
        <div className="grammar-list">
          {article.grammar.map(g => (
            <div className="grammar-item" key={g.point}>
              <span className="grammar-point">{g.point}</span>
              <span className="grammar-explanation">{g.explanation}</span>
            </div>
          ))}
        </div>
      )}

      {article.seriesId && <PartNav article={article} />}

      {selectionSpeaker && (
        <button
          type="button"
          className="selection-speak-btn"
          style={{ left: selectionSpeaker.x, top: selectionSpeaker.y }}
          onMouseDown={e => e.preventDefault()}
          onClick={speakSelection}
        >
          ▶ 發音
        </button>
      )}

      {activeVocab && (
        <VocabPanel
          entry={activeVocab}
          pinned={vocabPinned}
          rate={speechRate}
          onClose={closeVocabPanel}
        />
      )}

      {listenMode && (
        <ListenMode
          article={article}
          rate={speechRate}
          listenZh={listenZh}
          listenGap={listenGap}
          listenBlackout={listenBlackout}
          onExit={() => setListenMode(false)}
        />
      )}
    </main>
  );
}

function VocabListItem({ v, rate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExamplePlaying, setIsExamplePlaying] = useState(false);

  function speakText(text, setPlaying) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate || 1;
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  const exampleParts = v.sentence ? parseFurigana(v.sentence.jp) : null;

  return (
    <div className="vocab-item">
      <div className="vocab-item-top">
        <span className="vocab-item-word">{v.word}</span>
        <span className="vocab-item-reading">{v.reading}</span>
        <button
          type="button"
          className={`vocab-panel-play${isPlaying ? ' playing' : ''}`}
          onClick={() => speakText(v.reading || v.word, setIsPlaying)}
          aria-label="播放發音"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <span className="vocab-item-meaning">{v.meaning}</span>
      </div>

      {v.sentence && (
        <div className="vocab-item-example">
          <div className="vocab-item-example-row">
            <p className="vocab-item-example-jp">
              {exampleParts.map((p, i) =>
                p.reading ? (
                  <ruby key={i}>{p.text}<rt>{p.reading}</rt></ruby>
                ) : (
                  <span key={i}>{p.text}</span>
                )
              )}
            </p>
            <button
              type="button"
              className={`vocab-panel-play${isExamplePlaying ? ' playing' : ''}`}
              onClick={() => speakText(readingOf(v.sentence.jp), setIsExamplePlaying)}
              aria-label="播放例句發音"
            >
              {isExamplePlaying ? '❚❚' : '▶'}
            </button>
          </div>
          <p className="vocab-item-example-zh">{v.sentence.zh}</p>
        </div>
      )}
    </div>
  );
}

function VocabPanel({ entry, pinned, rate, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExamplePlaying, setIsExamplePlaying] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    function onDocClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    }
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    };
  }, [onClose]);

  function speakText(text, setPlaying) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate || 1;
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  const exampleParts = entry.sentence ? parseFurigana(entry.sentence.jp) : null;

  return (
    <div ref={panelRef} className={`vocab-panel${pinned ? ' pinned' : ''}`}>
      <div className="vocab-panel-actions">
        <button type="button" className="vocab-panel-close" onClick={onClose} aria-label="關閉">✕</button>
      </div>
      <div className="vocab-panel-word-row">
        <span className="vocab-panel-word">{entry.word}</span>
        <button
          type="button"
          className={`vocab-panel-play${isPlaying ? ' playing' : ''}`}
          onClick={() => speakText(entry.reading || entry.word, setIsPlaying)}
          aria-label="播放發音"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>
      <div className="vocab-panel-reading">{entry.reading}</div>
      <div className="vocab-panel-meaning">{entry.meaning}</div>

      {entry.sentence && (
        <div className="vocab-panel-example">
          <div className="vocab-panel-word-row">
            <p className="vocab-panel-example-jp">
              {exampleParts.map((p, i) =>
                p.reading ? (
                  <ruby key={i}>{p.text}<rt>{p.reading}</rt></ruby>
                ) : (
                  <span key={i}>{p.text}</span>
                )
              )}
            </p>
            <button
              type="button"
              className={`vocab-panel-play${isExamplePlaying ? ' playing' : ''}`}
              onClick={() => speakText(readingOf(entry.sentence.jp), setIsExamplePlaying)}
              aria-label="播放例句發音"
            >
              {isExamplePlaying ? '❚❚' : '▶'}
            </button>
          </div>
          <p className="vocab-panel-example-zh">{entry.sentence.zh}</p>
        </div>
      )}
    </div>
  );
}

function ListenMode({ article, rate, listenZh, listenGap, listenBlackout, onExit }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const tokenRef = useRef(0);
  const wakeLockRef = useRef(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const isProgrammaticScroll = useRef(false);
  const settleTimerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function requestLock() {
      try {
        if (typeof navigator !== 'undefined' && navigator.wakeLock) {
          const lock = await navigator.wakeLock.request('screen');
          if (!cancelled) wakeLockRef.current = lock;
        }
      } catch {
        // Wake lock is best-effort — playback still works without it.
      }
    }
    requestLock();
    return () => {
      cancelled = true;
      tokenRef.current += 1;
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
      wakeLockRef.current?.release?.();
    };
  }, []);

  // Native scroll-snap drives the picker; the page behind it must not also
  // scroll, or its scrollbar competes with the picker for wheel/drag input.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function scrollToIndex(i, behavior) {
    const container = containerRef.current;
    const item = itemRefs.current[i];
    if (!container || !item) return;
    isProgrammaticScroll.current = true;
    const target = item.offsetTop - (container.clientHeight - item.clientHeight) / 2;
    container.scrollTo({ top: target, behavior });
    window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 400);
  }

  useEffect(() => {
    scrollToIndex(index, 'smooth');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // The scroller unmounts while dimmed (a different subtree is returned
  // below), so it remounts at scrollTop 0 whenever you come back — snap it
  // back to the current sentence instantly instead of leaving it at the top.
  useEffect(() => {
    if (!dimmed) scrollToIndex(index, 'auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimmed]);

  function handleScroll() {
    if (isProgrammaticScroll.current) return;
    window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const containerCenter = container.scrollTop + container.clientHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs(el.offsetTop + el.clientHeight / 2 - containerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      if (closest !== index) {
        if (playing) {
          tokenRef.current += 1;
          if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
          setPlaying(false);
        }
        setIndex(closest);
      }
    }, 150);
  }

  function speakText(text, lang, utterRate) {
    return new Promise(resolve => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        resolve();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = utterRate;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      window.speechSynthesis.speak(utterance);
    });
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function runFrom(startIndex) {
    const token = ++tokenRef.current;
    setPlaying(true);
    for (let i = startIndex; i < article.sentences.length; i++) {
      if (tokenRef.current !== token) return;
      setIndex(i);
      const s = article.sentences[i];
      await speakText(readingOf(s.jp), 'ja-JP', rate);
      if (tokenRef.current !== token) return;
      await wait(listenGap);
      if (tokenRef.current !== token) return;
      if (listenZh) {
        await speakText(s.zh, 'zh-TW', 1);
        if (tokenRef.current !== token) return;
        await wait(listenGap);
        if (tokenRef.current !== token) return;
      }
    }
    if (tokenRef.current === token) setPlaying(false);
  }

  function togglePlay() {
    if (playing) {
      tokenRef.current += 1;
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
      setPlaying(false);
    } else {
      runFrom(index);
      if (listenBlackout) setDimmed(true);
    }
  }

  function jumpTo(i) {
    if (playing) {
      tokenRef.current += 1;
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
      setPlaying(false);
    }
    setIndex(i);
  }

  if (dimmed) {
    return (
      <div className="listen-overlay listen-overlay-dim" onClick={() => setDimmed(false)}>
        <button
          type="button"
          className="listen-exit listen-exit-dim"
          onClick={e => { e.stopPropagation(); onExit(); }}
          aria-label="離開聆聽模式"
        >
          ✕
        </button>
        <p className="listen-dim-hint">聆聽模式中，點擊回復畫面</p>
      </div>
    );
  }

  return (
    <div className="listen-overlay">
      <button type="button" className="listen-exit" onClick={onExit} aria-label="離開聆聽模式">✕</button>

      <div className="listen-progress">{index + 1} / {article.sentences.length}</div>

      <div className="listen-scroller-wrap">
        <div className="listen-scroller" ref={containerRef} onScroll={handleScroll}>
          <div className="listen-scroller-pad" aria-hidden="true" />
          {article.sentences.map((s, i) => {
            const parts = parseFurigana(s.jp);
            return (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el; }}
                className={`listen-scroller-item${i === index ? ' current' : ''}`}
                onClick={() => jumpTo(i)}
              >
                <p className="listen-scroller-jp">
                  {parts.map((p, pi) =>
                    p.reading ? (
                      <ruby key={pi}>{p.text}<rt>{p.reading}</rt></ruby>
                    ) : (
                      <span key={pi}>{p.text}</span>
                    )
                  )}
                </p>
                <p className="listen-scroller-zh">{s.zh}</p>
              </div>
            );
          })}
          <div className="listen-scroller-pad" aria-hidden="true" />
        </div>
      </div>

      <div className="listen-controls">
        <button type="button" className="listen-btn listen-btn-main" onClick={togglePlay} aria-label={playing ? '暫停' : '播放'}>
          {playing ? '❚❚' : '▶'}
        </button>
      </div>

      <div className="listen-bottom-row">
        <button type="button" className="listen-dim-btn" onClick={() => setDimmed(true)}>
          🌑 開車模式：畫面全黑
        </button>
        <button type="button" className="listen-dim-btn" onClick={() => setSettingsOpen(o => !o)}>
          ⚙ 設定
        </button>
      </div>

      {settingsOpen && (
        <div className="listen-settings">
          <label className="listen-zh-toggle">
            <input type="checkbox" checked={listenZh} onChange={e => setListenZh(e.target.checked)} />
            唸中文翻譯
          </label>
          <div className="listen-gap-control">
            {LISTEN_GAPS.map(g => (
              <button
                key={g.value}
                type="button"
                className={`listen-gap-btn${listenGap === g.value ? ' active' : ''}`}
                onClick={() => setListenGap(g.value)}
              >
                停頓：{g.label}
              </button>
            ))}
          </div>
          <label className="listen-zh-toggle">
            <input
              type="checkbox"
              checked={listenBlackout}
              onChange={e => setListenBlackout(e.target.checked)}
            />
            下次開啟聆聽模式時自動全黑
          </label>
        </div>
      )}
    </div>
  );
}

function PartTabs({ article }) {
  const parts = getSeriesParts(article.seriesId);
  if (parts.length < 2) return null;

  return (
    <div className="part-tabs-row">
      <span className="part-tabs-label">章節</span>
      <div className="part-tabs">
        {parts.map(p => (
          <Link
            key={p.id}
            href={`/reading/${p.id}`}
            className={`part-tab${p.id === article.id ? ' active' : ''}`}
          >
            {p.partTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PartNav({ article }) {
  const { prev, next } = getAdjacentParts(article);
  if (!prev && !next) return null;

  return (
    <div className="part-nav">
      {prev ? (
        <Link href={`/reading/${prev.id}`} className="part-nav-link">← 第{prev.partTitle}章</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/reading/${next.id}`} className="part-nav-link">第{next.partTitle}章 →</Link>
      ) : (
        <span />
      )}
    </div>
  );
}

function QuizTab({ quiz }) {
  const [answers, setAnswers] = useState({});

  function choose(qIndex, optIndex) {
    if (answers[qIndex] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  }

  return (
    <div className="quiz-list">
      {quiz.map((q, qi) => {
        const chosen = answers[qi];
        const answered = chosen !== undefined;

        return (
          <div className="quiz-item" key={qi}>
            <p className="quiz-question">{q.question}</p>
            <div className="quiz-options">
              {q.options.map((opt, oi) => {
                let state = '';
                if (answered) {
                  if (oi === q.answerIndex) state = 'correct';
                  else if (oi === chosen) state = 'wrong';
                }
                return (
                  <button
                    key={oi}
                    className={`quiz-option${state ? ` ${state}` : ''}`}
                    onClick={() => choose(qi, oi)}
                    disabled={answered}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
