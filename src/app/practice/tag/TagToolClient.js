'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { parseFurigana } from '@/lib/reading/furigana';
import { labelForPosValue } from '@/lib/practice/bank/posLabels';
import { explanationForPosValue } from '@/lib/practice/bank/posExplanations';

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
  otherCategory: '其他詞類（副詞／連接詞等）',
};

const POS_FIELDS = Object.keys(FIELD_LABELS);

// Assembles a single copy-paste-ready block asking an AI chat tool to work
// out this item's POS tags, using the same field labels/option enum as the
// checkboxes below it — so the AI's reply can be read straight back onto
// the form instead of needing translation.
function buildAiPrompt(item, posOptions) {
  const lines = [];
  lines.push('請幫我判斷以下日文題目中「目標詞／文法點」的詞性分類，並簡短說明理由（繁體中文回答），然後我只有初階程度，我也想知道句子中其他字彙(如果是漢字也要跟我說平假平拼音)跟其他動詞形容詞文法，也請幫我解釋。');
  lines.push('');
  lines.push('【題目資訊】');
  lines.push(`等級：${item.level}　類型：${item.type}${item.section ? `　小節：${item.section}` : ''}`);
  if (item.pointIds?.length > 0) lines.push(`關聯文法點：${item.pointIds.join(', ')}`);
  lines.push('');

  if (item.jp) {
    lines.push('【日文句子】');
    lines.push(item.jp);
    lines.push('');
  }
  if (item.zh) {
    lines.push('【中文翻譯】');
    lines.push(item.zh);
    lines.push('');
  }
  if (item.target) {
    lines.push('【目標詞／文法點】');
    lines.push(item.target);
    lines.push('');
  }
  if (item.meaning?.prompt) {
    lines.push('【題目內容】');
    lines.push(item.meaning.prompt);
    if (item.meaning.options?.length > 0) {
      lines.push(`選項：${item.meaning.options.join(' / ')}`);
      if (item.meaning.answerIndex != null) {
        lines.push(`正解：${item.meaning.options[item.meaning.answerIndex]}`);
      }
    }
    lines.push('');
  }
  if (item.cloze?.options?.length > 0) {
    lines.push('【克漏字選項】');
    lines.push(item.cloze.options.join(' / '));
    if (item.cloze.answerIndex != null) {
      lines.push(`正解：${item.cloze.options[item.cloze.answerIndex]}`);
    }
    lines.push('');
  }
  if (item.imageDescription) {
    lines.push('【圖片描述】');
    lines.push(item.imageDescription);
    lines.push('');
  }
  if (item.script) {
    lines.push('【聽力文字稿】');
    lines.push(item.script);
    lines.push('');
  }

  lines.push('【請從下列類別中選出最符合的項目（每項可複選，不適用可留空）】');
  for (const field of POS_FIELDS) {
    const options = posOptions[field] || [];
    const optionText = options.map(opt => `${labelForPosValue(field, opt)}（${opt}）`).join('、');
    lines.push(`${FIELD_LABELS[field]}：${optionText || '（尚無選項）'}`);
  }
  lines.push('');
  lines.push('如果都不適合，請提出一個新的分類名稱（英文、連字號格式，例如 conditional-nara）。');
  lines.push('');
  lines.push('請用以下格式回答：');
  for (const field of POS_FIELDS) {
    lines.push(`${FIELD_LABELS[field]}：`);
  }
  lines.push('理由：');
  lines.push('');
  lines.push('【額外需求：生詞與文法標註】');
  lines.push('請針對句子中值得初學者特別留意的單字與文法點，各自標出以下資訊：');
  lines.push('- surface：這個字彙／文法點在原句中實際出現的字面文字（用來比對位置，不可省略或改寫）');
  lines.push('- word：字典形或代表形式');
  lines.push('- reading：假名讀音（只有包含漢字時需要）');
  lines.push('- meaning：中文意思或用法說明');
  lines.push('- type：vocab（單字）或 grammar（文法點）');
  lines.push('- sentence（選填）：如果能舉一個額外的例句幫助理解，用 { "jp": "...", "zh": "..." } 附上（jp 需標假名，格式為 漢字[かな]）');
  lines.push('');
  lines.push('請在回答最後另外附上一段 ```json 區塊（只放這個 JSON，不要夾雜其他文字），格式如下：');
  lines.push('```json');
  lines.push('{');
  lines.push('  "notes": [');
  lines.push('    { "surface": "留学した", "word": "留学する", "reading": "りゅうがくした", "meaning": "留學（過去式）", "type": "vocab", "sentence": { "jp": "去年[きょねん]日本[にほん]に留学[りゅうがく]した。", "zh": "去年去日本留學了。" } },');
  lines.push('    { "surface": "といっても", "word": "といっても", "meaning": "雖說……（但程度沒那麼誇張）", "type": "grammar" }');
  lines.push('  ]');
  lines.push('}');
  lines.push('```');

  return lines.join('\n');
}

