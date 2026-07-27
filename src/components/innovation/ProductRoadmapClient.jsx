'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FlaskConical, ArrowRight, ChevronDown, ChevronUp, CheckCircle, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

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
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[product.status] || STATUS_CONFIG['Active Development'];
  const StatusIcon = cfg.icon;
  const photo = product.photos?.[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      data-testid={`product-${product._id}`}
      className="glass-card rounded-2xl border border-white/6 overflow-hidden hover:border-white/12 transition-all duration-300"
    >
      {photo && (
        <div className="h-52 overflow-hidden relative">
          <img src={photo} alt={product.projectName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/90 via-[#0d1117]/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass-exec" style={{ color: cfg.color, border: `1px solid ${cfg.color}40` }}>
              <StatusIcon size={11} /> {cfg.badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-heading font-bold text-white text-xl">{product.projectName}</p>
            {fmt(product.fundingAmount) && (
              <p className="text-[#0bc5ea] text-sm font-semibold">{fmt(product.fundingAmount)} · {product.nihGrant}</p>
            )}
          </div>
        </div>
      )}

      <div className="p-6">
        {!photo && (
          <div className="flex items-start gap-3 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass-card border" style={{ color: cfg.color, borderColor: `${cfg.color}30` }}>
              <StatusIcon size={11} />{cfg.badge}
            </span>
            <div className="ml-auto">
              {fmt(product.fundingAmount) && <p className="font-heading font-bold text-lg text-[#0bc5ea]">{fmt(product.fundingAmount)}</p>}
            </div>
          </div>
        )}

        <h3 className="font-heading font-bold text-white text-xl mb-1">{product.fullTitle}</h3>
        {product.nihGrant && !photo && <p className="text-[#0bc5ea] text-xs font-semibold mb-3">{product.nihGrant}</p>}

        <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{product.description}</p>

        {product.engineeringStory && (
          <>
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1.5 text-[#0bc5ea] text-xs font-semibold mb-3">
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {expanded ? 'Hide' : 'Read'} Engineering Story
            </button>
            {expanded && (
              <div className="prose-exec text-sm bg-white/2 rounded-xl p-4 border border-white/6 mb-4">
                {product.engineeringStory}
              </div>
            )}
          </>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/4 text-[#94a3b8] border border-white/8">
            {product.phase}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ color: cfg.color, background: `${cfg.color}12` }}>
            {product.marketStatus}
          </span>
          <Link
            href={`/innovation-pipeline/${product._id}`}
            className="ml-auto flex items-center gap-1 text-xs font-semibold hover:gap-2 transition-all"
            style={{ color: cfg.color }}
            data-testid={`view-project-${product._id}`}
          >
            Full Story <ArrowRight size={12} />
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
    <div className="bg-[#080d12] min-h-screen" data-testid="innovation-pipeline-page">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div ref={headerRef} className="mb-14">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">
            Global R&D Strategy · Product Pipeline
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-none mb-4">
            Innovation Pipeline.
            <span className="block text-gradient-cyan">0-to-1 at Scale.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">
            Six integrated product lines from concept to clinical validation — each backed by NIH funding, FDA regulatory strategy, and end-to-end hardware/software engineering.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 glass-card rounded-3xl p-8 border border-[#0bc5ea]/15 text-center"
        >
          <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">Publish Content</p>
          <p className="font-heading text-2xl font-bold text-white mb-2">Add Product Updates via Sanity CMS</p>
          <p className="text-[#94a3b8] text-sm max-w-lg mx-auto mb-5">Create detailed product roadmap entries — with engineering stories, photos, and market status badges — directly in Sanity Studio. Changes appear instantly with ISR.</p>
          <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noopener noreferrer" className="btn-exec px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 text-sm">
            Open Sanity Studio <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
