'use client';
import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, GraduationCap, Lightbulb, Globe, Shield, Microscope, BookOpen, Dna, TrendingUp, Target } from 'lucide-react';
import { BENTO_TILE_DEFAULTS } from '@/lib/siteContentSeed';
import { BRAND_LOGO_URLS } from '@/lib/brandLogos';

const LogoJHU = () => (
  <img
    src={BRAND_LOGO_URLS.johnsHopkins}
    alt="Johns Hopkins University"
    className="block h-7 max-h-7 w-auto max-w-[7rem] object-contain object-left shrink-0 bg-transparent border-0"
    draggable={false}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
);
const LogoNIT = () => (
  <img
    src={BRAND_LOGO_URLS.nitRourkela}
    alt="NIT Rourkela"
    className="block h-7 max-h-7 w-auto max-w-[2.75rem] object-contain object-left shrink-0 bg-transparent border-0"
    draggable={false}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
);
const LogoEvon = () => (
  <img
    src={BRAND_LOGO_URLS.evon}
    alt="Evon Medics"
    className="block h-7 max-h-7 w-auto max-w-[6.5rem] object-contain object-left shrink-0 bg-transparent border-0"
    draggable={false}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
);
const LogoPlAffiliates = () => (
  <div className="flex items-center gap-2 flex-shrink-0">
    <LogoEvon />
  </div>
);

const BENTO_ICONS = {
  eb1a: Award,
  pl: TrendingUp,
  ip: Lightbulb,
  lifecycle: Target,
  jhu: GraduationCap,
  nitr: Microscope,
  infra: Dna,
  fda: Shield,
  global: Globe,
  pubs: BookOpen,
};

const BENTO_LOGOS = {
  pl: LogoPlAffiliates,
  jhu: LogoJHU,
  nitr: LogoNIT,
};

/** Defaults from `siteContentSeed`; copy overridden per `id` by Sanity `executiveBento` docs. */
function defaultBentoRows() {
  return BENTO_TILE_DEFAULTS.map((t) => ({
    ...t,
    Icon: BENTO_ICONS[t.id],
    Logo: BENTO_LOGOS[t.id],
  }));
}

function mergeBentoFromSanity(sanityTiles) {
  const base = defaultBentoRows();
  if (!Array.isArray(sanityTiles) || !sanityTiles.length) return base;
  const byId = new Map(sanityTiles.map((t) => [t.id, t]));
  return base.map((def) => {
    const s = byId.get(def.id);
    if (!s) return def;
    return {
      ...def,
      label: s.label || def.label,
      title: s.title || def.title,
      desc: s.desc || def.desc,
      accent: s.accent || def.accent,
    };
  });
}

function BentoCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { Logo } = item;
  const Icon = item.Icon || Award;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      data-testid={`bento-${item.id}`}
      className={`relative overflow-hidden rounded-2xl glass-card border p-5 group hover:-translate-y-1 transition-all duration-300 ${item.span}`}
      style={{ borderColor: `${item.accent}18` }}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-70 rounded-2xl`} aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 40% 40%, ${item.accent}0e 0%, transparent 70%)` }}
        aria-hidden
      />
      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-3">
          {Logo ? (
            <div className="flex-shrink-0 mt-1"><Logo /></div>
          ) : (
            <div className="p-2 rounded-xl flex-shrink-0" style={{ background: `${item.accent}18` }}>
              <Icon size={16} style={{ color: item.accent }} />
            </div>
          )}
          <span className="text-xs font-semibold uppercase tracking-widest mt-2" style={{ color: item.accent }}>
            {item.label}
          </span>
        </div>
        <h3 className="font-heading font-bold text-white text-base mb-2 leading-snug">{item.title}</h3>
        <p className="text-[#94a3b8] text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function ExecutiveBento({
  sanityTiles = null,
  sectionEyebrow,
  sectionTitle,
  sectionTitleAccent,
  sectionHint,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const items = useMemo(() => mergeBentoFromSanity(sanityTiles), [sanityTiles]);

  const eyebrow = sectionEyebrow?.trim() || 'Executive Profile';
  const titleMain = sectionTitle?.trim() || 'Built on Science.';
  const titleAccent = sectionTitleAccent?.trim() || 'Driven by Impact.';
  const hint =
    sectionHint?.trim() ||
    'Impact statements editable via Sanity Studio → executiveBento documents (match Tile IDs).';

  return (
    <section id="about" data-testid="executive-bento" className="py-20 px-6 section-divider bg-[#080d12]">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-12">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">{eyebrow}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white leading-none">
            {titleMain}{' '}
            <span className="text-gradient-cyan">{titleAccent}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
            className="text-[#64748b] text-xs mt-2">{hint}</motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {items.map((item, i) => <BentoCard key={item.id} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}
