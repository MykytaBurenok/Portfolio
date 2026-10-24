"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { editorialEase, fadeUpVariants, motionTiming } from "@/lib/motion";

export function HeroCopyMotion({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = Boolean(useReducedMotion());
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : motionTiming.heroStagger, delayChildren: reduceMotion ? 0 : motionTiming.heroStagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = Boolean(useReducedMotion());
  return <motion.div className={className} variants={fadeUpVariants(reduceMotion)}>{children}</motion.div>;
}

export function HeroLine({ children }: { children: ReactNode }) {
  const reduceMotion = Boolean(useReducedMotion());
  return <motion.span className="hero-title-line" variants={fadeUpVariants(reduceMotion)}>{children}</motion.span>;
}

export function HeroArtworkMotion({ children }: { children: ReactNode }) {
  const reduceMotion = Boolean(useReducedMotion());
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : motionTiming.reveal, delay: reduceMotion ? 0 : 0.32, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}
