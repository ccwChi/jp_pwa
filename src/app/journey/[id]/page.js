import { notFound } from 'next/navigation';
import { journeys, getJourney } from '@/lib/journeys';
import JourneyPlayer from './JourneyPlayer';

export function generateStaticParams() { return journeys.map(j => ({ id: j.id })); }

export default async function JourneyPage({ params }) {
  const { id } = await params;
  const journey = getJourney(id);
  if (!journey) notFound();
  return <JourneyPlayer journey={journey} />;
}
