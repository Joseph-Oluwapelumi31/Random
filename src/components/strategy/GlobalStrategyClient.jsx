'use client'
import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Award, Linkedin, ChevronRight, Star, Sparkles, ArrowUpRight } from 'lucide-react';
import ORCIDPublications from '@/components/executive/ORCIDPublications';
import {
  STRATEGY_EXPERIENCE,
  STRATEGY_COMPETENCIES,
  STRATEGY_EDUCATION,
} from '@/lib/siteContentSeed';
import Link from 'next/link';

const PROFILE_PHOTO = 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg';

const profileHighlights = [
  { label: '10+ years', value: 'building MedTech products' },
  { label: 'Global', value: 'R&D and commercialization' },
  { label: 'IP & Reg', value: 'cross-functional strategy' },
];

const leadershipPillars = [
  'Clinical and product strategy',
  'Regulatory and commercialization',
  'Global R&D leadership',
];

export default function GlobalStrategyClient({ leadership, orcidCount, orcidWorks = [], strategyPage = null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const experience = useMemo(
    () => (strategyPage?.careerTimeline?.length ? strategyPage.careerTimeline : STRATEGY_EXPERIENCE),
    [strategyPage],
  );
  const competencies = useMemo(
    () => (strategyPage?.competencyGroups?.length ? strategyPage.competencyGroups : STRATEGY_COMPETENCIES),
    [strategyPage],
  );
  const education = useMemo(
    () => (strategyPage?.education?.length ? strategyPage.education : STRATEGY_EDUCATION),
    [strategyPage],
  );

  return (
    <div className="min-h-screen relative overflow-hidden" data-testid="global-strategy-page">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-24 pb-20 relative">
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-2 text-primary text-[11px] font-semibold uppercase tracking-[0.3em] mb-6 shadow-sm"
          >
            <Sparkles size={12} />
            Executive profile
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[0.95] mb-5">
                Product Leader.
                <span className="block mt-2">Global Strategist.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.16 }} className="text-muted-foreground text-base max-w-2xl leading-relaxed mb-3">
                10+ years turning complex science into scalable products, from whiteboard concepts to clinical deployment.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.22 }} className="text-muted text-sm max-w-2xl leading-relaxed">
                A seasoned global MedTech leader with deep expertise in medical devices, AI diagnostics, and connected health systems—bridging hardware, cloud telemetry, and user-needs into adopted solutions with measurable commercial impact.
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.28 }} className="text-primary/80 text-sm font-semibold mt-5 tracking-[0.2em] uppercase">
                IP, Regulatory &amp; Commercialization Expert
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18 }}
              className="glass-card rounded-[24px] border border-primary/10 p-5 sm:p-6 shadow-[0_20px_50px_-24px_rgba(25,123,189,0.4)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Leadership focus</p>
                  <p className="text-sm font-semibold text-foreground">Bridging innovation and execution</p>
                </div>
                <div className="rounded-full border border-primary/15 bg-primary/10 p-2 text-primary">
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {profileHighlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-foreground/8 bg-foreground/[0.03] p-4 transition-transform duration-200 hover:-translate-y-0.5">
                    <p className="text-primary text-[10px] font-semibold uppercase tracking-[0.24em] mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-foreground/8 bg-gradient-to-br from-primary/6 to-secondary/10 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary mb-2">Signature strengths</p>
                <div className="flex flex-wrap gap-2">
                  {leadershipPillars.map((item) => (
                    <span key={item} className="rounded-full border border-primary/15 bg-card/[0.03] px-3 py-1 text-xs font-medium text-foreground/90">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className=" glass-card rounded-[32px] p-6 sm:p-8 lg:p-10 mb-14 relative overflow-hidden border border-primary/10 shadow-[0_20px_60px_-24px_rgba(25,123,189,0.35)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/10 pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            <div className="relative w-30 h-30 rounded-[24px] overflow-hidden border-2 border-primary/15 shadow-lg flex-shrink-0 ring-1 ring-white/70">
              <Image src={PROFILE_PHOTO} alt="Vamsi Reddy" fill className="object-cover object-top" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.75 rounded-full border mb-4 shadow-sm" style={{ backgroundColor: 'hsl(var(--warning) / 0.14)', borderColor: 'hsl(var(--warning) / 0.26)' }}>
                <Award size={12} style={{ color: 'hsl(var(--warning))' }} />
                <span style={{ color: 'hsl(var(--warning))' }} className="text-xs font-semibold">EB-1A Approved · Extraordinary Ability in Biomedical Engineering</span>
              </div>
              <p className="font-heading font-bold text-foreground text-2xl mb-1">Vamsi Reddy</p>
              <p className="text-primary font-semibold mb-1">Global Head of Product Development</p>
              <p className="text-muted-foreground text-sm">Evon Medics LLC · USA &amp; Global Operations</p>
              <p className="text-muted text-xs mt-1">MSE Johns Hopkins · B.Tech (Honors) NIT Rourkela</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-foreground/8 bg-foreground/[0.03] px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles size={12} className="text-primary" />
                Trusted for strategy, execution, and credible technical leadership
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
              <Link
                href="https://www.linkedin.com/in/reddy-vamsi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-exec px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm text-primary-foreground"
              >
                <Linkedin size={15} /> Connect
              </Link>
              <Link href="https://orcid.org/0009-0006-6427-5005" target="_blank" rel="noopener noreferrer" className="btn-outline-exec px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm">
                ORCID Profile
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <span>Career Journey</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">A progression shaped by product leadership, scientific rigor, and global execution across MedTech and connected health.</p>
          </motion.div>
          <div className="space-y-5">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="glass-card rounded-[24px] border border-foreground/8 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35)]"
                style={{ ['--accent-color']: exp.color }}
              >
                <div className="h-[3px]" style={{ background: `linear-gradient(90deg, var(--accent-color), transparent)` }} />
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="font-heading font-bold text-foreground text-xl mb-0.5">{exp.role}</p>
                      <p className="font-semibold" style={{ color: 'var(--accent-color)' }}>{exp.company}</p>
                      <p className="text-muted text-xs mt-0.5">{exp.type}</p>
                    </div>
                    <span className="text-xs font-semibold glass-card px-3 py-1.5 rounded-full border border-foreground/8 text-muted flex-shrink-0 self-start">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {(Array.isArray(exp.achievements) ? exp.achievements : []).map((a, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                        <ChevronRight size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <span>Core Competencies</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </h2>
            <p className="text-sm text-muted-foreground mt-2">A cross-functional mix of innovation, execution, and regulatory fluency.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {competencies.map((comp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="glass-card rounded-[22px] border border-foreground/8 p-5 transition-all duration-200 hover:-translate-y-1"
              >
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.24em] mb-4">{comp.category}</p>
                <ul className="space-y-2">
                  {(Array.isArray(comp.items) ? comp.items : []).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted leading-relaxed">
                      <Star size={9} className="text-primary flex-shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <span>Education</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </h2>
            <p className="text-sm text-muted-foreground mt-2">Academic roots that reinforce the technical depth behind the leadership profile.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {education.map((edu) => (
              <motion.div key={edu.school} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="glass-card rounded-[22px] border border-foreground/8 p-5 transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-xl flex-shrink-0 bg-foreground/4 border border-foreground/8 w-11 h-11 flex items-center justify-center overflow-hidden">
                    {edu.logoUrl ? (
                      <div className="relative w-8 h-8">
                        <Image src={edu.logoUrl} alt={edu.school} fill className="object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} />
                      </div>
                    ) : null}
                    <div
                      className="w-8 h-8 rounded-lg items-center justify-center font-bold text-xs"
                      style={{ background: edu.logoUrl ? 'none' : edu.color, color: edu.color, display: edu.logoUrl ? 'none' : 'flex' }}
                    >
                      {edu.school.slice(0, 3).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">{edu.school}</p>
                    <p className="font-semibold text-sm mt-0.5" style={{ color: edu.color }}>{edu.degree}</p>
                    <p className="text-muted-foreground text-xs mt-1">{edu.detail}</p>
                    <p className="text-muted text-xs mt-1">{edu.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <span>Publications &amp; Patents</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </h2>
            <p className="text-sm text-muted-foreground mt-2">Research output and innovation footprints that support the broader strategic narrative.</p>
          </div>
          <div className="glass-card rounded-[24px] border border-foreground/8 p-4 sm:p-6">
            <ORCIDPublications works={orcidWorks} compact={false} />
          </div>
        </div>

        {Array.isArray(leadership) && leadership.length > 0 && (
          <div className="mb-14">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                <span>Latest Updates</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </h2>
              <p className="text-sm text-muted-foreground mt-2">Recent leadership and market updates from the global operating footprint.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leadership.map((item) => (
                <div key={item._id} className="glass-card rounded-[22px] border border-foreground/8 p-5">
                  <p className="text-primary text-xs font-semibold uppercase tracking-[0.24em] mb-1">{item.region}</p>
                  <h3 className="font-heading font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="glass-card rounded-[24px] border border-primary/12 p-6 text-center bg-gradient-to-r from-primary/6 to-secondary/10">
          <p className="text-muted-foreground text-sm">
            Publish career updates and leadership articles via{' '}
            <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Sanity Studio
            </a>{' '}
            · Changes appear in under 60 seconds with ISR
          </p>
        </div>
      </div>
    </div>
  );
}
