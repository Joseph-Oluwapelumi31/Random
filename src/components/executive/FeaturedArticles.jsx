'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Pin } from 'lucide-react';
import axios from 'axios';
import STATIC_ARTICLES from '@/lib/staticArticles';
import Image from 'next/image'
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

function ArticleCard({ article, featured = false }) {
  const slug = String(article.slug || article.id || "").trim();

  return (
    <div>
      <Link
        href={`/regulatory-insights/${slug}`}
        className="
          group
          block
          overflow-hidden
          rounded-[28px]
          border border-border/60
          bg-card
          shadow-sm
          hover:shadow-2xl
          hover:-translate-y-2
          hover:border-primary/20
          transition-all
          duration-500
        "
      >
        {/* Image */}
        {(article.image_url || article.imageUrl) && (
          <div
            className={`relative overflow-hidden ${
              featured
                ? "aspect-[16/9]"
                : "aspect-[4/3]"
            }`}
          >
            <Image
              src={article.image_url || article.imageUrl}
              alt={article.title}
              fill
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute left-6 top-6">
              <span className="rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
                {article.category}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-7">
          <h3
            className={`
              font-heading
              font-bold
              text-foreground
              leading-tight
              transition-colors
              duration-300
              group-hover:text-primary
              ${
                featured
                  ? "text-3xl"
                  : "text-xl"
              }
            `}
          >
            {article.title}
          </h3>

          <p className="mt-4 text-muted-foreground leading-7 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              Read Article
            </span>

            <ArrowRight
              size={18}
              className="
                text-primary
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
export default function FeaturedArticles({
  initialArticles = [],
  ennobleTitle,
  ennobleSubtitle,
}) {
  const [articles, setArticles] = useState(() => (initialArticles?.length ? initialArticles : []));

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
  <section
    data-testid="featured-articles"
    className="relative py-28 overflow-hidden"
  >
    {/* Background */}
    {/* <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/40 blur-3xl" />
    </div> */}

    <div className="relative max-w-7xl mx-auto px-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div className="max-w-2xl">

          <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Curated Knowledge
          </span>

          <h2 className="mt-6 font-heading text-5xl lg:text-6xl font-bold tracking-tight leading-none">
            {ennobleTitle || "Ennoble"}
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {ennobleSubtitle ||
              "Perspectives on AI, MedTech, Commercialization and Biomedical Innovation."}
          </p>

        </div>

        <Link
          href="/regulatory-insights"
          className="btn-outline-exec rounded-xl px-6 py-3 inline-flex items-center gap-2 self-start lg:self-auto"
        >
          Explore Library
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Cards */}
      {featured.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featured.map((article) => (
            <div key={article.id || article.slug}>
              <ArticleCard article={article} featured={false} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1,2,3].map((i)=>(
            <div
              key={i}
              className="glass-card rounded-[28px] h-[480px] animate-pulse"
            />
          ))}
        </div>
      )}

    </div>
  </section>
);
}
