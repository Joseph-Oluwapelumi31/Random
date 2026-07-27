'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, ExternalLink, Award, FileText, Shield } from 'lucide-react';

const PROFILE_PHOTO = 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg';

const PUBLICATIONS = [
  {
    id: 'p1',
    title: "Computerized Olfactory Adaptive Training Improves Preclinical Alzheimer's Cognitive Composite Scores and Gray Matter Volume in Medial Temporal Brain Regions: A Randomized Feasibility Clinical Trial",
    type: 'Journal Article',
    year: '2024',
    journal: "Alzheimer's & Dementia: Translational Research & Clinical Interventions",
    doi: '10.1002/trc2.70226',
    url: 'https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/trc2.70226',
    reference: 'Article ID: TRC270226',
  },
  {
    id: 'p2',
    title: 'Designing of a Biopotential Amplifier for the Acquisition and Processing of Subvocal Electromyography Signals',
    type: 'Book Chapter',
    year: '2019',
    journal: 'Bioelectronics and Medical Devices, Woodhead Publishing Series in Electronic and Optical Materials',
    doi: '10.1016/B978-0-08-102420-1.00043-1',
    url: null, // Publisher access restricted — DOI: 10.1016/B978-0-08-102420-1.00043-1
    reference: 'Pages 913–929, ISBN 9780081024201',
    accessNote: 'Publisher restricted — available via institutional access',
  },
  {
    id: 'p3',
    title: 'Discrete Wavelet Transform Based Statistical Features for Drowsiness Detection from EEG',
    type: 'Conference Paper',
    year: '2017',
    journal: '16th International Conference on Biomedical Engineering, IFMBE Proceedings (Springer, Singapore)',
    doi: '10.1007/978-981-10-4220-1_17',
    url: 'https://doi.org/10.1007/978-981-10-4220-1_17',
    reference: 'Vol. 61, ISBN 9789811042201',
  },
  {
    id: 'p4',
    title: 'Smart Goggles for the Drowsiness Detection to Void Vehicle Accidents',
    type: 'Journal Article',
    year: '2016',
    journal: 'Journal of Instrumentation Society of India (ISOI)',
    doi: null,
    url: 'https://drive.google.com/file/d/1HjBZozz5PnZBpHIHRQS5_obcvCaWUbHP/view',
    reference: 'Vol. 46, No. 3, Pages 107–111',
  },
];

const PATENTS = [
  {
    id: 'pat1',
    title: 'Pain Treatment Apparatus and Methods',
    type: 'Utility Patent',
    usptoApp: '18/753,722',
    filed: 'June 2024',
    international: 'PCT/US2025/033753 (Filed June 16, 2025)',
    status: 'Full Utility Patent',
    statusColor: '#0bc5ea',
    inventorRole: 'Co-Inventor',
    relatedProject: 'CBOT-P',
  },
  {
    id: 'pat2',
    title: 'Pupillometer and Related Methods',
    type: 'Utility Patent',
    usptoApp: '63/774,619',
    filed: 'March 2025',
    international: null,
    status: 'Full Utility Patent',
    statusColor: '#7c3aed',
    inventorRole: 'Co-Inventor',
    relatedProject: 'EDITOR',
  },
  {
    id: 'pat3',
    title: 'Memory Impairment Classifier Apparatus',
    type: 'Utility Patent',
    usptoApp: '63/783,072',
    filed: 'April 2025',
    international: null,
    status: 'Full Utility Patent',
    statusColor: '#10b981',
    inventorRole: 'Co-Inventor',
    relatedProject: 'MemoryDriver',
  },
  {
    id: 'pat4',
    title: 'Systems and Methods For Computerized Olfactory Adaptive Training',
    type: 'Utility Patent',
    usptoApp: '19/300,409',
    filed: 'August 2025',
    international: null,
    status: 'Full Utility Patent',
    statusColor: '#f59e0b',
    inventorRole: 'Co-Inventor',
    relatedProject: 'EMRAST',
  },
  {
    id: 'pat5',
    title: 'Systems and Methods For Evaluating Cognitive Function',
    type: 'Utility Patent',
    usptoApp: '19/299,992',
    filed: 'August 2025',
    international: null,
    status: 'Full Utility Patent',
    statusColor: '#f59e0b',
    inventorRole: 'Co-Inventor',
    relatedProject: 'COT / EMRAST',
  },
];

const TYPE_BADGE_COLOR = {
  'Journal Article': '#0bc5ea',
  'Book Chapter': '#7c3aed',
  'Conference Paper': '#f59e0b',
  'Utility Patent': '#10b981',
};

