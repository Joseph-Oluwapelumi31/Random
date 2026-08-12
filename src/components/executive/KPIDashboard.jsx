'use client';
import { useMemo } from 'react';
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
  const display = decimals > 0 ? Number(end).toFixed(decimals) : Math.floor(end);

  return (
    <div
      data-testid={`kpi-${index}`}
      className="glass-card rounded-2xl border border-cyan-glow p-6 text-center hover:-translate-y-1 transition-transform duration-200 hover:border-primary/25"
    >
      <p className="font-heading font-bold text-4xl text-gradient-cyan mb-1">
        {prefix}{display}{suffix}
      </p>
      <p className="text-foreground text-sm font-semibold mb-1">{label}</p>
      <p className="text-muted-foreground text-xs uppercase tracking-widest">{sub}</p>
    </div>
  );
}

export default function KPIDashboard({
  metrics = null,
  eyebrow,
  titlePlain,
  titleAccent,
}) {
  const list = useMemo(() => normalizeMetrics(metrics), [metrics]);
  const eb = eyebrow?.trim() || 'Executive Performance Metrics';
  const tm = titlePlain?.trim() || 'Quantified Impact.';
  const ta = titleAccent?.trim() || 'Global Scale.';
  return (
    <section id="kpi-section" data-testid="kpi-section" className="py-16 px-6 section-divider bg-background">
      <div className="max-w-7xl mx-auto">
        <p className="text-primary text-xs font-semibold uppercase tracking-widest text-center mb-3">
          {eb}
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground text-center mb-10">
          {tm}{' '}
          <span className="text-gradient-cyan">{ta}</span>
        </h2>
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
