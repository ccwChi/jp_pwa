'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useImportWizard } from './useImportWizard';

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

export default function ImportTool({ existingSeriesIds }) {
  const wizard = useImportWizard({ existingSeriesIds });
  const {
    step, rawInput, setRawInput, parseError, sentences, chapters, splitSet,
    chapterTitles, setChapterTitle, seriesTitle, setSeriesTitle, level, setLevel,
    excerpt, setExcerpt, seriesId, setSeriesId, idCollision, overwriteAck, setOverwriteAck,
    submitState, submitError, resultHref, actions,
  } = wizard;

  const [searchQuery, setSearchQuery] = useState('');
  const [matchCursor, setMatchCursor] = useState(0);
  const [toast, setToast] = useState('');

  const rowRefs = useRef([]);
  const toastTimer = useRef(null);

  const matches = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];
    return sentences
      .map((s, i) => ({ i, hit: s.jp.includes(q) || s.zh.includes(q) }))
      .filter(m => m.hit)
      .map(m => m.i);
  }, [searchQuery, sentences]);

  function showToast(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1400);
  }

  function jumpToRow(index) {
    rowRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function goToMatch(delta) {
    if (matches.length === 0) return;
    const next = (matchCursor + delta + matches.length) % matches.length;
    setMatchCursor(next);
    jumpToRow(matches[next]);
  }

  function handleToggleSplit(index) {
    const wasSplit = splitSet.has(index);
    actions.toggleSplit(index);
    showToast(wasSplit ? '已取消切章' : '已在此切章');
  }

  return (
    <main className="container import-tool">
      <div className="page-head">
        <Link href="/reading" className="back-link">← 文章列表</Link>
        {step !== 'paste' && (
          <button type="button" className="icon-btn" onClick={actions.restart}>重新開始</button>
        )}
      </div>

      <h1 className="page-title">匯入長篇文章</h1>

      {step === 'paste' && (
        <div className="import-step">
          <p className="field-hint">
            把 AI 轉換好的內容整段貼進來（含說明文字、``` 符號都沒關係，會自動抓出陣列部分）。
          </p>
          <textarea
            className="paste-box"
            rows={16}
            value={rawInput}
            onChange={e => setRawInput(e.target.value)}
            placeholder="貼上 AI 回傳的內容…"
          />
          {parseError && <p className="import-error">{parseError}</p>}
          <button type="button" className="btn btn-submit" onClick={actions.handleParse}>解析</button>
        </div>
      )}

      {step === 'split' && (
        <div className="import-split">
          <div className="import-split-main">
            <div className="import-search">
              <input
                type="text"
                placeholder="搜尋句子…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setMatchCursor(0); }}
              />
              <button type="button" className="icon-btn" onClick={() => goToMatch(-1)} disabled={!matches.length}>↑</button>
              <button type="button" className="icon-btn" onClick={() => goToMatch(1)} disabled={!matches.length}>↓</button>
              {searchQuery && <span className="import-search-count">{matches.length} 筆</span>}
            </div>

            <div className="import-sentence-list">
              {sentences.map((s, i) => (
                <div key={i}>
                  <div className="import-row" ref={el => (rowRefs.current[i] = el)}>
                    <p className="import-row-jp">{s.jp}</p>
                    <p className="import-row-zh">{s.zh}</p>
                  </div>
                  {i < sentences.length - 1 && (
                    <button
                      type="button"
                      className={`import-gap${splitSet.has(i) ? ' active' : ''}`}
                      onClick={() => handleToggleSplit(i)}
                    >
                      {splitSet.has(i) ? `── 分章點 ──` : '+'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="import-chapter-rail">
            <div className="import-chapter-rail-title">章節（{chapters.length}）</div>
            {chapters.map((c, i) => (
              <button
                type="button"
                key={i}
                className="import-chapter-jump"
                onClick={() => jumpToRow(c.startIndex)}
              >
                第 {i + 1} 章 · {c.sentences.length} 句
              </button>
            ))}
            <button type="button" className="btn btn-submit import-next-btn" onClick={actions.goToNameStep}>
              下一步：命名章節 →
            </button>
          </aside>
        </div>
      )}

      {step === 'name' && (
        <div className="import-step">
          <p className="field-hint">幫每一章取名字（會顯示成「第 X 章」，X 換成你填的內容）。</p>
          <div className="import-chapter-name-list">
            {chapters.map((c, i) => (
              <div className="import-chapter-name-row" key={i}>
                <input
                  type="text"
                  value={chapterTitles[i] ?? String(i + 1)}
                  onChange={e => setChapterTitle(i, e.target.value)}
                />
                <span className="import-chapter-name-preview">
                  {c.sentences.length} 句 · {c.sentences[0].jp.slice(0, 16)}… → …{c.sentences[c.sentences.length - 1].jp.slice(-16)}
                </span>
              </div>
            ))}
          </div>
          <div className="import-step-actions">
            <button type="button" className="btn" onClick={actions.goToSplitStep}>← 回去調整切點</button>
            <button type="button" className="btn btn-submit" onClick={actions.goToConfirmStep}>下一步：作品資訊 →</button>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="import-step">
          <label className="field">
            <span className="field-label">作品標題</span>
            <input type="text" value={seriesTitle} onChange={e => setSeriesTitle(e.target.value)} placeholder="例：ごん狐" />
          </label>
          <label className="field">
            <span className="field-label">等級</span>
            <select value={level} onChange={e => setLevel(e.target.value)}>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="field-label">簡介</span>
            <textarea rows={2} value={excerpt} onChange={e => setExcerpt(e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">網址代號（英文/數字/連字號，日文標題無法自動轉換，建議手動輸入）</span>
            <input
              type="text"
              value={seriesId}
              onChange={e => setSeriesId(e.target.value)}
              placeholder="例：gon-gitsune"
            />
          </label>

          <button type="button" className="btn btn-submit" onClick={actions.goToReviewStep} disabled={!seriesTitle || !seriesId}>
            下一步：最終確認 →
          </button>
        </div>
      )}

      {step === 'review' && (
        <div className="import-step">
          <h2 className="block-label">最終確認</h2>
          <p><strong>{seriesTitle}</strong>（{level}）· {chapters.length} 章</p>
          <p className="field-hint">{excerpt}</p>
          <p className="field-hint">網址代號：{seriesId}</p>

          <div className="import-chapter-name-list">
            {chapters.map((c, i) => (
              <div className="import-chapter-name-row" key={i}>
                <span>第 {chapterTitles[i]} 章</span>
                <span className="import-chapter-name-preview">{c.sentences.length} 句</span>
              </div>
            ))}
          </div>

          {idCollision && (
            <div className="import-warning">
              <p>⚠ 代號「{seriesId}」已經存在，寫入會整個覆蓋掉那個作品原本的檔案（包含你手動補上的單字/文法/測驗）。</p>
              <label className="import-ack">
                <input type="checkbox" checked={overwriteAck} onChange={e => setOverwriteAck(e.target.checked)} />
                我了解，確定要覆蓋
              </label>
            </div>
          )}

          {submitState === 'error' && <p className="import-error">{submitError}</p>}

          <div className="import-step-actions">
            <button type="button" className="btn" onClick={actions.backToConfirmStep}>← 回去修改</button>
            <button
              type="button"
              className="btn btn-submit"
              onClick={actions.handleSubmit}
              disabled={submitState === 'submitting' || (idCollision && !overwriteAck)}
            >
              {submitState === 'submitting' ? '寫入中…' : '確定寫入'}
            </button>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="import-step">
          <p>寫入完成！</p>
          <Link href={resultHref} className="btn btn-submit">前往閱讀 →</Link>
        </div>
      )}

      {toast && <div className="import-toast">{toast}</div>}
    </main>
  );
}
