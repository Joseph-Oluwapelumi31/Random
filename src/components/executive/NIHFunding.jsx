'use client';
/** Home `/` and CMS-driven NIH section — this is the file to edit for the live portfolio UI. */
import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FlaskConical, ChevronDown, ChevronUp } from 'lucide-react';
import { NIH_PORTFOLIO_PROJECTS, NIH_SUMMARY_TILES } from '@/lib/siteContentSeed';

const PHASE_STYLE = {
  'Phase I':    { color: '#0bc5ea', bg: 'rgba(11,197,234,0.1)' },
  'Phase II':   { color: '#7c3aed', bg: 'rgba(186, 237, 58, 0.1)' },
  'I-CORPS':   { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'Supplement': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'TABA':       { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
};

function fmt(n) { return n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${(n/1e3).toFixed(0)}K`; }

function ProjectCard({ p, index, totalShareBase }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [open, setOpen] = useState(false);
  const pct = totalShareBase > 0 ? Math.round(((Number(p.total) || 0) / totalShareBase) * 100) : 0;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.09 }} data-testid={`nih-project-${p.id}`} className="glass-card rounded-2xl border overflow-hidden hover:border-opacity-40 transition-all duration-300" style={{ borderColor: `${p.color}20` }}>
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl flex-shrink-0" style={{ background: `${p.color}15` }}>
              <FlaskConical size={15} style={{ color: p.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-white text-base">{p.name}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: p.color, background: `${p.color}15` }}>{p.agency}</span>
              </div>
              <p className="text-[#94a3b8] text-xs mt-0.5 max-w-xs truncate">{p.full}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-heading font-bold text-lg" style={{ color: p.color }}>{fmt(p.total)}</p>
            <p className="text-[#64748b] text-xs">{p.years}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs px-2.5 py-1 rounded-full glass-card border border-white/8 text-[#94a3b8] font-medium">{p.role}</span>
        </div>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-[#64748b] mb-1.5"><span>Portfolio Share</span><span>{pct}%</span></div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : {}} transition={{ duration: 1, delay: index * 0.09 + 0.4 }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}80)` }} />
          </div>
        </div>
        <p className="text-[#64748b] text-xs leading-relaxed mb-3">{p.desc}</p>
        <button onClick={() => setOpen(!open)} data-testid={`expand-${p.id}`} className="flex items-center gap-1 text-xs font-semibold" style={{ color: p.color }}>
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {open ? 'Hide' : 'View'} {(p.awards || []).length} Awards
        </button>
        {open && (
          <div className="mt-3 rounded-xl overflow-hidden border border-white/6">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-white/6 bg-white/2"><th className="text-left px-3 py-2 text-[#64748b] font-semibold">Type</th><th className="text-left px-3 py-2 text-[#64748b] font-semibold">Year</th><th className="text-right px-3 py-2 text-[#64748b] font-semibold">Amount</th><th className="text-left px-3 py-2 text-[#64748b] font-semibold hidden sm:table-cell">NIH ID</th></tr></thead>
              <tbody>
                {(p.awards || []).map((a, i) => {
                  const s = PHASE_STYLE[a.type] || { color: '#94a3b8', bg: 'rgba(148,163,184,0.08)' };
                  return (
                    <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2">
                      <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded-full font-medium text-xs" style={{ color: s.color, background: s.bg }}>{a.type}</span></td>
                      <td className="px-3 py-2.5 text-[#94a3b8]">{a.year}</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-white">{fmt(a.amount)}</td>
                      <td className="px-3 py-2.5 text-[#64748b] font-mono hidden sm:table-cell">{a.id || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function NIHFunding({
  projects: projectsProp = null,
  eyebrow,
  titlePlain,
  titleAccent,
  summaryTiles: summaryTilesProp = null,
  footerNote,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const projects = Array.isArray(projectsProp) && projectsProp.length ? projectsProp : NIH_PORTFOLIO_PROJECTS;
  const rawTiles = Array.isArray(summaryTilesProp) && summaryTilesProp.length ? summaryTilesProp : NIH_SUMMARY_TILES;
  const summaryTiles = (() => {
    const cleaned = rawTiles.filter((s) => s && (s.label || s.value));
    return cleaned.length ? cleaned : NIH_SUMMARY_TILES;
  })();
  const totalShareBase = useMemo(
    () => projects.reduce((s, p) => s + (Number(p.total) || 0), 0),
    [projects],
  );
  const eb = eyebrow?.trim() || 'Federal Research Portfolio';
  const tm = titlePlain?.trim() || 'NIH-Funded Innovation.';
  const ta = titleAccent?.trim() || 'Peer-Reviewed Impact.';
  const foot =
    footerNote?.trim() ||
    'All grants through Evon Medics LLC - NIH SBIR Program';
  return (
    <section id="nih-portfolio" data-testid="nih-funding-section" className="py-20 px-6 section-divider bg-[#080d12]">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-10">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">{eb}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="font-heading text-4xl sm:text-5xl font-bold text-white leading-none mb-8">
            {tm}{' '}
            <span className="text-gradient-cyan">{ta}</span>
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
            {summaryTiles.map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="glass-card rounded-2xl border border-white/6 p-5 text-center hover:-translate-y-0.5 transition-transform duration-200">
                <p className="font-heading font-bold text-2xl mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[#64748b] text-xs uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} totalShareBase={totalShareBase} />
          ))}
        </div>
        <p className="text-center text-[#64748b] text-xs mt-8">{foot}</p>
      </div>
    </section>
  );
}
