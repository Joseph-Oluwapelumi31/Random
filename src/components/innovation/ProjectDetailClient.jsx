'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FlaskConical, CheckCircle, Clock, Zap, Award, ExternalLink, Edit3, ChevronRight } from 'lucide-react';
import STATIC_PROJECTS from '@/lib/staticProjects';

const PROFILE_PHOTO = 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg';
const STATUS_CONFIG = {
  'Market Ready':        { colorClass: 'text-success', bgClass: 'bg-success/10', borderClass: 'border-success/20', icon: CheckCircle },
  'Clinical Phase II':   { colorClass: 'text-primary', bgClass: 'bg-primary/10', borderClass: 'border-primary/20', icon: Zap },
  'Phase II Active':     { colorClass: 'text-secondary', bgClass: 'bg-secondary/10', borderClass: 'border-secondary/20', icon: Zap },
  'Pre-FDA Submission':  { colorClass: 'text-warning', bgClass: 'bg-warning/10', borderClass: 'border-warning/20', icon: Clock },
  'Active Development':  { colorClass: 'text-accent', bgClass: 'bg-accent/10', borderClass: 'border-accent/20', icon: FlaskConical },
};

function fmt(n) { return n ? (n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${(n/1e3).toFixed(0)}K`) : null; }
const PHASE_STYLE = {
  'Phase I': { colorClass: 'text-primary', bgClass: 'bg-primary/10' },
  'Phase II': { colorClass: 'text-secondary', bgClass: 'bg-secondary/10' },
  'I-CORPS': { colorClass: 'text-success', bgClass: 'bg-success/10' },
  'Supplement': { colorClass: 'text-warning', bgClass: 'bg-warning/10' },
  'TABA': { colorClass: 'text-accent', bgClass: 'bg-accent/10' },
};

export default function ProjectDetailClient({ project }) {
  if (!project) {
    return (
      <div className="bg-backgroun min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-32 text-center">
          <p className="text-muted-foreground text-lg mb-4">Project not found</p>
          <Link href="/innovation-pipeline" className="text-primary hover:underline text-sm">← Back to Pipeline</Link>
        </div>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[project.status] || STATUS_CONFIG['Active Development'];
  const StatusIcon = cfg.icon;
  const photo = project.photos?.[0];
  const currentStatus = project.currentStatus?.trim() || project.marketStatus || project.status || 'Current status details coming soon.';
  const fundingValue = fmt(project.fundingAmount) || 'TBD';
  const timelineStages = ['Research', 'Prototype', 'Clinical Testing', 'Validation', 'Commercialization'];
  const stageIndexMap = {
    'Active Development': 1,
    'Pre-FDA Submission': 2,
    'Phase II Active': 3,
    'Clinical Phase II': 3,
    'Market Ready': 4,
    'DTx': 4,
    'R&D': 1,
  };
  const activeStage = stageIndexMap[project.status] ?? 0;

  return (
    <div className="bg-slate-50 text-slate-950 min-h-screen" data-testid="project-detail-page">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-white">
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-slate-200/60 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Link href="/innovation-pipeline" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                  <ArrowLeft size={16} /> Back to Innovation Pipeline
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${cfg.colorClass} ${cfg.bgClass} ${cfg.borderClass}`}>
                  <StatusIcon size={14} /> {project.status}
                </span>
                {project.agency && (
                  <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-medium text-slate-600">{project.agency}</span>
                )}
              </div>

              <div className="space-y-6">
                <h1 className="font-heading text-5xl sm:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-slate-950">{project.projectName}</h1>
                <p className="max-w-2xl text-3xl font-semibold leading-snug text-primary">{project.fullTitle}</p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
                <p className="text-5xl font-semibold text-slate-950 leading-none">{fundingValue}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">NIH Research Funding</p>
              </div>

              <p className="max-w-3xl text-lg leading-8 text-slate-700">{project.description}</p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/innovation-pipeline" className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90">
                  Explore the Pipeline
                </Link>
                <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-primary/30 hover:text-primary transition-colors">
                  <Edit3 size={14} /> Edit in Sanity
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="absolute right-10 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-950/5 shadow-[0_45px_90px_rgba(15,23,42,0.12)]">
                {photo ? (
                  <img src={photo} alt={project.projectName} className="h-[520px] w-full object-cover object-center" />
                ) : (
                  <div className="flex h-[520px] items-center justify-center bg-slate-200 text-slate-500">No image available</div>
                )}
                <div className="absolute inset-x-0 bottom-0 mx-6 mb-6 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-lg shadow-slate-900/10 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Project Snapshot</p>
                  <p className="mt-3 text-lg font-semibold text-slate-950">{project.fullTitle}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-[0_40px_80px_rgba(15,23,42,0.05)]">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Project Facts</p>
                <h2 className="text-4xl font-semibold text-slate-950">A streamlined framework for critical project details.</h2>
                <p className="max-w-2xl text-base leading-8 text-slate-600">Key data points are grouped visually so the story feels composed instead of scattered.</p>
              </div>
              <div className="rounded-[2rem] bg-slate-900/95 p-8 text-white shadow-xl shadow-slate-900/10">
                <p className="text-xs uppercase tracking-[0.35em] text-primary/70">Featured Insight</p>
                <p className="mt-4 text-2xl font-semibold leading-tight">Designed to improve early Alzheimer’s detection using multimodal sensing and NIH-backed validation.</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Award, label: 'Role', value: project.role },
              { icon: FlaskConical, label: 'Clinical Phase', value: project.status },
              { icon: CheckCircle, label: 'Funding', value: fundingValue },
              { icon: Clock, label: 'Grant Number', value: project.nihGrant || 'N/A' },
              { icon: ExternalLink, label: 'Agency', value: project.agency || 'N/A' },
              { icon: Zap, label: 'Technology', value: project.technologyDomains?.slice(0, 2).join(' • ') || 'N/A' },
              { icon: ArrowLeft, label: 'Status', value: project.marketStatus || project.status },
              { icon: Award, label: 'Phase', value: project.phase || 'N/A' },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ y: -4 }} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-xl">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <item.icon size={20} />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.35em] text-muted-foreground">{item.label}</p>
                <p className="mt-3 text-base font-semibold text-slate-950 leading-tight">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">The Innovation</p>
              <h2 className="text-5xl font-semibold text-slate-950 leading-tight">A research-driven narrative with premium polish.</h2>
              <p className="max-w-3xl text-lg leading-8 text-slate-700">{project.description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
              <p className="text-xs uppercase tracking-[0.35em] text-primary mb-4">Featured Quote</p>
              <blockquote className="text-2xl font-semibold text-slate-950 leading-tight">Designed to improve early Alzheimer’s detection using multimodal sensing.</blockquote>
              <p className="mt-5 text-sm leading-7 text-slate-600">A concise statement that supports the project’s purpose and clinical ambition.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">NIH Awards</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">Funding milestones presented as modern award cards.</h2>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            {project.nihAwards?.map((award, index) => {
              const ps = PHASE_STYLE[award.type] || { colorClass: 'text-muted-foreground', bgClass: 'bg-muted/10' };
              return (
                <motion.article key={index} whileHover={{ y: -6 }} className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition duration-300 hover:shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] ${ps.colorClass} ${ps.bgClass}`}>{award.type}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">{award.year}</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Award</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">{fmt(award.amount)}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white p-4 border border-slate-200">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Grant ID</p>
                        <p className="mt-2 text-sm font-medium text-slate-950">{award.id || '—'}</p>
                      </div>
                      <div className="rounded-3xl bg-white p-4 border border-slate-200">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Award Type</p>
                        <p className="mt-2 text-sm font-medium text-slate-950">{award.type}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">This award supports the current phase and reinforces the project’s position within NIH-supported clinical research.</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Engineering Challenges</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">Technical risks framed as product-grade features.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.engineeringChallenges?.map((challenge, index) => (
              <motion.div key={index} whileHover={{ y: -6 }} className={`rounded-[2rem] border p-6 shadow-sm transition duration-300 hover:shadow-xl ${index % 3 === 0 ? 'bg-white' : 'bg-slate-100'}`}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <ChevronRight size={20} />
                </div>
                <p className="mt-5 text-sm uppercase tracking-[0.3em] text-muted-foreground">Challenge</p>
                <p className="mt-3 text-base font-semibold text-slate-950 leading-7">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Engineering Story</p>
              <h2 className="text-5xl font-semibold text-slate-950 leading-tight">A magazine-style read for technical leadership.</h2>
            </div>
            <article className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10 shadow-[0_40px_80px_rgba(15,23,42,0.06)]">
              <p className="text-8xl font-serif leading-none text-primary opacity-90">{project.engineeringStory?.charAt(0) || 'E'}</p>
              <p className="mt-6 text-lg leading-9 text-slate-700 first-letter:text-7xl first-letter:font-serif first-letter:text-primary first-letter:mr-3 first-letter:-mt-2">{project.engineeringStory?.slice(1)}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Current Status</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">Stage progression with clear context.</h2>
          </div>
          <div className="grid gap-4">
            {timelineStages.map((stage, index) => {
              const active = index <= activeStage;
              return (
                <div key={stage} className={`relative overflow-hidden rounded-[2rem] border p-6 transition duration-300 ${active ? 'border-primary/40 bg-white shadow-lg shadow-primary/5' : 'border-slate-200 bg-slate-100'}`}>
                  <div className={`absolute inset-y-0 left-0 w-1 ${active ? 'bg-primary' : 'bg-slate-300'} rounded-full`} />
                  <div className="pl-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{stage}</p>
                    <p className={`mt-3 text-lg font-semibold ${active ? 'text-slate-950' : 'text-slate-600'}`}>{active ? 'Active' : 'Pending'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Technology Domains</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">The technical foundations behind the platform.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.technologyDomains?.map((domain) => (
              <motion.div key={domain} whileHover={{ y: -6 }} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-300 hover:shadow-xl">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <Zap size={20} />
                </div>
                <p className="mt-5 text-sm uppercase tracking-[0.3em] text-muted-foreground">Domain</p>
                <p className="mt-3 text-base font-semibold text-slate-950 leading-7">{domain}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Project Lead</p>
              <h2 className="text-4xl font-semibold text-slate-950">Executive profile with trusted credibility.</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">A concise leadership panel that balances personality, role, and professional context.</p>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_40px_80px_rgba(15,23,42,0.06)]">
              <div className="flex flex-wrap items-center gap-5">
                <img src={PROFILE_PHOTO} alt="Vamsi Reddy" className="h-20 w-20 rounded-[1.5rem] object-cover border border-slate-200" />
                <div>
                  <p className="text-lg font-semibold text-slate-950">Vamsi Reddy</p>
                  <p className="text-sm text-primary">{project.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Evon Medics LLC</p>
                </div>
              </div>
              <div className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
                <p>Seasoned biomedical product leader with deep NIH-funded translational research experience, leading projects from concept through clinical validation.</p>
                <p>Combines technical strategy, regulatory insight, and product execution to move high-impact medical breakthroughs toward market-ready delivery.</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">LinkedIn</p>
                  <p className="mt-2 text-sm font-medium text-slate-950 flex items-center gap-2"><ExternalLink size={14} /> profile</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Email</p>
                  <p className="mt-2 text-sm font-medium text-slate-950">contact@evonmedics.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {project.publicationDoi && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Publications</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">Document cards for IP and papers.</h2>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <ExternalLink size={20} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Document</p>
                    <p className="mt-2 text-xl font-semibold text-slate-950">Publication Reference</p>
                  </div>
                </div>
                <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Open
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-600">{project.publicationDoi}</p>
            </motion.div>
          </div>
        </section>
      )}

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">More from the Pipeline</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">Premium previews of related projects.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {STATIC_PROJECTS.filter((p) => p._id !== project._id).slice(0, 3).map((rel) => {
              const rc = STATUS_CONFIG[rel.status] || STATUS_CONFIG['Active Development'];
              const Icon = rc.icon;
              return (
                <Link key={rel._id} href={`/innovation-pipeline/${rel._id}`} className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
                  <div className="relative overflow-hidden rounded-t-[2.5rem]">
                    <img src={rel.photos?.[0]} alt={rel.projectName} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="relative p-6 pt-4">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${rc.colorClass} ${rc.bgClass} ${rc.borderClass}`}>
                      <Icon size={12} />{rel.status}
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-950">{rel.projectName}</h3>
                    <p className="mt-3 text-sm text-slate-600 leading-6">{rel.fullTitle}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-slate-950">{fmt(rel.fundingAmount) || 'TBD'}</p>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">Explore</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
