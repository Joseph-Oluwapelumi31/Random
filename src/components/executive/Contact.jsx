'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Youtube, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';

function resolveBackendUrl() {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (typeof raw !== 'string') return '';
  const t = raw.trim();
  if (!t || t === 'undefined') return '';
  if (!/^https?:\/\//i.test(t)) return '';
  return t.replace(/\/$/, '');
}

const BACKEND = resolveBackendUrl();

/** Practical single-address check (HTML5 + this mirror submit validation). */
const EMAIL_PATTERN = '[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\\.[a-zA-Z]{2,}';
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isValidEmail(value) {
  const t = value.trim();
  if (!t) return false;
  return EMAIL_RE.test(t);
}

function normalizeEmailInput(value) {
  return value.replace(/\s/g, '');
}

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-[#0c1219] px-4 py-3 text-sm text-slate-100 caret-[#0bc5ea] placeholder:text-slate-500 shadow-inner shadow-black/30 focus:outline-none focus:border-[#0bc5ea]/50 focus:ring-1 focus:ring-[#0bc5ea]/25';

/** ~4:3 default box at typical column width; user can resize taller up to max (see min-h / max-h). */
const messageAreaClass = `${fieldClass} resize-y min-h-[12rem] max-h-[min(75vh,32rem)] overflow-y-auto leading-relaxed`;

export default function Contact({ siteSettings = null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px', amount: 0.15 });
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('');
  const [subEmailError, setSubEmailError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formEmailError, setFormEmailError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubEmailError('');
    const addr = normalizeEmailInput(email);
    if (!isValidEmail(addr)) {
      setSubEmailError('Please enter a valid email address.');
      return;
    }
    if (!BACKEND) {
      setSubStatus('Newsletter signup is not configured (set NEXT_PUBLIC_BACKEND_URL).');
      return;
    }
    try {
      const r = await axios.post(`${BACKEND}/api/newsletter/subscribe`, { email: addr });
      setSubStatus(r.data.message); setEmail('');
    } catch { setSubStatus('Please try again.'); }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setFormEmailError('');
    const addr = normalizeEmailInput(form.email);
    if (!isValidEmail(addr)) {
      setFormEmailError('Please enter a valid email address.');
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 900));
    setSending(false); setSent(true);
  };

  return (
    <section id="contact" ref={ref} data-testid="contact-section" className="py-20 px-6 section-divider bg-[#080d12]">
      <div className="max-w-7xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-3">Connect</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="font-heading text-4xl sm:text-5xl font-bold text-white leading-none mb-10">
          Let's Build the <span className="text-gradient-cyan">Future Together.</span>
        </motion.h2>

        <div data-testid="contact-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="space-y-5">
            <p className="text-[#94a3b8] text-base leading-relaxed max-w-md">
              {siteSettings?.contactIntro?.trim()
                ? siteSettings.contactIntro
                : 'For partnership proposals, board advisory roles, speaking engagements, or investment discussions — connect via LinkedIn.'}
            </p>
            {[{ Icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/reddy-vamsi', href: 'https://www.linkedin.com/in/reddy-vamsi/', color: '#0077b5' }, { Icon: Youtube, label: 'YouTube', value: '@VR_Ennoble · MedTech Innovation', href: 'https://www.youtube.com/@VR_Ennoble', color: '#ff0000' }].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" data-testid={`contact-${item.label.toLowerCase()}`} className="flex items-center gap-4 glass-card rounded-xl p-4 border border-white/6 hover:border-white/14 hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="p-2.5 rounded-lg" style={{ background: `${item.color}20`, color: item.color }}><item.Icon size={18} /></div>
                <div><p className="text-xs text-[#64748b] uppercase tracking-widest mb-0.5">{item.label}</p><p className="text-white text-sm font-medium group-hover:text-[#0bc5ea] transition-colors">{item.value}</p></div>
              </a>
            ))}
            <div className="glass-card rounded-2xl p-5 border border-[#0bc5ea]/15">
              <p className="font-heading font-semibold text-white mb-1">Stay at the Frontier</p>
              <p className="text-[#64748b] text-sm mb-4">Subscribe to Ennoble, the frontier of Biomedical Innovation.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2" noValidate>
                <div className="flex gap-2">
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    name="newsletter-email"
                    required
                    pattern={EMAIL_PATTERN}
                    title="Use a valid email address (e.g. name@domain.com)"
                    value={email}
                    onChange={(e) => {
                      setSubEmailError('');
                      setEmail(normalizeEmailInput(e.target.value));
                    }}
                    placeholder="your@email.com"
                    data-testid="newsletter-input"
                    className={`flex-1 py-2.5 ${fieldClass}`}
                  />
                  <button type="submit" data-testid="newsletter-btn" className="btn-exec px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0"><Send size={14} /></button>
                </div>
                {subEmailError && (
                  <p className="text-amber-400/95 text-xs" role="alert">{subEmailError}</p>
                )}
              </form>
              {subStatus && <p className="text-[#0bc5ea] text-xs mt-2 flex items-center gap-1"><CheckCircle size={11} />{subStatus}</p>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-7 border border-white/6">
            <h3 className="font-heading text-xl font-bold text-white mb-6">Send a Message</h3>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <CheckCircle size={44} className="text-[#0bc5ea]" />
                <p className="text-white font-semibold">Message received.</p>
                <p className="text-[#64748b] text-sm text-center">I'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4" noValidate>
                {[{ k: 'name', label: 'Name', placeholder: 'Enter your Full Name', type: 'text' }, { k: 'email', label: 'Email', placeholder: 'email@institution.com', type: 'email' }].map(f => (
                  <div key={f.k}>
                    <label className="block text-xs text-[#64748b] uppercase tracking-widest mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      inputMode={f.k === 'email' ? 'email' : 'text'}
                      autoComplete={f.k === 'email' ? 'email' : 'name'}
                      name={f.k === 'email' ? 'contact-email' : 'contact-name'}
                      required
                      pattern={f.k === 'email' ? EMAIL_PATTERN : undefined}
                      title={f.k === 'email' ? 'Use a valid email address (e.g. name@domain.com)' : undefined}
                      value={form[f.k]}
                      onChange={(e) => {
                        if (f.k === 'email') setFormEmailError('');
                        const v = f.k === 'email' ? normalizeEmailInput(e.target.value) : e.target.value;
                        setForm({ ...form, [f.k]: v });
                      }}
                      placeholder={f.placeholder}
                      data-testid={`contact-${f.k}`}
                      className={fieldClass}
                    />
                  </div>
                ))}
                {formEmailError && (
                  <p className="text-amber-400/95 text-xs -mt-2" role="alert">{formEmailError}</p>
                )}
                <div>
                  <label className="block text-xs text-[#64748b] uppercase tracking-widest mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    rows={6}
                    placeholder="I'd like to discuss..."
                    data-testid="contact-message"
                    name="contact-message"
                    autoComplete="off"
                    className={messageAreaClass}
                  />
                </div>
                <button type="submit" disabled={sending} data-testid="contact-send" className="w-full btn-exec px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                  {sending ? 'Sending...' : <><Send size={15} />Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/6 text-center text-[#64748b] text-xs">
          <p>
            {siteSettings?.contactFooterLine1?.trim()
              ? siteSettings.contactFooterLine1
              : `© ${new Date().getFullYear()} Vamsi Reddy · Global Head of Product Development · Evon Medics LLC`}
          </p>
          <p className="mt-1">
            {siteSettings?.contactFooterLine2?.trim()
              ? siteSettings.contactFooterLine2
              : 'EB-1A Approved Scientist · Johns Hopkins MSE · 5+ US Patents'}
          </p>
        </div>
      </div>
    </section>
  );
}
