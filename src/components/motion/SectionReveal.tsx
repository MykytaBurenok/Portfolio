"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { editorialEase, motionTiming } from "@/lib/motion";

type MotionTag = "div" | "section" | "article";

export default function SectionReveal({
  as = "div",
  children,
  className,
  delay = 0,
  id,
}: {
  as?: MotionTag;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] as React.ComponentType<ComponentProps<typeof motion.div>>;

  return (
    <Component
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: motionTiming.sectionOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: reduceMotion ? 0 : motionTiming.reveal,
        delay: reduceMotion ? 0 : delay,
        ease: editorialEase,
      }}
    >
      {children}
    </Component>
  );
}
