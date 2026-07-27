'use client';
import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Linkedin, ChevronRight, Star } from 'lucide-react';
import ORCIDPublications from '@/components/executive/ORCIDPublications';
import {
  STRATEGY_EXPERIENCE,
  STRATEGY_COMPETENCIES,
  STRATEGY_EDUCATION,
} from '@/lib/siteContentSeed';

const PROFILE_PHOTO = 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg';

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
    <div className="bg-[#080d12] min-h-screen" data-testid="global-strategy-page">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <div ref={ref} className="mb-14">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">
            Executive Profile
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-none mb-4">
            Product Leader.
            <span className="block text-gradient-cyan">Global Strategist.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.16 }} className="text-[#94a3b8] text-base max-w-2xl leading-relaxed mb-3">
            10+ years engineering products from whiteboard to clinical deployment. Combining deep technical authority with executive leadership to build world-class MedTech organizations.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.22 }} className="text-[#94a3b8] text-sm max-w-2xl leading-relaxed">
            A seasoned Global MedTech R&D Leader with deep expertise in medical devices, AI diagnostics, and connected health systems — bridging complex hardware, cloud telemetry, and user-centric design for scalable, adopted solutions. Proven track record in 0-to-1 product development, commercial execution, and securing significant non-dilutive capital.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.28 }} className="text-[#0bc5ea]/70 text-sm font-medium mt-3 tracking-wide">
            IP, Regulatory &amp; Commercialization Expert
          </motion.p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl border border-[#e2b96a]/20 p-8 mb-14 flex flex-col lg:flex-row items-center gap-8"
        >
          <img src={PROFILE_PHOTO} alt="Vamsi Reddy" className="w-28 h-28 rounded-2xl object-cover object-top border-2 border-[#0bc5ea]/30 flex-shrink-0" />
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e2b96a]/12 border border-[#e2b96a]/25 mb-3">
              <Award size={12} className="text-[#e2b96a]" />
              <span className="text-[#e2b96a] text-xs font-semibold">EB-1A Approved · Extraordinary Ability in Biomedical Engineering</span>
            </div>
            <p className="font-heading font-bold text-white text-2xl mb-1">Vamsi Reddy</p>
            <p className="text-[#0bc5ea] font-semibold mb-0.5">Global Head of Product Development</p>
            <p className="text-[#94a3b8] text-sm">Evon Medics LLC · USA &amp; Global Operations</p>
            <p className="text-[#64748b] text-xs mt-1">MSE Johns Hopkins · B.Tech (Honors) NIT Rourkela</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <button
              onClick={() => window.open('https://www.linkedin.com/in/reddy-vamsi', '_blank', 'noopener,noreferrer')}
              className="btn-exec px-5 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
            >
              <Linkedin size={15} /> Connect
            </button>
            <a href="https://orcid.org/0009-0006-6427-5005" target="_blank" rel="noopener noreferrer" className="btn-outline-exec px-5 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm">
              ORCID Profile
            </a>
          </div>
        </motion.div>

        {/* Career Timeline */}
        <div className="mb-14">
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="font-heading text-2xl font-bold text-white mb-8">
            Career Journey
          </motion.h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="glass-card rounded-2xl border border-white/6 overflow-hidden"
              >
                <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <p className="font-heading font-bold text-white text-xl mb-0.5">{exp.role}</p>
                      <p className="font-semibold" style={{ color: exp.color }}>{exp.company}</p>
                      <p className="text-[#64748b] text-xs mt-0.5">{exp.type}</p>
                    </div>
                    <span className="text-xs font-semibold glass-card px-3 py-1.5 rounded-full border border-white/8 text-[#94a3b8] flex-shrink-0 self-start">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {(Array.isArray(exp.achievements) ? exp.achievements : []).map((a, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[#94a3b8] leading-relaxed">
                        <ChevronRight size={13} className="flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Competencies */}
        <div className="mb-14">
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="font-heading text-2xl font-bold text-white mb-8">
            Core Competencies
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {competencies.map((comp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="glass-card rounded-2xl border border-white/6 p-5"
              >
                <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-4">{comp.category}</p>
                <ul className="space-y-1.5">
                  {(Array.isArray(comp.items) ? comp.items : []).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <Star size={8} className="text-[#0bc5ea] flex-shrink-0" fill="#0bc5ea" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-14">
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="font-heading text-2xl font-bold text-white mb-6">
            Education
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {education.map((edu) => (
              <motion.div key={edu.school} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="glass-card rounded-2xl border border-white/6 p-5">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-xl flex-shrink-0 bg-white/4 border border-white/8 w-11 h-11 flex items-center justify-center overflow-hidden">
                    {edu.logoUrl ? (
                      <img src={edu.logoUrl} alt={edu.school} className="w-8 h-8 object-contain"
                        onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='flex'; }} />
                    ) : null}
                    <div className="w-8 h-8 rounded-lg items-center justify-center font-bold text-xs"
                      style={{ background: `${edu.color}20`, color: edu.color, display: edu.logoUrl ? 'none' : 'flex' }}>
                      {edu.school.slice(0,3).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white">{edu.school}</p>
                    <p className="font-semibold text-sm mt-0.5" style={{ color: edu.color }}>{edu.degree}</p>
                    <p className="text-[#64748b] text-xs mt-1">{edu.detail}</p>
                    <p className="text-[#94a3b8] text-xs mt-1">{edu.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Publications & Patents (compact) */}
        <div className="mb-14">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">Publications & Patents</h2>
          <ORCIDPublications works={orcidWorks} compact={false} />
        </div>

        {/* Sanity CMS content */}
        {Array.isArray(leadership) && leadership.length > 0 && (
          <div className="mb-14">
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Latest Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leadership.map((item) => (
                <div key={item._id} className="glass-card rounded-2xl border border-white/6 p-5">
                  <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-1">{item.region}</p>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-[#94a3b8] text-sm">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sanity CMS */}
        <div className="glass-card rounded-2xl border border-[#0bc5ea]/12 p-6 text-center">
          <p className="text-[#64748b] text-sm">Publish career updates and leadership articles via <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noopener noreferrer" className="text-[#0bc5ea] hover:underline">Sanity Studio</a> · Changes appear in under 60 seconds with ISR</p>
        </div>
      </div>
    </div>
  );
}
