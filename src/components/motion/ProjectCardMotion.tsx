"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { editorialEase, motionTiming } from "@/lib/motion";

export default function ProjectCardMotion({ children, index }: {
  children: ReactNode;
  index: number;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.article
      className="project-card"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : motionTiming.reveal,
        delay: reduceMotion ? 0 : index * motionTiming.heroStagger,
        ease: editorialEase,
      }}
    >
      {children}
    </motion.article>
  );
}
