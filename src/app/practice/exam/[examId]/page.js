import { getPastExamsList } from '@/lib/past-exams';
import ExamPracticeClient from './ExamPracticeClient';

// Enumerates every past-exam paper id at build time — required for the
// GitHub Pages static export, which has no server to render these on
// demand. See ExamPracticeClient for the actual (client-side) page.
export async function generateStaticParams() {
  return getPastExamsList().map(exam => ({ examId: exam.examId }));
}

export default async function PracticeExamPaperPage({ params }) {
  const { examId } = await params;
  return <ExamPracticeClient examId={examId} />;
}
