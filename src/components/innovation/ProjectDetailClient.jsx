'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FlaskConical, CheckCircle, Clock, Zap, Award, ExternalLink, Edit3, ChevronRight } from 'lucide-react';
import STATIC_PROJECTS from '@/lib/staticProjects';

const PROFILE_PHOTO = 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg';
const STATUS_CONFIG = {
  'Market Ready':        { color: '#10b981', icon: CheckCircle },
  'Clinical Phase II':   { color: '#0bc5ea', icon: Zap },
  'Phase II Active':     { color: '#7c3aed', icon: Zap },
  'Pre-FDA Submission':  { color: '#f59e0b', icon: Clock },
  'Active Development':  { color: '#06b6d4', icon: FlaskConical },
};

function fmt(n) { return n ? (n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${(n/1e3).toFixed(0)}K`) : null; }
const PHASE_STYLE = {
  'Phase I': { color: '#0bc5ea', bg: 'rgba(11,197,234,0.1)' },
  'Phase II': { color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  'I-CORPS': { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'Supplement': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'TABA': { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
};

export default function ProjectDetailClient({ project }) {
  if (!project) {
    return (
      <div className="bg-[#080d12] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-32 text-center">
          <p className="text-[#94a3b8] text-lg mb-4">Project not found</p>
          <Link href="/innovation-pipeline" className="text-[#0bc5ea] hover:underline text-sm">← Back to Pipeline</Link>
        </div>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[project.status] || STATUS_CONFIG['Active Development'];
  const StatusIcon = cfg.icon;
  const photo = project.photos?.[0];

  return (
    <div className="bg-[#080d12] min-h-screen" data-testid="project-detail-page">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/innovation-pipeline" className="inline-flex items-center gap-2 text-[#64748b] hover:text-white transition-colors text-sm">
            <ArrowLeft size={15} /> Back to Innovation Pipeline
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass-card border" style={{ color: cfg.color, borderColor: `${cfg.color}30` }}>
                  <StatusIcon size={11} />{project.status}
                </span>
                {project.agency && <span className="text-xs px-2.5 py-1 rounded-full glass-card border border-white/8 text-[#94a3b8]">{project.agency}</span>}
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">{project.projectName}</h1>
              <p className="text-[#0bc5ea] text-lg font-medium mb-4">{project.fullTitle}</p>

              {fmt(project.fundingAmount) && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-heading font-bold text-3xl" style={{ color: cfg.color }}>{fmt(project.fundingAmount)}</span>
                  <span className="text-[#64748b] text-sm">Total NIH Funding · {project.nihGrant}</span>
                </div>
              )}

              <p className="text-[#94a3b8] text-base leading-relaxed mb-6">{project.description}</p>

              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full glass-card border border-white/8 text-[#94a3b8]">
                  <Award size={10} /> {project.role}
                </span>
              </div>
            </div>

            {/* Right: Image */}
            {photo && (
              <div className="lg:w-80 flex-shrink-0">
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                  <img src={photo} alt={project.projectName} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* NIH Grant Table */}
            {project.nihAwards?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-2xl border border-white/8 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/8">
                  <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest">NIH Grant Awards (Public Record)</p>
                </div>
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-white/6 bg-white/2"><th className="text-left px-4 py-2.5 text-[#64748b] font-semibold">Type</th><th className="text-left px-4 py-2.5 text-[#64748b] font-semibold">Year</th><th className="text-right px-4 py-2.5 text-[#64748b] font-semibold">Amount</th><th className="text-left px-4 py-2.5 text-[#64748b] font-semibold hidden sm:table-cell">NIH Award ID</th></tr></thead>
                  <tbody>
                    {project.nihAwards.map((a, i) => {
                      const ps = PHASE_STYLE[a.type] || { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' };
                      return (
                        <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2">
                          <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full font-medium" style={{ color: ps.color, background: ps.bg }}>{a.type}</span></td>
                          <td className="px-4 py-3 text-[#94a3b8]">{a.year}</td>
                          <td className="px-4 py-3 text-right font-semibold text-white">{fmt(a.amount)}</td>
                          <td className="px-4 py-3 text-[#64748b] font-mono hidden sm:table-cell text-xs">{a.id || '—'}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-white/3">
                      <td colSpan={2} className="px-4 py-3 font-semibold text-white text-xs">Total</td>
                      <td className="px-4 py-3 text-right font-bold text-xl" style={{ color: cfg.color }}>{fmt(project.fundingAmount)}</td>
                      <td className="hidden sm:table-cell" />
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* Engineering Challenges */}
            {project.engineeringChallenges?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl border border-white/8 p-6">
                <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-4">Engineering Challenges</p>
                <ul className="space-y-2.5">
                  {project.engineeringChallenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#94a3b8] leading-relaxed">
                      <ChevronRight size={13} className="text-[#0bc5ea] flex-shrink-0 mt-0.5" />
                      {ch}
                    </li>
                  ))}
                </ul>
                <p className="text-[#64748b] text-xs mt-4 pt-4 border-t border-white/6 italic">
                  Note: Engineering details are shared at the general level to respect IP boundaries. Full technical specifications are proprietary to Evon Medics LLC.
                </p>
              </motion.div>
            )}

            {/* Engineering Story from Sanity */}
            {project.engineeringStory && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-2xl border border-white/8 p-6">
                <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-4">Engineering Story</p>
                <div className="prose-exec text-sm">{project.engineeringStory}</div>
              </motion.div>
            )}

            {/* Current Status */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="glass-card rounded-2xl border p-5" style={{ borderColor: `${cfg.color}25` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: cfg.color }}>Current Status</p>
              <p className="text-white text-sm leading-relaxed">{project.currentStatus}</p>
            </motion.div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-5">
            {/* Technology Domains */}
            {project.technologyDomains?.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl border border-white/8 p-5">
                <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-4">Technology Domains</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologyDomains.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full glass-card border border-white/8 text-[#94a3b8]">{t}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* IP/Publication */}
            {project.publicationDoi && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-2xl border border-[#e2b96a]/20 p-5">
                <p className="text-[#e2b96a] text-xs font-semibold uppercase tracking-widest mb-2">IP & Publications</p>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{project.publicationDoi}</p>
              </motion.div>
            )}

            {/* Author */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl border border-white/8 p-5">
              <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">Project Lead</p>
              <div className="flex items-center gap-3">
                <img src={PROFILE_PHOTO} alt="Vamsi Reddy" className="w-12 h-12 rounded-xl object-cover object-top border border-[#0bc5ea]/20" />
                <div>
                  <p className="text-white text-sm font-semibold">Vamsi Reddy</p>
                  <p className="text-[#0bc5ea] text-xs">{project.role}</p>
                  <p className="text-[#64748b] text-xs">Evon Medics LLC</p>
                </div>
              </div>
            </motion.div>

            {/* Edit in Sanity */}
            <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#64748b] hover:text-[#0bc5ea] transition-colors">
              <Edit3 size={12} /> Edit this project in Sanity CMS
            </a>
          </div>
        </div>

        {/* Other Projects */}
        <div className="mt-14">
          <h3 className="font-heading text-xl font-bold text-white mb-5">More from the Pipeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATIC_PROJECTS.filter(p => p._id !== project._id).slice(0, 3).map((rel) => {
              const rc = STATUS_CONFIG[rel.status] || STATUS_CONFIG['Active Development'];
              const Ic = rc.icon;
              return (
                <Link key={rel._id} href={`/innovation-pipeline/${rel._id}`} className="glass-card rounded-xl p-4 border border-white/8 hover:border-white/18 hover:-translate-y-0.5 transition-all group">
                  <span className="flex items-center gap-1 text-xs font-semibold mb-1.5" style={{ color: rc.color }}><Ic size={10} />{rel.status}</span>
                  <p className="text-white text-sm font-heading font-semibold group-hover:text-[#0bc5ea] transition-colors">{rel.projectName}</p>
                  <p className="text-[#64748b] text-xs mt-0.5 line-clamp-2">{rel.fullTitle}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
