'use client';

import Link from 'next/link';
import { getCategories } from '@/lib/culture/notes';

export default function CulturePage() {
  const categories = getCategories();

  return (
    <main className="container">
      <div className="page-head">
        <Link href="/" className="back-link">← 首頁</Link>
      </div>

      <h1 className="page-title">文化背景</h1>
      <p className="row-meta">
        聽不懂弦外之音，通常不是日文不夠好，是背景知識不夠——這裡整理一些幫助建立直覺的小知識，用中文寫，重點是先補框架，不是練日文。
      </p>

      {categories.map(({ category, items }) => (
        <section key={category} className="culture-category">
          <h2 className="culture-category-title">{category}</h2>
          <div className="rows">
            {items.map(note => (
              <details key={note.id} className="culture-note-acc">
                <summary className="culture-note-summary">{note.title}</summary>
                <div className="culture-note-body">
                  {note.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
