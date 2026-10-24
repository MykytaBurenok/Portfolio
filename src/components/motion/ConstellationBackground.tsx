"use client";

import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type Point = readonly [number, number];

// The same eight stars travel through each composition so the formations feel
// like one constellation being redrawn, rather than separate layers swapping.
// Order follows the rendered page: Hero, About, Projects, Skills, Contact.
const stages: readonly (readonly Point[])[] = [
  [[9, 27], [21, 18], [34, 31], [47, 12], [61, 24], [76, 15], [91, 29], [55, 42]],
  [[16, 27], [31, 19], [42, 35], [54, 23], [67, 39], [79, 26], [69, 51], [43, 52]],
  [[9, 55], [24, 38], [40, 28], [55, 39], [70, 27], [85, 40], [94, 57], [54, 64]],
  [[19, 22], [39, 22], [59, 22], [79, 22], [19, 47], [39, 47], [59, 47], [79, 47]],
  [[20, 59], [33, 42], [46, 34], [59, 42], [72, 58], [59, 72], [45, 77], [32, 68]],
];

const formations = [
  [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [2, 7], [4, 7], [1, 3], [3, 5]],
  [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [1, 7], [3, 7]],
  [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [0, 7], [1, 5], [2, 4]],
  [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [0, 4], [1, 5], [2, 6], [3, 7], [1, 4], [2, 5]],
  [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [1, 7], [3, 5]],
] as const;

function Star({ index, progress, stops, reduceMotion }: { index: number; progress: MotionValue<number>; stops: number[]; reduceMotion: boolean }) {
  const xs = stages.map((stage) => stage[index][0]);
  const ys = stages.map((stage) => stage[index][1]);
  const cx = useTransform(progress, stops, xs);
  const cy = useTransform(progress, stops, ys);
  return <motion.circle className={index % 3 === 0 ? "constellation-star constellation-star--bright" : "constellation-star"} r={index % 3 === 0 ? 0.48 : 0.3} style={reduceMotion ? { cx: stages[0][index][0], cy: stages[0][index][1] } : { cx, cy }} />;
}

function FormationLines({ progress, stage, stops, reduceMotion }: { progress: MotionValue<number>; stage: number; stops: number[]; reduceMotion: boolean }) {
  const start = stage === 0 ? 0 : stops[stage] - (stops[stage] - stops[stage - 1]) * 0.45;
  const peak = stops[stage];
  const end = stage === 4 ? 1 : stops[stage + 1] + (stops[stage + 1] - stops[stage]) * 0.45;
  const opacity = useTransform(progress, [start, peak, end], [stage === 0 ? 0.45 : 0, 0.72, 0]);
  return <motion.g style={{ opacity: reduceMotion ? (stage === 0 ? 0.55 : 0) : opacity }}>
    {formations[stage].map(([from, to], index) => {
      return <FormationConnection key={`${from}-${to}`} progress={progress} stops={stops} stage={stage} from={from} to={to} index={index} reduceMotion={reduceMotion} />;
    })}
  </motion.g>;
}

function FormationConnection({ progress, stops, stage, from, to, index, reduceMotion }: { progress: MotionValue<number>; stops: number[]; stage: number; from: number; to: number; index: number; reduceMotion: boolean }) {
  const x1 = useTransform(progress, stops, stages.map((coordinates) => coordinates[from][0]));
  const y1 = useTransform(progress, stops, stages.map((coordinates) => coordinates[from][1]));
  const x2 = useTransform(progress, stops, stages.map((coordinates) => coordinates[to][0]));
  const y2 = useTransform(progress, stops, stages.map((coordinates) => coordinates[to][1]));
  const start = stage === 0 ? 0 : stops[stage] - (stops[stage] - stops[stage - 1]) * 0.45;
  const peak = stops[stage];
  const draw = useTransform(progress, [start + ((peak - start) * index) / formations[stage].length, peak], [0, 1]);
  return <motion.line className="constellation-line" x1={x1} y1={y1} x2={x2} y2={y2} style={{ pathLength: reduceMotion ? 1 : draw }} />;
}

export default function ConstellationBackground({ progress, stops, reduceMotion }: { progress: MotionValue<number>; stops: number[]; reduceMotion: boolean }) {
  const y = useTransform(progress, [0, 1], [0, -130]);
  const x = useTransform(progress, [0, 0.5, 1], [0, 22, -18]);
  return <motion.div className="constellation-background" aria-hidden="true" style={reduceMotion ? undefined : { y, x }}>
    <svg className="constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      {formations.map((_, stage) => <FormationLines key={stage} progress={progress} stops={stops} stage={stage} reduceMotion={reduceMotion} />)}
      {stages[0].map((_, index) => <Star key={index} index={index} progress={progress} stops={stops} reduceMotion={reduceMotion} />)}
    </svg>
  </motion.div>;
}
