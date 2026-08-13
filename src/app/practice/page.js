import Link from 'next/link';

const cards = [
  { name: '考古題練習', desc: '選程度與年份，依原始試卷章節順序整份作答', href: '/practice/exam' },
  { name: '一般練習', desc: '選程度與題型，隨機抽一組題目練習', href: '/practice/general' },
];

export default function PracticeHubPage() {
  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
      </div>

      <h1 className="page-title">分級測驗</h1>

      <div className="rows">
        {cards.map(c => (
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
