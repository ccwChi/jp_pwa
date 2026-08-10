import { getArticles } from '@/lib/reading/articles';
import ArticleDetailClient from './ArticleDetailClient';

// Enumerates every article id at build time so the static export (GitHub
// Pages has no server to render these on demand) has a real HTML file per
// article — see ArticleDetailClient for the actual (client-side) page.
export async function generateStaticParams() {
  return getArticles().map(article => ({ id: article.id }));
}

export default async function ReadingArticlePage({ params }) {
  const { id } = await params;
  return <ArticleDetailClient id={id} />;
}
