'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HERO_BRAND_LOGOS } from '@/lib/brandLogos';

const PROFILE_PHOTO = 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg';

const ROTATING_ATTRIBUTES = [
  'Johns Hopkins Alum',
  'IP Strategist',
  'Regulatory Expert',
  'Global R&D Leader',
  'MedTech Executive'
];

function useTypewriter(texts, typeSpeed = 72, deleteSpeed = 38, pause = 2200) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (!Array.isArray(texts) || texts.length === 0) return;
    const len = texts.length;
    const safeIdx = ((idx % len) + len) % len;
    const target = texts[safeIdx];
    if (typeof target !== 'string' || target.length === 0) return;
    let timer;
    if (typing) {
      if (charIdx < target.length) {
        timer = setTimeout(() => {
          setDisplay(target.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, typeSpeed);
      } else {
        timer = setTimeout(() => setTyping(false), pause);
      }
    } else if (charIdx > 0) {
      timer = setTimeout(() => {
        setDisplay(target.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, deleteSpeed);
    } else {
      setIdx((i) => (i + 1) % len);
      setTyping(true);
    }
    return () => clearTimeout(timer);
  }, [charIdx, typing, idx, texts, typeSpeed, deleteSpeed, pause]);

  return display;
}

function NeuralCanvas() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || shouldReduceMotion) return;
    if (window.innerWidth < 1024) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w < 2 || h < 2) return;

    canvas.width = w;
    canvas.height = h;
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.1 + 0.7,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.phase += 0.008;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 78) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(11,197,234,${(1 - d / 78) * 0.08})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.fillStyle = 'rgba(11,197,234,0.16)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [shouldReduceMotion]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" aria-hidden />;
}

function TypewriterBadge({ className = '', variant = 'overlay', lines }) {
  const texts = Array.isArray(lines) && lines.length ? lines : ROTATING_ATTRIBUTES;
  const text = useTypewriter(texts);
  const isBelow = variant === 'below';
  return (
    <div className={`glass-exec rounded-xl px-4 py-3 border border-primary/25 ${className}`}>
      <p className={`text-muted-foreground text-[9px] font-semibold uppercase tracking-widest mb-1 ${isBelow ? 'text-left' : 'text-center sm:text-left'}`}>Executive Identity</p>
      <p
        className={
          isBelow
            ? 'text-foreground text-sm font-semibold font-heading leading-snug text-left break-words min-h-[1.75rem]'
            : 'text-foreground text-sm font-semibold font-heading min-h-[1.75rem] sm:min-h-[1.4em] leading-snug text-center sm:text-left max-w-[16rem] sm:max-w-none mx-auto sm:mx-0 break-words sm:foregroundspace-nowrap'
        }
      >
        {text}<span className="inline-block w-[2px] h-[1em] bg-primary ml-[1px] animate-pulse align-middle" />
      </p>
    </div>
  );
}

