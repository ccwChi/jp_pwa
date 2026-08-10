import { getLessons } from '@/lib/grammar/lessons';
import GrammarDetailClient from './GrammarDetailClient';

// Enumerates every grammar-point id at build time — required for the
// GitHub Pages static export, which has no server to render these on
// demand. See GrammarDetailClient for the actual (client-side) page.
export async function generateStaticParams() {
  return getLessons().map(lesson => ({ id: lesson.id }));
}

export default async function GrammarLessonPage({ params }) {
  const { id } = await params;
  return <GrammarDetailClient id={id} />;
}
