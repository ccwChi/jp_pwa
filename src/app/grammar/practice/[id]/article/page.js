import { getPracticeSets } from '@/lib/grammar/practice';
import ArticlePracticeClient from './ArticlePracticeClient';

// Enumerates every practice-set id at build time — required for the
// GitHub Pages static export, which has no server to render these on
// demand. See ArticlePracticeClient for the actual (client-side) page.
export async function generateStaticParams() {
  return getPracticeSets().map(set => ({ id: set.id }));
}

export default async function ArticlePracticePage({ params }) {
  const { id } = await params;
  return <ArticlePracticeClient id={id} />;
}
