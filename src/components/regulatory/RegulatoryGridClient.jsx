'use client';
import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Search, X, FileText, Youtube, Download, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import STATIC_ARTICLES from '@/lib/staticArticles';
import axios from 'axios';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const CAT_CONFIG = {
  'Emerging BME Innovations': { color: '#0bc5ea' },
  'MedTech World Sensations':  { color: '#7c3aed' },
  'The Reality of Failure':    { color: '#f59e0b' },
  'Project Spotlight':         { color: '#10b981' },
};
const CATS = ['All', ...Object.keys(CAT_CONFIG)];

function ReportCard({ report, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const cfg = CAT_CONFIG[report.category] || { color: '#0bc5ea' };
  const date = report.publishedAt ? new Date(report.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const slug = report.slug || report._id;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      data-testid={`report-${report._id}`}
      className="glass-card rounded-2xl border border-white/6 overflow-hidden hover:-translate-y-1 hover:border-white/12 transition-all duration-300 group flex flex-col"
    >
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)` }} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: cfg.color, background: `${cfg.color}15` }}>{report.category}</span>
          {report.videoEmbed && <span className="flex items-center gap-1 text-xs text-[#f87171] bg-[#f87171]/10 px-2 py-0.5 rounded-full"><Youtube size={10} />Video</span>}
          {report.pdfUrl && <span className="flex items-center gap-1 text-xs text-[#94a3b8] bg-white/6 px-2 py-0.5 rounded-full"><Download size={10} />PDF</span>}
        </div>

        <h3 className="font-heading font-bold text-white text-lg leading-snug mb-2 group-hover:text-[#0bc5ea] transition-colors line-clamp-2">{report.title}</h3>
        <p className="text-[#64748b] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{report.excerpt}</p>

        {report.authors?.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            {report.authors.slice(0, 2).map((a, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {a.photo ? <img src={a.photo} alt={a.name || ''} className="w-6 h-6 rounded-full object-cover" /> : <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0bc5ea] to-[#0891b2] flex items-center justify-center text-[10px] font-bold text-white">{(a.name && a.name[0]) || '?'}</div>}
                <span className="text-xs text-[#94a3b8]">{a.name}</span>
                {a.role && <span className="text-xs text-[#64748b]">· {a.role}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-[#64748b]">{date}</span>
          <Link
            href={`/regulatory-insights/${slug}`}
            className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
            style={{ color: cfg.color }}
          >
            Read <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function RegulatoryGridClient({ reports }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [aiSearching, setAiSearching] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [catalog, setCatalog] = useState(() => (reports?.length > 0 ? reports : STATIC_ARTICLES));
  const [groqHits, setGroqHits] = useState(null);
  const groqTimer = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Prefetch canonical list from Sanity (GROQ) so the grid stays populated when the server fell back to static.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/regulatory-search')
      .then((r) => r.json())
      .then((j) => {
        if (cancelled || !Array.isArray(j.data) || j.data.length === 0) return;
        setCatalog((prev) => (j.data.length >= prev.length ? j.data : prev));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const allReports = useMemo(
    () => (catalog.length > 0 ? catalog : STATIC_ARTICLES),
    [catalog],
  );

  // Debounced Sanity GROQ search while typing (no empty grid unless there are truly zero matches).
  useEffect(() => {
    const t = search.trim();
    if (groqTimer.current) clearTimeout(groqTimer.current);
    if (t.length < 2) {
      setGroqHits(null);
      return;
    }
    groqTimer.current = setTimeout(() => {
      fetch(`/api/regulatory-search?q=${encodeURIComponent(t)}`)
        .then((r) => r.json())
        .then((j) => {
          if (Array.isArray(j.data)) setGroqHits(j.data);
        })
        .catch(() => setGroqHits(null));
    }, 320);
    return () => { if (groqTimer.current) clearTimeout(groqTimer.current); };
  }, [search]);

  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setAiSearching(true);
    setAiResults(null);
    try {
      // Run Gemini AI search + local text search in parallel for speed
      const [aiRes] = await Promise.allSettled([
        axios.post(`${BACKEND}/api/articles/ai-search`, { query: search }),
      ]);
      // Map MongoDB AI results
      const mapped = aiRes.status === 'fulfilled' ? aiRes.value.data.map(a => ({
        _id: a.id, slug: a.id, title: a.title, excerpt: a.excerpt,
        category: a.category, publishedAt: a.created_at, tags: a.tags,
        authors: [{ name: 'Vamsi Reddy', role: 'Author', photo: 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg' }],
        videoEmbed: a.youtube_url || '',
      })) : [];
      // Also include static matches for comprehensive results
      const q = search.toLowerCase();
      const staticMatches = STATIC_ARTICLES.filter(a =>
        a.title.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q) ||
        a.tags?.some(t => t.toLowerCase().includes(q))
      );
      const seen = new Set(mapped.map(a => a.title.toLowerCase()));
      const merged = [...mapped, ...staticMatches.filter(a => !seen.has(a.title.toLowerCase()))];
      setAiResults(merged.length > 0 ? merged : null);
    } catch {
      const q = search.toLowerCase();
      const fallback = allReports.filter(a =>
        a.title.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q)
      );
      setAiResults(fallback.length > 0 ? fallback : null);
    }
    setAiSearching(false);
  };

  const clearSearch = () => { setSearch(''); setAiResults(null); setGroqHits(null); };

  const textNeedle = search.trim().toLowerCase();
  const localTextMatches = textNeedle.length >= 1
    ? allReports.filter((a) =>
        a.title?.toLowerCase().includes(textNeedle) ||
        a.excerpt?.toLowerCase().includes(textNeedle) ||
        a.tags?.some((tag) => tag?.toLowerCase().includes(textNeedle)),
      )
    : null;

  const baseList = (() => {
    if (aiResults !== null && aiResults.length > 0) return aiResults;
    if (aiResults !== null && aiResults.length === 0) return allReports;
    if (textNeedle.length >= 2) {
      if (groqHits === null) return localTextMatches?.length ? localTextMatches : allReports;
      return groqHits.length > 0 ? groqHits : (localTextMatches?.length ? localTextMatches : allReports);
    }
    if (textNeedle.length >= 1 && localTextMatches?.length) return localTextMatches;
    return allReports;
  })();

  const filtered = aiResults !== null && aiResults.length > 0
    ? baseList
    : baseList.filter((r) => cat === 'All' || r.category === cat);

  return (
    <div className="bg-[#080d12] min-h-screen" data-testid="regulatory-insights-page">
      <div className="relative pt-28 pb-6 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0bc5ea]/3 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center" ref={ref}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">Industry Intelligence</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 }} className="mb-2">
            <p className="font-heading text-5xl sm:text-6xl font-bold text-gradient-cyan leading-none">Ennoble</p>
            <p className="text-[#94a3b8] text-sm font-medium mt-1 tracking-wide">The Frontier of Biomedical Innovation</p>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 leading-none">
            Regulatory Insights. <span className="text-gradient-cyan">Executive Perspective.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-[#94a3b8] text-base max-w-2xl mx-auto mb-8">
            Field reports, FDA strategy analysis, and BME innovation dispatches from the intersection of engineering and clinical translation.
          </motion.p>

          {/* Gemini AI Search */}
          <form onSubmit={handleAiSearch} className="relative max-w-xl mx-auto mb-2" data-testid="ai-search-form">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by keyword, topic, or tag... (AI-powered)"
              data-testid="report-search"
              className="w-full glass-exec rounded-2xl pl-11 pr-28 py-3.5 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#0bc5ea]/50 transition-all"
            />
            {search && <button type="button" onClick={clearSearch} className="absolute right-20 top-1/2 -translate-y-1/2 text-[#64748b]"><X size={14} /></button>}
            <button type="submit" disabled={aiSearching} data-testid="ai-search-btn" className="absolute right-2 top-1/2 -translate-y-1/2 btn-exec px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 disabled:opacity-60">
              {aiSearching ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
              {aiSearching ? '...' : 'AI'}
            </button>
          </form>
          {aiResults !== null && aiResults.length > 0 && (
            <p className="text-[#0bc5ea] text-xs mt-1 flex items-center justify-center gap-1">
              <Sparkles size={10} /> Gemini found {aiResults.length} result{aiResults.length !== 1 ? 's' : ''} for "{search}"
              <button type="button" onClick={clearSearch} className="ml-1 text-[#64748b] hover:text-white underline">Clear</button>
            </p>
          )}
        </div>
      </div>

      {/* Category filters — hide when AI search active */}
      {aiResults === null && (
        <div className="px-6 mb-8">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} data-testid={`cat-${c}`} className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${cat === c ? 'btn-exec' : 'glass-card border border-white/8 text-[#94a3b8] hover:text-white hover:border-white/14'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#64748b]"><FileText size={40} className="mx-auto mb-3 opacity-40" /><p>No articles found.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r, i) => <ReportCard key={r._id || r.slug} report={r} index={i} />)}
          </div>
        )}

        <div className="mt-16 glass-card rounded-3xl p-8 border border-[#0bc5ea]/15 text-center">
          <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">Sanity CMS · ISR Enabled</p>
          <p className="font-heading text-2xl font-bold text-white mb-2">Publish FDA Reports & Articles Instantly</p>
          <p className="text-[#94a3b8] text-sm max-w-lg mx-auto mb-5">Create FDA industry reports with video embeds, PDF downloads, and co-authors. Articles appear live in under 60 seconds — no code deployment.</p>
          <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noopener noreferrer" className="btn-exec px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 text-sm">
            Open Sanity Studio <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

