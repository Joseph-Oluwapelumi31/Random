'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FlaskConical, ArrowRight, ChevronDown, ChevronUp, CheckCircle, Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const STATUS_CONFIG = {
  'Market Ready':        { color: '#10b981', icon: CheckCircle, badge: 'Market Ready' },
  'Clinical Phase II':   { color: '#0bc5ea', icon: Zap,         badge: 'Clinical Phase II' },
  'Phase II Active':     { color: '#7c3aed', icon: Zap,         badge: 'Phase II Active' },
  'Pre-FDA Submission':  { color: '#f59e0b', icon: Clock,       badge: 'Pre-FDA Submission' },
  'Active Development':  { color: '#06b6d4', icon: FlaskConical, badge: 'In Development' },
};

function fmt(n) { return n ? (n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${(n/1e3).toFixed(0)}K`) : null; }

function ProductCard({ product, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [expanded, setExpanded] = useState(false);

  const cfg =
    STATUS_CONFIG[product.status] ||
    STATUS_CONFIG["Active Development"];

  const StatusIcon = cfg.icon;
  const photo = product.photos?.[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
      }}
      data-testid={`product-${product._id}`}
      className="group glass-card overflow-hidden rounded-3xl border border-white/6 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_30px_60px_rgba(11,197,234,.15)]"
    >
      {photo && (
        <div className="relative h-60 overflow-hidden">
          <Image 
            fill
            src={photo}
            alt={product.projectName}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="absolute left-5 top-5">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold backdrop-blur-xl"
              style={{
                color: cfg.color,
                background: `${cfg.color}15`,
                border: `1px solid ${cfg.color}40`,
              }}
            >
              <StatusIcon size={12} />
              {cfg.badge}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="font-heading text-2xl font-bold text-white">
              {product.projectName}
            </h3>

            {fmt(product.fundingAmount) && (
              <p className="mt-1 text-sm font-semibold text-cyan-400">
                {fmt(product.fundingAmount)} • {product.nihGrant}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-5 p-6">
        {!photo && (
          <>
            <div className="flex items-start justify-between">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold"
                style={{
                  color: cfg.color,
                  background: `${cfg.color}15`,
                  border: `1px solid ${cfg.color}35`,
                }}
              >
                <StatusIcon size={12} />
                {cfg.badge}
              </span>

              {fmt(product.fundingAmount) && (
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Funding
                  </p>

                  <p className="font-heading text-lg font-bold text-cyan-400">
                    {fmt(product.fundingAmount)}
                  </p>
                </div>
              )}
            </div>

            <h3 className="font-heading text-2xl font-bold leading-tight text-white">
              {product.fullTitle}
            </h3>

            {product.nihGrant && (
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
                {product.nihGrant}
              </p>
            )}
          </>
        )}

        <p className="line-clamp-3 text-sm leading-7 text-slate-400">
          {product.description}
        </p>

        {product.engineeringStory && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              {expanded ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}

              {expanded ? "Hide Engineering Story" : "Read Engineering Story"}
            </button>

            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="rounded-2xl border border-white/6 bg-white/5 p-4"
              >
                <p className="text-sm leading-7 text-slate-300">
                  {product.engineeringStory}
                </p>
              </motion.div>
            )}
          </>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t border-white/6 pt-5">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
            {product.phase}
          </span>

          <span
            className="rounded-full px-3 py-1.5 text-xs font-medium"
            style={{
              color: cfg.color,
              background: `${cfg.color}15`,
            }}
          >
            {product.marketStatus}
          </span>

          <Link
            href={`/innovation-pipeline/${product._id}`}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold transition-all hover:border-cyan-400 hover:bg-cyan-500/10"
            style={{ color: cfg.color }}
          >
            Full Story

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductRoadmapClient({ products }) {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Glow */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div> */}

      <div
        className="relative mx-auto max-w-7xl px-6 pt-36 pb-24"
        data-testid="innovation-pipeline-page"
      >
        {/* Hero */}
        <div ref={headerRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
          >
            Global R&amp;D Strategy · Product Pipeline
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl font-bold leading-none text-foreground lg:text-7xl"
          >
            Innovation Pipeline.
            <span className="block">
              0-to-1 at Scale.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground"
          >
            A portfolio of breakthrough healthcare technologies spanning
            diagnostics, AI-enabled systems, connected medical devices and
            FDA-focused innovations—from early research through
            commercialization.
          </motion.p>
        </div>

        {/* Executive Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            ["6+", "Innovation Programs"],
            ["NIH", "Research Funding"],
            ["FDA", "Regulatory Strategy"],
            ["0→1", "Product Development"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="glass-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-heading text-4xl font-bold text-primary">
                {value}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Section Heading */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Featured Programs
          </p>

          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">
            Explore the Innovation Portfolio
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every product represents a unique stage of research, engineering,
            clinical validation and commercial readiness.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* CMS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card mt-24 rounded-3xl border border-border p-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Content Management
              </p>

              <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">
                Manage the Innovation Portfolio
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
                Publish new products, engineering milestones, clinical
                progress, funding updates and media directly from Sanity CMS.
                Updates appear instantly across the portfolio.
              </p>

              <a
                href="https://www.sanity.io/manage/personal/project/es4fl0a9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-exec mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3"
              >
                Open Sanity Studio
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="space-y-5">
                <div className="h-3 w-40 rounded-full bg-primary/20" />
                <div className="h-3 w-full rounded-full bg-border" />
                <div className="h-3 w-5/6 rounded-full bg-border" />
                <div className="h-3 w-3/4 rounded-full bg-border" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
