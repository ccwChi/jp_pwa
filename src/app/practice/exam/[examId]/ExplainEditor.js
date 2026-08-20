'use client';

import { useState } from 'react';

const NOTE_TYPES = [
  { value: 'vocab', label: '單字' },
  { value: 'grammar', label: '文法' },
];

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

function emptyNoteRow() {
  return { surface: '', word: '', reading: '', meaning: '', type: 'vocab', sentenceJp: '', sentenceZh: '' };
}

function notesToRows(notes) {
  if (!notes || notes.length === 0) return [emptyNoteRow()];
  return notes.map(n => ({
    surface: n.surface || '',
    word: n.word || n.surface || '',
    reading: n.reading || '',
    meaning: n.meaning || '',
    type: n.type === 'grammar' ? 'grammar' : 'vocab',
    sentenceJp: n.sentence?.jp || '',
    sentenceZh: n.sentence?.zh || '',
  }));
}

function rowsToNotes(rows) {
  return rows
    .filter(r => r.surface.trim() && r.meaning.trim())
    .map(r => ({
      surface: r.surface.trim(),
      word: r.word.trim() || r.surface.trim(),
      ...(r.reading.trim() ? { reading: r.reading.trim() } : {}),
      meaning: r.meaning.trim(),
      type: r.type,
      ...(r.sentenceJp.trim() ? { sentence: { jp: r.sentenceJp.trim(), zh: r.sentenceZh.trim() } } : {}),
    }));
}

// Dev-only inline editor for one bank item's `notes` (clickable vocab/grammar
// popovers, see lib/practice/bank/notes.js) and `optionExplanations` (the
// per-option ABCD breakdown shown in exam review). Reads/saves via
// /api/practice-explain, which is excluded from the static-export build
// (deploy.yml deletes src/app/api wholesale) — the caller is responsible for
// only rendering this component when NEXT_PUBLIC_STATIC_EXPORT isn't set, so
// it never appears on the deployed site.
export default function ExplainEditor({ item, onSaved, onClose }) {
  const options = item.meaning?.options || [];
  const [noteRows, setNoteRows] = useState(() => notesToRows(item.notes));
  const [explanations, setExplanations] = useState(() => {
    const existing = item.optionExplanations || [];
    return options.map((_, i) => existing[i] || '');
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function updateNoteRow(i, field, value) {
    setNoteRows(rows => rows.map((r, ri) => (ri === i ? { ...r, [field]: value } : r)));
  }

  function addNoteRow() {
    setNoteRows(rows => [...rows, emptyNoteRow()]);
  }

  function removeNoteRow(i) {
    setNoteRows(rows => rows.filter((_, ri) => ri !== i));
  }

  function updateExplanation(i, value) {
    setExplanations(rows => rows.map((r, ri) => (ri === i ? value : r)));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/practice-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          notes: rowsToNotes(noteRows),
          optionExplanations: explanations,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '儲存失敗');
      onSaved(data.item);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="explain-editor">
      <div className="prompt-block-head">
        <span className="field-label">✏️ 編輯生字與解析（僅本機開發環境可用）</span>
        <button type="button" className="btn" onClick={onClose}>關閉</button>
      </div>

      <div className="field">
        <label className="field-label">生字／文法標註</label>
        <p className="field-hint">每列一個字彙或文法點；「原文」須與題目中實際出現的字面一致，才能被標記為可點擊。</p>
        {noteRows.map((row, i) => (
          <div key={i} className="explain-editor-note-row">
            <div className="explain-editor-note-grid">
              <input
                type="text"
                placeholder="原文（surface，必填）"
                value={row.surface}
                onChange={e => updateNoteRow(i, 'surface', e.target.value)}
              />
              <input
                type="text"
                placeholder="字典形／代表形式"
                value={row.word}
                onChange={e => updateNoteRow(i, 'word', e.target.value)}
              />
              <input
                type="text"
                placeholder="讀音（假名，選填）"
                value={row.reading}
                onChange={e => updateNoteRow(i, 'reading', e.target.value)}
              />
              <select value={row.type} onChange={e => updateNoteRow(i, 'type', e.target.value)}>
                {NOTE_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="中文意思／用法說明（必填）"
              value={row.meaning}
              onChange={e => updateNoteRow(i, 'meaning', e.target.value)}
            />
            <div className="explain-editor-note-grid explain-editor-note-grid-sentence">
              <input
                type="text"
                placeholder="例句日文（選填，格式：漢字[かな]）"
                value={row.sentenceJp}
                onChange={e => updateNoteRow(i, 'sentenceJp', e.target.value)}
              />
              <input
                type="text"
                placeholder="例句中文翻譯（選填）"
                value={row.sentenceZh}
                onChange={e => updateNoteRow(i, 'sentenceZh', e.target.value)}
              />
            </div>
            <button
              type="button"
              className="explain-editor-remove-btn"
              onClick={() => removeNoteRow(i)}
              aria-label="刪除這列"
            >
              ✕ 刪除
            </button>
          </div>
        ))}
        <button type="button" className="btn" onClick={addNoteRow}>+ 新增一列生字</button>
      </div>

      {options.length > 0 && (
        <div className="field">
          <label className="field-label">選項解析（ABCD，各一行，選填）</label>
          {options.map((opt, i) => (
            <div key={i} className="explain-editor-option-row">
              <span className="exam-option-explanation-label">{OPTION_LABELS[i] || i + 1}</span>
              <span className="explain-editor-option-text">{opt}</span>
              <input
                type="text"
                placeholder="這個選項為什麼對／錯"
                value={explanations[i]}
                onChange={e => updateExplanation(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {error && <p className="import-error">{error}</p>}

      <button type="button" className="btn btn-submit" onClick={handleSave} disabled={saving}>
        {saving ? '儲存中…' : '儲存'}
      </button>
    </div>
  );
}
