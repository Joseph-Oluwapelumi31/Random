import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award, FlaskConical, GraduationCap, BookOpen,
  Globe, Lightbulb, Brain, Shield, Microscope, Dna
} from "lucide-react";

const bentoItems = [
  {
    id: "eb1a",
    icon: Award,
    label: "EB-1A Approved",
    title: "Extraordinary Ability",
    desc: "USCIS-recognized scientist with extraordinary ability in Biomedical Engineering & MedTech Innovation.",
    span: "md:col-span-2",
    gradient: "from-amber-500/20 to-yellow-600/10",
    border: "border-amber-500/20",
    accent: "#F59E0B",
    large: true,
  },
  {
    id: "nih",
    icon: FlaskConical,
    label: "NIH SBIR Portfolio",
    title: "$12.5M+ Funded",
    desc: "Principal Investigator & Lead Engineer on 5 federally funded NIH SBIR projects: EMRAST, EDITOR, CBOT-P, COT & CBOT-OUD. 51 grants awarded, 2018–2025.",
    span: "",
    gradient: "from-[#00E5FF]/15 to-blue-500/10",
    border: "border-[#00E5FF]/20",
    accent: "#00E5FF",
    large: false,
  },
  {
    id: "patents",
    icon: Lightbulb,
    label: "Inventor",
    title: "5+ US Patents",
    desc: "Neurosensory therapeutics, pupillometry, memory classification, olfactory training & cognitive assessment.",
    span: "",
    gradient: "from-[#8A2BE2]/15 to-purple-700/10",
    border: "border-[#8A2BE2]/20",
    accent: "#8A2BE2",
    large: false,
  },
  {
    id: "jhu",
    icon: GraduationCap,
    label: "Academic Pedigree",
    title: "Johns Hopkins University",
    desc: "MSE in Biomedical Engineering · CGPA 3.8/4.0 · Focus: Medical Instrumentation, AI MedTech, Wearables, FDA Design Controls.",
    span: "",
    gradient: "from-blue-700/15 to-blue-900/10",
    border: "border-blue-500/20",
    accent: "#3B82F6",
    large: false,
  },
  {
    id: "nitr",
    icon: Microscope,
    label: "B.Tech (Honors)",
    title: "NIT Rourkela",
    desc: "Biomedical Signal Processing, Medical Electronics, Physiological Research & Embedded Systems.",
    span: "",
    gradient: "from-teal-600/15 to-teal-900/10",
    border: "border-teal-500/20",
    accent: "#14B8A6",
    large: false,
  },
  {
    id: "pubs",
    icon: BookOpen,
    label: "Publications",
    title: "Peer-Reviewed Research",
    desc: "Published in Alzheimer's & Dementia, IFMBE Proceedings (Springer), Woodhead Publishing & ISOI Journal.",
    span: "md:col-span-2",
    gradient: "from-emerald-600/15 to-green-900/10",
    border: "border-emerald-500/20",
    accent: "#10B981",
    large: false,
  },
  {
    id: "products",
    icon: Brain,
    label: "Product Portfolio",
    title: "0-to-1 Product Builder",
    desc: "MemoryDriver (iOS brain training), Smart Nasal Cannula Platform, EMRAST Diagnostic System — 6 integrated product lines under a $12M+ portfolio.",
    span: "md:col-span-2",
    gradient: "from-[#8A2BE2]/15 to-[#00E5FF]/10",
    border: "border-[#8A2BE2]/20",
    accent: "#8A2BE2",
    large: true,
  },
  {
    id: "fda",
    icon: Shield,
    label: "Regulatory Expert",
    title: "FDA Breakthrough Device",
    desc: "CBOT-P earned FDA Breakthrough Device Designation. Expert in 21 CFR 820, ISO 13485, IEC 62304 & HIPAA.",
    span: "",
    gradient: "from-orange-600/15 to-red-900/10",
    border: "border-orange-500/20",
    accent: "#F97316",
    large: false,
  },
  {
    id: "global",
    icon: Globe,
    label: "Executive Leader",
    title: "Global Team Operations",
    desc: "Directed cross-functional global teams — mechanical, firmware, cloud engineers — across USA & international operations at Evon Medics.",
    span: "",
    gradient: "from-violet-600/15 to-indigo-900/10",
    border: "border-violet-500/20",
    accent: "#7C3AED",
    large: false,
  },
  {
    id: "connected",
    icon: Dna,
    label: "Connected Health",
    title: "BLE + AWS IoT Ecosystem",
    desc: "Architect of multi-sensor telemetry ecosystems (GSR, SpO2, PPG) with BLE wearables, AWS IoT Core & cloud-native data pipelines.",
    span: "md:col-span-2",
    gradient: "from-cyan-600/15 to-blue-900/10",
    border: "border-cyan-500/20",
    accent: "#06B6D4",
    large: false,
  },
];

function BentoCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      data-testid={`bento-card-${item.id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl p-6 glass border ${item.border} ${item.span}
        hover:-translate-y-1 hover:border-opacity-50 transition-all duration-300 group`}
      style={{
        background: `linear-gradient(135deg, ${item.gradient.includes("from-") ? "" : ""})`,
      }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 rounded-2xl`} />

      {/* Shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${item.accent}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="p-2 rounded-xl"
            style={{ background: `${item.accent}20`, color: item.accent }}
          >
            <Icon size={item.large ? 22 : 18} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest mt-2"
            style={{ color: item.accent }}
          >
            {item.label}
          </span>
        </div>

        <h3 className={`font-heading font-700 text-white mb-2 ${item.large ? "text-xl" : "text-lg"}`}>
          {item.title}
        </h3>
        <p className="text-[#A0AEC0] text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Accomplishments() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="about" data-testid="accomplishments-section" className="py-20 px-6 bg-[#05050A]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#00E5FF] text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Track Record
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-800 text-white leading-none"
          >
            Built on Science.{" "}
            <span className="text-gradient">Driven by Impact.</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {bentoItems.map((item, i) => (
            <BentoCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