function PromptBlock({ item, posOptions }) {
  const [copied, setCopied] = useState(false);
  const prompt = buildAiPrompt(item, posOptions);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="prompt-block">
      <div className="prompt-block-head">
        <span className="field-label">複製給 AI 的詢問內容</span>
        <button type="button" className="btn" onClick={handleCopy}>
          {copied ? '已複製 ✓' : '複製'}
        </button>
      </div>
      <textarea
        className="prompt-textarea"
        readOnly
        value={prompt}
        onFocus={e => e.target.select()}
        rows={14}
      />
    </section>
  );
}

// Parses the ```json { "notes": [...] }``` block the prompt above asks the
// AI to append, and hands the cleaned array up to the parent so it rides
// along in the next save — this is how a bank item picks up the clickable
// vocab/grammar notes rendered during practice (see lib/practice/bank/notes.js).
function NotesPasteBox({ value, onChange }) {
  const [raw, setRaw] = useState('');
  const [parseError, setParseError] = useState('');

  function handleParse() {
    setParseError('');
    try {
      const jsonText = raw.trim().replace(/^```json/i, '').replace(/```$/, '').trim();
      const parsed = JSON.parse(jsonText);
      const notes = Array.isArray(parsed) ? parsed : parsed.notes;
      if (!Array.isArray(notes)) throw new Error('找不到 notes 陣列');
      const cleaned = notes
        .filter(n => n && n.surface && n.meaning)
        .map(n => ({
          surface: String(n.surface),
          word: String(n.word || n.surface),
          ...(n.reading ? { reading: String(n.reading) } : {}),
          meaning: String(n.meaning),
          type: n.type === 'grammar' ? 'grammar' : 'vocab',
          ...(n.sentence?.jp ? { sentence: { jp: String(n.sentence.jp), zh: String(n.sentence.zh || '') } } : {}),
        }));
      onChange(cleaned);
    } catch (err) {
      setParseError(`JSON 解析失敗：${err.message}`);
      onChange([]);
    }
  }

  return (
    <section className="prompt-block">
      <div className="prompt-block-head">
        <span className="field-label">貼上 AI 回覆的生詞／文法 JSON（選填）</span>
        <button type="button" className="btn" onClick={handleParse} disabled={!raw.trim()}>解析</button>
      </div>
      <textarea
        className="prompt-textarea"
        placeholder="把 AI 回覆最後那段 ```json ...``` 貼在這裡"
        value={raw}
        onChange={e => setRaw(e.target.value)}
        rows={8}
      />
      {parseError && <p className="import-error">{parseError}</p>}
      {value.length > 0 && (
        <p className="field-hint">
          已解析 {value.length} 筆標註：{value.map(n => n.surface).join('、')}
        </p>
      )}
    </section>
  );
}

function PosField({ field, options, selected, customInput, onToggle, onCustomInputChange, onAddCustom, onExplain }) {
  // Union so a just-added custom value shows up (checked) immediately,
  // without waiting for the next /api/practice-tag fetch to refresh posOptions.
  const displayOptions = [...options, ...selected.filter(v => !options.includes(v))];
  return (
    <div className="field">
      <label className="field-label">{FIELD_LABELS[field]}</label>
      <div className="pos-checkbox-group">
        {displayOptions.map(opt => (
          <span key={opt} className="pos-checkbox-item">
            <label className="pos-checkbox-option">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(field, opt)}
              />
              {labelForPosValue(field, opt)}
            </label>
            {explanationForPosValue(field, opt) && (
              <button
                type="button"
                className="pos-explain-btn"
                aria-label={`說明：${labelForPosValue(field, opt)}`}
                onClick={() => onExplain(field, opt)}
              >
                ?
              </button>
            )}
          </span>
        ))}
      </div>
      <div className="pos-custom-add">
        <input
          type="text"
          placeholder="+ 新增選項（英文、連字號，如 conditional-nara）"
          value={customInput}
          onChange={e => onCustomInputChange(field, e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onAddCustom(field);
            }
          }}
        />
        <button type="button" onClick={() => onAddCustom(field)} disabled={!customInput.trim()}>
          新增
        </button>
      </div>
      {selected.length === 0 && <p className="field-hint">（不適用 / 尚未決定）</p>}
    </div>
  );
}

