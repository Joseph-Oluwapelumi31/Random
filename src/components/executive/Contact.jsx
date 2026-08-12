'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Youtube, Send, CheckCircle, ArrowRight } from 'lucide-react';
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
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground caret-primary placeholder:text-muted-foreground transition focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25';

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
    <section id="contact" ref={ref} data-testid="contact-section" className="py-20 px-6 section-divider bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Connect</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="font-heading text-4xl sm:text-5xl font-bold text-foreground leading-none mb-10">
          Let&apos;s Build the <span className="text-gradient-cyan">Future Together.</span>
        </motion.h2>

        <div
          data-testid="contact-grid"
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
        >
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <p className="text-muted-foreground text-lg leading-8 max-w-md mb-10">
              {siteSettings?.contactIntro?.trim()
                ? siteSettings.contactIntro
                : "Partnerships, advisory opportunities, speaking engagements and strategic collaborations. Let's discuss how we can shape the future of biomedical innovation together."}
            </p>
              
            <div className="space-y-6">
              
              {[
                {
                  Icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/reddy-vamsi",
                  href: "https://www.linkedin.com/in/reddy-vamsi/",
                },
                {
                  Icon: Youtube,
                  label: "YouTube",
                  value: "@VR_Ennoble",
                  href: "https://www.youtube.com/@VR_Ennoble",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-border pb-5 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <item.Icon
                      size={20}
                      className="text-primary"
                    />

                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </p>
              
                      <p className="font-medium text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
              
                  <ArrowRight
                    size={18}
                    className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1"
                  />
                </a>
              ))}

            </div>
            
            {/* Newsletter */}
            
            <div className="mt-16 rounded-3xl border border-border bg-card p-8">

      <h3 className="font-heading text-2xl font-bold text-foreground">
        Stay at the Frontier
      </h3>

      <p className="text-muted-foreground mt-2 mb-6">
        Monthly insights on Biomedical Innovation.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="space-y-3"
        noValidate
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          pattern={EMAIL_PATTERN}
          value={email}
          onChange={(e) => {
            setSubEmailError("");
            setEmail(normalizeEmailInput(e.target.value));
          }}
          placeholder="Enter your email"
          className={fieldClass}
        />

        <button
          type="submit"
          className="btn-exec rounded-xl px-6 py-3"
        >
          Subscribe
        </button>

        {subEmailError && (
          <p className="text-xs text-amber-500">
            {subEmailError}
          </p>
        )}

        {subStatus && (
          <p className="flex items-center gap-2 text-primary text-sm">
            <CheckCircle size={15} />
            {subStatus}
          </p>
        )}
      </form>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7"
          >
            {sent ? (
              <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
              
                <CheckCircle
                  size={60}
                  className="mx-auto text-primary"
                />

                <h3 className="mt-6 text-3xl font-heading font-bold text-foreground">
                  Thank You
                </h3>
            
                <p className="mt-3 text-muted-foreground">
                  Your message has been received.
                </p>
            
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
                <form
                  onSubmit={handleSend}
                  className="space-y-8"
                  noValidate
                >
                
                  <div className="grid md:grid-cols-2 gap-8">
            
                    <div>
            
                      <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                        Name
                      </label>
            
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        placeholder="Vamsi Reddy"
                        className={fieldClass}
                      />

                    </div>
                      
                    <div>
                      
                      <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                        Email
                      </label>
                      
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setFormEmailError("");
                          setForm({
                            ...form,
                            email: normalizeEmailInput(e.target.value),
                          });
                        }}
                        placeholder="vamsi@example.com"
                        className={fieldClass}
                      />

                    </div>
                      
                  </div>
                      
                  {formEmailError && (
                    <p className="text-xs text-amber-500">
                      {formEmailError}
                    </p>
                  )}

                  <div>
                
                    <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                      Message
                    </label>
                
                    <textarea
                      rows={8}
                      value={form.message}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          message: e.target.value,
                        })
                      }
                      placeholder="Briefly describe your vision..."
                      className={messageAreaClass}
                    />

                  </div>
                    
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-exec rounded-full px-10 py-4 flex items-center gap-3"
                  >
                    {sending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={18} />
                        Send Inquiry
                      </>
                    )}
                  </button>
                  
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
