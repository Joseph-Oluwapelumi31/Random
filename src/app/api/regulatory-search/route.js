import { NextResponse } from 'next/server';
import { searchFDAReportsGroq } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

/** Prefetch (no q) or GROQ search against Sanity fdaReport documents. */
export async function GET(request) {
  const q = new URL(request.url).searchParams.get('q') ?? '';
  try {
    const data = await searchFDAReportsGroq(q);
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ data: [], error: String(e?.message || e) }, { status: 200 });
  }
}
