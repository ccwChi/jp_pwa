'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseFurigana } from '@/lib/reading/furigana';

function renderRuby(text, keyPrefix) {
  return parseFurigana(text).map((p, i) =>
    p.reading ? (
      <ruby key={`${keyPrefix}-${i}`}>{p.text}<rt>{p.reading}</rt></ruby>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{p.text}</span>
    )
  );
}

const FIELD_LABELS = {
  verbCategory: '動詞類別',
  verbConjugation: '動詞變化形',
  adjCategory: '形容詞類別',
  adjConjugation: '形容詞變化形',
};

const POS_FIELDS = Object.keys(FIELD_LABELS);

function PosField({ field, options, value, customValue, onChange, onCustomChange }) {
  return (
    <div className="field">
      <label className="field-label">{FIELD_LABELS[field]}</label>
      <select
        value={value === '__custom__' ? '__custom__' : value}
        onChange={e => onChange(field, e.target.value)}
      >
        <option value="">（不適用 / 尚未決定）</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
        <option value="__custom__">+ 新增選項…</option>
      </select>
      {value === '__custom__' && (
        <input
          type="text"
          placeholder="輸入新的選項值（英文、連字號，如 conditional-nara）"
          value={customValue}
          onChange={e => onCustomChange(field, e.target.value)}
        />
      )}
    </div>
  );
}

export default function TagToolClient() {
  const [item, setItem] = useState(undefined); // undefined = loading, null = done
  const [remaining, setRemaining] = useState(0);
  const [posOptions, setPosOptions] = useState({ verbCategory: [], verbConjugation: [], adjCategory: [], adjConjugation: [] });
  const [values, setValues] = useState({});
  const [customValues, setCustomValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function resetForm() {
    setValues({});
    setCustomValues({});
  }

  async function loadNext() {
    setError('');
    const res = await fetch('/api/practice-tag');
    const data = await res.json();
    setItem(data.item);
    setRemaining(data.remaining);
    setPosOptions(data.posOptions);
    resetForm();
  }

  // One-time fetch-on-mount bootstrap, not a subscription to an external
  // store — same accepted exception as useImportWizard.js's draft-restore effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadNext();
  }, []);

  function handleChange(field, value) {
    setValues(v => ({ ...v, [field]: value }));
  }

  function handleCustomChange(field, value) {
    setCustomValues(v => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const tags = {};
    const newOptions = {};
    for (const field of POS_FIELDS) {
      const raw = values[field];
      if (raw === '__custom__') {
        const custom = (customValues[field] || '').trim();
        if (custom) {
          tags[field] = custom;
          newOptions[field] = custom;
        }
      } else if (raw) {
        tags[field] = raw;
      }
    }

    try {
      const res = await fetch('/api/practice-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, tags, newOptions }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '儲存失敗');
      setItem(data.next);
      setRemaining(data.remaining);
      setPosOptions(data.posOptions);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (item === undefined) {
    return (
      <main className="container import-tool">
        <p>載入中…</p>
      </main>
    );
  }

  return (
    <main className="container import-tool">
      <div className="page-head">
        <Link href="/grammar" className="back-link">← 返回</Link>
      </div>
      <h1 className="page-title">動詞／形容詞標記工具</h1>
      <p className="field-hint">
        逐題標記 verbCategory / verbConjugation / adjCategory / adjConjugation。不適用就留空直接送出即可，這題會被標記為「已看過」，不會再出現。
      </p>

      {item === null ? (
        <p>全部題目都標記完成了 🎉</p>
      ) : (
        <>
          <p className="field-hint">剩餘待標題目：{remaining}</p>

          <section className="quiz-question" style={{ marginBottom: '1.5rem' }}>
            <p className="field-label">
              {item.level} · {item.type} · {item.section}
              {item.pointIds?.length > 0 && ` · ${item.pointIds.join(', ')}`}
            </p>
            {item.jp && <p style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>{renderRuby(item.jp, 'jp')}</p>}
            {item.zh && <p className="field-hint">{item.zh}</p>}
            {item.target && <p><strong>{renderRuby(item.target, 'target')}</strong></p>}
            {item.meaning?.prompt && <p style={{ whiteSpace: 'pre-wrap' }}>{item.meaning.prompt}</p>}
            {item.meaning?.options && (
              <ul className="quiz-options">
                {item.meaning.options.map((opt, i) => (
                  <li key={i} className={`quiz-option${i === item.meaning.answerIndex ? ' correct' : ''}`}>{opt}</li>
                ))}
              </ul>
            )}
            {item.cloze?.options && (
              <p className="field-hint">cloze 選項：{item.cloze.options.join(' / ')}（答案：{item.cloze.options[item.cloze.answerIndex]}）</p>
            )}
          </section>

          <form onSubmit={handleSubmit}>
            {POS_FIELDS.map(field => (
              <PosField
                key={field}
                field={field}
                options={posOptions[field] || []}
                value={values[field] || ''}
                customValue={customValues[field] || ''}
                onChange={handleChange}
                onCustomChange={handleCustomChange}
              />
            ))}

            {error && <p className="import-error">{error}</p>}

            <button type="submit" className="btn btn-submit" disabled={saving}>
              {saving ? '儲存中…' : '儲存並下一題'}
            </button>
          </form>
        </>
      )}
    </main>
  );
}
