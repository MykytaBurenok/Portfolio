"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const themeIds = ["rose-noir", "dusty-coral"] as const;
type ThemeId = (typeof themeIds)[number];

export default function SiteLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (themeIds.some((themeId) => themeId === savedTheme)) {
      loaderRef.current?.setAttribute("data-theme", savedTheme as ThemeId);
    }

    // Defer the state updates so the same lifecycle works with Strict Mode's
    // development effect replay. These timers are restarted after cleanup.
    const showTimeout = window.setTimeout(() => {
      setMounted(true);
      setVisible(true);
    }, 0);
    const hideTimeout = window.setTimeout(() => setVisible(false), 900);
    // Failsafe removal if a motion completion callback never fires.
    const removeTimeout = window.setTimeout(() => setMounted(false), 1350);

    return () => {
      window.clearTimeout(showTimeout);
      window.clearTimeout(hideTimeout);
      window.clearTimeout(removeTimeout);
    };
  }, []);

  return (
    <>
      {mounted && (
        <motion.div
          className="site-loader"
          data-theme="rose-noir"
          ref={loaderRef}
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.35, ease: "easeOut" }}
        >
          <div className="loader-composition">
            <motion.div
              className="loader-orbit loader-orbit--outer"
              style={{ rotate: shouldReduceMotion ? 0 : undefined }}
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            >
              <span className="loader-orbit-point" />
            </motion.div>
            <motion.div
              className="loader-orbit loader-orbit--middle"
              style={{ rotate: shouldReduceMotion ? 0 : undefined }}
              animate={shouldReduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
            />
            <div className="loader-orbit loader-orbit--inner" />

            <svg className="loader-constellation" viewBox="0 0 240 180" aria-hidden="true">
              <path d="M28 128 70 89 108 108 151 51 206 75" />
              <path d="M70 89 83 42M108 108l30 39 58-72" />
              {[ [28, 128], [70, 89], [108, 108], [151, 51], [206, 75], [83, 42], [138, 147] ].map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r={index === 3 ? 2.2 : 1.5} style={{ "--star-delay": `${index * 0.22}s` } as React.CSSProperties} />
              ))}
            </svg>

            <motion.div
              className="loader-monogram"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            >
              M<span>.</span>
            </motion.div>
          </div>

          <motion.div
            className="loader-caption"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: 0.45 }}
          >
            <span>DESIGN MEETS CODE</span>
            <div className="loader-progress" aria-hidden="true"><i /></div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
