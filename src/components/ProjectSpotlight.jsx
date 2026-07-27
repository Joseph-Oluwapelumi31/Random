import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Brain, Wind, Zap, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "memorydriver",
    icon: Brain,
    tag: "Digital Therapeutic · iOS",
    title: "MemoryDriver",
    subtitle: "AI-Powered Cognitive Training",
    description:
      "A patented digital therapeutic iOS app combining AI-driven cognitive assessments with personalized brain training protocols. HIPAA-compliant, built on AWS, and powered by a proprietary memory classification algorithm.",
    highlights: [
      "Patented memory impairment classifier (USPTO #63/783,072)",
      "AI-driven adaptive difficulty engine",
      "HIPAA & data privacy compliant",
      "Longitudinal cognitive performance tracking",
    ],
    accent: "#8A2BE2",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80",
    category: "Project Spotlight",
  },
  {
    id: "emrast",
    icon: Zap,
    tag: "NIH SBIR · Diagnostics",
    title: "EMRAST",
    subtitle: "Early Alzheimer's Diagnostic System",
    description:
      "NIH-funded multimodal diagnostic platform using psychophysical olfactory stimulation and ML-based biomarker classification to detect pre-clinical Alzheimer's disease years before symptom onset.",
    highlights: [
      "Computerized olfactory adaptive training protocol",
      "ML-based cognitive composite scoring",
      "Gray matter volume analysis (medial temporal lobe)",
      "Randomized feasibility clinical trial published",
    ],
    accent: "#00E5FF",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80",
    category: "Emerging BME Innovations",
  },
  {
    id: "cbotp",
    icon: Zap,
    tag: "FDA Breakthrough Device · Pain",
    title: "CBOT-P",
    subtitle: "Neurosensory Pain Therapeutic",
    description:
      "An electromechanical neurostimulation platform for chronic pain management, earning FDA Breakthrough Device Designation. Incorporates real-time neural feedback and ISO 13485-compliant manufacturing.",
    highlights: [
      "FDA Breakthrough Device Designation",
      "Patent: Pain Treatment Apparatus (USPTO #18/753,722)",
      "Real-time neural feedback loop",
      "ISO 13485 QMS & IEC 60601 compliant",
    ],
    accent: "#F59E0B",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=80",
    category: "MedTech World Sensations",
  },
  {
    id: "cannula",
    icon: Wind,
    tag: "Connected Health · Respiratory",
    title: "Smart Nasal Cannula",
    subtitle: "Remote Respiratory Monitoring Platform",
    description:
      "A clinically-grade connected wearable with micro-flow sensing, SpO2, and PPG sensors integrated with AWS IoT Core for remote patient monitoring — enabling 48+ hour continuous respiratory tracking.",
    highlights: [
      "BLE 5.0 + AWS IoT Core cloud telemetry",
      "0.1 L/min precision micro-flow sensing",
      "Edge AI for real-time clinical alerts",
      "FHIR-compatible EHR integration",
    ],
    accent: "#10B981",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=700&q=80",
    category: "MedTech World Sensations",
  },
  {
    id: "editor",
    icon: Eye,
    tag: "NIH SBIR · Neurology",
    title: "EDITOR",
    subtitle: "Non-Invasive Pupillometry & RPM",
    description:
      "A complete remote patient monitoring ecosystem featuring a novel non-infrared pupillometer for objective neurological assessment. Designed for opioid use disorder monitoring, TBI triage, and ICU sedation management.",
    highlights: [
      "Patented pupillometry technology (USPTO #63/774,619)",
      "250Hz sampling, sub-mm spatial resolution",
      "AI-driven Neurological Performance Index",
      "FDA-grade optoelectronic module design",
    ],
    accent: "#06B6D4",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=80",
    category: "Emerging BME Innovations",
  },
];

function ProjectCard({ project, isActive }) {
  const Icon = project.icon;
  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : 0.4, x: isActive ? 0 : -10 }}
      transition={{ duration: 0.4 }}
      className="mb-16 last:mb-0"
    >
      <div className={`flex items-center gap-2 mb-3`}>
        <div className="p-1.5 rounded-lg" style={{ background: `${project.accent}20`, color: project.accent }}>
          <Icon size={14} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: project.accent }}>
          {project.tag}
        </span>
      </div>
      <h3 className="font-heading text-3xl font-700 text-white mb-1">{project.title}</h3>
      <p className="text-[#00E5FF] font-medium mb-4">{project.subtitle}</p>
      <p className="text-[#A0AEC0] text-base leading-relaxed mb-6">{project.description}</p>
      <ul className="space-y-2">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-[#A0AEC0]">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
            {h}
          </li>
        ))}
      </ul>
      <Link
        to={`/innovation-hub?category=${encodeURIComponent(project.category)}`}
        className="inline-flex items-center gap-2 mt-6 text-sm font-semibold hover:gap-3 transition-all duration-200"
        style={{ color: project.accent }}
      >
        Read More <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

export default function ProjectSpotlight() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const inView = useInView(containerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update active based on scroll
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  }).scrollYProgress.on("change", (v) => {
    const idx = Math.min(Math.floor(v * projects.length), projects.length - 1);
    setActiveIdx(idx);
  });

  return (
    <section
      id="projects"
      data-testid="project-spotlight-section"
      className="bg-[#05050A] py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16" ref={containerRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#8A2BE2] text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Innovation Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-800 text-white leading-none mb-16"
          >
            Products That{" "}
            <span className="text-gradient">Redefine Care.</span>
          </motion.h2>

          {/* Scrollytelling Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Project Cards */}
            <div className="space-y-0">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} isActive={i === activeIdx || window.innerWidth < 1024} />
              ))}
            </div>

            {/* Right: Sticky Image */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    animate={{ opacity: i === activeIdx ? 1 : 0, scale: i === activeIdx ? 1 : 0.95 }}
                    transition={{ duration: 0.5 }}
                    className={`${i === 0 ? "relative" : "absolute"} inset-0 rounded-3xl overflow-hidden`}
                    style={{ position: i === 0 ? "relative" : "absolute", top: 0, left: 0, width: "100%" }}
                  >
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        data-testid={`project-image-${project.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/80 via-transparent to-transparent" />
                      <div
                        className="absolute inset-0 rounded-3xl"
                        style={{ border: `1px solid ${project.accent}30` }}
                      />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                          style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}
                        >
                          {project.tag}
                        </span>
                        <h4 className="font-heading text-2xl font-700 text-white mt-2">{project.title}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
