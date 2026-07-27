'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Tag, BookOpen } from 'lucide-react';
import axios from 'axios';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const CAT_COLOR = { 'Emerging BME Innovations': '#0bc5ea', 'MedTech World Sensations': '#7c3aed', 'The Reality of Failure': '#f59e0b', 'Project Spotlight': '#10b981' };

export default function InnovationPreview() {
  const [articles, setArticles] = useState([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    axios.get(`${BACKEND}/api/articles?featured=true&limit=3`).then(r => setArticles(r.data)).catch(() => {});
  }, []);

  return (
    <section data-testid="innovation-preview" className="py-20 px-6 section-divider bg-[#080d12]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">Innovation Hub</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="font-heading text-4xl sm:text-5xl font-bold text-white leading-none">
              Insights That <span className="text-gradient-cyan">Move the Field.</span>
            </motion.h2>
          </div>
          <Link href="/regulatory-insights" className="text-[#0bc5ea] text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all whitespace-nowrap">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map((a, i) => {
            const c = CAT_COLOR[a.category] || '#0bc5ea';
            return (
              <motion.div key={a.id} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <Link href={`/regulatory-insights/${a.id}`} className="flex flex-col glass-card rounded-2xl border border-white/6 overflow-hidden hover:-translate-y-1 hover:border-white/14 transition-all duration-300 group h-full">
                  {a.image_url && <div className="h-44 overflow-hidden relative"><img src={a.image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent" /></div>}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 self-start" style={{ color: c, background: `${c}15` }}>{a.category}</span>
                    <p className="font-heading font-semibold text-white text-base mb-2 leading-snug group-hover:text-[#0bc5ea] transition-colors line-clamp-2">{a.title}</p>
                    <p className="text-[#64748b] text-sm leading-relaxed line-clamp-2 mb-3 flex-1">{a.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {a.tags?.slice(0, 2).map(t => <span key={t} className="text-xs text-[#64748b] px-2 py-0.5 rounded-full bg-white/4 flex items-center gap-1"><Tag size={8} />{t}</span>)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          {articles.length === 0 && [0,1,2].map(i => (
            <div key={i} className="glass-card rounded-2xl border border-white/6 h-64 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