export default function ORCIDPublications({ works = [], compact = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [tab, setTab] = useState('articles'); // 'articles' | 'patents'

  const pubs = works.length > 0 ? works : PUBLICATIONS;

  return (
    <section data-testid="publications-section" className={compact ? '' : 'py-20 px-6 section-divider bg-[#080d12]'}>
      <div className={compact ? '' : 'max-w-7xl mx-auto'} ref={ref}>
        {!compact && (
          <>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">
              Peer-Reviewed Contributions
            </motion.p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="font-heading text-4xl sm:text-5xl font-bold text-white leading-none">
                Published Research. <span className="text-gradient-cyan">Verified Impact.</span>
              </motion.h2>
              <div className="flex items-center gap-2 text-xs text-[#64748b]">
                <BookOpen size={13} />
                <span>ORCID: 0009-0006-6427-5005</span>
                <a href="https://orcid.org/0009-0006-6427-5005" target="_blank" rel="noopener noreferrer" className="text-[#0bc5ea] hover:underline flex items-center gap-0.5">
                  View <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </>
        )}

        {/* Toggle */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.12 }} className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('articles')}
            data-testid="tab-articles"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              tab === 'articles' ? 'btn-exec' : 'glass-card border border-white/8 text-[#94a3b8] hover:text-white'
            }`}
          >
            <BookOpen size={14} /> Publications ({pubs.length})
          </button>
          <button
            onClick={() => setTab('patents')}
            data-testid="tab-patents"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              tab === 'patents' ? 'btn-exec' : 'glass-card border border-white/8 text-[#94a3b8] hover:text-white'
            }`}
          >
            <Shield size={14} /> Patents ({PATENTS.length})
          </button>
        </motion.div>

        {/* Publications Tab */}
        {tab === 'articles' && (
          <div className="space-y-3">
            {pubs.map((pub, i) => {
              const bc = TYPE_BADGE_COLOR[pub.type] || '#0bc5ea';
              return (
                <motion.div
                  key={pub.id || i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  data-testid={`pub-${i}`}
                  className="glass-card rounded-xl border border-white/6 p-5 hover:border-[#0bc5ea]/20 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg flex-shrink-0 mt-0.5" style={{ background: `${bc}12` }}>
                      <FileText size={14} style={{ color: bc }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: bc, background: `${bc}12` }}>
                          {pub.type}
                        </span>
                        {pub.year && <span className="text-xs text-[#64748b]">{pub.year}</span>}
                        {pub.reference && <span className="text-xs text-[#64748b]">· {pub.reference}</span>}
                      </div>
                      <p className="text-[#e2e8f0] text-sm font-medium leading-snug mb-1 group-hover:text-white transition-colors">
                        {pub.title}
                      </p>
                      {pub.journal && <p className="text-[#64748b] text-xs italic">{pub.journal}</p>}
                      {pub.accessNote && <p className="text-[#64748b] text-xs mt-0.5 italic">⚠ {pub.accessNote}</p>}
                    </div>
                    {(pub.url || pub.doi) && (
                      <a href={pub.url || `https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-[#64748b] hover:text-[#0bc5ea] transition-colors flex-shrink-0">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Patents Tab */}
        {tab === 'patents' && (
          <div className="space-y-3">
            {PATENTS.map((pat, i) => (
              <motion.div
                key={pat.id}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                data-testid={`patent-${pat.id}`}
                className="glass-card rounded-xl border overflow-hidden"
                style={{ borderColor: `${pat.statusColor}20` }}
              >
                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${pat.statusColor}, transparent)` }} />
                <div className="p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: `${pat.statusColor}15` }}>
                    <Shield size={16} style={{ color: pat.statusColor }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: pat.statusColor, background: `${pat.statusColor}12` }}>
                        {pat.status}
                      </span>
                      <span className="text-xs text-[#64748b]">{pat.inventorRole}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[#94a3b8]">{pat.relatedProject}</span>
                    </div>
                    <p className="text-white text-sm font-semibold leading-snug mb-2">{pat.title}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-[#64748b]">
                      <span><span className="text-[#94a3b8]">USPTO:</span> {pat.usptoApp}</span>
                      <span><span className="text-[#94a3b8]">Filed:</span> {pat.filed}</span>
                      {pat.international && (
                        <span className="sm:col-span-2"><span className="text-[#94a3b8]">International:</span> {pat.international}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!compact && (
          <p className="text-center text-[#64748b] text-xs mt-6">
            ORCID: <a href="https://orcid.org/0009-0006-6427-5005" target="_blank" rel="noopener noreferrer" className="text-[#0bc5ea] hover:underline">0009-0006-6427-5005</a>
            {works.length === 0 && ' · Connect ORCID profile to auto-sync all works'}
          </p>
        )}
      </div>
    </section>
  );
}
