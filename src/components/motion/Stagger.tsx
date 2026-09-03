"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const conteneur: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/**
 * Conteneur qui fait apparaître ses <StaggerItem> les uns après les autres
 * lorsqu'il entre dans le champ de vision.
 */
export function StaggerGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={conteneur}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Élément animé à placer directement dans un <StaggerGroup>.
 * h-full pour remplir la cellule de grille sans casser la mise en page.
 */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div variants={item} className={`h-full ${className}`}>
      {children}
    </motion.div>
  );
}