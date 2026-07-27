import { getFDAReports } from '@/lib/sanity';
import RegulatoryGridClient from '@/components/regulatory/RegulatoryGridClient';
import STATIC_ARTICLES from '@/lib/staticArticles';

export const revalidate = 60;

export default async function RegulatoryInsightsPage() {
  const sanityReports = await getFDAReports();
  const reports = sanityReports.length > 0 ? sanityReports : STATIC_ARTICLES;
  return <RegulatoryGridClient reports={reports} />;
}
