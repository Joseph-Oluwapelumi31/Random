import HeroDynamic from '@/components/hero/HeroDynamic';
import KPIDashboard from '@/components/executive/KPIDashboard';
import FeaturedArticles from '@/components/executive/FeaturedArticles';
import ExecutiveBento from '@/components/executive/ExecutiveBento';
import NIHFunding from '@/components/executive/NIHFunding';
import ORCIDPublications from '@/components/executive/ORCIDPublications';
import Contact from '@/components/executive/Contact';
import { getORCIDWorks } from '@/lib/orcid';
import {
  getFeaturedEnnobleArticles,
  getExecutiveBentoFromSanity,
  getSiteSettings,
  getNihPortfolioProjects,
} from '@/lib/sanity';
import { valueFromSettled } from '@/lib/asyncUtils';

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
    <div className="bg-background" data-testid="home-page">
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
