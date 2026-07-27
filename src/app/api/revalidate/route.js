import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * On-demand revalidation after Sanity (or CI) publishes content.
 *
 * Configure in Sanity: Project → API → Webhooks → POST URL:
 *   https://YOUR_DOMAIN/api/revalidate
 * Headers:  x-revalidate-secret: <same as REVALIDATE_SECRET in Vercel/host env>
 * Body: GROQ filter or use “Trigger on” document changes — then map below.
 *
 * This handler accepts:
 * - { "_type": "fdaReport", "slug": { "current": "my-slug" } }  (manual / custom webhook)
 * - { "result": { "_type": "...", "slug": { "current": "..." } } } (some webhook shapes)
 * - { "_type": "fdaReport" }  (revalidates list + home only)
 */
function extractSlugAndType(body) {
  if (!body || typeof body !== 'object') return { type: null, slug: null };
  const nested = body.result || body.document || body.after || body;
  const type = nested._type || body._type;
  const slug =
    (typeof nested.slug === 'string' && nested.slug) ||
    nested.slug?.current ||
    body.slug?.current ||
    (typeof body.slug === 'string' ? body.slug : null);
  return { type, slug: slug || null };
}

export async function POST(request) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { type, slug } = extractSlugAndType(body);

    const pathMap = {
      fdaReport: '/regulatory-insights',
      productRoadmap: '/innovation-pipeline',
      globalLeadership: '/global-strategy',
      siteSettings: '/',
      strategyPage: '/global-strategy',
      executiveBento: '/',
      nihPortfolioProject: '/',
    };

    const listPath = pathMap[type] || '/';
    revalidatePath(listPath);
    revalidatePath('/');

    if (type === 'fdaReport' && slug) {
      revalidatePath(`/regulatory-insights/${slug}`);
    }

    return NextResponse.json({ revalidated: true, listPath, slug: slug || null, type: type || null });
  } catch {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
