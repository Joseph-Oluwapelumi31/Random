import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 75;
    const MAX_DIST = 155;
    const MOUSE_DIST = 200;

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 1.2,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.phase += 0.018;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_DIST && d > 0) {
          const f = (1 - d / MOUSE_DIST) * 0.018;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
          const spd = Math.hypot(n.vx, n.vy);
          if (spd > 1.6) { n.vx *= 1.6 / spd; n.vy *= 1.6 / spd; }
        }
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.55;
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mDist = Math.hypot(midX - mouse.x, midY - mouse.y);
            const hl = mDist < 140;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = hl
              ? `rgba(138, 43, 226, ${Math.min(alpha * 2.5, 0.85)})`
              : `rgba(0, 229, 255, ${alpha * 0.65})`;
            ctx.lineWidth = hl ? 1.2 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(n.phase) * 0.5 + 0.5;
        const md = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        const nearMouse = md < 150;

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        g.addColorStop(0, nearMouse ? "rgba(138,43,226,0.85)" : `rgba(0,229,255,${0.5 + pulse * 0.35})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = nearMouse ? "#8A2BE2" : "#00E5FF";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (0.75 + pulse * 0.45), 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="neural-canvas"
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#05050A]"
    >
      {/* Neural Network Background */}
      <NeuralCanvas />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05050A] via-[#05050A]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-[45%] h-full bg-gradient-to-r from-[#05050A] to-transparent pointer-events-none" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#8A2BE2]/8 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Text */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-[#A0AEC0] text-sm font-medium">
                EB-1A Approved MedTech Executive &nbsp;·&nbsp; Global Product Development Leader
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-800 leading-none tracking-tight text-white mb-6"
            >
              Engineering the{" "}
              <span className="text-gradient block sm:inline">
                Future of Human Health.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#A0AEC0] text-base md:text-lg mb-8 max-w-xl leading-relaxed"
            >
              Biomedical Innovation &nbsp;|&nbsp; MedTech Strategy &nbsp;|&nbsp; NIH-Funded R&D
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                to="/innovation-hub"
                data-testid="hero-cta-hub"
                className="btn-gradient px-8 py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 text-base"
              >
                Explore the Innovation Hub
                <ArrowRight size={18} />
              </Link>
              <button
                data-testid="hero-cta-projects"
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 rounded-2xl font-semibold text-white glass border border-white/10 hover:border-[#00E5FF]/40 hover:bg-white/5 transition-all duration-300 text-base"
              >
                View Projects
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: "5+", label: "US Patents" },
                { value: "$12M+", label: "NIH Funded" },
                { value: "Johns Hopkins", label: "MSE · 3.8 GPA" },
                { value: "10+ Years", label: "MedTech R&D" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-gradient font-heading font-700 text-lg">{stat.value}</span>
                  <span className="text-[#718096] text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile Photo — 3D Executive Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative flex-shrink-0 hidden lg:block"
            data-testid="hero-profile-photo"
            style={{ perspective: "1200px" }}
          >
            {/* Deep background depth layers — 3D illusion */}
            <div className="absolute top-6 right-6 w-[420px] h-[540px] rounded-[2.5rem] bg-[#8A2BE2]/25 blur-md" />
            <div className="absolute top-3 right-3 w-[420px] h-[540px] rounded-[2.5rem] bg-[#00E5FF]/12 blur-sm" />
            <div className="absolute -bottom-4 -left-4 w-[420px] h-[540px] rounded-[2.5rem] bg-[#8A2BE2]/10 blur-xl" />

            {/* Ambient glow behind photo */}
            <div className="absolute inset-0 scale-110 rounded-[2.5rem] bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 blur-3xl" />

            {/* Main photo card with subtle 3D bob */}
            <motion.div
              animate={{ rotateY: [-3, 3, -3], rotateX: [1.5, -1.5, 1.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "-24px 24px 80px rgba(0,229,255,0.18), 0 40px 80px rgba(138,43,226,0.22), 0 0 0 1px rgba(0,229,255,0.15)",
              }}
              className="relative w-[420px] h-[540px] rounded-[2.5rem] overflow-hidden"
            >
              <img
                src="https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg"
                alt="Vamsi Reddy"
                className="w-full h-full object-cover object-top"
              />

              {/* Bottom gradient for name overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/75 via-[#05050A]/10 to-transparent" />

              {/* Electric blue right-edge accent line */}
              <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-[#00E5FF]/80 via-[#8A2BE2]/60 to-[#00E5FF]/80" />
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#00E5FF]/80 via-[#8A2BE2]/60 to-transparent" />

              {/* Name card at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-heading text-xl font-700 text-white leading-snug">Vamsi Reddy</p>
                <p className="text-[#00E5FF] text-sm font-medium mt-0.5">Global Head of Product Development · Evon Medics</p>
              </div>
            </motion.div>

            {/* Floating achievement badge — EB-1A */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-20 top-[18%] glass-strong rounded-2xl px-4 py-3 border border-[#00E5FF]/30 shadow-2xl"
              style={{ boxShadow: "0 8px 32px rgba(0,229,255,0.15)" }}
            >
              <p className="text-[#00E5FF] text-xs font-semibold uppercase tracking-widest mb-0.5">EB-1A Approved</p>
              <p className="text-white text-base font-700 font-heading">Scientist</p>
            </motion.div>

            {/* Floating badge — NIH */}
            <motion.div
              animate={{ y: [0, 10, 0], x: [0, -3, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -right-16 top-[30%] glass-strong rounded-2xl px-4 py-3 border border-[#8A2BE2]/35 shadow-2xl"
              style={{ boxShadow: "0 8px 32px rgba(138,43,226,0.18)" }}
            >
              <p className="text-[#8A2BE2] text-xs font-semibold uppercase tracking-widest mb-0.5">NIH Funded</p>
              <p className="text-white text-base font-700 font-heading">$12M+</p>
            </motion.div>

            {/* Floating badge — Patents */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -left-14 bottom-[22%] glass-strong rounded-2xl px-4 py-3 border border-[#F59E0B]/30 shadow-2xl"
              style={{ boxShadow: "0 8px 32px rgba(245,158,11,0.12)" }}
            >
              <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-0.5">US Patents</p>
              <p className="text-white text-base font-700 font-heading">5+</p>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToSection("about")}
        data-testid="hero-scroll-down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#718096] hover:text-[#00E5FF] transition-colors animate-float"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}
