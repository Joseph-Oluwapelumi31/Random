/**
 * Portable defaults for home / strategy / NIH / KPI / bento.
 * Single source for fallbacks and for the dev seed-bundle API.
 */

export const STRATEGY_EXPERIENCE = [
  {
    role: 'Global Head of Product Development',
    company: 'Evon Medics LLC',
    type: 'Full-time · USA & Global',
    period: 'July 2021 — Present',
    color: '#0bc5ea',
    achievements: [
      'Hardware Product Owner & P&L technology owner across a $12M+ portfolio of 6 integrated medical device product lines',
      'Led 0-to-1 development of MemoryDriver (iOS DTx), Smart Nasal Cannula Platform, and AI-driven diagnostics platform — from concept through clinical deployment',
      'Chief Architect of 5+ patent portfolio spanning neuromodulation, respiratory monitoring, and AI diagnostics',
      'Built in-house rapid-prototyping infrastructure: 80% reduction in external development dependence, 75% dev cost reduction, 3× faster iteration cycles',
      'Secured $12.5M+ in non-dilutive federal capital; negotiated $2M+ enterprise partnerships (AWS, MathWorks, SolidWorks)',
      'Directed global cross-functional teams: mechanical, firmware, cloud engineering — across USA and international operations',
    ],
  },
  {
    role: 'Translational Systems Engineering & Bio-Instrumentation',
    company: 'Johns Hopkins University · NIT Rourkela · Osmania University',
    type: 'Research & Academic · USA & India',
    period: 'May 2016 — May 2021',
    color: '#7c3aed',
    achievements: [
      'Automated Closed-Loop Behavioral Control System (JHU): Real-time hardware control using Raspberry Pi with fluid reward delivery and behavioral sensor integration',
      'High-Density EMG Signal Architecture (JHU): 128-channel signal processing pipeline with carbon nanotube electrodes and KL Divergence–based MATLAB classification',
      'Bio-Potential Signal Chain Design (NITR): Custom biopotential amplifier for sub-vocal EMG decoding using MLP ANN classifier — published in Woodhead Publishing',
      'Drowsiness Detection (Osmania): EEG-based "Drowsiness Index" algorithm using Discrete Wavelet Transform — published in IFMBE Proceedings (Springer, 2017)',
      '"Smart Goggles" IR blink detection system — published in Journal of the Instrumentation Society of India (2016)',
    ],
  },
];

export const STRATEGY_COMPETENCIES = [
  { category: 'Product & Engineering Leadership', items: ['0-to-1 Product Lifecycle Management', 'Hardware Product Ownership', 'Connected Health Ecosystems', 'Digital Therapeutics (DTx)', 'Embedded Systems & Firmware', 'Cloud-Native IoT Platforms (AWS)'] },
  { category: 'Regulatory & Quality Strategy', items: ['FDA Design Controls (21 CFR 820)', 'ISO 13485 QMS', 'IEC 62304 Software Lifecycle', 'ISO 14971 Risk Management', 'HIPAA & GDPR Compliance', 'FDA Breakthrough Device Pathway'] },
  { category: 'Executive & Business Strategy', items: ['P&L Management', 'Capital Acquisition & Portfolio Defense', 'Build vs. Buy Strategy', 'Vendor Ecosystem & CDMO Management', 'Agile/Scrum Transformation', 'Executive Stakeholder Alignment'] },
  { category: 'Technical Domains', items: ['AI/ML in Clinical Diagnostics', 'Bioelectronics & Signal Processing', 'Wearable Sensing (SpO₂, PPG, GSR)', 'Optoelectronics & Pupillometry', 'Neurostimulation Engineering', 'EHR Integration (HL7/FHIR)'] },
];

export const STRATEGY_EDUCATION = [
  { school: 'Johns Hopkins University', degree: 'MSE in Biomedical Engineering', detail: 'CGPA 3.8/4.0 · Medical Instrumentation, AI MedTech, Wearables, FDA Design Controls', color: '#3b82f6', period: '2019 – 2021', logoUrl: '/logos/jhu.png' },
  { school: 'NIT Rourkela', degree: 'B.Tech (Honors) in Biomedical Engineering', detail: 'Biomedical Signal Processing, Medical Electronics, Physiological Research, Embedded Systems', color: '#10b981', period: '2014 – 2018', logoUrl: '/logos/nitr.png' },
];

