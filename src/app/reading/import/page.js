import { getSeriesList } from '@/lib/reading/articles';
import ImportTool from './ImportTool';

export default function ImportPage() {
  const existingSeriesIds = getSeriesList().map(s => s.seriesId);
  return <ImportTool existingSeriesIds={existingSeriesIds} />;
}
