'use client';

import Link from 'next/link';
import { journeys } from '@/lib/journeys';
import { useJourneyProgress } from '@/lib/storage';

export default function JourneyShelf() {
  const progress = useJourneyProgress();
  const recent = journeys.filter(j => progress[j.id]).sort((a, b) => progress[b.id].updatedAt - progress[a.id].updatedAt)[0];
  return <section className="journey-shelf" aria-label="學習路線">
    <p className="journey-eyebrow">一句一句，走進故事裡</p>
    <h1 className="page-title">這次，想去哪裡？</h1>
    <p className="desc">挑一段情境，或翻開一個故事。隨時離開，下次從原處繼續。</p>
    {recent && <Link className="journey-resume" href={`/journey/${recent.id}`}>接著上次 · {recent.title} →</Link>}
    <div className="journey-grid">{journeys.map(j => {
      const p = progress[j.id];
      const completed = j.stages.filter(s => p?.completed?.includes(s.id)).length;
      return <Link key={j.id} href={`/journey/${j.id}`} className="journey-card">
        <span className="row-meta">{j.kind} · {j.level}</span>
        <h2>{j.title}</h2><p>{j.description}</p>
        <div className="series-progress-track"><div className="series-progress-fill" style={{ width: `${completed / j.stages.length * 100}%` }} /></div>
        <span className="row-meta">{completed} / {j.stages.length} 關完成 · 每關約 3–5 分鐘</span>
        <strong>{completed === j.stages.length ? '重訪故事' : p ? '繼續這段旅程' : '進入第一關'} →</strong>
      </Link>;
    })}</div>
    <p className="row-meta">進度保存在這個瀏覽器，可從個人筆記匯出全部資料。</p>
  </section>;
}
