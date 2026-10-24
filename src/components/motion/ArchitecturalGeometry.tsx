"use client";

import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

export default function ArchitecturalGeometry({ progress, stops, reduceMotion }: { progress: MotionValue<number>; stops: number[]; reduceMotion: boolean }) {
  const rise = useTransform(progress, [0, stops[0], stops[1], stops[2], stops[3], stops[4], 1], [120, 35, -40, 100, -80, -25, 0]);
  const drift = useTransform(progress, [0, stops[1], stops[3], 1], [-8, 12, 16, -12]);
  const frameX = useTransform(progress, [0, stops[1], stops[3], 1], [0, 7, -8, -3]);
  const frameY = useTransform(progress, [0, stops[1], stops[3], 1], [0, -6, 7, 3]);
  const reveal = useTransform(progress, [0, stops[0], stops[1], stops[2], stops[3], stops[4], 1], [0.2, 0.8, 0.35, 0.82, 0.3, 0.76, 0.45]);
  const arcOne = useTransform(progress, [0, stops[0], stops[1], stops[2]], [0, 0.4, 1, 0.35]);
  const arcTwo = useTransform(progress, [stops[1], stops[2], stops[3], stops[4]], [0, 0.65, 1, 0.4]);
  const diagonalOne = useTransform(progress, [0, stops[0], stops[1], stops[2]], [0, 0.45, 1, 0.72]);
  const diagonalTwo = useTransform(progress, [stops[1], stops[2], stops[3], stops[4]], [0, 0.45, 1, 0.72]);
  const circleScale = useTransform(progress, [0, stops[0], stops[1], stops[2], stops[3], stops[4], 1], [0.82, 0.98, 1.08, 0.92, 0.88, 1.04, 0.97]);
  const quiet = (value: MotionValue<number>, fallback: number) => reduceMotion ? fallback : value;

  return <motion.div className="background-geometry" aria-hidden="true" style={{ y: quiet(rise, 0), x: quiet(drift, 0) }}>
    <motion.div className="geometry-grid" style={{ opacity: quiet(reveal, 0.22) }} />
    <svg className="architecture-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.circle className="architecture-circle" cx="81" cy="28" r="34" style={{ scale: quiet(circleScale, 1) }} />
      <motion.circle className="architecture-circle architecture-circle--secondary" cx="9" cy="72" r="25" />
      <motion.path className="architecture-path" d="M 102 6 A 42 42 0 0 0 63 50 A 42 42 0 0 0 100 91" style={{ pathLength: quiet(arcOne, 1), opacity: quiet(arcOne, 0.45) }} />
      <motion.path className="architecture-path architecture-path--secondary" d="M -4 72 C 18 45 25 20 51 8 C 70 -1 86 8 102 23" style={{ pathLength: quiet(arcTwo, 1), opacity: quiet(arcTwo, 0.3) }} />
      <motion.path className="architecture-path" d="M 6 100 L 42 0 M 15 100 L 51 0" style={{ pathLength: quiet(diagonalOne, 1), opacity: quiet(diagonalOne, 0.4) }} />
      <motion.path className="architecture-path architecture-path--secondary" d="M 63 100 L 100 0 M 73 100 L 110 0" style={{ pathLength: quiet(diagonalTwo, 1), opacity: quiet(diagonalTwo, 0.35) }} />
      <motion.path className="architecture-frame" d="M 65 18 L 89 18 L 89 42 L 65 42 Z M 65 18 L 77 30 L 89 18 M 77 30 L 77 54" style={{ x: quiet(frameX, 0), y: quiet(frameY, 0), pathLength: quiet(reveal, 1), opacity: quiet(reveal, 0.35) }} />
      <motion.path className="architecture-frame architecture-frame--secondary" d="M 10 49 L 25 39 L 40 49 L 40 67 L 25 77 L 10 67 Z M 10 49 L 40 67 M 40 49 L 10 67" style={{ pathLength: quiet(arcTwo, 1), opacity: quiet(arcTwo, 0.32) }} />
    </svg>
  </motion.div>;
}
