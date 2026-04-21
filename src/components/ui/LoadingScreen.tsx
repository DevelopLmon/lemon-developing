"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Nur beim ersten Öffnen der Seite (pro Browser-Session)
    const alreadyShown = sessionStorage.getItem("lemon-loading-shown");
    if (alreadyShown) return;
    sessionStorage.setItem("lemon-loading-shown", "1");
    setVisible(true);

    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(eased * 100);
      setCount(Math.floor(eased * 100));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#0A0A12" }}
        >
          {/* Background radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Animated grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              {/* Glow behind logo */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl scale-150"
                style={{ background: "rgba(232,228,64,0.25)" }}
              />
              <div
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center font-heading font-black text-4xl text-bg-base"
                style={{
                  background: "linear-gradient(135deg, #E8E440, #B8B430)",
                  boxShadow: "0 0 40px rgba(232,228,64,0.5)",
                }}
              >
                L
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex items-baseline gap-1.5"
            >
              <span className="font-heading font-black text-2xl text-lemon tracking-tight">
                CoreSites
              </span>
              <span className="font-heading font-light text-2xl text-white/50">
                - Studio
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-mono text-xs text-white/30 tracking-[0.3em] uppercase"
            >
              Webdesign &amp; Development
            </motion.p>

            {/* Progress area */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col items-center gap-3 w-64"
            >
              {/* Counter */}
              <div className="font-mono text-sm text-white/40 tabular-nums">
                {String(count).padStart(3, "0")}%
              </div>

              {/* Bar track */}
              <div
                className="w-full h-px rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #7C3AED, #E8E440)",
                    boxShadow: "0 0 10px rgba(232,228,64,0.5)",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Corner decoration */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-mono text-[10px] text-white/15 tracking-widest"
            >
              Seite lädt
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
