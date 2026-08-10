'use client';

import dynamic from 'next/dynamic';

// See ArticlePracticeLoader — same reasoning: ssr:false has to live in a
// Client Component, not in page.js.
export default dynamic(() => import('./ClozePracticeClient'), {
  ssr: false,
  loading: () => (
    <main className="container">
      <p className="empty-hint">載入題目中…</p>
    </main>
  ),
});
