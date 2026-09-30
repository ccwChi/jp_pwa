'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseFurigana, readingOf } from '@/lib/reading/furigana';
import { playAudioOrSpeak, stopAllPlayback } from '@/lib/audio/playback';
import { useJourneyProgress, saveJourneyProgress, recordQuestionAttempt, saveNote, useSpeechRate, setSpeechRate } from '@/lib/storage';
import { shuffle } from '@/lib/practice/session';

function Ruby({ text }) {
  return parseFurigana(text).map((p, i) => p.reading ? <ruby key={i}>{p.text}<rt>{p.reading}</rt></ruby> : <span key={i}>{p.text}</span>);
}

export default function JourneyPlayer({ journey }) {
  const progress = useJourneyProgress();
  const stored = progress[journey.id] || {};
  const index = Math.min(Math.max(stored.stage || 0, 0), journey.stages.length - 1);
  const stage = journey.stages[index];
  const step = stored.step || 'encounter';
  const rate = useSpeechRate();
  const [message, setMessage] = useState('');
  useEffect(() => () => stopAllPlayback(), []);
  function update(patch) { saveJourneyProgress(journey.id, patch); }
  function moveTo(stageIndex) {
    stopAllPlayback(); setMessage('');
    update({ stage: stageIndex, step: 'encounter', answers: {}, revealed: false, orders: [] });
  }
  function answer(qi, oi) {
    const q = stage.questions[qi];
    const correct = oi === q.answerIndex;
    recordQuestionAttempt(`journey:${journey.id}:${stage.id}:${qi}`, correct);
    update({ answers: { ...stored.answers, [qi]: oi } });
  }
  const passed = stage.questions.every((q, i) => stored.answers?.[i] === q.answerIndex);
  function finish() {
    update({ step: 'complete', completed: [...new Set([...(stored.completed || []), stage.id])] });
  }
  function play(text) { playAudioOrSpeak({ text: readingOf(text), rate }); }
  return <main className="container journey-player">
    <div className="page-head"><Link href="/" className="back-link">← 路線與書架</Link><span className="row-meta">進度自動保存</span></div>
    <p className="journey-eyebrow">{journey.kind} · {journey.title}</p>
    <nav className="journey-stage-nav" aria-label="自由選關">{journey.stages.map((s, i) => <button key={s.id} className={`chip${i === index ? ' active' : ''}`} aria-current={i === index ? 'step' : undefined} onClick={() => moveTo(i)}>{stored.completed?.includes(s.id) ? '✓ ' : ''}{i + 1}. {s.title}</button>)}</nav>
    <h1 className="page-title">{stage.title}</h1><p className="journey-goal">{stage.goal}</p>
    <div className="journey-step-label">{step === 'encounter' ? '① 遇見這一段' : step === 'challenge' ? '② 試著理解' : '③ 帶走這一段'}</div>
    {step !== 'complete' && <>
      <div className="journey-actions">
        <button className="btn" onClick={() => play(stage.lines.map(l => l.jp).join('。'))}>▶ 聽整段</button>
        <button className="btn" onClick={stopAllPlayback}>停止播放</button>
        <label>語速 {rate}× <input type="range" min="0.7" max="1.5" step="0.1" value={rate} onChange={e => setSpeechRate(Number(e.target.value))} /></label>
        <button className="btn" onClick={() => update({ revealed: !stored.revealed })}>{stored.revealed ? '收起翻譯與聽力原文' : '查看翻譯與聽力原文'}</button>
      </div>
      <p className="row-meta">瀏覽器日文語音 · 可逐句重聽 · 提示隨時可看</p>
      <div className="journey-dialogue">{stage.lines.map((line, i) => <div className="journey-line" key={i}>
        <div className="journey-actions"><span className="row-meta">{line.speaker || `第 ${i + 1} 句`}</span><button className="btn" aria-label={`朗讀第 ${i + 1} 句`} onClick={() => play(line.jp)}>▶ 重聽</button></div>
        {(journey.kind !== '情境' || stored.revealed) ? <p lang="ja" className="practice-sentence-jp"><Ruby text={line.jp} /></p> : <p className="desc">先聽聽這句話，需要時查看原文。</p>}
        {stored.revealed && <p>{line.zh}</p>}
      </div>)}</div>
      <details className="journey-help"><summary>拆開來看：單字與文法提示</summary>{stage.tips.map(tip => <p key={tip}>{tip}</p>)}<div className="journey-actions">{stage.grammarIds.map(id => <Link className="back-link" key={id} href={`/grammar/${id}`} target="_blank" rel="noreferrer">查看相關文法 ↗</Link>)}</div></details>
      {step === 'encounter' ? <button className="btn btn-primary" onClick={() => update({ step: 'challenge', revealed: false, orders: stored.orders?.length ? stored.orders : stage.questions.map(q => shuffle(q.options.map((_, i) => i))) })}>試著理解這一段 →</button> : <>
        <div className="quiz-list">{stage.questions.map((q, qi) => {
          const chosen = stored.answers?.[qi];
          const correct = chosen === q.answerIndex;
          const order = stored.orders?.[qi] || q.options.map((_, i) => i);
          return <section className="quiz-item" key={qi}><h2 className="quiz-question">{q.prompt}</h2><div className="quiz-options">{order.map(oi => <button className={`quiz-option${chosen === oi ? correct ? ' correct' : ' wrong' : ''}`} key={oi} disabled={correct} onClick={() => answer(qi, oi)}>{q.options[oi]}</button>)}</div>
            {chosen !== undefined && <p className="journey-feedback" role="status">{correct ? '✓ 理解了。' : '再試一次：'}{q.explanation}</p>}
          </section>;
        })}</div>
        <details className="journey-help"><summary>開口練一句：{stage.say}</summary><p lang="ja">{stage.model}</p><button className="btn" onClick={() => play(stage.model)}>▶ 聽示範</button><p className="row-meta">可以跟著說，或換成自己的答案。此處不自動評分。</p></details>
        <div className="journey-actions"><button className="btn" onClick={() => update({ step: 'encounter' })}>← 回到內容</button><button className="btn btn-primary" disabled={!passed} onClick={finish}>完成這一關 →</button></div>
        {!passed && <p className="row-meta">兩題都理解後即可完成，可以查看提示再選。</p>}
      </>}
    </>}
    {step === 'complete' && <section className="journey-complete"><span className="journey-eyebrow">這一段，走過了</span><h2>{stage.reward}</h2><p>完成代表你已走過內容與理解題；隨時可以回來不看提示再試。</p><div className="journey-actions">
      <button className="btn" onClick={() => { saveNote({ content: `${stage.model}\n${stage.say}` }); setMessage('已加入個人筆記'); }} disabled={!!message}>收藏練習句</button>
      <button className="btn" onClick={() => moveTo(index)}>再挑戰這一關</button>
      {index < journey.stages.length - 1 ? <button className="btn btn-primary" onClick={() => moveTo(index + 1)}>下一關：{journey.stages[index + 1].title} →</button> : <Link className="btn btn-primary" href="/">挑另一段旅程 →</Link>}
    </div><p role="status">{message}</p></section>}
  </main>;
}
