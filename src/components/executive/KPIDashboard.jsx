'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { KPI_METRICS } from '@/lib/siteContentSeed';

function normalizeMetrics(metrics) {
  if (metrics?.length) {
    return [...metrics]
      .map((m, i) => ({
        end: Number.isFinite(Number(m.end)) ? Number(m.end) : 0,
        suffix: m.suffix ?? '',
        prefix: m.prefix ?? '',
        label: m.label ?? '',
        sub: m.sub ?? '',
        decimals: m.decimals == null ? 0 : Number(m.decimals),
        order: m.order == null ? i : Number(m.order),
      }))
      .sort((a, b) => a.order - b.order);
  }
  return KPI_METRICS.map((m, i) => ({ ...m, order: i }));
}

function Counter({ end, suffix, prefix, decimals, label, sub, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 1800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const prog = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setVal(eased * end);
      if (prog < 1) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), index * 150);
    return () => clearTimeout(t);
  }, [inView, end, index]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.floor(val);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      data-testid={`kpi-${index}`}
      className="glass-card rounded-2xl border border-[#0bc5ea]/10 p-6 text-center hover:-translate-y-1 transition-transform duration-200 hover:border-[#0bc5ea]/25"
    >
      <p className="font-heading font-bold text-4xl text-gradient-cyan mb-1">
        {prefix}{display}{suffix}
      </p>
      <p className="text-[#e2e8f0] text-sm font-semibold mb-1">{label}</p>
      <p className="text-[#64748b] text-xs uppercase tracking-widest">{sub}</p>
    </motion.div>
  );
}

export default function KPIDashboard({
  metrics = null,
  eyebrow,
  titlePlain,
  titleAccent,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const list = useMemo(() => normalizeMetrics(metrics), [metrics]);
  const eb = eyebrow?.trim() || 'Executive Performance Metrics';
  const tm = titlePlain?.trim() || 'Quantified Impact.';
  const ta = titleAccent?.trim() || 'Global Scale.';
  return (
    <section id="kpi-section" data-testid="kpi-section" className="py-16 px-6 section-divider bg-[#080d12]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest text-center mb-3">
          {eb}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="font-heading text-3xl sm:text-4xl font-bold text-white text-center mb-10">
          {tm}{' '}
          <span className="text-gradient-cyan">{ta}</span>
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {list.map((m, i) => (
            <Counter
              key={`${m.label}-${i}`}
              end={m.end}
              suffix={m.suffix}
              prefix={m.prefix}
              label={m.label}
              sub={m.sub}
              decimals={m.decimals}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
