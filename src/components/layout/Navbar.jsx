'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { label: 'Home',       short: 'Home',       href: '/' },
  { label: 'Pipeline',   short: 'Pipeline',   href: '/innovation-pipeline' },
  { label: 'Ennoble',    short: 'Ennoble',    href: '/regulatory-insights' },
  { label: 'Profile',    short: 'Profile',    href: '/global-strategy' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefing, setBriefing] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.header
        data-testid="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          scrolled ? 'glass-exec shadow-lg shadow-black/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          {/* Logo — links to Profile (/global-strategy) */}
          <Link href="/global-strategy" data-testid="navbar-logo" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0bc5ea] to-[#0891b2] flex items-center justify-center font-heading font-bold text-[#080d12] text-sm shadow-lg group-hover:scale-105 transition-transform">
              VR
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-semibold text-[#e2e8f0] text-sm leading-none">Vamsi Reddy</p>
              <p className="text-[#94a3b8] text-xs mt-0.5">MedTech Executive</p>
            </div>
          </Link>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center gap-0.5">
            {TABS.map((tab) => {
              const active = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  data-testid={`nav-${tab.short.toLowerCase()}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-[#0bc5ea] bg-[#0bc5ea]/10 border border-[#0bc5ea]/25'
                      : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-white/4'
                  }`}
                >
                  {tab.short}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setBriefing(true)}
              data-testid="briefing-cta"
              className="hidden sm:flex items-center gap-1.5 btn-exec px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap"
            >
              <Briefcase size={13} />
              Executive Briefing
            </button>
            <button
              data-testid="navbar-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-exec border-t border-[#0bc5ea]/10 px-5 py-4 space-y-1"
            >
              {TABS.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                    pathname === tab.href ? 'text-[#0bc5ea] bg-[#0bc5ea]/10' : 'text-[#94a3b8] hover:text-white hover:bg-white/4'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
              <button
                onClick={() => { setMenuOpen(false); setBriefing(true); }}
                className="w-full mt-2 btn-exec px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Briefcase size={14} /> Executive Briefing & Strategy Inquiries
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Briefing Modal */}
      <AnimatePresence>
        {briefing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setBriefing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="glass-exec rounded-3xl border border-[#0bc5ea]/20 w-full max-w-md p-8 relative"
              onClick={(e) => e.stopPropagation()}
              data-testid="briefing-modal"
            >
              <button onClick={() => setBriefing(false)} className="absolute top-5 right-5 text-[#64748b] hover:text-white">
                <X size={18} />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-[#0bc5ea]/15">
                  <Briefcase size={22} className="text-[#0bc5ea]" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">Executive Briefing</h2>
                  <p className="text-[#94a3b8] text-sm">Strategy & Partnership Inquiries</p>
                </div>
              </div>
              <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
                For partnership proposals, board advisory roles, speaking engagements, or investment discussions — connect via LinkedIn for the fastest response.
              </p>
              <div className="space-y-3">
                {/* LinkedIn — direct <a> tag with stopPropagation to guarantee navigation */}
                <a
                  href="https://www.linkedin.com/in/reddy-vamsi"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  data-testid="briefing-linkedin"
                  className="w-full btn-exec px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
                  style={{ display: 'flex' }}
                >
                  Connect on LinkedIn
                </a>
                <Link
                  href="/#contact"
                  onClick={() => setBriefing(false)}
                  className="w-full btn-outline-exec px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
                >
                  Send a Message
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
