'use client';

import { useEffect, useState } from 'react';
import { parseFurigana, readingOf } from '@/lib/reading/furigana';
import { playAudioOrSpeak, stopAllPlayback, withBasePath } from '@/lib/audio/playback';
import { OptionExplanations } from '@/lib/practice/bank/notes';
import { recordQuestionAttempt, useSpeechRate } from '@/lib/storage';
import { getLesson } from '@/lib/grammar/lessons';

export default function PracticeQuestion({ item, onAnswer }) {
  const [chosen, setChosen] = useState(null);
  const [reveal, setReveal] = useState(false);
  const rate = useSpeechRate();
  const listening = item.type?.startsWith('listening');
  const answered = chosen !== null;
  useEffect(() => () => stopAllPlayback(), []);
  function choose(index) {
    if (answered) return;
    setChosen(index);
    const correct = index === item.meaning.answerIndex;
    recordQuestionAttempt(item.id, correct);
    onAnswer?.(correct);
  }
  function ruby(text) { return parseFurigana(text || '').map((p, i) => p.reading ? <ruby key={i}>{p.text}<rt>{p.reading}</rt></ruby> : <span key={i}>{p.text}</span>); }
  return <section className="quiz-item">
    {item.needsReview && <p className="row-meta">教材待校對：此題答案與說明仍需確認。</p>}
    {listening && <><button className="btn" onClick={() => playAudioOrSpeak({ url: item.audioUrl, text: readingOf(item.script || item.meaning.prompt), rate })}>▶ 聽題目</button><button className="btn" onClick={stopAllPlayback}>停止</button><p className="row-meta">{item.audioUrl ? '題目錄音' : '瀏覽器語音朗讀，非原始錄音'} · 原文可作為提示查看</p></>}
    {item.imageUrl && <img className="exam-listening-image" src={withBasePath(item.imageUrl)} alt={item.imageDescription || '題目選項圖片'} />}
    {!item.imageUrl && item.imageDescription && <p>{item.imageDescription}</p>}
    {item.jp && !listening && <p className="practice-sentence-jp" lang="ja">{ruby(item.jp)}</p>}
    {(!listening || reveal || answered) && <p className="quiz-question">{ruby(item.meaning.prompt)}</p>}
    {listening && !reveal && !answered && <p className="quiz-question">聽完內容，選出符合問題的答案。</p>}
    {(item.zh || listening) && <button className="btn" onClick={() => setReveal(v => !v)}>{reveal ? '收起提示' : '查看翻譯／原文提示'}</button>}
    {(reveal || answered) && item.zh && <p className="grammar-example-zh">{item.zh}</p>}
    <div className="quiz-options">{item.meaning.options.map((opt, i) => <button key={i} disabled={answered} onClick={() => choose(i)} className={`quiz-option${answered && i === item.meaning.answerIndex ? ' correct' : chosen === i ? ' wrong' : ''}`}>{ruby(opt)}</button>)}</div>
    {answered && <div className="journey-feedback" aria-live="polite">
      <p>{chosen === item.meaning.answerIndex ? '✓ 答對了' : '這題留在「再試一次」中'} · 正確答案：{ruby(item.meaning.options[item.meaning.answerIndex])}</p>
      <OptionExplanations options={item.meaning.options} explanations={item.optionExplanations} answerIndex={item.meaning.answerIndex} />
      {!item.optionExplanations?.some(Boolean) && <p className="row-meta">這題尚未補齊逐項解析，可先參考下方筆記或相關文法。</p>}
      {item.notes?.map((note, i) => <p key={i}><strong>{note.word || note.surface}</strong>{note.reading && `（${note.reading}）`}：{note.meaning}</p>)}
      {item.pointIds?.map(id => {
        const lesson = getLesson(id);
        return lesson ? <div key={id}><p>{lesson.title}：{lesson.meaning}</p><a className="back-link" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/grammar/${id}/`} target="_blank" rel="noreferrer">查看「{lesson.title}」的說明與例句 ↗</a></div> : null;
      })}
      <button className="btn" onClick={() => { setChosen(null); setReveal(false); onAnswer?.(null); }}>遮住解析再試一次</button>
    </div>}
  </section>;
}
