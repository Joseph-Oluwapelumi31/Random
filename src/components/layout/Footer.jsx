"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowUp,
  Linkedin,
  Youtube,
  ExternalLink,
} from "lucide-react";

export default function Footer({ siteSettings = null }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  const navigation = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Pipeline",
      href: "innovation-pipeline",
    },
    {
      label: "Ennoble",
      href: "/regulatory-insights",
    },
    {
      label: "Profile",
      href: "/global-strategy",
    },
  ];

  const social = [
    {
      Icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/reddy-vamsi/",
    },
    {
      Icon: Youtube,
      label: "YouTube",
      href: "https://www.youtube.com/@VR_Ennoble",
    },
    {
      Icon: ExternalLink,
      label: "ORCID",
      href: "https://orcid.org/0009-0006-6427-5005",
    },
  ];

  const scrollTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative mt-16 overflow-hidden border-t border-border bg-gradient-to-b from-background to-card"
    >
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        </div>
      <div className="relative mx-auto max-w-6xl px-6 py-14">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr]">
                    {/* Brand */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20">
              VR
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Vamsi Reddy
              </h3>

              <p className="text-sm text-muted-foreground">
                MedTech Executive • EB-1A Scientist
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            Transforming biomedical innovation into market-ready
            clinical technologies that improve patient outcomes.
          </p>
        </motion.div>

        {/* Navigation */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            Navigation
          </h4>

          <ul className="space-y-3">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center text-sm text-muted-foreground transition-all duration-300 hover:text-primary"
                >
                  {item.label}

                  <span className="ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Connect */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            Connect
          </h4>

          <div className="space-y-3">
            {social.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-primary"
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />

                <span>{label}</span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
              {/* Divider */}

        <div className="my-8 h-px bg-border" />

        {/* Bottom */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-base font-medium text-foreground">
              Building technologies that improve patient outcomes.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              {siteSettings?.contactFooterLine1?.trim()
                ? siteSettings.contactFooterLine1
                : `© ${new Date().getFullYear()} Vamsi Reddy`}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {siteSettings?.contactFooterLine2?.trim()
                ? siteSettings.contactFooterLine2
                : "Global Head of Product Development · Evon Medics LLC"}
            </p>
          </div>

          <button
            onClick={scrollTop}
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Back to Top

            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>

        </div>

      </div>

    </motion.footer>
  );
}