export const NIH_PORTFOLIO_PROJECTS = [
  { id: 'emrast', name: 'EMRAST', full: "Early Multi-Modal Alzheimer's Risk Assessment & Sensing Technology", role: 'Principal Investigator', agency: 'NIH/NIA', color: '#0bc5ea', total: 2947375, years: '2023–2025', desc: "Multimodal diagnostic platform combining psychophysical olfactory stimulation with ML-based biomarker classification for pre-clinical Alzheimer's detection.", awards: [{ type: 'Phase I', year: 2023, amount: 448887, id: '1R44AG082621-01' }, { type: 'Phase II', year: 2024, amount: 1249244, id: '4R44AG082621-02' }, { type: 'Phase II', year: 2025, amount: 1249244, id: '5R44AG082621-03' }] },
  { id: 'editor', name: 'EDITOR', full: 'Early Detection & Intervention Tool for Opioid Recovery', role: 'Co-Investigator', agency: 'NIH/NIDA', color: '#7c3aed', total: 2704509, years: '2022–2023', desc: 'Connected RPM ecosystem featuring a novel non-infrared pupillometer for objective neurological assessment in opioid use disorder monitoring.', awards: [{ type: 'Phase I', year: 2022, amount: 330680, id: '1R44DA056156-01' }, { type: 'I-CORPS', year: 2023, amount: 55000, id: '3R44DA056156-01S1' }, { type: 'Phase II', year: 2023, amount: 1318829, id: '4R44DA056156-02' }, { type: 'Phase II', year: 2023, amount: 1000000, id: '5R44DA056156-03' }] },
  { id: 'cbotp', name: 'CBOT-P', full: 'Chronic Pain Neurosensory Therapeutic Platform', role: 'Co-Investigator', agency: 'NIH/NIA·NINDS', color: '#f59e0b', total: 2791180, years: '2018–2022', desc: 'FDA Breakthrough Device designated electromechanical neurostimulation platform for chronic pain management with real-time neural feedback loop.', awards: [{ type: 'Phase I', year: 2018, amount: 225000, id: '1R43AG061981-01' }, { type: 'Phase I', year: 2019, amount: 225000, id: '5R43AG061981-02' }, { type: 'Phase II', year: 2021, amount: 1247784, id: '2R44AG061981-03A1' }, { type: 'Supplement', year: 2022, amount: 98280, id: '3R44AG061981-04S2' }, { type: 'TABA', year: 2022, amount: 50000, id: '3R44AG061981-04S1' }, { type: 'Phase II', year: 2022, amount: 1245116, id: '5R44AG061981-04' }] },
  { id: 'cbot', name: 'CBOT-OUD', full: 'Opioid Use Disorder Neurostimulation Platform', role: 'Lead Product Engineer', agency: 'NIH/NIDA', color: '#10b981', total: 1904986, years: '2019–2021', desc: 'Neurostimulation device for opioid use disorder scaled from prototype through Phase II manufacturing and multi-site clinical deployment.', awards: [{ type: 'Phase I', year: 2019, amount: 225000, id: '1R43DA049616-01' }, { type: 'Phase II', year: 2020, amount: 820883, id: '2R44DA049616-02' }, { type: 'Phase II', year: 2021, amount: 859103, id: '5R44DA049616-03' }] },
  { id: 'cot', name: 'COT', full: "Cognitive Optimization Therapy — Disease-Modifying Alzheimer's Intervention", role: 'Lead Product Engineer', agency: 'NIH/NINDS', color: '#06b6d4', total: 3129999, years: '2022–2025', desc: "End-to-end hardware lifecycle for an Alzheimer's disease-modifying intervention device with full usability engineering and system validation protocols.", awards: [{ type: 'Phase I', year: 2022, amount: 499999, id: '1R44NS125745-01A1' }, { type: 'Phase II', year: 2024, amount: 1349130, id: '4R44NS125745-02' }, { type: 'Phase II', year: 2025, amount: 1280870, id: '5R44NS125745-03' }] },
];

export const NIH_SUMMARY_TILES = [
  { value: '$12.5M+', label: 'Total Federal Funding', color: '#0bc5ea' },
  { value: '51', label: 'NIH Award Grants', color: '#7c3aed' },
  { value: '5', label: 'Active Projects', color: '#f59e0b' },
  { value: '2018–25', label: 'Research Timeline', color: '#10b981' },
];

export const KPI_METRICS = [
  { end: 12.5, suffix: 'M+', prefix: '$', label: 'Non-Dilutive Capital Managed', sub: 'NIH SBIR Portfolio', decimals: 1 },
  { end: 6, suffix: '+', prefix: '', label: 'Medical Devices to Market', sub: '0-to-1 Product Launches', decimals: 0 },
  { end: 5, suffix: '+', prefix: '', label: 'US Patents Filed', sub: 'Inventorship Highlight', decimals: 0 },
  { end: 4, suffix: '', prefix: '', label: 'Peer-Reviewed Publications', sub: 'ORCID: 0009-0006-6427-5005', decimals: 0 },
];

