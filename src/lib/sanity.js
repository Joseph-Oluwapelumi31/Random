import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const authorsProjection = `"authors": coalesce(authors[]{name, role, photo}, [])`;

/** Legacy field: older docs may set isPublished: false to hide. New docs omit it. */
const fdaListable = '(_type == "fdaReport" && (!defined(isPublished) || isPublished == true))';

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'es4fl0a9',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN,
  useCdn: false,
  /**
   * Optional: set SANITY_API_PERSPECTIVE=published in env for strict published-only reads.
   * Omitting avoids edge cases where Content Lake + token combos hide documents you expect to see.
   */
  ...(process.env.SANITY_API_PERSPECTIVE === 'published' ? { perspective: 'published' } : {}),
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);

// ── FDA Industry Reports ──────────────────────────────────────────
export async function getFDAReports() {
  const q = `*[${fdaListable}] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, publishedAt, category,
    videoEmbed, pdfUrl, image_url,
    "isFeatured": coalesce(isFeatured, false),
    "viewCount": coalesce(viewCount, 0),
    ${authorsProjection}
  }`;
  try {
    return await sanityClient.fetch(q);
  } catch {
    return [];
  }
}

/** Slugs for SSG paths (published only). */
export async function getFDAReportSlugsFromSanity() {
  const q = `*[${fdaListable} && defined(slug.current)].slug.current`;
  try {
    const slugs = await sanityClient.fetch(q);
    return Array.isArray(slugs) ? slugs.filter(Boolean) : [];
  } catch {
    return [];
  }
}

/** GROQ search for regulatory grid / typeahead (server or API routes). */
export async function searchFDAReportsGroq(searchText) {
  const projection = `_id, title, "slug": slug.current, excerpt, publishedAt, category,
    videoEmbed, pdfUrl, image_url,
    ${authorsProjection}`;
  const published = fdaListable;
  try {
    const t = (searchText || '').trim();
    if (!t) {
      const q = `*[${published}] | order(publishedAt desc) [0...120] { ${projection} }`;
      return await sanityClient.fetch(q);
    }
    const pat = `*${t}*`;
    const q = `*[${published} && (title match $pat || excerpt match $pat)] | order(publishedAt desc) [0...80] { ${projection} }`;
    return await sanityClient.fetch(q, { pat });
  } catch {
    return [];
  }
}

export async function getFDAReport(slug) {
  const q = `*[${fdaListable} && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, publishedAt, category,
    body, content, videoEmbed, pdfUrl, image_url,
    ${authorsProjection},
    "tags": coalesce(tags, [])
  }`;
  try {
    return await sanityClient.fetch(q, { slug });
  } catch {
    return null;
  }
}

/** Home page Ennoble strip: featured first, then by viewCount, then date. */
export async function getFeaturedEnnobleArticles() {
  const q = `*[${fdaListable}] {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category,
    image_url,
    "is_featured": coalesce(isFeatured, false),
    "views": coalesce(viewCount, 0)
  }`;
  try {
    const all = await sanityClient.fetch(q);
    if (!Array.isArray(all) || all.length === 0) return [];
    const pinned = all.filter((a) => a.is_featured);
    const popular = all
      .filter((a) => !a.is_featured)
      .sort((a, b) => (b.views || 0) - (a.views || 0));
    return [...pinned.slice(0, 2), ...popular].slice(0, 5);
  } catch {
    return [];
  }
}

export async function getExecutiveBentoFromSanity() {
  const q = `*[_type == "executiveBento" && coalesce(isVisible, true) == true] | order(priority asc, title asc) {
    id, label, title, desc, accent, priority
  }`;
  try {
    return await sanityClient.fetch(q);
  } catch {
    return [];
  }
}

export async function getSiteSettings() {
  const q = `*[_type == "siteSettings"] | order(_updatedAt desc) [0] {
    ennobleTitle, ennobleSubtitle,
    bentoSectionEyebrow, bentoSectionTitle, bentoSectionTitleAccent, bentoSectionHint,
    contactIntro, contactFooterLine1, contactFooterLine2,
    kpiEyebrow, kpiTitle, kpiTitleAccent,
    "kpiMetrics": coalesce(kpiMetrics[]{ order, end, suffix, prefix, label, sub, decimals }, []),
    nihEyebrow, nihTitle, nihTitleAccent,
    "nihSummaryTiles": coalesce(nihSummaryTiles[]{ value, label, color }, []),
    nihFooterNote,
    heroEyebrow, heroHeadlinePlain, heroHeadlineGradient, heroSubline1, heroSubline2,
    "heroTypewriterLines": coalesce(heroTypewriterLines[], [])
  }`;
  try {
    return await sanityClient.fetch(q);
  } catch {
    return null;
  }
}

export async function getStrategyPage() {
  const q = `*[_type == "strategyPage"] | order(_updatedAt desc) [0] {
    careerTimeline[]{ role, company, type, period, color, "achievements": coalesce(achievements[], []) },
    competencyGroups[]{ category, "items": coalesce(items[], []) },
    education[]{ school, degree, detail, color, period, logoUrl }
  }`;
  try {
    return await sanityClient.fetch(q);
  } catch {
    return null;
  }
}

export async function getNihPortfolioProjects() {
  const q = `*[_type == "nihPortfolioProject"] | order(coalesce(sortOrder, 999) asc, name asc) {
    "id": projectId, name, full, role, agency, color, total, years, desc,
    "awards": coalesce(awards[]{ type, year, amount, id }, [])
  }`;
  try {
    return await sanityClient.fetch(q);
  } catch {
    return [];
  }
}

// ── Product Roadmap ────────────────────────────────────────────────
export async function getProductRoadmap() {
  const q = `*[_type == "productRoadmap"] | order(priority asc) {
    _id, projectName, fullTitle, status, nihGrant, fundingAmount,
    description, engineeringStory, marketStatus, phase, priority,
    "photos": coalesce(photoUrls, photos[].asset->url, [])
  }`;
  try {
    return await sanityClient.fetch(q);
  } catch {
    return [];
  }
}

// ── Global Leadership ─────────────────────────────────────────────
export async function getGlobalLeadership() {
  const q = `*[_type == "globalLeadership"] | order(publishedAt desc) {
    _id, title, excerpt, region, publishedAt,
    "metrics": coalesce(metrics, [])
  }`;
  try {
    return await sanityClient.fetch(q);
  } catch {
    return [];
  }
}
