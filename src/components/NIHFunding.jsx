/**
 * Legacy component (Pages Router demo only). The live site home page imports
 * `@/components/executive/NIHFunding` — edit that file for localhost changes on `/`.
 */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FlaskConical, ChevronDown, ChevronUp, Award } from "lucide-react";

const GRAND_TOTAL = 12501254;
const TOTAL_AWARDS = 51;

const nihProjects = [
  {
    id: "emrast",
    name: "EMRAST",
    fullName: "Early Multi-Modal Alzheimer's Risk Assessment & Sensing Technology",
    role: "Principal Investigator",
    agency: "NIH / NIA",
    institute: "NIA",
    color: "#00E5FF",
    total: 2947375,
    years: "2023 – 2025",
    description: "Multimodal diagnostic platform combining psychophysical olfactory stimulation with ML-based biomarker classification for pre-clinical Alzheimer's detection.",
    awards: [
      { type: "Phase I",  year: 2023, amount: 448887,  id: "1R44AG082621-01" },
      { type: "Phase II", year: 2024, amount: 1249244, id: "4R44AG082621-02" },
      { type: "Phase II", year: 2025, amount: 1249244, id: "5R44AG082621-03" },
    ],
  },
  {
    id: "editor",
    name: "EDITOR",
    fullName: "Early Detection & Intervention Tool for Opioid Recovery",
    role: "Co-Investigator",
    agency: "NIH / NIDA",
    institute: "NIDA",
    color: "#8A2BE2",
    total: 2704509,
    years: "2022 – 2023",
    description: "Connected RPM ecosystem with a novel non-infrared pupillometer enabling objective neurological assessment for opioid use disorder monitoring.",
    awards: [
      { type: "Phase I",  year: 2022, amount: 330680,  id: "1R44DA056156-01" },
      { type: "I-CORPS",  year: 2023, amount: 55000,   id: "3R44DA056156-01S1" },
      { type: "Phase II", year: 2023, amount: 1318829, id: "4R44DA056156-02" },
      { type: "Phase II", year: 2023, amount: 1000000, id: "5R44DA056156-03" },
    ],
  },
  {
    id: "cbotp",
    name: "CBOT-P",
    fullName: "Chronic Pain Neurosensory Therapeutic Platform",
    role: "Co-Investigator",
    agency: "NIH / NIA & NINDS",
    institute: "NIA/NINDS",
    color: "#F59E0B",
    total: 2791180,
    years: "2018 – 2022",
    description: "FDA Breakthrough Device designated electromechanical neurostimulation platform for chronic pain management with real-time neural feedback.",
    awards: [
      { type: "Phase II",   year: 2021, amount: 1247784, id: "2R44AG061981-03A1" },
      { type: "Supplement", year: 2022, amount: 98280,   id: "3R44AG061981-04S2" },
      { type: "TABA",       year: 2022, amount: 50000,   id: "3R44AG061981-04S1" },
      { type: "Phase II",   year: 2022, amount: 1245116, id: "5R44AG061981-04" },
    ],
  },
  {
    id: "cbot",
    name: "CBOT-OUD",
    fullName: "Opioid Use Disorder Neurostimulation Platform",
    role: "Lead Product Engineer",
    agency: "NIH / NIDA",
    institute: "NIDA",
    color: "#10B981",
    total: 1904986,
    years: "2019 – 2021",
    description: "Neurostimulation device for opioid use disorder, scaled from prototype through full Phase II manufacturing and multi-site clinical deployment.",
    awards: [
      { type: "Phase II", year: 2021, amount: 859103,  id: "5R44DA049616-03" },
    ],
  },
  {
    id: "cot",
    name: "COT",
    fullName: "Cognitive Olfactory Adaptive Training for Alzheimers Disease Modifying Intervention",
    role: "Lead Product Engineer",
    agency: "NIH / NINDS",
    institute: "NINDS",
    color: "#06B6D4",
    total: 3129999,
    years: "2022 – 2025",
    description: "End-to-end hardware lifecycle development for an Alzheimer's disease-modifying intervention device with full usability engineering and system validation protocols.",
    awards: [
      { type: "Phase I",  year: 2022, amount: 499999,  id: "1R44NS125745-01A1" },
      { type: "Phase II", year: 2024, amount: 1349130, id: "4R44NS125745-02" },
      { type: "Phase II", year: 2025, amount: 1280870, id: "5R44NS125745-03" },
    ],
  },
];

