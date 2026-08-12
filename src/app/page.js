import dynamic from 'next/dynamic';
import HeroDynamic from '@/components/hero/HeroDynamic';
import { getORCIDWorks } from '@/lib/orcid';
import {
  getFeaturedEnnobleArticles,
  getExecutiveBentoFromSanity,
  getSiteSettings,
  getNihPortfolioProjects,
} from '@/lib/sanity';
import { valueFromSettled } from '@/lib/asyncUtils';

const SectionSkeleton = ({ className = '' }) => (
  <div className={`min-h-[16rem] w-full rounded-3xl border border-border/60 bg-card/70 ${className}`} />
);

const KPIDashboard = dynamic(() => import('@/components/executive/KPIDashboard'), {
  loading: () => <SectionSkeleton className="min-h-[12rem]" />,
});
const FeaturedArticles = dynamic(() => import('@/components/executive/FeaturedArticles'), {
  loading: () => <SectionSkeleton className="min-h-[18rem]" />,
});
const ExecutiveBento = dynamic(() => import('@/components/executive/ExecutiveBento'), {
  loading: () => <SectionSkeleton className="min-h-[20rem]" />,
});
const NIHFunding = dynamic(() => import('@/components/executive/NIHFunding'), {
  loading: () => <SectionSkeleton className="min-h-[18rem]" />,
});
const ORCIDPublications = dynamic(() => import('@/components/executive/ORCIDPublications'), {
  loading: () => <SectionSkeleton className="min-h-[16rem]" />,
});
const Contact = dynamic(() => import('@/components/executive/Contact'), {
  loading: () => <SectionSkeleton className="min-h-[14rem]" />,
});

/** Next.js requires a static number here. 60s balances freshness vs. Sanity load. */
export const revalidate = 60;

export default async function ExecutiveProfilePage() {
  /** Avoid HTTP 500 if any single upstream (ORCID, Sanity) flakes — render with partial data. */
  const settled = await Promise.allSettled([
    getORCIDWorks(),
    getFeaturedEnnobleArticles(),
    getExecutiveBentoFromSanity(),
    getSiteSettings(),
    getNihPortfolioProjects(),
  ]);
  const orcidWorks = valueFromSettled(settled[0], []);
  const featuredArticles = valueFromSettled(settled[1], []);
  const bentoTiles = valueFromSettled(settled[2], []);
  const site = valueFromSettled(settled[3], null);
  const nihProjects = valueFromSettled(settled[4], []);

  return (
    <div data-testid="home-page">
      <HeroDynamic heroCopy={site} />
      <KPIDashboard
        eyebrow={site?.kpiEyebrow}
        titlePlain={site?.kpiTitle}
        titleAccent={site?.kpiTitleAccent}
        metrics={site?.kpiMetrics?.length ? site.kpiMetrics : null}
      />
      <FeaturedArticles
        initialArticles={featuredArticles}
        ennobleTitle={site?.ennobleTitle}
        ennobleSubtitle={site?.ennobleSubtitle}
      />
      <ExecutiveBento
        sanityTiles={Array.isArray(bentoTiles) && bentoTiles.length > 0 ? bentoTiles : null}
        sectionEyebrow={site?.bentoSectionEyebrow}
        sectionTitle={site?.bentoSectionTitle}
        sectionTitleAccent={site?.bentoSectionTitleAccent}
        sectionHint={site?.bentoSectionHint}
      />
      <NIHFunding
        projects={nihProjects?.length ? nihProjects : null}
        eyebrow={site?.nihEyebrow}
        titlePlain={site?.nihTitle}
        titleAccent={site?.nihTitleAccent}
        summaryTiles={site?.nihSummaryTiles?.length ? site.nihSummaryTiles : null}
        footerNote={site?.nihFooterNote}
      />
      <ORCIDPublications works={orcidWorks} />
      <Contact siteSettings={site} />
    </div>
  );
}
