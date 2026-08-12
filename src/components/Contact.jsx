import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Youtube, Send, CheckCircle } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await axios.post(`${API}/newsletter/subscribe`, { email });
      setSubStatus(res.data.message);
      setEmail("");
    } catch {
      setSubStatus("Failed to subscribe. Please try again.");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send (no email service yet)
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-20 px-6 bg-[#05050A]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#8A2BE2] text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-800 text-white leading-none"
          >
            Let&apos;s Build the{" "}
            <span className="text-gradient">Future Together.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-[#A0AEC0] text-base leading-relaxed max-w-md">
              Whether you&apos;re a researcher, investor, industry partner, or patient advocate — I&apos;m open to conversations that advance human health.
            </p>

            {/* Social Links */}
            <div className="space-y-3">
              {[
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/reddy-vamsi",
                  href: "https://www.linkedin.com/in/reddy-vamsi",
                  color: "#0077B5",
                  testid: "contact-linkedin",
                },
                {
                  icon: Youtube,
                  label: "YouTube",
                  value: "Subscribe for MedTech insights",
                  href: "https://www.youtube.com/@VamsiReddyBME",
                  color: "#FF0000",
                  testid: "contact-youtube",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={item.testid}
                  className="flex items-center gap-4 glass rounded-xl p-4 border border-white/8 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="p-2.5 rounded-lg transition-colors" style={{ background: `${item.color}20`, color: item.color }}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#718096] uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-medium group-hover:text-[#00E5FF] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="glass rounded-2xl p-6 border border-[#00E5FF]/15" data-testid="newsletter-section">
              <h3 className="font-heading text-lg font-700 text-white mb-1">Stay at the Frontier</h3>
              <p className="text-[#718096] text-sm mb-4">Subscribe for BME research, MedTech insights, and innovation updates.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  data-testid="newsletter-email-input"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
                />
                <button
                  type="submit"
                  data-testid="newsletter-subscribe-btn"
                  className="btn-gradient px-4 py-2.5 rounded-xl text-white font-semibold text-sm"
                >
                  <Send size={14} />
                </button>
              </form>
              {subStatus && (
                <p className="text-[#00E5FF] text-xs mt-2 flex items-center gap-1">
                  <CheckCircle size={12} /> {subStatus}
                </p>
              )}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-8 border border-white/8"
            data-testid="contact-form-container"
          >
            <h3 className="font-heading text-xl font-700 text-white mb-6">Send a Message</h3>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <CheckCircle size={48} className="text-[#00E5FF]" />
                <p className="text-white font-semibold">Message received!</p>
                <p className="text-[#718096] text-sm text-center">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#718096] uppercase tracking-widest mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    data-testid="contact-name-input"
                    placeholder="Dr. Jane Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#718096] uppercase tracking-widest mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    data-testid="contact-email-field"
                    placeholder="jane@hospital.edu"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#718096] uppercase tracking-widest mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    data-testid="contact-message-input"
                    placeholder="I'd like to discuss collaboration on..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  data-testid="contact-send-btn"
                  className="w-full btn-gradient px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {sending ? "Sending..." : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* YouTube Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 glass rounded-3xl p-8 border border-[#FF0000]/20"
          data-testid="youtube-section"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="p-4 rounded-2xl bg-[#FF0000]/10 flex-shrink-0">
              <Youtube size={32} className="text-[#FF0000]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-heading text-xl font-700 text-white mb-1">MedTech on YouTube</h3>
              <p className="text-[#A0AEC0] text-sm">Deep dives into BME innovation, product development, and the future of connected health.</p>
            </div>
            <a
              href="https://www.youtube.com/@VamsiReddyBME"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="youtube-channel-link"
              className="px-6 py-3 rounded-xl font-semibold text-white border border-[#FF0000]/40 hover:bg-[#FF0000]/10 transition-colors whitespace-nowrap text-sm"
            >
              Visit Channel
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-[#718096] text-sm">
          <p>&copy; {new Date().getFullYear()} Vamsi Reddy · Biomedical Engineer · MedTech Executive</p>
          <p className="mt-1">Global Head of Product Development · Evon Medics</p>
        </div>
      </div>
    </section>
  );
}
