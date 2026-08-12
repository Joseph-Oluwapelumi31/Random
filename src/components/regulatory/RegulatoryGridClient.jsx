'use client';
import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Search, X, FileText, Youtube, Download, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import STATIC_ARTICLES from '@/lib/staticArticles';
import axios from 'axios';
import Image from 'next/image';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const CAT_CONFIG = {
  "Emerging BME Innovations": {
    dot: "bg-cyan-500",
  },

  "MedTech World Sensations": {
    dot: "bg-violet-500",
  },

  "The Reality of Failure": {
    dot: "bg-amber-500",
  },

  "Project Spotlight": {
    dot: "bg-emerald-500",
  },
};

const CATS = ["All", ...Object.keys(CAT_CONFIG)];

function ReportCard({ report, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const cfg =
    CAT_CONFIG[report.category] ||
    CAT_CONFIG["Emerging BME Innovations"];

  const date = report.publishedAt
    ? new Date(report.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const slug = report.slug || report._id;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ y: -8 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
      }}
      className="group relative overflow-hidden rounded-md bg-card transition-all duration-500 border border-border hover:border-primary/20 hover:shadow-2xl"
    >
      {/* Accent Line */}
      {/* <div
        className={`h-1 w-full bg-gradient-to-r ${cfg.gradient}`}
      /> */}

      <div className="p-7 flex h-full flex-col">
        {/* Category */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
  className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}
  aria-hidden="true"
/>
          <span
            className={`inline-flex items-center gap-2 rounded-full  px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] `}
          >
            {report.category}
          </span>

          {report.videoEmbed && (
            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-400">
              Video
            </span>
          )}

          {report.pdfUrl && (
            <span className="rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
              PDF
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {report.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
          {report.excerpt}
        </p>

        {/* Authors */}
        {report.authors?.length > 0 && (
          <div className="mt-6 flex items-center gap-3">
            {report.authors.slice(0, 2).map((author, i) => (
              <div key={i} className="flex items-center gap-2">
                {author.photo ? (
                  <Image
                    fill
                    src={author.photo}
                    alt={author.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-xs font-bold text-primary-foreground">
                    {author.name?.[0]}
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium text-foreground">
                    {author.name}
                  </p>

                  {author.role && (
                    <p className="text-[11px] text-muted-foreground">
                      {author.role}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className=" flex items-center justify-between mt-4 text-sm">
          <span className="text-xs text-muted-foreground">
            {date}
          </span>

          <Link
            href={`/regulatory-insights/${slug}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary/10"
          >
            Read article

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
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
    <div
      className="relative min-h-screen overflow-hidden bg-background"
      data-testid="regulatory-insights-page"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute left-1/2 top-0 h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]" />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div ref={ref} className="mx-auto max-w-5xl text-center">
      
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Industry Intelligence
            </span>
          </motion.div>
      
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: .1 }}
            className="mt-8 font-heading text-5xl font-bold leading-tight text-foreground md:text-7xl"
          >
            Regulatory
            <br />
            <span>
              Executive Insights
            </span>
          </motion.h1>
      
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: .2 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground"
          >
            Discover biomedical engineering breakthroughs, FDA strategy,
            regulatory intelligence, translational medicine, and executive
            perspectives shaping the future of healthcare innovation.
          </motion.p>
      
          {/* Search */}
          <motion.form
            onSubmit={handleAiSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: .3 }}
            className="mx-auto mt-12 max-w-2xl"
          >
            <div className="relative">
      
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
    
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, FDA guidance, innovations..."
                className="h-16 w-full rounded-2xl border border-border bg-card pl-14 pr-36 text-foreground shadow-xl transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
    
              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-28 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
    
              <button
                type="submit"
                disabled={aiSearching}
                className="absolute right-2 top-2 flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {aiSearching ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    AI Search
                  </>
                )}
              </button>
              
            </div>
          </motion.form>
              
          {aiResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-primary"
            >
              Gemini found {aiResults.length} result
              {aiResults.length !== 1 && "s"} for &quot;{search}&quot;
            </motion.div>
          )}
        </div>
      </section>
        
      {/* Categories */}
      {aiResults === null && (
        <section className="relative px-6 pb-10">
          <div className="mx-auto max-w-7xl">
            <div
              className="
                flex items-center gap-3
                overflow-x-auto
                whitespace-nowrap
                pb-2
                scrollbar-hide
                snap-x snap-mandatory
              "
            >
              {CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`
                    snap-start
                    shrink-0
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                  
                    ${
                      cat === c
                        ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }
                  `}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    
      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
    
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <FileText
              size={56}
              className="mb-5 text-muted-foreground opacity-40"
            />
            <h3 className="text-xl font-semibold text-foreground">
              No articles found
            </h3>
            <p className="mt-2 text-muted-foreground">
              Try another keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r, i) => (
              <ReportCard
                key={r._id || r.slug}
                report={r}
                index={i}
              />
            ))}
          </div>
        )}
    
      </section>
      
      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-primary/20 bg-card p-12 text-center shadow-2xl">
      
          <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Sanity CMS
          </span>
      
          <h2 className="mt-6 font-heading text-4xl font-bold text-foreground">
            Publish Research Instantly
          </h2>
      
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Create executive reports, FDA updates, embedded videos,
            downloadable PDFs, and featured articles without redeploying
            your website.
          </p>
      
          <a
            href="https://www.sanity.io/manage/personal/project/es4fl0a9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:scale-105"
          >
            Open Sanity Studio
            <ArrowRight size={16} />
          </a>
      
        </div>
      </section>
    </div>
  );
}

