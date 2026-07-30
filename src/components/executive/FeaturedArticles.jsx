'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Pin } from 'lucide-react';
import axios from 'axios';
import STATIC_ARTICLES from '@/lib/staticArticles';
import Image from 'next/image'
import FlowConnector from './FlowConnector';
function resolveBackendUrl() {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (typeof raw !== 'string') return '';
  const t = raw.trim();
  if (!t || t === 'undefined') return '';
  if (!/^https?:\/\//i.test(t)) return '';
  return t.replace(/\/$/, '');
}

const BACKEND = resolveBackendUrl();

function mapStaticToCard(a) {
  return {
    id: a._id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    image_url: a.image_url,
    is_featured: false,
    views: 0,
  };
}

const CAT_COLORS = {
  'Emerging BME Innovations': '#0bc5ea',
  'MedTech World Sensations': '#7c3aed',
  'The Reality of Failure': '#f59e0b',
  'Project Spotlight': '#10b981',
};

function ArticleCard({ article, isPinned, isTrending, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const c = CAT_COLORS[article.category] || '#0bc5ea';
  const slug = String(article.slug || article.id || '').trim();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      data-testid={`featured-article-${article.id || index}`}
    >
      <Link
        href={`/regulatory-insights/${slug}`}
        className="relative flex flex-col glass-card rounded-2xl overflow-hidden border border-white/6 hover:-translate-y-1 hover:border-white/15 transition-all duration-300 group h-full"
      >
        {/* Image */}
        {(article.image_url || article.imageUrl) && (
          <div className=" h-[420px]  overflow-hidden relative flex-shrink-0">
            <Image
              src={article.image_url || article.imageUrl}
              alt={article.title}
              fill
              className="  object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-7 inset-0 bg-gradient-to-t from-[#0d1117] to-transparent" />
            {/* Status badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {isPinned && (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0bc5ea]/20 border border-[#0bc5ea]/40 text-[#0bc5ea]">
                  <Pin size={8} /> Featured
                </span>
              )}
              {!isPinned && isTrending && (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white">
                  <TrendingUp size={8} /> Trending
                </span>
              )}
            </div>
          </div>
        )}

        <div className={`absolute  bottom-0 flex flex-col justify-end p-6 ${isTrending ? "top-10" : "bottom-0" }`}>
          <span className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: c }}>
            {article.category}
          </span>
          <h3 className={`font-heading font-bold text-white  leading-snug group-hover:text-[#0bc5ea] transition-colors line-clamp-3 mb-2 ${isTrending ? "text-3xl" : "text-2xl"}`}>
            {article.title}
          </h3>
          <p className="text-white/100 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1 text-[10px] text-[#64748b]">
              {article.views > 0 && (
                <><TrendingUp size={9} /> {article.views} views</>
              )}
            </div>
            {/* <ArrowRight size={13} className="text-[#64748b] group-hover:text-[#0bc5ea] group-hover:translate-x-1 transition-all" /> */}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedArticles({
  initialArticles = [],
  ennobleTitle,
  ennobleSubtitle,
}) {
  const [articles, setArticles] = useState(() => (initialArticles?.length ? initialArticles : []));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (initialArticles?.length) setArticles(initialArticles);
  }, [initialArticles]);

  useEffect(() => {
    if (initialArticles?.length) return;
    const fallbackStatic = () => {
      const all = STATIC_ARTICLES.map(mapStaticToCard);
      const pinned = all.filter((a) => a.is_featured);
      const popular = all
        .filter((a) => !a.is_featured)
        .sort((a, b) => (b.views || 0) - (a.views || 0));
      setArticles([...pinned.slice(0, 2), ...popular].slice(0, 5));
    };
    if (!BACKEND) {
      fallbackStatic();
      return;
    }
    axios
      .get(`${BACKEND}/api/articles?limit=20`)
      .then((res) => {
        const all = res.data;
        const pinned = all.filter((a) => a.is_featured);
        const popular = all
          .filter((a) => !a.is_featured)
          .sort((a, b) => (b.views || 0) - (a.views || 0));
        setArticles([...pinned.slice(0, 2), ...popular].slice(0, 5));
      })
      .catch(fallbackStatic);
  }, [initialArticles]);

  const validArticles = articles.filter(
   (a) => String(a.slug || a.id || "").trim()
  );

  const featured = validArticles.slice(0, 3);
  const regular = validArticles.slice(3);

  return (
    <section data-testid="featured-articles" className="py-16 px-6 section-divider bg-[#080d12]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Ennoble brand header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
              <p className="font-heading text-4xl sm:text-5xl font-bold text-gradient-cyan leading-none mb-1">
                {ennobleTitle?.trim() || 'Ennoble'}
              </p>
              <p className="text-[#94a3b8] text-sm font-medium tracking-wide">
                {ennobleSubtitle?.trim() || 'The Frontier of Biomedical Innovation'}
              </p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            <Link
              href="/regulatory-insights"
              data-testid="view-all-ennoble"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0bc5ea] hover:gap-2.5 transition-all whitespace-nowrap"
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Popularity note */}
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="text-[#64748b] text-xs mb-6 flex items-center gap-1.5">
          <Pin size={10} className="text-[#0bc5ea]" /> Pinned by author &nbsp;·&nbsp;
          <TrendingUp size={10} className="text-[#94a3b8]" /> Ranked by reader visits
        </motion.p>

        {articles.length > 0 ? (
          <div className="relative  lg:block">
            <FlowConnector/>

            {/* Featured Articles */}
            <div className="space-y-8">

              {featured.map((article, i) => (
                <div
                  key={article.id || article.slug}
                  className="hidden lg:grid grid-cols-5 gap-6"
                >
                  <div
                    className={`col-span-3 ${
                      i % 2 === 0
                        ? "col-start-1"
                        : "col-start-3"
                    }`}
                  >
                    <ArticleCard
                      article={article}
                      isPinned={article.is_featured}
                      isTrending={!article.is_featured}
                      index={i}
                    />
                  </div>
                </div>
              ))}

              {/* Mobile */}
              <div className="lg:hidden space-y-6">
                {featured.map((article, i) => (
                  <ArticleCard
                    key={article.id || article.slug}
                    article={article}
                    isPinned={article.is_featured}
                    isTrending={!article.is_featured}
                    index={i}
                  />
                ))}
              </div>
              
            </div>
              
            {/* Other Articles */}
            {regular.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 mt-10">
                {regular.map((article, i) => (
                  <ArticleCard
                    key={article.id || article.slug}
                    article={article}
                    isPinned={article.is_featured}
                    isTrending={false}
                    index={i + featured.length}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="glass-card rounded-2xl border border-white/6 h-64 animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
