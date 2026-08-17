'use client';

import Link from 'next/link';

const cards = [
  { name: '文法學習', desc: '依等級與分類系統整理文法點，附例句與練習題', href: '/grammar/lessons' },
  { name: 'POS 標記工具', desc: '為題庫項目標記詞性資訊（開發用）', href: '/practice/tag', devOnly: true },
];

export default function GrammarHubPage() {
  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
      </div>

      <h1 className="page-title">文法</h1>

      <div className="rows">
        {cards
          .filter(c => !c.devOnly || process.env.NEXT_PUBLIC_STATIC_EXPORT !== 'true')
          .map(c => (
            <Link href={c.href} key={c.name} className="row note-row">
              <div>
                <div className="name">{c.name}</div>
                <div className="desc">{c.desc}</div>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
