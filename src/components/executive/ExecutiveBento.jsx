'use client';
import { useMemo } from 'react';
import { Award, GraduationCap, Lightbulb, Globe, Shield, Microscope, BookOpen, Dna, TrendingUp, Target } from 'lucide-react';
import { BENTO_TILE_DEFAULTS } from '@/lib/siteContentSeed';
import { BRAND_LOGO_URLS } from '@/lib/brandLogos';
import Image  from 'next/image';

const LogoJHU = () => (
  <Image
    src={BRAND_LOGO_URLS.johnsHopkins}
    width={104}
    height={28}
    alt="Johns Hopkins University"
    className="block h-7 max-h-7 w-auto max-w-[7rem] object-contain object-left shrink-0 bg-transparent border-0"
    draggable={false}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
);
const LogoNIT = () => (
  <Image
    src={BRAND_LOGO_URLS.nitRourkela}
    width={104}
    height={28}
    alt="NIT Rourkela"
    className="block h-7 max-h-7 w-auto max-w-[2.75rem] object-contain object-left shrink-0 bg-transparent border-0"
    draggable={false}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
);
const LogoEvon = () => (
  <Image
    src={BRAND_LOGO_URLS.evon}
    width={104}
    height={28}
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

function BentoCard({ item }) {
  const { Logo } = item;
  const Icon = item.Icon || Award;
  return (
    <div
      data-testid={`bento-${item.id}`}
    className={`
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-border/60
      bg-card
      p-8
      shadow-sm
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-2xl
      hover:border-primary/20
      ${item.span}
      `}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at top right, ${item.accent}15 0%, transparent 65%)`,
        }}
      />

      {/* Accent line */}
      <div
        className="absolute top-0 left-0 h-1 w-full"
        style={{
          background: `linear-gradient(to right, ${item.accent}, transparent)`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          {Logo ? (
            <Logo />
          ) : (
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center border"
              style={{
                background: `${item.accent}10`,
                borderColor: `${item.accent}25`,
              }}
            >
              <Icon
                size={22}
                style={{
                  color: item.accent,
                }}
              />
            </div>
          )}

          <span
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: item.accent }}
          >
            {item.label}
          </span>

        </div>

        {/* Content */}

        <h3 className="font-heading text-xl font-bold leading-tight text-foreground">
          {item.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {item.desc}
        </p>

        {/* Footer */}

        <div className="mt-auto pt-8 flex items-center justify-between">

          <span className="text-sm font-medium text-primary">
            Learn more
          </span>

          <div
            className="
              w-10
              h-10
              rounded-full
              border
              flex
              items-center
              justify-center
              transition-all
              duration-300
              group-hover:bg-primary
              group-hover:border-primary
            "
          >
            <TrendingUp
              size={16}
              className="
                text-primary
                transition-colors
                duration-300
                group-hover:text-white
              "
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ExecutiveBento({
  sanityTiles = null,
  sectionEyebrow,
  sectionTitle,
  sectionTitleAccent,
  sectionHint,
}) {
  const items = useMemo(() => mergeBentoFromSanity(sanityTiles), [sanityTiles]);

  const eyebrow = sectionEyebrow?.trim() || 'Executive Profile';
  const titleMain = sectionTitle?.trim() || 'Built on Science.';
  const titleAccent = sectionTitleAccent?.trim() || 'Driven by Impact.';
  const hint =
    sectionHint?.trim() ||
    'Impact statements editable via Sanity Studio → executiveBento documents (match Tile IDs).';

  return (
    <section
      id="about"
      data-testid="executive-bento"
      className="relative py-28 px-6 overflow-hidden section-divider"
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_top,rgba(14,165,233,.08),transparent_60%)]
        "
      />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-10
            mb-16
          "
        >
          <div className="max-w-3xl">

            <div>
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-primary/20
                  bg-primary/5
                  px-4
                  py-1.5
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-primary
                "
              >
                {eyebrow}
              </span>

              <h2
                className="
                  mt-6
                  font-heading
                  text-5xl
                  lg:text-6xl
                  font-bold
                  tracking-tight
                  leading-[1.05]
                "
              >
                {titleMain}

                <span className="block text-gradient-cyan mt-2">
                  {titleAccent}
                </span>
              </h2>

              <p
                className="
                  mt-6
                  text-lg
                  leading-8
                  text-muted-foreground
                  max-w-2xl
                "
              >
                {hint}
              </p>
            </div>
          </div>

          {/* Executive Stats */}
          <div
            className="
              flex
              gap-8
              lg:justify-end
              flex-wrap
            "
          >
            <div>
              <p className="text-3xl font-bold">$12.5M</p>
              <p className="text-sm text-muted-foreground">
                Portfolio
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">5+</p>
              <p className="text-sm text-muted-foreground">
                US Patents
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">10+</p>
              <p className="text-sm text-muted-foreground">
                Years
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            auto-rows-[240px]
            gap-6
          "
        >
          {items.map((item, i) => (
            <BentoCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