export default function TagToolClient() {
  const [item, setItem] = useState(undefined); // undefined = loading, null = done
  const [remaining, setRemaining] = useState(0);
  const [posOptions, setPosOptions] = useState({ verbCategory: [], verbConjugation: [], adjCategory: [], adjConjugation: [], otherCategory: [] });
  const [values, setValues] = useState({}); // field -> string[] of selected values
  const [newOptions, setNewOptions] = useState({}); // field -> string[] of values added this session, not yet in posOptions
  const [customInputs, setCustomInputs] = useState({}); // field -> current text in the "add new" input
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [explainTarget, setExplainTarget] = useState(null); // { field, value } | null
  const [notes, setNotes] = useState([]); // parsed from the pasted AI JSON, see NotesPasteBox
  const questionRef = useRef(null);

  function resetForm() {
    setValues({});
    setNewOptions({});
    setCustomInputs({});
    setNotes([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleToggle(field, option) {
    setValues(v => {
      const current = v[field] || [];
      const next = current.includes(option) ? current.filter(o => o !== option) : [...current, option];
      return { ...v, [field]: next };
    });
  }

  function handleCustomInputChange(field, text) {
    setCustomInputs(v => ({ ...v, [field]: text }));
  }

  function handleAddCustom(field) {
    const custom = (customInputs[field] || '').trim();
    if (!custom) return;
    setValues(v => {
      const current = v[field] || [];
      return current.includes(custom) ? v : { ...v, [field]: [...current, custom] };
    });
    setNewOptions(v => {
      const current = v[field] || [];
      return current.includes(custom) ? v : { ...v, [field]: [...current, custom] };
    });
    setCustomInputs(v => ({ ...v, [field]: '' }));
  }

  function handleExplain(field, value) {
    setExplainTarget({ field, value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const tags = {};
    for (const field of POS_FIELDS) {
      if (values[field]?.length > 0) tags[field] = values[field];
    }

    try {
      const res = await fetch('/api/practice-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, tags, newOptions, notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '儲存失敗');
      setItem(data.next);
      setRemaining(data.remaining);
      setPosOptions(data.posOptions);
      resetForm();
      questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        逐題標記 verbCategory / verbConjugation / adjCategory / adjConjugation / otherCategory。不適用就留空直接送出即可，這題會被標記為「已看過」，不會再出現。
      </p>

      {item === null ? (
        <p>全部題目都標記完成了 🎉</p>
      ) : (
        <>
          <p className="field-hint" ref={questionRef}>剩餘待標題目：{remaining}</p>

          <PromptBlock item={item} posOptions={posOptions} />

          <NotesPasteBox value={notes} onChange={setNotes} />

          <form onSubmit={handleSubmit}>
            {POS_FIELDS.map(field => (
              <PosField
                key={field}
                field={field}
                options={posOptions[field] || []}
                selected={values[field] || []}
                customInput={customInputs[field] || ''}
                onToggle={handleToggle}
                onCustomInputChange={handleCustomInputChange}
                onAddCustom={handleAddCustom}
                onExplain={handleExplain}
              />
            ))}

            {error && <p className="import-error">{error}</p>}

            <button type="submit" className="btn btn-submit" disabled={saving}>
              {saving ? '儲存中…' : '儲存並下一題'}
            </button>
          </form>
        </>
      )}

      {explainTarget && (() => {
        const explanation = explanationForPosValue(explainTarget.field, explainTarget.value);
        if (!explanation) return null;
        return (
          <div className="pos-modal-backdrop" onClick={() => setExplainTarget(null)}>
            <div className="pos-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={explanation.title}>
              <button
                type="button"
                className="pos-modal-close"
                aria-label="關閉"
                onClick={() => setExplainTarget(null)}
              >
                ×
              </button>
              <h2 className="pos-modal-title">{explanation.title}</h2>
              <section className="pos-modal-section">
                <h3>變化規則</h3>
                <p>{explanation.formation}</p>
              </section>
              <section className="pos-modal-section">
                <h3>用法</h3>
                <p>{explanation.usage}</p>
              </section>
              {explanation.notes && (
                <section className="pos-modal-section">
                  <h3>常見陷阱 / 補充說明</h3>
                  <p>{explanation.notes}</p>
                </section>
              )}
              <section className="pos-modal-section">
                <h3>例句</h3>
                {explanation.examples.map((ex, i) => (
                  <div key={i} className="pos-modal-example">
                    <p className="pos-modal-example-jp">{renderRuby(ex.jp, `explain-jp-${i}`)}</p>
                    <p className="field-hint">{ex.zh}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
