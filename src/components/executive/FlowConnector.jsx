'use client';

import { motion } from "framer-motion";

export default function DnaConnector() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1200 1500"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0bc5ea" stopOpacity=".15" />
          <stop offset="50%" stopColor="#0bc5ea" stopOpacity=".55" />
          <stop offset="100%" stopColor="#0bc5ea" stopOpacity=".15" />
        </linearGradient>
      </defs>

      {/* Card 1 → Card 2 */}
      <motion.path
        d="
          M520 185
          C610 185 645 230 645 305
          S720 395 720 470
        "
        fill="none"
        stroke="url(#line)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Card 2 → Card 3 */}
      <motion.path
        d="
          M680 630
          C590 630 560 700 560 775
          S485 870 485 945
        "
        fill="none"
        stroke="url(#line)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: .5 }}
      />

      {/* Card 3 → Bottom Left */}
      <motion.path
        d="
          M520 1085
          C470 1140 420 1180 355 1245
        "
        fill="none"
        stroke="url(#line)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .8, delay: 1 }}
      />

      {/* Card 3 → Bottom Right */}
      <motion.path
        d="
          M520 1085
          C590 1140 660 1180 735 1245
        "
        fill="none"
        stroke="url(#line)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .8, delay: 1.2 }}
      />

      {/* Animated flowing highlight */}
      {[
        "M520 185 C610 185 645 230 645 305 S720 395 720 470",
        "M680 630 C590 630 560 700 560 775 S485 870 485 945",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 220"
          filter="url(#glow)"
          animate={{ strokeDashoffset: [-230, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
            delay: i,
          }}
        />
      ))}

      {/* Nodes */}
      {[
        [520,185],
        [720,470],
        [680,630],
        [485,945],
        [520,1085],
        [355,1245],
        [735,1245],
      ].map(([cx, cy], i) => (
        <motion.g
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
        >
          <circle
            cx={cx}
            cy={cy}
            r="5"
            fill="#0bc5ea"
            filter="url(#glow)"
          />

          <motion.circle
            cx={cx}
            cy={cy}
            r="5"
            fill="none"
            stroke="#0bc5ea"
            strokeWidth="1"
            animate={{
              r: [5, 12, 5],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        </motion.g>
      ))}
    </svg>
  );
}