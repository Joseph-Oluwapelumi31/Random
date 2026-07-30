'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w < 2 || h < 2) return;
    canvas.width = w;
    canvas.height = h;
    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.8, phase: Math.random() * Math.PI * 2,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.phase += 0.012;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(11,197,234,${(1 - d / 110) * 0.1})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      nodes.forEach(n => {
        ctx.fillStyle = `rgba(11,197,234,0.18)`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" aria-hidden />;
}

function TypewriterBadge({ className = '', variant = 'overlay', lines }) {
  const texts = Array.isArray(lines) && lines.length ? lines : ROTATING_ATTRIBUTES;
  const text = useTypewriter(texts);
  const isBelow = variant === 'below';
  return (
    <div className={`glass-exec rounded-xl px-4 py-3 border border-[#0bc5ea]/25 ${className}`}>
      <p className={`text-[#64748b] text-[9px] font-semibold uppercase tracking-widest mb-1 ${isBelow ? 'text-left' : 'text-center sm:text-left'}`}>Executive Identity</p>
      <p
        className={
          isBelow
            ? 'text-white text-sm font-semibold font-heading leading-snug text-left break-words min-h-[1.75rem]'
            : 'text-white text-sm font-semibold font-heading min-h-[1.75rem] sm:min-h-[1.4em] leading-snug text-center sm:text-left max-w-[16rem] sm:max-w-none mx-auto sm:mx-0 break-words sm:whitespace-nowrap'
        }
      >
        {text}<span className="inline-block w-[2px] h-[1em] bg-[#0bc5ea] ml-[1px] animate-pulse align-middle" />
      </p>
    </div>
  );
}

export default function Hero3D({ heroCopy = null }) {
  const heroEyebrow =
    (typeof heroCopy?.heroEyebrow === 'string' && heroCopy.heroEyebrow.trim()) ||
    'EB-1A Scientist';
  // const heroHeadlinePlain =
  //   (typeof heroCopy?.heroHeadlinePlain === 'string' && heroCopy.heroHeadlinePlain.trim()) ||
  //   'Global MedTech Executive & R&D Strategist';
  const heroHeadlineGradient =
    (typeof heroCopy?.heroHeadlineGradient === 'string' && heroCopy.heroHeadlineGradient.trim()) ||
    'Engineering the Future of Human Health.';
  const heroSubline1 =
    (typeof heroCopy?.heroSubline1 === 'string' && heroCopy.heroSubline1.trim()) ||
    'Global R&D Strategy • Product Pipeline •NIH-Funded Innovation';
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
    <section data-testid="hero-section" className="relative min-h-screen bg-[#080d12] overflow-x-clip overflow-y-visible flex items-center">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <NeuralCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#080d12] via-[#080d12]/55 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d12] via-transparent to-transparent pointer-events-none z-[1]" />
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-[#0bc5ea]/4 rounded-full blur-[120px] pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-6 w-full pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* LEFT: Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-exec rounded-full px-4 py-1.5 mb-7 border border-[#0bc5ea]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0bc5ea] animate-pulse" />
              <span className="text-[#94a3b8] text-xs font-medium tracking-wide">{heroEyebrow}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
              className="font-heading font-bold leading-[1.08] text-white mb-6">
              {/* <span className="block text-3xl sm:text-4xl lg:text-5xl tracking-tight">{heroHeadlinePlain}</span> */}
              <span className="block text-4xl sm:text-3xl lg:text-[2.65rem] text-gradient-cyan  mt-3 mb-4 sm:mt-4">
                {heroHeadlineGradient}
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}
              className="text-[#94a3b8] text-base md:text-lg mb-2 leading-relaxed">
              {heroSubline1}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
              className="text-[#0bc5ea]/75 text-sm font-medium mb-6 tracking-wide">
              {heroSubline2}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 mb-8 px-1 py-2 rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.08]"
              aria-label="Affiliations"
            >
              {HERO_BRAND_LOGOS.map((logo) => (
                <span
                  key={logo.alt}
                  className="inline-flex items-center justify-center min-h-9 px-1"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={logo.className}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.visibility = 'hidden';
                      el.removeAttribute('src');
                    }}
                  />
                </span>
              ))}
            </motion.div>

            {/* Mobile profile photo — badge sits below frame so it is never clipped by overflow-hidden */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="lg:hidden flex flex-col items-stretch w-full max-w-sm mx-auto my-8 relative z-[3] shrink-0"
            >
              <div
                className="relative mx-auto w-[min(100%,20rem)] aspect-[13/17] rounded-3xl overflow-hidden border border-[#0bc5ea]/20"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(11,197,234,0.12)' }}
              >
                <img src={PROFILE_PHOTO} alt="Vamsi Reddy" className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d12]/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="mt-4 w-full px-0.5">
                <TypewriterBadge
                  key={typewriterLines.length ? typewriterLines.join('|') : 'default'}
                  variant="below"
                  className="w-full"
                  lines={typewriterLines.length ? typewriterLines : undefined}
                />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}
              className="flex flex-wrap gap-3 mb-10">
              <Link href="/innovation-pipeline" data-testid="hero-cta-pipeline" className="btn-exec px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 text-sm">
                Innovation Pipeline <ArrowRight size={15} />
              </Link>
              <Link href="/global-strategy" className="btn-outline-exec px-6 py-3.5 rounded-xl text-sm font-semibold">
                Executive Profile
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 }}
              className="flex flex-wrap gap-5">
              {[{ v: '5+', l: 'US Patents' }, { v: '$12.5M+', l: 'NIH Funded' }, { v: 'JHU', l: 'MSE · 3.8' }, { v: '10+', l: 'Yrs R&D' }].map((s) => (
                <div key={s.l} className="flex items-baseline gap-1.5">
                  <span className="font-heading font-bold text-lg text-gradient-cyan">{s.v}</span>
                  <span className="text-[#64748b] text-xs">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </div>
          

          {/* RIGHT: Large portrait — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="relative hidden lg:flex justify-center items-center w-150 h-50"
            data-testid="hero-profile-photo"
          >
            <div className="absolute top-6 right-4 w-[420px] h-[560px] rounded-[2.5rem] bg-[#8A2BE2]/12 blur-lg" />
            <div className="absolute top-3 right-2 w-[420px] h-[560px] rounded-[2.5rem] bg-[#0bc5ea]/7 blur-sm" />
            <div className="absolute inset-0 scale-110 rounded-[2.5rem] bg-gradient-to-br from-[#0bc5ea]/12 to-[#8A2BE2]/12 blur-3xl" />

            <motion.div
              animate={{ rotateY: [-2, 2, -2], rotateX: [1, -1, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '-20px 24px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(11,197,234,0.14)',
              }}
              className="relative w-[420px] h-[560px] rounded-[2.5rem] overflow-hidden z-10"
            >
              <img src={PROFILE_PHOTO} alt="Vamsi Reddy" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d12]/65 via-transparent to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-[#0bc5ea]/70 via-[#8A2BE2]/50 to-[#0bc5ea]/70" />
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#0bc5ea]/70 via-[#8A2BE2]/50 to-transparent" />

              {/* Name only — role / org live in page copy & global-strategy */}
              <div className="absolute bottom-[88px] left-0 right-0 px-5">
                <Link href="/global-strategy" className="block hover:opacity-90 transition-opacity">
                  <p className="font-heading font-bold text-white text-xl leading-snug">Vamsi Reddy</p>
                </Link>
              </div>

              {/* Typewriter badge at bottom of photo */}
              <div className="absolute bottom-4 left-4 right-4">
                <TypewriterBadge
                  key={typewriterLines.length ? typewriterLines.join('|') : 'default-d'}
                  lines={typewriterLines.length ? typewriterLines : undefined}
                />
              </div>
            </motion.div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            onClick={() => document.getElementById('kpi-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1 text-[#64748b] hover:text-[#0bc5ea] transition-colors"
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
