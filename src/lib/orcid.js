const ORCID_ID = '0009-0006-6427-5005';
const BASE = 'https://pub.orcid.org/v3.0';

export async function getORCIDWorks() {
  try {
    const res = await fetch(`${BASE}/${ORCID_ID}/works`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`ORCID ${res.status}`);
    const data = await res.json();
    return (data.group || []).slice(0, 50).map((g) => {
      const s = g['work-summary']?.[0];
      const ext = s?.['external-ids']?.['external-id'] || [];
      const doi = ext.find((e) => e['external-id-type'] === 'doi');
      return {
        id: String(s?.['put-code'] ?? Math.random()),
        title: s?.title?.title?.value ?? 'Untitled',
        type: s?.type ?? 'JOURNAL_ARTICLE',
        year: s?.['publication-date']?.year?.value ?? '—',
        journal: s?.['journal-title']?.value ?? '',
        doi: doi?.['external-id-value'] ?? null,
        url: doi ? `https://doi.org/${doi['external-id-value']}` : (s?.url?.value ?? null),
      };
    });
  } catch (e) {
    console.error('ORCID error:', e && typeof e === 'object' && 'message' in e ? e.message : String(e));
    return [];
  }
}

export async function getORCIDSummary() {
  try {
    const res = await fetch(`${BASE}/${ORCID_ID}/person`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch { return null; }
}
