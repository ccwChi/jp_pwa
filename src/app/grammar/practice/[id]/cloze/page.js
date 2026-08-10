import { getPracticeSets } from '@/lib/grammar/practice';
import ClozePracticeClient from './ClozePracticeLoader';

// Enumerates every practice-set id at build time — required for the
// GitHub Pages static export, which has no server to render these on
// demand. See ClozePracticeClient for the actual (client-side) page, and
// ClozePracticeLoader for why it's loaded via a client-only dynamic import.
export async function generateStaticParams() {
  return getPracticeSets().map(set => ({ id: set.id }));
}

export default async function ClozePracticePage({ params }) {
  const { id } = await params;
  return <ClozePracticeClient id={id} />;
}
