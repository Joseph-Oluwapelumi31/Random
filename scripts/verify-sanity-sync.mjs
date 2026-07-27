/**
 * Quick bilateral check: Sanity API returns fdaReport count; optional HTTP check for local site.
 * Usage: node scripts/verify-sanity-sync.mjs [http://127.0.0.1:3000]
 */
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'es4fl0a9';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token || undefined,
  ...(process.env.SANITY_API_PERSPECTIVE === 'published' ? { perspective: 'published' } : {}),
});

const baseUrl = process.argv[2] || '';

const listable = '(_type == "fdaReport" && (!defined(isPublished) || isPublished == true))';

async function main() {
  const count = await client.fetch(`count(*[${listable}])`);
  const sample = await client.fetch(
    `*[${listable}] | order(publishedAt desc) [0...3] { "slug": slug.current, title }`,
  );
  console.log(JSON.stringify({ ok: true, projectId, dataset, hasToken: Boolean(token), listableReportCount: count, sample }, null, 2));

  if (baseUrl && /^https?:\/\//i.test(baseUrl)) {
    const u = new URL('/', baseUrl).toString();
    const res = await fetch(u, { headers: { Accept: 'text/html' } });
    const html = await res.text();
    const hasHero = html.includes('data-testid="hero-section"');
    console.log(JSON.stringify({ siteUrl: u, status: res.status, hasHeroSection: hasHero, htmlLength: html.length }, null, 2));
    if (!res.ok || !hasHero) process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
