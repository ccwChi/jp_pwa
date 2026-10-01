'use client';

import Link from 'next/link';
import { journeys } from '@/lib/journeys';
import { useJourneyProgress, saveJourneyProgress } from '@/lib/storage';
import { journeyStatus } from '@/lib/story-curriculum';

export default function JourneyShelf() {
  const progress = useJourneyProgress();
  const recent = journeys.filter(j => progress[j.id] && !journeyStatus(j, progress[j.id]).finished).sort((a, b) => progress[b.id].updatedAt - progress[a.id].updatedAt)[0];
  const recommended = recent || journeys.find(j => !journeyStatus(j, progress[j.id]).finished);
  function resume(journey) {
    const stored = progress[journey.id];
    if (!stored) {
      saveJourneyProgress(journey.id, { stage: 0, step: 'encounter', completed: [], answers: {}, orders: [], revealed: false });
    } else if (stored.step === 'complete' || stored.completed?.includes(journey.stages[stored.stage]?.id)) {
      const { nextIndex } = journeyStatus(journey, stored);
      if (nextIndex >= 0) saveJourneyProgress(journey.id, { stage: nextIndex, step: 'encounter', answers: {}, orders: [], revealed: false });
    }
  }
  return <section className="journey-shelf" aria-label="學習路線">
    <p className="journey-eyebrow">一本故事，一條學習主線</p>
    <h1 className="page-title">今天，讀懂下一段故事。</h1>
    <p className="desc">讀一段原文 → 學單字與句型 → 完成理解題 → 解鎖下一關。走完一本，也就讀完了整個故事。</p>
    {recommended && <div className="story-next">
      <span className="journey-eyebrow">{recent ? '接著上次，完成這一關' : '不知道從哪開始？從這裡出發'}</span>
      <h2>{recommended.title} · 第 {journeyStatus(recommended, progress[recommended.id]).nextIndex + 1} 關</h2>
      <p>{recommended.stages[journeyStatus(recommended, progress[recommended.id]).nextIndex].goal}</p>
      <Link className="btn btn-primary" onClick={() => resume(recommended)} href={`/journey/${recommended.id}`}>{recent ? '繼續學習' : '開始我的第一關'} →</Link>
      <p className="row-meta">不必一次讀完。離開後，下次接著這裡繼續。</p>
    </div>}
    {[{ title: '選一本，讀到最後', items: journeys.filter(j => j.source) }, { title: '想暖身？從短篇與情境開始', items: journeys.filter(j => !j.source) }].map(group => <div key={group.title}>
    <h2 className="journey-library-title">{group.title}</h2>
    <div className="journey-grid">{group.items.map(j => {
      const p = progress[j.id];
      const completed = j.stages.filter(s => p?.completed?.includes(s.id)).length;
      return <Link key={j.id} href={`/journey/${j.id}`} onClick={() => resume(j)} className="journey-card">
        <span className="row-meta">{j.kind} · {j.level}</span>
        <h2>{j.title}</h2>{j.author && <span className="row-meta">{j.author} · 完整原文</span>}<p>{j.description}</p>
        <div className="series-progress-track"><div className="series-progress-fill" style={{ width: `${completed / j.stages.length * 100}%` }} /></div>
        <span className="row-meta">{completed} / {j.stages.length} 關完成 · 每關約 {j.source ? '5–12' : '3–5'} 分鐘</span>
        <strong>{completed === j.stages.length ? '✓ 全部通關 · 重訪故事' : p ? '繼續這段旅程' : '進入第一關'} →</strong>
      </Link>;
    })}</div></div>)}
    <p className="row-meta">進度保存在這個瀏覽器，可從個人筆記匯出全部資料。</p>
  </section>;
}