export default function Hero3D({ heroCopy = null }) {
  const shouldReduceMotion = useReducedMotion();
  const heroEyebrow =
    (typeof heroCopy?.heroEyebrow === 'string' && heroCopy.heroEyebrow.trim()) ||
    'EB-1A Scientist';
  // const heroHeadlinePlain =
  //   (typeof heroCopy?.heroHeadlinePlain === 'string' && heroCopy.heroHeadlinePlain.trim()) ||
  //   'Global MedTech Executive & R&D Strategist';
  const heroHeadlineGradient =
    (typeof heroCopy?.heroHeadlineGradient === 'string' && heroCopy.heroHeadlineGradient.trim()) ||
    'Ponieering the future of clinical innovation.';
  const heroSubline1 =
    (typeof heroCopy?.heroSubline1 === 'string' && heroCopy.heroSubline1.trim()) ||
    'Vamsi Reddy stands at the intersection of deep-tech enginneering, regulatory strategy, and commercialization. With a proven track record of leading global R&D teams, securing intellectual property, and navigating complex regulatory landscapes, he is dedicated to transforming innovative ideas into market-ready solutions that improve patient outcomes.';
  /* Referenced in JSX below — commenting this out breaks the whole home page (ReferenceError). */
  const heroSubline2 =
    (typeof heroCopy?.heroSubline2 === 'string' && heroCopy.heroSubline2.trim()) ||
    'IP, Regulatory & Commercialization Expert';
  /** Stable reference so TypewriterBadge/useTypewriter are not reset every parent render (avoids HMR/runtime glitches). */
  const typewriterLines = useMemo(() => {
    if (!Array.isArray(heroCopy?.heroTypewriterLines)) return [];
    return heroCopy.heroTypewriterLines
      .map((s) =>
        typeof s === 'string'
          ? s.trim()
          : typeof s === 'object' && s && typeof s.text === 'string'
            ? s.text.trim()
            : '',
      )
      .filter(Boolean);
  }, [heroCopy?.heroTypewriterLines]);

  return (
    <section 
      data-testid="hero-section" 
      className="relative min-h-screen  overflow-x-clip overflow-y-visible flex items-center "
      style={{
        background: `
          radial-gradient(
            circle at 70% 15%,
            rgba(25,123,189,0.05),
            transparent 45%
          ),
          hsl(var(--background))
        `,
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <NeuralCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-[1]" />
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-primary/4 rounded-full blur-[120px] pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-6 w-full pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-10 lg:gap-20 items-center">
        
        {/* Left: Large portrait — desktop only */}
        <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0.2 } : { duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="relative hidden lg:flex items-center justify-center"
            data-testid="hero-profile-photo"
          >
            {/* Soft brand glow */}
            <div className="absolute w-[390px] h-[520px] rounded-[2.5rem] bg-primary/5 blur-3xl scale-105" />

            <motion.div
              whileHover={shouldReduceMotion ? undefined : {
                y: -6,
                scale: 1.01,
              }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.35 }}
              className="
                relative
                w-[390px]
                h-[520px]
                overflow-hidden
                rounded-[2.5rem]
                border border-white/20
                shadow-[0_20px_50px_rgba(15,23,42,0.10)]
                bg-card
                z-10
              "
            >
              {/* Portrait */}
              <Image
                src={PROFILE_PHOTO}
                alt="Vamsi Reddy"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 390px"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-top
                  transition-transform
                  duration-700
                  hover:scale-[1.03]
                "
              />

              {/* Light bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            
              {/* Bottom integrated panel */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="
                    rounded-2xl
                    bg-black/35
                    backdrop-blur-xl
                    border border-white/10
                    p-5
                  "
                >
                  <Link
                    href="/global-strategy"
                    className="inline-block transition-opacity hover:opacity-80"
                  >
                    <h3 className="font-heading text-xl font-bold text-white">
                      Vamsi Reddy
                    </h3>
                  </Link>
            
                  <p className="mt-1 text-sm text-white/70">
                    MedTech Executive • EB-1A Scientist
                  </p>
            
                  <div className="mt-4">
                    <TypewriterBadge
                      key={
                        typewriterLines.length
                          ? typewriterLines.join("|")
                          : "default"
                      }
                      lines={
                        typewriterLines.length
                          ? typewriterLines
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          {/* Right: Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[640px]">
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 0.2 }}
          className="
            inline-flex
            items-center
            gap-2.5
            rounded-full
            glass-exec
            border
            border-border
            px-4
            py-2
            mb-8
            shadow-sm
          "
        >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-40 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
        </span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {heroEyebrow}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 0.32 }}
          className="font-heading font-bold text-foreground leading-[0.95] tracking-[-0.04em] mb-8"
        >
          <span className="block text-5xl sm:text-6xl ">
            {heroHeadlineGradient}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 0.46 }}
          className="
            max-w-xl
            text-lg
            leading-8
            text-muted-foreground
            mb-10
          "
        >
          {heroSubline1}
        </motion.p>

        {/* Mobile Image */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 0.55 }}
          className="lg:hidden flex flex-col items-center w-full max-w-sm my-8"
        >
          <div
            className="
              relative
              w-full
              aspect-[13/17]
              overflow-hidden
              rounded-[2rem]
              border border-border
              shadow-[0_20px_50px_rgba(15,23,42,0.10)]
            "
          >
            <Image
              src={PROFILE_PHOTO}
              alt="Vamsi Reddy"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          <div className="mt-5 w-full">
            <TypewriterBadge
              key={typewriterLines.length ? typewriterLines.join('|') : 'default'}
              variant="below"
              className="w-full"
              lines={typewriterLines.length ? typewriterLines : undefined}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 0.62 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/innovation-pipeline"
            data-testid="hero-cta-pipeline"
            className="
              group
              btn-exec
              inline-flex
              items-center
              gap-2
              rounded-xl
              px-7
              py-3.5
              text-sm
              font-semibold
              shadow-[0_10px_30px_hsl(var(--primary)/0.18)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_16px_40px_hsl(var(--primary)/0.28)]
              active:translate-y-0
            "
          >
            <span>Innovation Pipeline</span>

            <ArrowRight
              size={16}
              className="
                text-secondary
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>

          <Link
            href="/global-strategy"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-border
              bg-card
              px-7
              py-3.5
              text-sm
              font-semibold
              text-foreground
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-primary/30
              hover:bg-primary/5
              hover:shadow-md
              active:translate-y-0
            "
          >
            Executive Profile
          </Link>
        </motion.div>
      </div>

          
          
          <motion.button
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 1.8 }}
            onClick={() => document.getElementById('kpi-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            data-testid="hero-scroll-down"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={14} />
          </motion.button>
        </div>
      </div>

      
    </section>
  );
}
