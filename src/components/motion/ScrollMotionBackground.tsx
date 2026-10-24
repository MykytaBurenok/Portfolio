"use client";

import { useEffect, useState } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import ArchitecturalGeometry from "./ArchitecturalGeometry";
import ConstellationBackground from "./ConstellationBackground";

const sectionOrder = ["home", "about", "projects", "skills", "contact"] as const;
const fallbackStops = [0.08, 0.27, 0.48, 0.7, 0.92];

export default function ScrollMotionBackground() {
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const [stops, setStops] = useState(fallbackStops);

  useEffect(() => {
    let frame = 0;
    const updateStops = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const measured = sectionOrder.map((id) => {
          const section = document.getElementById(id);
          if (!section) return null;
          const top = section.getBoundingClientRect().top + window.scrollY;
          return Math.min(0.98, Math.max(0.02, (top + section.offsetHeight / 2 - window.innerHeight / 2) / maxScroll));
        });
        if (measured.every((value): value is number => value !== null)) {
          setStops(measured as number[]);
        }
      });
    };

    updateStops();
    const resizeObserver = new ResizeObserver(updateStops);
    const portfolio = document.querySelector(".portfolio");
    if (portfolio) resizeObserver.observe(portfolio);
    window.addEventListener("resize", updateStops);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateStops);
    };
  }, []);

  return (
    <>
      <ConstellationBackground progress={scrollYProgress} stops={stops} reduceMotion={reduceMotion} />
      <ArchitecturalGeometry progress={scrollYProgress} stops={stops} reduceMotion={reduceMotion} />
    </>
  );
}
