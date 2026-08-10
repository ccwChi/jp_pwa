'use client';

import dynamic from 'next/dynamic';

// next/dynamic's ssr:false is only allowed from inside a Client Component —
// page.js is a Server Component (needed for generateStaticParams), so the
// ssr:false call has to live in this separate 'use client' file instead of
// directly in page.js.
export default dynamic(() => import('./ArticlePracticeClient'), {
  ssr: false,
  loading: () => (
    <main className="container">
      <p className="empty-hint">載入題目中…</p>
    </main>
  ),
});