/** Plain tiles (no React components) — merged with icons in ExecutiveBento. */
export const BENTO_TILE_DEFAULTS = [
  { id: 'eb1a', label: 'Extraordinary Ability', title: 'EB-1A: Top 1% MedTech Global Leader', desc: 'USCIS-recognized extraordinary ability — placing Vamsi in the top 1% of global biomedical engineering talent. Legal recognition of market dominance in MedTech innovation.', span: 'md:col-span-2', accent: '#e2b96a', gradient: 'from-amber-500/15 to-yellow-700/8' },
  { id: 'pl', label: 'Portfolio P&L Responsibility', title: '$12.5M+ Portfolio P&L Authority', desc: 'Full P&L technology ownership across a $12.5M+ NIH SBIR portfolio. 51 federal grants, 5 active projects, and global commercial execution across 6 integrated product lines.', span: '', accent: '#0bc5ea', gradient: 'from-cyan-500/15 to-blue-700/8' },
  { id: 'ip', label: 'IP Strategy & Monetization', title: 'IP Strategy & Monetization Roadmap', desc: '5+ US Utility Patents co-invented across neuromodulation, AI diagnostics, pupillometry, and olfactory therapeutics — a defensible IP portfolio strategy, not just invention.', span: '', accent: '#7c3aed', gradient: 'from-violet-500/15 to-purple-800/8' },
  { id: 'lifecycle', label: 'Global Product Lifecycle Authority', title: 'Global Product Lifecycle Authority', desc: 'Total ownership from concept to clinical deployment across 6 product lines. Reduced external development reliance by 80%, slashed dev costs 75%, 3× faster iteration cycles.', span: '', accent: '#10b981', gradient: 'from-emerald-500/15 to-green-900/8' },
  { id: 'jhu', label: 'Johns Hopkins University', title: 'Johns Hopkins University', desc: 'MSE Biomedical Engineering · CGPA 3.8/4.0 · Medical Instrumentation, AI MedTech, Wearables, FDA Design Controls. 2019–2021.', span: '', accent: '#3b82f6', gradient: 'from-blue-600/15 to-blue-900/8' },
  { id: 'nitr', label: 'NIT Rourkela', title: 'NIT Rourkela (Honors)', desc: 'B.Tech Biomedical Engineering · Biomedical Signal Processing, Medical Electronics, Physiological Research, Embedded Systems. 2014–2018.', span: '', accent: '#14b8a6', gradient: 'from-teal-500/15 to-teal-900/8' },
  { id: 'infra', label: 'Scalable Health-Tech Infrastructure', title: 'Scalable Health-Tech Infrastructure', desc: 'Architect of cloud-native health ecosystems: BLE 5.0 wearables, AWS IoT Core, edge AI, multi-sensor telemetry (GSR, SpO₂, PPG). FHIR-compatible with EHR integration — built for scale.', span: 'md:col-span-2', accent: '#06b6d4', gradient: 'from-cyan-600/15 to-blue-900/8' },
  { id: 'fda', label: 'Regulatory Champion', title: 'Regulatory Champion: FDA Breakthrough Strategy', desc: 'CBOT-P earned FDA Breakthrough Device Designation. Expert navigator of 21 CFR 820, ISO 13485, IEC 62304, ISO 14971 — from design controls through clinical validation.', span: '', accent: '#f97316', gradient: 'from-orange-500/15 to-red-900/8' },
  { id: 'global', label: 'Cross-Border R&D Operations', title: 'Cross-Border R&D Operations & Strategic Partnerships', desc: 'Directed distributed global teams across USA, Africa & Asia. $2M+ enterprise partnerships (AWS, MathWorks, SolidWorks). Complex international supply chain and CDMO management.', span: '', accent: '#7c3aed', gradient: 'from-violet-600/15 to-indigo-900/8' },
  { id: 'pubs', label: 'Peer-Reviewed Contributions', title: 'Published Research & Verified Impact', desc: "Published in Alzheimer's & Dementia (Wiley), IFMBE Proceedings (Springer), Woodhead Publishing & ISOI Journal. 5 US Patents across neurotech and AI health platforms.", span: 'md:col-span-2', accent: '#10b981', gradient: 'from-emerald-500/15 to-green-900/8' },
];
