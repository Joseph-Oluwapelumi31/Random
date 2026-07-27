import { NextResponse } from 'next/server';
import STATIC_ARTICLES from '@/lib/staticArticles';
import STATIC_PROJECTS from '@/lib/staticProjects';
import {
  STRATEGY_EXPERIENCE,
  STRATEGY_COMPETENCIES,
  STRATEGY_EDUCATION,
  NIH_PORTFOLIO_PROJECTS,
  NIH_SUMMARY_TILES,
  KPI_METRICS,
  BENTO_TILE_DEFAULTS,
} from '@/lib/siteContentSeed';

export const dynamic = 'force-dynamic';

/**
 * Returns all static site content as JSON for one-time Sanity seeding.
 * Requires SEED_BUNDLE_SECRET in env and matching ?secret= query.
 */
export async function GET(request) {
  const expected = process.env.SEED_BUNDLE_SECRET;
  if (!expected) {
    return NextResponse.json({ error: 'SEED_BUNDLE_SECRET is not set' }, { status: 404 });
  }
  const secret = new URL(request.url).searchParams.get('secret');
  if (secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    articles: STATIC_ARTICLES,
    projects: STATIC_PROJECTS,
    strategyPage: {
      internalTitle: 'Main',
      careerTimeline: STRATEGY_EXPERIENCE,
      competencyGroups: STRATEGY_COMPETENCIES,
      education: STRATEGY_EDUCATION,
    },
    nihProjects: NIH_PORTFOLIO_PROJECTS,
    nihSummaryTiles: NIH_SUMMARY_TILES,
    kpiMetrics: KPI_METRICS.map((m, i) => ({ ...m, order: i })),
    bentoTiles: BENTO_TILE_DEFAULTS.map((t, i) => ({
      ...t,
      priority: i * 10,
      isVisible: true,
    })),
    siteSettings: {
      internalTitle: 'Main site copy',
      ennobleTitle: 'Ennoble',
      ennobleSubtitle: 'The Frontier of Biomedical Innovation',
      bentoSectionEyebrow: 'Executive Profile',
      bentoSectionTitle: 'Built on Science.',
      bentoSectionTitleAccent: 'Driven by Impact.',
      bentoSectionHint: 'Impact statements are edited per tile in Executive Bento documents.',
      contactIntro: '',
      contactFooterLine1: '',
      contactFooterLine2: '',
      kpiEyebrow: 'Executive Performance Metrics',
      kpiTitle: 'Quantified Impact.',
      kpiTitleAccent: 'Global Scale.',
      kpiMetrics: KPI_METRICS.map((m, i) => ({ ...m, order: i })),
      nihEyebrow: 'Federal Research Portfolio',
      nihTitle: 'NIH-Funded Innovation.',
      nihTitleAccent: 'Peer-Reviewed Impact.',
      nihSummaryTiles: NIH_SUMMARY_TILES,
      nihFooterNote: 'All grants through Evon Medics LLC · NIH SBIR Program · Evon Medics LLC, USA',
    },
  });
}
