"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage vertical de départ (px) */
  y?: number;
  /** Délai avant l'animation (s) */
  delay?: number;
  /** Durée (s) */
  duration?: number;
};

/**
 * Fait apparaître son contenu en fondu + léger glissement quand il entre
 * dans le champ de vision. Respecte prefers-reduced-motion.
 */
export default function Reveal({
  children,
  className = "",
  y = 24,
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}