const phaseColors = {
  "Phase I":    { bg: "rgba(0,229,255,0.12)", text: "#00E5FF" },
  "Phase II":   { bg: "rgba(138,43,226,0.12)", text: "#8A2BE2" },
  "I-CORPS":   { bg: "rgba(16,185,129,0.12)", text: "#10B981" },
  "Supplement": { bg: "rgba(245,158,11,0.12)", text: "#F59E0B" },
  "TABA":       { bg: "rgba(6,182,212,0.12)", text: "#06B6D4" },
};

function formatMoney(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [expanded, setExpanded] = useState(false);
  const pct = Math.round((project.total / GRAND_TOTAL) * 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      data-testid={`nih-project-${project.id}`}
      className="glass rounded-2xl border border-white/8 overflow-hidden hover:border-white/15 transition-all duration-300"
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl flex-shrink-0" style={{ background: `${project.color}15` }}>
              <FlaskConical size={18} style={{ color: project.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-heading font-700 text-white text-lg">{project.name}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: project.color, background: `${project.color}15` }}
                >
                  {project.institute}
                </span>
              </div>
              <p className="text-[#A0AEC0] text-xs leading-snug max-w-sm">{project.fullName}</p>
            </div>
          </div>
          {/* Amount */}
          <div className="text-right flex-shrink-0">
            <p className="font-heading font-700 text-xl" style={{ color: project.color }}>
              {formatMoney(project.total)}
            </p>
            <p className="text-[#718096] text-xs">{project.years}</p>
          </div>
        </div>

        {/* Role badge + agency */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full glass border border-white/10 text-[#A0AEC0]">
            <Award size={10} /> {project.role}
          </span>
          <span className="text-xs text-[#718096]">{project.agency}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-[#718096] mb-1.5">
            <span>Portfolio Share</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-[#718096] text-xs leading-relaxed mb-4">{project.description}</p>

        {/* Awards expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          data-testid={`expand-awards-${project.id}`}
          className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
          style={{ color: project.color }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? "Hide" : "View"} {project.awards.length} Awards
        </button>

        {/* Awards table */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 rounded-xl overflow-hidden border border-white/8"
            data-testid={`awards-table-${project.id}`}
          >
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="text-left px-3 py-2 text-[#718096] font-semibold uppercase tracking-widest">Type</th>
                  <th className="text-left px-3 py-2 text-[#718096] font-semibold uppercase tracking-widest">Year</th>
                  <th className="text-right px-3 py-2 text-[#718096] font-semibold uppercase tracking-widest">Amount</th>
                  <th className="text-left px-3 py-2 text-[#718096] font-semibold uppercase tracking-widest hidden sm:table-cell">NIH Award ID</th>
                </tr>
              </thead>
              <tbody>
                {project.awards.map((aw, i) => {
                  const pc = phaseColors[aw.type] || { bg: "rgba(160,174,192,0.1)", text: "#A0AEC0" };
                  return (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full font-medium" style={{ color: pc.text, background: pc.bg }}>
                          {aw.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[#A0AEC0]">{aw.year}</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-white">{formatMoney(aw.amount)}</td>
                      <td className="px-3 py-2.5 text-[#718096] font-mono hidden sm:table-cell">{aw.id || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function NIHFunding() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="nih-portfolio" data-testid="nih-funding-section" className="py-20 px-6 bg-[#05050A]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#00E5FF] text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Federal Research Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-800 text-white leading-none mb-8"
          >
            NIH-Funded Innovation.{" "}
            <span className="text-gradient">Peer-Reviewed Impact.</span>
          </motion.h2>

          {/* Grand total callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2"
          >
            {[
              { value: "$12.5M+", label: "Total Federal Funding", color: "#00E5FF" },
              { value: "51",      label: "NIH Award Grants",       color: "#8A2BE2" },
              { value: "5",       label: "Active Projects",        color: "#F59E0B" },
              { value: "2018–25", label: "Research Timeline",      color: "#10B981" },
            ].map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-5 border border-white/8 text-center hover:-translate-y-0.5 transition-transform duration-200"
              >
                <p className="font-heading font-800 text-2xl mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[#718096] text-xs uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {nihProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Institution note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-[#718096] text-xs mt-8"
        >
          All grants awarded through <span className="text-[#A0AEC0]">Evon Medics LLC</span> · National Institutes of Health (NIH) SBIR Program
        </motion.p>
      </div>
    </section>
  );
}
