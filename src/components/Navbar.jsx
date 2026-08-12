'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import {usePathname} from 'next/navigation'
import { Menu, X, FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Innovation Hub", href: "/innovation-hub" },
  { label: "NIH Portfolio", href: "/#nih-portfolio" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (href) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <motion.nav
      data-testid="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" data-testid="navbar-logo" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#8A2BE2] flex items-center justify-center font-heading font-800 text-sm text-white shadow-lg group-hover:scale-105 transition-transform duration-200">
            VR
          </div>
          <span className="font-heading font-semibold text-foreground text-base hidden sm:block">
            Vamsi Reddy
          </span>
        </Link>
        

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href.startsWith("/#") ? "/" : link.href}
              data-testid={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
              onClick={() => handleAnchorClick(link.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/innovation-hub"
            data-testid="navbar-hub-cta"
            
            className="hidden sm:flex items-center gap-2 btn-gradient px-4 py-2 rounded-xl text-sm font-semibold text-foreground"
          >
            <FlaskConical size={14} />
            Innovation Hub
          </Link>
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label={
            resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
            }
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {resolvedTheme === "dark" ? (
              <Sun size={18}
               className="text-foreground"
              aria-hidden="true"
               
               />
            ) : (
              <Moon size={18}
                className="text-foreground" 
                aria-hidden="true"

              />
            )}
          </button>
          <button
            data-testid="navbar-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true"/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-testid="navbar-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-card border-t border-border px-6 py-4 space-y-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href.startsWith("/#") ? "/" : link.href}
                onClick={() => handleAnchorClick(link.href)}
                className="block px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/innovation-hub"
              onClick={() => setMenuOpen(false)}
              className="block mt-2 btn-gradient px-4 py-3 rounded-xl text-sm font-semibold text-foreground text-center"
            >
              Innovation Hub
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
